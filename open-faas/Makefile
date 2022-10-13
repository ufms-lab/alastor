
init
	docker, kind
	openfaas (create cluster, registery, config kubernetes, install openfaas)
	aws (npm install)


openfaas build/push/deploy or up (inside of folder) -f OpenFaas.yml

PASSWORD=$(kubectl get secret -n openfaas basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode; echo) && echo $PASSWORD

mock | faas-cli invoke product-purchase-${TEMPLATE}
