output "acr_login_server" {
  value = azurerm_container_registry.main.login_server
}

output "key_vault_uri" {
  value = azurerm_key_vault.main.vault_uri
}

output "postgres_fqdn" {
  value = azurerm_postgresql_flexible_server.main.fqdn
}

output "api_url" {
  value = "https://${azurerm_container_app.api.ingress[0].fqdn}"
}

output "web_url" {
  value = "https://${azurerm_static_web_app.web.default_host_name}"
}

output "deploy_client_id" {
  value = azurerm_user_assigned_identity.deploy.client_id
}

output "tenant_id" {
  value = data.azurerm_client_config.current.tenant_id
}
