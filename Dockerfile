# making docker image for frontend
# using node image
FROM node:14.15.4
# setting working directory
WORKDIR /app
# copying package.json and package-lock.json
COPY package*.json ./
# installing dependencies
RUN npm install
# copying all files
COPY . .
# exposing port 3000
EXPOSE 3000
# running the app
CMD ["npm", "start"]
