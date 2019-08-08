# dyn53
A Lambda that updates a Route53 A record with the requester's IP address.

- See last deployments: `serverless deploy list --aws-profile serverless`
- Monitor calls: `serverless logs -f updateRecord -t --aws-profile serverless`
- Re-deploy everything: `serverless deploy --aws-profile serverless`
- Only deploy the function (faster, to quickly test): `serverless deploy function -f updateRecord --aws-profile serverless`

Example of IAM user minimal inline write policy for a specific Route53 zone:
	{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Action": [
					"route53:ChangeResourceRecordSets"
				],
				"Resource": [
					"arn:aws:route53:::hostedzone/xxxxxxxx"
				]
			}
		]
	}
