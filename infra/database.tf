resource "random_password" "db_admin" {
  length  = 32
  special = false
}

resource "azurerm_postgresql_flexible_server" "main" {
  name                = "psql-${local.name_suffix}-${var.unique_suffix}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  version                = "17"
  administrator_login    = var.db_admin_login
  administrator_password = random_password.db_admin.result

  sku_name                     = "B_Standard_B1ms"
  storage_mb                   = 32768
  storage_tier                 = "P4"
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false

  public_network_access_enabled = true

  tags = local.tags

  lifecycle {
    ignore_changes = [zone]
  }
}

resource "azurerm_postgresql_flexible_server_database" "wanted" {
  name      = "wanted"
  server_id = azurerm_postgresql_flexible_server.main.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "azure_services" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "client" {
  count            = var.client_ip == "" ? 0 : 1
  name             = "allow-developer-ip"
  server_id        = azurerm_postgresql_flexible_server.main.id
  start_ip_address = var.client_ip
  end_ip_address   = var.client_ip
}

resource "azurerm_key_vault_secret" "db_password" {
  name         = "db-admin-password"
  value        = random_password.db_admin.result
  key_vault_id = azurerm_key_vault.main.id

  depends_on = [azurerm_role_assignment.me_kv_secrets_officer]
}

resource "azurerm_key_vault_secret" "database_url" {
  name         = "database-url"
  value        = "postgresql://${var.db_admin_login}:${random_password.db_admin.result}@${azurerm_postgresql_flexible_server.main.fqdn}:5432/${azurerm_postgresql_flexible_server_database.wanted.name}?sslmode=verify-full"
  key_vault_id = azurerm_key_vault.main.id

  depends_on = [azurerm_role_assignment.me_kv_secrets_officer]
}
