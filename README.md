# Partie Docker Compose
# Projet Évaluation Docker - API Multi-Services

Ce projet consiste en une API Node.js conteneurisée communiquant avec deux bases de données distinctes (PostgreSQL et MongoDB) pour assurer la persistance des données.

## Prérequis

- Système d'exploitation : Windows 10/11 (avec WSL2), macOS ou Linux.
- Docker Desktop ou Docker Engine : version 20.10.0 ou supérieure.
- Docker Compose : version 2.0 ou supérieure (inclus dans Docker Desktop).
- Git : pour le clonage du dépôt.

## Architecture du Projet

L'application est découpée en 3 services mis dans un réseau Docker :
- API (Node.js) : Serveur backend.
- db_pg (PostgreSQL) : Base de données relationnelle pour la gestion des utilisateurs.
- db_mongo (MongoDB) : Base de données NoSQL pour les profils et préférences.

### Schéma d'Architecture (Flux)

                                    
                                       ┌───▶ SQL : db_postgres (Port 5432) ───▶ Volume: pgdata
                                       │
                 Protocole             │
                   HTTP                │

#  MACHINE CLIENT ─▶ API (3000) 

                                       └───▶ NoSQL : db_mongo (Port 27017) ───▶ Volume: mongodata

### Utilisation du projet

# 1. Cloner le projet
git clone (avec url fournie dans github)
cd (nom du repo)

# 2. Configurer l'environnement
cp .env.example .env
# Modifiez les variables dans .env si nécessaire

# 3. Lancer l'application
docker compose up --build -d

# 4 ajouter un utilisateur (postgres) + verif

curl -X POST http://localhost:3000/profil \
     -H "Content-Type: application/json" \
     -d '{"bio": "etudiant en dev", "city": "Paris", "github": "Toto2807"}'

docker exec -it db_pg psql -U postgres -d test_eval -c "SELECT * FROM users;" 

# 5 ajouter un utilisateur (mongo) + verif

curl -X POST http://localhost:3000/profil \                                   
     -H "Content-Type: application/json" \
     -d '{"userID": 1, "preferences": ["devops", "kubernetes"], "history": []}'

docker exec -it db_mongo mongosh test_eval --eval "db.profils.find().pretty()"

si jamais votre bdd se nomme différement changer evidement le nom dans les commandes
De plus si le conteneur est supprimé les volumes reste : à tester avec : "docker compose down" puis tout relancer en suivant le guide depuis l'étape 3.


Projet réalisé par CULLIER Théo


# Partie Kubernetes

# Projet Évaluation Kubernetes - API Multi-Services

Ce projet consiste en une API Node.js déployée sur un cluster Kubernetes (Docker Desktop / Minikube). L'application assure la persistance des données en communiquant avec deux bases de données distinctes : PostgreSQL et MongoDB.

# Prérequis
Environnement : macOS (Docker Desktop), Windows (WSL2) ou Linux.
Kubernetes : kubectl installé et un cluster actif (Docker Desktop K8s ou Minikube).
Docker : Pour le build de l'image si nécessaire.

# Architecture du Projet (K8s)

L'application est décomposée en plusieurs objets Kubernetes organisés par services :

API (Node.js) : Déploiement avec 2 répliques pour la haute disponibilité.
PostgreSQL : Base de données relationnelle avec Volume Persistant (PVC).
MongoDB : Base de données NoSQL.
Services : Communication interne via ClusterIP et exposition via NodePort (Port 30080).

# Structure des fichiers /k8s

Composant	Fichiers
Global	configmap.yaml
API	api-deployment.yaml, api-service.yaml
PostgreSQL	postgres-pvc.yaml, postgres-deployment.yaml, postgres-service.yaml
MongoDB	mongo-deployment.yaml, mongo-service.yaml

# Utilisation du projet

1. Déploiement de l'infrastructure

Appliquez l'ensemble des manifestes situés dans le dossier k8s/ :

kubectl apply -f k8s/

2. Vérification du déploiement

Attendez que tous les pods soient dans l'état Running :

kubectl get pods -w

3. Test de connexion (Logs)

Vérifiez que l'API a bien réussi ses connexions aux deux bases de données :

kubectl logs -l app=api

Attendu : ✅ Connexion a MongoDB ok et ✅ Connexion a postgres ok

🧪 Tests Fonctionnels
L'API est exposée sur le port 30080.

A. Ajouter et vérifier un profil (PostgreSQL)

# Ajout via l'API

curl -X POST http://localhost:30080/profil \
-H "Content-Type: application/json" \
-d '{"bio": "étudiant en dev", "city": "Paris", "github": "Toto2807"}'

# Vérification directe dans le conteneur Postgres

kubectl exec -it $(kubectl get pods -l app=postgres -o name) -- psql -U postgres -d user_db -c "SELECT * FROM users;"

B. Ajouter et vérifier un profil (MongoDB)

# Ajout via l'API

curl -X POST http://localhost:30080/profil \
-H "Content-Type: application/json" \
-d '{"userID": 1, "preferences": ["devops", "kubernetes"], "history": []}'

# Vérification directe dans le conteneur MongoDB

kubectl exec -it $(kubectl get pods -l app=mongo -o name) -- mongosh ma_db --eval "db.profils.find().pretty()"

# Persistance des données

Le service PostgreSQL utilise un PersistentVolumeClaim (PVC). Pour tester la persistance :
Supprimez le déploiement : kubectl delete deployment postgres-deployment
Relancez-le : kubectl apply -f k8s/postgres-deployment.yaml
Vos données SQL seront toujours présentes car le volume postgres-pvc n'a pas été supprimé.

# Maintenance

Arrêter tout le projet : kubectl delete -f k8s/
Redémarrer uniquement l'API : kubectl rollout restart deployment api-deployment
Port-Forward (si localhost échoue) : kubectl port-forward svc/api-service 30080:80

Projet réalisé par : CULLIER Théo