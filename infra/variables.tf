variable "subscription_id" {
  type        = string
  description = "Azure subscription that hosts all resources."
}

variable "location" {
  type        = string
  description = "Azure region allowed by the subscription policy."
  default     = "eastasia"
}

variable "project" {
  type        = string
  description = "Short project name used in resource names."
  default     = "wanted"
}

variable "environment" {
  type        = string
  description = "Environment name used in resource names."
  default     = "prod"
}

variable "unique_suffix" {
  type        = string
  description = "Suffix that makes globally unique names (registry, key vault)."
  default     = "890890"
}

variable "db_admin_login" {
  type        = string
  description = "PostgreSQL administrator login."
  default     = "wantedadmin"
}

variable "client_ip" {
  type        = string
  description = "Public IP of the developer machine allowed through the DB firewall. Empty means no rule."
  default     = ""
}

variable "github_repo" {
  description = "GitHub repository allowed to deploy, in owner/name format"
  type        = string
  default     = "MrWilsonA/WAnted"
}
