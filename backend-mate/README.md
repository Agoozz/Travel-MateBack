# 🧉 Mate & Travel - Backend API

Esta es la API REST para la aplicación Travel Mate, encargada de gestionar usuarios, autenticación, perfiles y la lógica de "match" y chat entre viajeros compatibles. Desarrollada con Node.js, Express y MongoDB.

---

## 🏗️ Arquitectura y separación de responsabilidades

**IMPORTANTE:** El backend de este proyecto funciona estrictamente como una API REST.
- **NO** sirve archivos estáticos (HTML, CSS, imágenes).
- La aplicación cliente se encuentra totalmente desacoplada y consume esta API mediante peticiones HTTP estándar.

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
🧉 Servidor corriendo en http://localhost:3000
✅ MongoDB conectado
```

**5. Validar la API (Opcional)**
Si abres `http://localhost:3000/` en tu navegador, la API responderá con un JSON de confirmación indicando que el servidor está funcionando correctamente.

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
