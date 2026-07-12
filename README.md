# Travel Mate

Travel Mate es una aplicación web diseñada para conectar viajeros con intereses y presupuestos similares, permitiéndoles encontrar compañeros de viaje compatibles y chatear entre ellos.

## Arquitectura y Tecnologías

El proyecto fue refactorizado para separar completamente el Frontend del Backend, cumpliendo estrictamente con las buenas prácticas de desarrollo:

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (JS Puro). Estilizado 100% con Bootstrap 5 (sin archivos CSS adicionales que no sean estrictamente necesarios). Totalmente desacoplado del backend.
- **Backend:** Node.js + Express (API REST).
- **Base de Datos:** MongoDB.

## Requisitos Previos

Para correr este proyecto en tu computadora de forma local, necesitas tener instalado:

1. [Node.js](https://nodejs.org/es/) (Versión 20.19.0 o superior)
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community) corriendo localmente en el puerto `27017` (solo necesario si deseas correr el backend).
3. Git

## Instrucciones para levantar el proyecto

### 1. Clonar el repositorio
Abre una terminal y ejecuta:
```bash
git clone -b sin-react https://github.com/Agoozz/Travel-MateBack.git
cd Travel-MateBack
```

### 2. Levantar el Frontend

1. Navega a la carpeta `frontend`.
2. Simplemente haz doble clic en el archivo `index.html` para abrirlo directamente en tu navegador web.
3. ¡Listo! Puedes interactuar con la aplicación.

### 3. Levantar el Backend y Base de Datos

Si deseas probar la persistencia de datos real, el registro de usuarios en MongoDB y la comunicación del chat a través de la API REST, sigue estos pasos:

1. Asegúrate de tener MongoDB ejecutándose localmente en tu computadora en el puerto `27017`.
2. Abre una terminal y dirígete a la carpeta del backend:
   ```bash
   cd backend-mate
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea tu archivo de entorno (en Windows):
   ```cmd
   copy .env.example .env
   ```
4. Levanta el servidor backend:
   ```bash
   npm start
   ```
   (El servidor correrá en `http://localhost:3000` y se conectará automáticamente a MongoDB).

5. Vuelve a abrir el `index.html` de la carpeta `frontend` en tu navegador. Ahora la aplicación detectará automáticamente el servidor y realizará las peticiones HTTP (fetch) reales contra la base de datos para guardar perfiles y mensajes en vivo.
