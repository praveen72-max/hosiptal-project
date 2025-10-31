terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "local" {}
}

provider "aws" {
  region = var.aws_region
}

# Include all modules
module "network" {
  source = "./vpc"
}

module "ecr" {
  source = "./ecr"
}

module "ecs" {
  source = "./ecs"
  vpc_id             = module.network.vpc_id
  subnet_ids         = module.network.public_subnets
  backend_repo_url   = module.ecr.backend_repo_url
  frontend_repo_url  = module.ecr.frontend_repo_url
}

output "load_balancer_dns" {
  value = module.ecs.alb_dns
}