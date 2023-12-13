# Use uma imagem base do Node.js
FROM node:latest

# Crie e defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY package.json package-lock.json /app/

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o diretório de trabalho
COPY app.js /app/

# Exponha a porta em que a aplicação está rodando
EXPOSE 3000

# Comando para executar a aplicação quando o container for iniciado
CMD ["node", "app.js"]