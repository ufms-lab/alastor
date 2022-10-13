# OpenFaaS: Hello Retail Vanilla/Alastor

Under construction

## OpenFaaS on Kubernetes
    Docker
    arkade
    kubectl
    KinD

## Now you can run the script to create your local Kubernetes cluster with local Docker registry.
```bash
./kind-with-registry.sh
```

## To make sure the kubectl context is set to the newly created cluster; run
```bash
kubectl config current-context
```

## If the result is not kind-kind; then run
```bash
kubectl config use kind-kind
```

## Make sure your cluster is running
```bash
kubectl cluster-info
```

## Make sure Docker registry is running
```bash
docker ps -l
```

## Deploying OpenFaas to KinD cluster
```bash
arkade install openfaas
```

## Make sure OpenFaas is deployed. It might take a minute or two
```bash
kubectl get pods -n openfaas
```

```bash
kubectl port-forward -n openfaas svc/gateway 8080:8080
```

```
export DOCKER_USER=localhost:5000
export TEMPLATE=vanilla
export GATEWAY=http://127.0.0.1:8080
```