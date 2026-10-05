resource "azurerm_container_registry" "main" {
  name                = "acr${var.project}${var.unique_suffix}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "Basic"

  admin_enabled = false

  tags = local.tags
}

resource "azurerm_role_assignment" "app_acr_pull" {
  scope                            = azurerm_container_registry.main.id
  role_definition_name             = "AcrPull"
  principal_id                     = azurerm_user_assigned_identity.app.principal_id
  skip_service_principal_aad_check = true
}
