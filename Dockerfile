# Container starting image
FROM python:3.9.18-alpine3.18

# Install build essentials, postgres, python, gcc, build-base, and NodeJS + NPM for building front-end
RUN apk --no-cache add build-base \
    postgresql-dev gcc python3-dev musl-dev \
    postgresql-client nodejs npm

# Load environment variables
ARG DATABASE_URL
ARG SCHEMA
ARG DATABASE_RESET=false
ARG DATABASE_MIGRATE=true
ARG DATABASE_SEED=true
ARG FLASK_APP=app
ARG FLASK_ENV=production
ARG SECRET_KEY

# Log
RUN echo "Flask App        : ${FLASK_APP}"
RUN echo "Flask Environment: ${FLASK_ENV}"
RUN echo "Secret Key       : ${SECRET_KEY}"

# Set working directory to "/var/www"
WORKDIR /var/www

# Copy application with respect to .dockerignore
COPY . .

# Log layout
RUN find .

# Set working directory to "/var/www/react-vite"
WORKDIR /var/www/react-vite

# Install required node-modules
RUN npm install

# Build front-end
RUN npm run docker

# Move dist folder
RUN mv --verbose dist ../

# Set working directory to "/var/www"
WORKDIR /var/www/

# Clear react-vite and recreate folder
RUN rm -rf react-vite
RUN mkdir react-vite

# Move dist folder back into expected location
RUN mv --verbose dist react-vite/

# Set working directory to "/var/www"
WORKDIR /var/www

# Upgrade pip
RUN pip install --upgrade pip

# Install pipenv to generate requirements file
RUN pip install pipenv
RUN pipenv requirements > requirements.txt

# Install python dependecies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Remove NodeJS + NPM
RUN apk del nodejs npm

# Log layout
RUN find .

# Run webserver (need to specify full path)
CMD /var/www/run.sh