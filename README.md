# Projet Évaluation Docker - API Multi-Services

Ce projet consiste en une API Node.js conteneurisée communiquant avec deux bases de données distinctes (PostgreSQL et MongoDB) pour assurer la persistance des données.

## Architecture du Projet

L'application est découpée en 3 services mis dans un réseau Docker :
- API (Node.js) : Serveur backend gérant la logique métier.
- db_pg (PostgreSQL) : Base de données relationnelle pour la gestion des utilisateurs.
- db_mongo (MongoDB) : Base de données NoSQL pour les profils et préférences.

### Schéma d'Architecture (Flux)


                                    |----> SQL : db_postgres (Port 5432)
                                    |
               Protocole            |
                 HTTP               |
MACHINE CLIENT ---------> API ---------> NoSQL : db_mongo (PORT 27017)
                                    |
                                    |
                                    |-----> Volumes : ici -> pgdata et mongodata

                                    
                                       ┌───▶ SQL : db_postgres (Port 5432) ───▶ Volume: pgdata
                                       │
                 Protocole             │
                   HTTP                │

#  MACHINE CLIENT ─────────▶ API (3000) 

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