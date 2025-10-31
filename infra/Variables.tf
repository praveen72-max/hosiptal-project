variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "vpc_id" {
  description = "VPC ID for ECS and ALB (optional if Terraform creates VPC)"
  type        = string
  default     = ""
}

variable "subnet_ids" {
  description = "List of public subnet IDs (optional if Terraform creates subnets)"
  type        = list(string)
  default     = []
}

variable "backend_repo_url" {
  description = "ECR repo URL for backend"
  type        = string
  default     = "090659571144.dkr.ecr.us-east-1.amazonaws.com/hospital-backend"
}

variable "frontend_repo_url" {
  description = "ECR repo URL for frontend"
  type        = string
  default     = "090659571144.dkr.ecr.us-east-1.amazonaws.com/hospital-frontend"
}