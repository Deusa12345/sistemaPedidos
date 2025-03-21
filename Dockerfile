# Use uma imagem base do Node.js
FROM node:22-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta em que o backend estará rodando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/server.js"]  
