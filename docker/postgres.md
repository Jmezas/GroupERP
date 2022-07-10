## PostGres
### crear un contenedor

```
docker run --name postgresServer -d -p 5200:5432 -e POSTGRES_PASSWORD=pssql postgres:14
```

### crear un volumen nombrado
```
docker volume create vol-Group
```
### listar volumen

```
docker volume ls
```

### elimiar volumen

```
docker volume rm vol-Group
```

### Crear un contenedor con un volumen nombrado

```
docker run -d --name postgresServer -p 5200:5432 -e POSTGRES_PASSWORD=pssql -v vol-Group:/var/lib/postgressql postgres:14
```

### Para inspeccionar un volumen

```
docker volume inspect vol-Group
```

### Crear un contenedor con un volumen nombrado y con una política de reinicio en caso de falla

```
docker run -d --name postgresServer -p 5200:5432 -e POSTGRES_PASSWORD=pssql -v vol-Group:/var/lib/postgressql --restart on-failure postgres:14
```

_restart: on-failure, unless-stopped, always_

### Crear un contenedor con un volumen nombrado, con una política de reinicio en caso de falla y con límites de memoria y cpu

```
docker run -d --name postgresServer -p 5200:5432 -e POSTGRES_PASSWORD=pssql -v vol-Group:/var/lib/postgressql --restart on-failure -m 500m --cpus=2 postgres:14
```

### Para revisar las estadísticas de uso de un contenedor

```
docker stats <nombre contenedor>
```

### Crear un contenedor con un volumen nombrado, con una política de reinicio en caso de falla y con límites de memoria y cpu, y un usuario y una contraseña

```
docker run -d --name postgresServer -p 5200:5432 -e POSTGRES_PASSWORD=pssql -e POSTGRES_USER=user  -v vol-Group:/var/lib/postgressql --restart on-failure -m 500m --cpus=2 postgres:14
```