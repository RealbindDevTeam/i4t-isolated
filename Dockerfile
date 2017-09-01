# Aplicacion basada en Node.js Version 4.4
FROM node:8.4.0
# Setea el directorio de trabajo a /app
WORKDIR /app
# Copiar el compilado del proyecto a /app
ADD ./ /app
# Instala los modulos de npm
RUN (cd /app && npm install)
# Expone el puerto 8080 para acceder a la aplicacion
EXPOSE 9000
# Ejecutar el comando node main.js
CMD node /app/main.js