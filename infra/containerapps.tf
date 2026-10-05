resource "azurerm_container_app_environment" "main" {
  name                       = "cae-${local.name_suffix}"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  tags                       = local.tags

  workload_profile {
    name                  = "Consumption"
    workload_profile_type = "Consumption"
  }
}

resource "azapi_update_resource" "environment_mode" {
  type        = "Microsoft.App/managedEnvironments@2026-07-01"
  resource_id = azurerm_container_app_environment.main.id

  body = {
    properties = {
      environmentMode = "WorkloadProfiles"
    }
  }

  sensitive_body = {
    properties = {
      appLogsConfiguration = {
        destination = "log-analytics"
        logAnalyticsConfiguration = {
          customerId = azurerm_log_analytics_workspace.main.workspace_id
          sharedKey  = azurerm_log_analytics_workspace.main.primary_shared_key
        }
      }
    }
  }
}

resource "azurerm_static_web_app" "web" {
  name                = "swa-${var.project}-web"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku_tier            = "Free"
  sku_size            = "Free"
  tags                = local.tags

  lifecycle {
    ignore_changes = [repository_url, repository_branch]
  }
}

resource "azurerm_container_app" "api" {
  name                         = "ca-${var.project}-api"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"
  tags                         = local.tags

  workload_profile_name = "Consumption"
  depends_on            = [azapi_update_resource.environment_mode]

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.app.id]
  }

  registry {
    server   = azurerm_container_registry.main.login_server
    identity = azurerm_user_assigned_identity.app.id
  }

  secret {
    name                = "database-url"
    key_vault_secret_id = azurerm_key_vault_secret.database_url.versionless_id
    identity            = azurerm_user_assigned_identity.app.id
  }

  secret {
    name                = "appinsights-connection-string"
    key_vault_secret_id = azurerm_key_vault_secret.appinsights_connection_string.versionless_id
    identity            = azurerm_user_assigned_identity.app.id
  }

  ingress {
    external_enabled = true
    target_port      = 3000

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    min_replicas = 2
    max_replicas = 5

    container {
      name   = "api"
      image  = "${azurerm_container_registry.main.login_server}/wanted-backend:v1"
      cpu    = 0.25
      memory = "0.5Gi"

      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "PORT"
        value = "3000"
      }
      env {
        name  = "LOG_LEVEL"
        value = "info"
      }
      env {
        name  = "CORS_ORIGIN"
        value = "https://${azurerm_static_web_app.web.default_host_name}"
      }
      env {
        name        = "DATABASE_URL"
        secret_name = "database-url"
      }
      env {
        name        = "APPLICATIONINSIGHTS_CONNECTION_STRING"
        secret_name = "appinsights-connection-string"
      }

      liveness_probe {
        transport = "HTTP"
        path      = "/health"
        port      = 3000
      }

      readiness_probe {
        transport = "HTTP"
        path      = "/health/ready"
        port      = 3000
      }
    }

    http_scale_rule {
      name                = "http-requests"
      concurrent_requests = "50"
    }
  }

  lifecycle {
    ignore_changes = [template[0].container[0].image]
  }
}
