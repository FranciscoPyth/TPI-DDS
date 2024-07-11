# Proyecto Node.js con React - TPI_3K1_97660-94162-94196-98900

Este es un proyecto que combina un backend desarrollado en Node.js utilizando Express y Sequelize para la base de datos SQLite, junto con un frontend en React.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js y npm (o yarn)
- Git
- Editor de código (VSCode, Atom, Sublime Text, etc.)

## Configuración del Backend

### Instalación de dependencias

1. Abre una terminal.
2. Navega hasta la carpeta del backend:

   ```bash
   cd backend
3. npm install

### Configuración de la base de datos

1. Asegúrate de tener SQLite instalado en tu sistema.
2. Ejecuta las migraciones para crear las tablas de la base de datos:

   ```bash
   npm run migrate

### Levantar el servidor
1. Para iniciar el servidor, ejecuta:

   ```bash
   npm start
2. El servidor estará corriendo en [http://localhost:3000](http://localhost:3000).


## Uso

Una vez que ambos servidores estén corriendo, puedes interactuar con la aplicación navegando a [http://localhost:3000](http://localhost:3000) en tu navegador web.

## Estructura del Proyecto

- **backend/**: Contiene el código del servidor Node.js.
- **frontend/**: Contiene el código del cliente React.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/NombreNuevaFeature`).
3. Realiza tus cambios.
4. Haz commit de tus cambios (`git commit -am 'Agrega alguna nueva feature'`).
5. Haz push a la rama (`git push origin feature/NombreNuevaFeature`).
6. Crea un nuevo Pull Request.

## Licencia

Este proyecto está licenciado bajo la MIT License. Consulta el archivo LICENSE para más detalles.