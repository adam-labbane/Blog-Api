# Étape 1 : image de base
FROM node:18

# Étape 2 : créer le dossier de travail
WORKDIR /app

# Étape 3 : copier les fichiers
COPY package*.json ./
RUN npm install

COPY . .

# Étape 4 : exposer le port et lancer l'app
EXPOSE 8000
CMD ["node", "index.js"]
