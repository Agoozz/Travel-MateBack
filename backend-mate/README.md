# 🧉 Mate & Travel — Backend

Aplicación web para conectar viajeros compatibles. Desarrollada con Node.js, Express y MongoDB.

---

## 🚀 Deploy en producción

**URL pública:** https://mate-travel-backend.onrender.com

> ⚠️ El servidor puede tardar hasta 50 segundos en responder la primera vez si estuvo inactivo (plan gratuito de Render). Después funciona con normalidad.

---

## 💻 Correr en local

### Requisitos
- Node.js instalado
- MongoDB instalado y corriendo (o usar la URL de Atlas del `.env`)

### Pasos

**1. Clonar el repositorio**
```bash
git clone https://github.com/Milia13/mate-travel-backend.git
cd mate-travel-backend/backend-mate
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Crear el archivo `.env`** en la raíz de `backend-mate/` con este contenido:
```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mate_travel
JWT_SECRET=matetravel_secreto_2026
JWT_EXPIRES_IN=7d
```

> Si preferís usar la base de datos en la nube (MongoDB Atlas) en vez de MongoDB local, usá esta URI:
> ```
> MONGO_URI=mongodb+srv://milagrosacev40_db_user:travel26@cluster0.waoqib9.mongodb.net/mate_travel?appName=Cluster0
> ```

**4. Poblar la base de datos** (solo la primera vez)
```bash
node seed.js
```
Deberías ver:
```
✅ MongoDB conectado
✅ Tomás (tomas@mate.com)
✅ Sofía (sofia@mate.com)
...
🧉 Seed completado: 10 creados, 0 omitidos
```

**5. Iniciar el servidor**
```bash
npm start
```
Deberías ver:
```
🧉 Servidor corriendo en http://localhost:3000
✅ MongoDB conectado
```

**6. Abrir en el navegador**
```
http://localhost:3000
```

---

## 👥 Usuarios de prueba

Todos los usuarios tienen la misma contraseña: **`mate1234`**

| Nombre | Email | Estilo | Presupuesto | Destino |
|--------|-------|--------|-------------|---------|
| Tomás | tomas@mate.com | Mochilero | Económico | Tailandia |
| Sofía | sofia@mate.com | Confort | Medio | Bariloche |
| Martín | martin@mate.com | Mochilero | Económico | Salta / NOA |
| Caro | caro@mate.com | Cultural | Económico | Misiones |
| Juan | juan@mate.com | Confort | Premium | Ushuaia |
| Lucía | lucia@mate.com | Social | Económico | Costa Atlántica |
| Nico | nico@mate.com | Mochilero | Económico | Jujuy |
| Valentina | valentina@mate.com | Confort | Premium | Mendoza |
| Ana | ana@mate.com | Cultural | Medio | Iberá |
| Felipe | felipe@mate.com | Social | Medio | Ruta del Vino |

### Para probar el match mutuo
1. Abrí el navegador normal → logueate con `tomas@mate.com`
2. Abrí una ventana en **modo incógnito** → logueate con `nico@mate.com`
3. Desde Tomás → invitá a Nico
4. Desde Nico → invitá a Tomás
5. ¡Hay Mate! 🧉

---

## 🗂️ Estructura del proyecto

```
backend-mate/
├── config/
│   └── db.js              # Conexión a MongoDB
├── middleware/
│   └── auth.js            # Verificación de JWT
├── models/
│   ├── Usuario.js         # Modelo de usuario
│   └── Match.js           # Modelo de match mutuo
├── routes/
│   ├── usuarios.js        # POST /register, POST /login, GET /me
│   ├── perfiles.js        # GET /perfiles (con afinidad calculada)
│   └── matches.js         # POST /invitar, GET /matches
├── pantallas/             # HTML de cada pantalla
├── js/                    # JavaScript del frontend
├── images/                # Imágenes
├── app.js                 # Servidor Express principal
├── seed.js                # Script para poblar la base de datos
├── styles.css             # Estilos globales
└── .env                   # Variables de entorno (crear manualmente)
```

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML / CSS / JavaScript | Frontend |
| Bootstrap 5 | Diseño responsive |
| Node.js + Express | Servidor backend |
| MongoDB + Mongoose | Base de datos |
| bcryptjs | Hash de contraseñas |
| JSON Web Tokens (JWT) | Autenticación |
| Render | Deploy del servidor |
| MongoDB Atlas | Base de datos en la nube |
| GitHub | Control de versiones |
