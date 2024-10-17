# <h1>niche <img src="react-vite/public/favicon.ico" width="30" height="30"></h1>

![Javascript](https://img.shields.io/badge/JavaScript-orange?logo=javascript&logoColor=white)
![Python](https://img.shields.io/badge/Python-blue?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-white?logo=react&logoColor=blue)
![Redux](https://img.shields.io/badge/Redux-white?logo=redux&logoColor=purple)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-white?logo=postgresql&logoColor=blue)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-white?logo=sqlalchemy&logoColor=grey)
![Flask](https://img.shields.io/badge/Flask-white?logo=flask&logoColor=grey)
![Docker](https://img.shields.io/badge/Docker-white?logo=docker&logoColor=blue)
![HTML5](https://img.shields.io/badge/HTML5-white?logo=html5&logoColor=orange)
![CSS3](https://img.shields.io/badge/CSS3-white?logo=css3&logoColor=blue)

## Table of Contents
* [Introduction](#introduction)
* [Getting Started](#getting-started)

## Introduction
Welcome to [niche](https://niche-mfjc.onrender.com/), a group project built on Flask and React-Vite. This fictional web store is meant to provide users the ability to browse and favorite custom wares made by independent artists, designers and hobbyists!

![niche](react-vite/public/screen.png)

### Favorite Demo
![fav-demo](react-vite/public/niche.gif)

### Cart Demo
![cart](react-vite/public/niche-cart.gif)

### Search Demo
![search](react-vite/public/niche-search.gif)

## Getting started

1. Clone this repository.

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React frontend in development, `cd` into the __react-vite__ directory and run `npm i` to install dependencies. The Dockerfile has a `--watch` flag attached to the `dist` build, and will containerize the entire application, making it easier to set up and deploy. Then, run `npm run dev` to view a local version of the project on your browser.
