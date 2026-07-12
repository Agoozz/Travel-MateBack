# Travel Mate (React + Node.js)

Travel Mate es una aplicación web diseñada para conectar viajeros con intereses y presupuestos similares, permitiéndoles encontrar compañeros de viaje compatibles y chatear entre ellos.

## Arquitectura y Tecnologías

El proyecto ha sido refactorizado completamente, migrando el frontend desde Vanilla JS hacia una Single Page Application (SPA) moderna con React.

- **Frontend (`frontend-react/`):** React 18, Vite, React Router DOM, Bootstrap 5.
- **Backend (`backend-mate/`):** Node.js + Express (API REST).
- **Base de Datos:** MongoDB.
- **Legacy (`frontend/`):** Se mantiene la versión Vanilla JS original como referencia histórica y paridad funcional.

## Requisitos Previos

1. [Node.js](https://nodejs.org/es/) (Versión 18+ o superior)
2. [MongoDB Community Server](https://www.mongodb.com/try/download/community) corriendo localmente en el puerto `27017` (solo necesario para el backend).
3. Git

## Instrucciones de Desarrollo Local

### 1. Clonar el repositorio
```bash
git clone -b con-react https://github.com/Agoozz/Travel-MateBack.git
cd Travel-MateReact
```

### 2. Levantar el Backend y Base de Datos

1. Asegúrate de tener MongoDB ejecutándose localmente (`mongodb://localhost:27017`).
2. Abre una terminal y dirígete a la carpeta del backend:
   ```bash
   cd backend-mate
   npm install
   ```
3. Crea un archivo `.env` basado en el `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. (Opcional) Si necesitas datos de prueba, puedes poblar la base de datos:
   ```bash
   npm run seed
   ```
5. Levanta el servidor:
   ```bash
   npm start
   ```
   *El servidor correrá en `http://localhost:3000`*.

### 3. Levantar el Frontend (React)

1. En una nueva terminal, dirígete a la carpeta de React:
   ```bash
   cd frontend-react
   npm install
   ```
2. Crea un archivo `.env` basado en el `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Asegúrate de que `VITE_API_BASE_URL` apunte a tu backend local (`http://localhost:3000/api`).
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible en `http://localhost:5173`*.

## Despliegue (Producción)

Para desplegar el frontend en Vercel o Netlify:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** Configurar `VITE_API_BASE_URL` con la URL del backend en producción, o dejarlo apuntando localmente si es solo una maqueta frontend.
