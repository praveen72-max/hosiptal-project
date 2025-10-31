terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Local backend – stores state file locally (terraform.tfstate)
  backend "local" {}
}

# --- AWS Provider ---
provider "aws" {
  region = var.aws_region
}

# Note: Terraform automatically loads all .tf files in this directory
# (vpc.tf, ecr.tf, ecs.tf, alb.tf, variables.tf).
# Keep outputs in their resource files (or a single outputs.tf) but don't duplicate names.