# 🚀 Projet Évaluation Docker - API Multi-Services

Ce projet consiste en une API Node.js conteneurisée communiquant avec deux bases de données distinctes (PostgreSQL et MongoDB) pour assurer la persistance des données.

## 🏗️ Architecture du Projet

L'application est découpée en 3 services mis dans un réseau Docker :
- API (Node.js) : Serveur backend gérant la logique métier.
- db_pg (PostgreSQL) : Base de données relationnelle pour la gestion des utilisateurs.
- db_mongo (MongoDB) : Base de données NoSQL pour les profils et préférences.

### Schéma d'Architecture (Flux)

[ Client (Curl/Browser) ] 
      │ (Port 3000)
      ▼
[ Conteneur API ] ◄───► [ Conteneur PostgreSQL ] (Persistance via pgdata)
      │           ◄───► [ Conteneur MongoDB ]    (Persistance via mongodata)
      └───────────────► [ Réseau : reseau_theo ]