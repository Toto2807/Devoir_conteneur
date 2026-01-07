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