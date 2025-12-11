# =========================
# Étape 1 : Build frontend
# =========================
FROM node:20-alpine AS builder

# Dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Build de l'app (Vite → dossier dist/)
RUN npm run build


# =========================
# Étape 2 : Nginx runtime
# =========================
FROM nginx:alpine

# Supprimer la config par défaut si tu veux custom plus tard
# (optionnel à ce stade)
# RUN rm /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés vers nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port HTTP
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
