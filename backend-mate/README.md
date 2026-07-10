# 🧉 Mate & Travel - Backend API

Esta es la API REST para la aplicación Travel Mate, encargada de gestionar usuarios, autenticación, perfiles y la lógica de "match" y chat entre viajeros compatibles. Desarrollada con Node.js, Express y MongoDB.

---

## 🏗️ Arquitectura y separación de responsabilidades

**IMPORTANTE:** El backend de este proyecto funciona estrictamente como una API REST.
- **NO** sirve archivos estáticos (HTML, CSS, imágenes).
- El **Frontend** se encuentra en una carpeta separada (`../frontend/`) y se ejecuta de manera 100% independiente abriendo el archivo `index.html` en el navegador.
- El Frontend se comunica con este Backend mediante peticiones HTTP `fetch()`.

---

## 🚀 Correr en local

### Requisitos
- Node.js instalado (v16+)
- MongoDB instalado y corriendo (en `localhost:27017`) o bien una URI de MongoDB en la nube.

### Pasos

**1. Instalar dependencias**
```bash
cd backend-mate
npm install
```

**2. Configurar variables de entorno**
Crea un archivo llamado `.env` en la raíz de `backend-mate/` con el siguiente contenido:

```env
PORT=3000
# Para usar MongoDB localmente:
MONGO_URI=mongodb://127.0.0.1:27017/mate_travel

# Si prefieres usar una base de datos en la nube (MongoDB Atlas), reemplaza la URI por la tuya:
# MONGO_URI=<tu_uri_de_mongodb>

JWT_SECRET=matetravel_secreto_2026
JWT_EXPIRES_IN=7d
```

*(Nota: Las credenciales reales y la URI de producción nunca deben subirse al repositorio)*

**3. Poblar la base de datos** (opcional, solo la primera vez para crear perfiles falsos)
```bash
node seed.js
```
Esto creará automáticamente perfiles como "tomas@mate.com", "sofia@mate.com", etc. con la contraseña `mate1234`.

**4. Iniciar el servidor API**
```bash
npm start
```
Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3000
✅ MongoDB conectado
```

**5. Abrir el Frontend**
No abras `localhost:3000` en tu navegador, ya que el backend no sirve vistas.
Dirígete a la carpeta `../frontend/` de este proyecto y haz doble clic sobre el archivo `index.html` para levantar la aplicación e interactuar con esta API.

---

## 🗂️ Estructura del Backend

```
backend-mate/
├── config/
│   └── db.js              # Conexión a MongoDB
├── middleware/
│   └── auth.js            # Verificación de JWT
├── models/
│   ├── Usuario.js         # Modelo de usuario
│   ├── Match.js           # Modelo de match mutuo
│   └── Mensaje.js         # Modelo para el chat (mensajes entre usuarios)
├── routes/
│   ├── usuarios.js        # POST /register, POST /login, GET /me
│   ├── perfiles.js        # GET /perfiles (con afinidad calculada)
│   ├── matches.js         # POST /invitar, GET /matches
│   └── mensajes.js        # POST /mensajes, GET /mensajes/:userId
├── app.js                 # Servidor Express principal (API endpoints)
├── seed.js                # Script para poblar la base de datos
├── package.json           # Dependencias de Node
└── .env                   # Variables de entorno (crear manualmente)
```

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| Node.js + Express | Servidor backend API REST |
| MongoDB + Mongoose | Base de datos NoSQL |
| bcryptjs | Hash de contraseñas |
| JSON Web Tokens (JWT)| Autenticación segura |
| CORS | Manejo de peticiones de origen cruzado |
