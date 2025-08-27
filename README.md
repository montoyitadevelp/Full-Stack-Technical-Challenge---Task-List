# 📝 Task Manager Full-Stack Application

[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-blue?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue?logo=postgresql)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Refine](https://img.shields.io/badge/Refine-2.x-orange?logo=refine)](https://refine.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)](https://vitejs.dev/)
[![SwaggerUI](https://img.shields.io/badge/Swagger-UI-orange?logo=swagger)](https://swagger.io/tools/swagger-ui/)

---

## 📌 Finalidad del proyecto
Este proyecto corresponde a un **sistema de gestión de tareas**, donde los usuarios pueden crear **tareas, categorías y etiquetas**, asignarlas y filtrarlas según estado, prioridad o fecha de vencimiento.  


# 🛠 Configuración del Backend (Local)

### Patrón Repository
El **patrón Repository** separa la lógica de acceso a datos de la lógica de negocio.  
- Cada entidad (Usuario, Tarea, Categoría, Etiqueta) tiene su **repository** que maneja operaciones CRUD y consultas específicas.  
- Esto permite cambiar la fuente de datos (PostgreSQL, otra base o mockup) sin afectar la lógica de negocio.

---

## 🗂️ Estructura del backend
El proyecto sigue un enfoque modular con separación de responsabilidades (SoC):

```plaintext
├─ backend/
│   ├─ src/
│   │   ├─ v1/
│   │   │   ├─ core/
│   │   │   │   ├─ errors.ts          # Excepciones y manejo de errores globales
│   │   │   │   └─ repository.ts      # Repositorio base genérico (patrón Repository)
│   │   │   ├─ task/
│   │   │   │   ├─ task.repository.ts # Operaciones CRUD y consultas específicas de tareas
│   │   │   │   ├─ task.service.ts    # Lógica de negocio y validaciones de tareas
│   │   │   │   ├─ task.controller.ts # Exposición de endpoints HTTP para tareas
│   │   │   │   ├─ task.dto.ts        # Definición de objetos para entrada y salida (Data Transfer Objects)
│   │   │   │   ├─ task.schemas.ts    # Esquemas de validación de datos (por ejemplo con Zod o Joi)
│   │   │   │   └─ task.router.ts     # Define las rutas y conecta los endpoints con el controller
│   │   │   ├─ index.ts
│   │   │   └─ swagger.ts
│   │   ├─ server.ts 
│   │   ├─ config.ts
│   │   └─ index.ts
│   ├─ .env
│   └─ .env.example
```
---

## 📌 Principales responsabilidades

- **Controller:** Expone los endpoints HTTP y recibe las solicitudes del cliente.
- **Service:** Contiene la lógica de negocio, validaciones y reglas de la aplicación.
- **Repository:** Interactúa con la base de datos usando Prisma, implementando el patrón Repository.
- **DTO:** Define los objetos que se reciben o envían entre capas (entrada/salida).
- **Schemas:** Validan la estructura de los datos, asegurando que las entradas cumplan con los requisitos antes de pasar al service.
- **Router:** Define las rutas de la API y conecta cada endpoint con su respectivo controller.
- **Exceptions:** Maneja errores personalizados y respuestas consistentes de la API.

## 1️⃣ Requisitos Previos
Antes de comenzar, asegúrate de tener:

- **Node.js** (>=20)
- **npm** o **pnpm**
- **PostgreSQL** (>=16)
- Un editor de código (VSCode recomendado)
- Acceso a la base de datos PostgreSQL

---

## 2️⃣ Clonar el proyecto
```bash
git clone https://github.com/montoyitadevelp/Full-Stack-Technical-Challenge---Task-List.git
cd Full-Stack-Technical-Challenge---Task-List/backend
```

---

## 3️⃣ Instalar dependencias
```bash
npm install
```
Esto instalará todas las dependencias de producción y desarrollo.

---

## 4️⃣ Configuración de variables de entorno

Crear un archivo .env en `/backend`

Edita `.env` con tus valores locales:

```env
# API
BASE_URL=http://localhost:3000/api/v1

# Prisma / DB
DATABASE_URL="postgresql://user:password@localhost:5432/postgres?schema=public"
PORT=3000
DEBUG=false

# App
APP_NAME=Task List

# Auth
JWT_SECRET="23uh54g545565h6g4mfmfkdkk54kpj67op7j6oph67"
JWT_EXPIRES_IN="1d"

# Frontend
FRONTEND_URL="http://localhost:5173"  
```

> Asegúrate de usar tu usuario, contraseña y nombre de base de datos reales.

---

## 5️⃣ Crear y migrar la base de datos

Para aplicar las migraciones:

```bash
npx prisma migrate deploy
```

Esto aplica todas las migraciones pendientes.

---

## 6️⃣ Cargar datos de ejemplo (mockup)

Datos mockup de prueba:

```bash
npx prisma db seed
```

Esto insertará usuarios, categorías, etiquetas y tareas de prueba.

> Nota: asegúrate de que el script `seed` en `prisma/seed.ts`.

---

## 7️⃣ Ejecutar el servidor

**Modo desarrollo (hot reload):**
```bash
npm dev
```

## 8️⃣ Acceder a documentación de la API

Accede a la documentacion de Swagger en: [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs)


Aquí podrás ver todos los endpoints y probarlos directamente desde el navegador.

---

## 9️⃣ Prisma Studio (opcional)

Para inspeccionar la base de datos de forma visual:

```bash
npx prisma studio
```




# 🛠 Configuración del Frontend (Local)

## 🗂️ Estructura del frontend
El proyecto sigue un enfoque modular y basado en dominios, siguiendo el patrón **Refine** para mantener separación de responsabilidades y escalabilidad. Cada dominio contiene sus propios componentes y hooks para manejar la lógica específica de la entidad.

```plaintext
├─ frontend/
│   ├─ src/
│   │   ├─ domains/  # Carpeta principal por dominio de la aplicación
│   │   │   ├─ task/
│   │   │   │   |─ hooks/  # Custom hooks relacionados con tareas
│   │   │   |   ├─ components/
│   │   │   │       ├─ list/  # Componentes para la vista de listado
│   │   │   │       ├─ create/ # Componentes para la creación de tareas
│   │   │   │       ├─ edit/  # Componentes para edición de tareas
│   │   │   ├─ user/
│   │   │   │   |─ hooks/  
│   │   │   |   ├─ components/
│   │   │   │       ├─ list/            
│   │   │   │       ├─ create/          
│   │   │   │       ├─ edit/            
│   │   │   └─ category/
│   │   │   │   |─ hooks/  
│   │   │   |   ├─ components/
│   │   │   │       ├─ list/            
│   │   │   │       ├─ create/          
│   │   │   │       ├─ edit/   
│   │   │
│   │   ├─ components/ # Componentes globales reutilizables
│   │   ├─ context/ # Contextos de React para manejo de estado global
│   │   ├─ pages/   # Páginas principales de la aplicación
│   │   ├─ hooks/    # Hooks globales reutilizables
│   │   ├─ providers/ # Providers para datos, autenticación y estado
│   │   ├─ types/   # Tipos de TypeScript
│   │   ├─ utils/   # Funciones utilitarias
│   │   └─ styles/  # Archivos de estilos (CSS, SCSS o Tailwind)
│   │
│   ├─ vite.config.ts # Configuración de Vite
│   ├─ .env         # Variables de entorno locales
│   └─ .env.example # Ejemplo de variables de entorno
```

## 1️⃣ Requisitos Previos
Antes de comenzar, asegúrate de tener:

- **Node.js** (>=20)
- **npm** o **pnpm**
- Un editor de código (VSCode recomendado)
- Acceso al backend (para conectar APIs)

---

## 2️⃣ Acceder a la carpeta del frontend
```bash
cd Full-Stack-Technical-Challenge---Task-List/frontend
```
---

## 3️⃣ Instalar dependencias
```bash
npm install
```
Esto instalará todas las dependencias de producción y desarrollo.

---

## 4️⃣ Configuración de variables de entorno

Crear un archivo .env en `/frontend`

Edita `.env` con tus valores locales. Ejemplo:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_TOKEN_KEY=t4556566y34fmgmkjio5665jiml455fgg54mkmikgg54kgm56
```
---

## 5️⃣ Ejecutar el proyecto

### Modo desarrollo (hot reload):
```bash
npm run dev
```

El frontend estará corriendo en: [http://localhost:5173](http://localhost:5173)









