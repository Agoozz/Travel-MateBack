# Travel Mate

Travel Mate es una aplicación web full-stack (MERN) diseñada para conectar viajeros con intereses y presupuestos similares.

## Tecnologías Utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de Datos:** MongoDB

## Requisitos Previos

Para correr este proyecto en tu computadora de forma local, necesitas tener instalado:

1. [Node.js](https://nodejs.org/es/) (Versión 16 o superior)
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community) corriendo localmente en el puerto `27017`.
3. Git

## Instrucciones para levantar el entorno local

### 1. Clonar el repositorio
Abre una terminal y ejecuta:
```bash
git clone https://github.com/Agoozz/Travel-MateBack.git
cd Travel-MateBack
```

### 2. Configurar y levantar el Backend

1. Abre una terminal y dirígete a la carpeta del backend:
   ```bash
   cd backend-mate
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` dentro de la carpeta `backend-mate` con el siguiente contenido:
   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/mate_travel
   JWT_SECRET=matetravel_secreto_2026
   JWT_EXPIRES_IN=7d
   ```
4. Levanta el servidor backend:
   ```bash
   npm run dev
   ```
   Verás un mensaje indicando que el servidor está corriendo en `http://localhost:3000` y que MongoDB se conectó exitosamente.

### 3. Configurar y levantar el Frontend

1. Abre **otra** terminal nueva y dirígete a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Abre el enlace que te indica la terminal (por lo general es `http://localhost:5173/`) en tu navegador favorito.

¡Listo! Ya tienes Travel Mate corriendo 100% de manera local.
