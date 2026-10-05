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
