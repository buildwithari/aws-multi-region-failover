# Project Setup

## Terraform State Backend

Created S3 bucket for state:  
```
aws s3 mb s3://buildwithari-tfstate-failover --region us-east-1
```

Enabled versioning:  
```
aws s3api put-bucket-versioning --bucket buildwithari-tfstate-failover --versioning-configuration Status=Enabled
```

Created DynamoDB table for locking:
```
aws dynamodb create-table \
  --table-name terraform-state-lock-failover \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```