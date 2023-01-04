# react-fastapi-express-keycloak-microservice-architecture


## Overview of the Architecture
![Architecture](./docs/imgs/architecture.png?raw=true "Architecture")

The repo showcases a microservice-based architcture with 3 layers & 5 main services, the idea being that the propsed architecture is pluggable & extendible, with all the benefits that microsoervices bring to production systems


## Tech


- [React] 
- [Express] 
- [FastAPI] 
- [Keycloak]
- [SQLite] 



## Installation

Install the devDependencies for each service.

The following instructions are for windows-os :-



react-front-end service

```sh
cd react-fastapi-express-keycloak-microservice-architecture
npm i 
npm start 
```

fastAPI-keycloak-gateway service

```sh
cd api/ 
pip install -r requirements.txt
uvicorn auth_gateway:app
```


keycloak-server service
```sh
cd keycloak-20.0.2\bin\kc.bat start-dev
```

node-express service

```sh
cd api/api_gateway
npm i 
node index.js 
```

db service

SQLite instructions 
```sh
cd api/api_gateway/data
sqlite3 
CREATE TABLE users(id varchar(50) PRIMARY KEY , username varchar(30) , email varchar(30) , password varchar(100) , access_token varchar(4000));
.save db.db
exit

```


## Docker

TODO



   [React]: <https://reactjs.org/>
   [Express]: <https://expressjs.com>
   [FastAPI]: <https://fastapi.tiangolo.com>
   [Keycloak]: <https://www.keycloak.org>
   [SQLite]: <https://www.sqlite.org/index.html>
   