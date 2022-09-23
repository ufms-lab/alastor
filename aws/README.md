# AWS: Hello Retail with Edpsagon

This project implements some Hello Retail functions as a proof of concept for [Alastor](../README.md).
## Development setup

This section will guide you on how to setup your development environment.

This project was built using:

- Serverless Framework
- AWS

## Requirement

### NodeJS

Our project needs [NodeJS](https://nodejs.org/en/) v16 to work, it's an essential requirement.

### Episagon

xxx

## Installation

Inside the project folder you can run the command.

```bash
npm ci
```
After that all dependencies configured in package.json an package-lock.json will be installed locally in node_modules.

## Invoke Locally

```bash
npm run func:product-purchase-local
```

## Deploy

```bash
npm run deploy
```

## Invoke Deployed

```bash
npm run func:product-purchase
```
