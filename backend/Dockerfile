# Image Node légère
FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier uniquement les fichiers de dépendances d'abord (cache build)
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste du code source
COPY src ./src

# Port exposé par le conteneur
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
