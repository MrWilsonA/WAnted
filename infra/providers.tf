terraform {
  required_version = ">= 1.9"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 5.8"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
    azapi = {
      source  = "Azure/azapi"
      version = "~> 2.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-wanted-tfstate"
    storage_account_name = "stwantedtf890890"
    container_name       = "tfstate"
    key                  = "wanted.prod.tfstate"
    use_azuread_auth     = true
  }
}

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id

  resource_provider_registrations = "none"
}

provider "azapi" {
  subscription_id = var.subscription_id
}
