FROM node:10-alpine

WORKDIR '/usr/src/eclancy'

# Install dependencies
COPY package*.json ./
RUN npm install 
# --production

# Get the rest of the code
COPY . .
RUN npm run build --prod

# Start the server
CMD [ "npm", "run", "express" ]
