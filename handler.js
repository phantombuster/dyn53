"use strict"

const Route53 = require("aws-sdk/clients/route53")
const dns = require("dns").promises
const configList = require("./config")

module.exports.updateRecord = async (event) => {

	const domain = event.queryStringParameters.domain
	let config
	for (const c of configList) {
		if (c.domain === domain) {
			config = c
			break
		}
	}
	if (!config) {
		return {
			statusCode: 400,
			body: "domain not found in config",
		}
	}
	if (config.auth !== event.queryStringParameters.auth) {
		return {
			statusCode: 401,
			body: "bad auth",
		}
	}

	const sourceIp = event.requestContext.identity.sourceIp

	const addresses = await dns.resolve4(domain)
	for (const addr of addresses) {
		if (addr === sourceIp) {
			return {
				statusCode: 200,
				body: `${sourceIp} already assigned to ${domain}`,
			}
		}
	}

	const route53 = new Route53({
		apiVersion: "2013-04-01",
	})

	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message: "Go Serverless v1.0! Your function executed successfully!",
				input: event,
			},
			null,
			2
		),
	}
}
