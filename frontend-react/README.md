# Travel Mate - Frontend (React)

Este directorio contiene el código fuente del frontend refactorizado en React, reemplazando la versión Vanilla JS original.

## Tecnologías Principales

- **React 18**
- **Vite** (Bundler y entorno de desarrollo)
- **React Router DOM v7** (Enrutamiento de SPA)
- **Bootstrap 5** & **Bootstrap Icons** (Estilos base y sistema de grid)
- **CSS Modular** (Estilos locales para componentes específicos, evitando el uso de estilos inline)

## Estructura del Proyecto

```text
src/
├── assets/        # Imágenes y recursos estáticos (importados en componentes)
├── components/    # Componentes reutilizables divididos por dominio funcional
│   ├── auth/          # Formularios y Layouts de Login/Registro
│   ├── chat/          # Componentes genéricos de chat (burbujas, input, panel flotante)
│   ├── dashboard/     # Tarjetas de perfiles, modales de detalle y compatibilidad (matches)
│   ├── landing/       # Secciones de la página de inicio (Hero, FAQ, etc.)
│   ├── layout/        # Estructuras maestras (Navbar, Footer, Sidebar, PrivateLayout)
│   ├── messages/      # Componentes específicos de la bandeja de mensajes completa
│   ├── profile/       # Visualización y edición del perfil del usuario
│   └── traveler-test/ # Test interactivo paso a paso para definir compatibilidad
├── context/       # Estados globales (AuthContext)
├── data/          # Datos estáticos y mocks para el modo offline
├── hooks/         # Custom Hooks (useProfile, useMessages, etc.)
├── pages/         # Vistas principales orquestadoras (Landing, Dashboard, Profile, Messages)
├── services/      # Lógica de comunicación con el Backend (API) y gestores offline
└── main.jsx       # Punto de entrada principal
```

## Variables de Entorno

El proyecto requiere un archivo `.env` en la raíz de `frontend-react` para comunicarse con la API. Si no existe, créalo copiando el `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Modo Demostración (Offline)

Toda la comunicación de red en `src/services/` está protegida por bloques `try/catch`. Si el servidor backend no se encuentra disponible (por ejemplo, durante el desarrollo local sin levantar Express o en un despliegue donde solo se sube el Frontend), la aplicación:

1. Alertará en la consola (`console.warn`) sobre la caída.
2. Pasará a **Modo Demostración**, persistiendo perfiles, chats y estado de sesión dentro del `localStorage` del navegador web.
3. Activará un Bot local en `offlineChatManager.js` que simulará conversaciones con otros viajeros para demostrar el funcionamiento en vivo sin necesidad de base de datos.

## Comandos Disponibles

- `npm run dev`: Inicia el servidor local de desarrollo.
- `npm run build`: Compila la aplicación optimizada para producción en `/dist`.
- `npm run lint`: Ejecuta `oxlint` para garantizar que no existan errores ni código muerto (¡Mantenlo en 0 warnings!).
- `npm run preview`: Previsualiza localmente el build de producción generado.
