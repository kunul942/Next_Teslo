# Next.js Teslo Shop App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

El -d, significa **detached**

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

-   MongoDB URl Local:

```
MONGO_URL=mongodb://localhost:28018/teslodb
```

-   Reconstruir los modulos de node y levantar Next

```
yarn install
yarn dev
```

## Llenar la base de datos con informacion de pruebas

Llamara:

```
    http://localhost:3000/api/seed
```
