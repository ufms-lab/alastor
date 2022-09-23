# Alastor - implemented by Alison Vilela

First commit

# Requisitos
    Docker
    arkade
    kubectl
    KinD

# Now you can run the script to create your local Kubernetes cluster with local Docker registry.
./kind-with-registry.sh

# To make sure the kubectl context is set to the newly created cluster; run
kubectl config current-context

# If the result is not kind-kind; then run
kubectl config use kind-kind

# Make sure your cluster is running
kubectl cluster-info

# Make sure Docker registry is running
docker ps -l

# Deploying OpenFaas to KinD cluster
arkade install openfaas

# Make sure OpenFaas is deployed. It might take a minute or two
kubectl get pods -n openfaas


kubectl port-forward -n openfaas svc/gateway 8080:8080