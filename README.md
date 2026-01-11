# Store Dashboard 📦

Dashboard profesional para la gestión de inventario, desarrollado con un stack moderno de React y enfocado en escalabilidad, tipado estricto (TypeScript) y una experiencia de usuario pulida. Utiliza [FakeStoreAPI](https://fakestoreapi.com/) como backend de demostración.

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-State-FF4154?logo=react-query&logoColor=white)

## 🚀 Características Principales

- **Gestión de Inventario (CRUD):** Crear, leer, actualizar y eliminar productos.
- **Tabla de Datos Avanzada:** Implementada con `@tanstack/react-table`. Incluye paginación y filtrado por nombre en tiempo real.
- **Formularios Robustos:** Gestión de estado con `react-hook-form` y validación de esquemas con `zod`.
- **Diseño Responsivo:** Interfaz adaptativa (Móvil/Tablet/Escritorio) construida con **Tailwind CSS** y componentes de **Shadcn/ui**.
- **Gestión de Estado Servidor:** Sincronización eficiente de datos, caché y revalidación con **TanStack Query v5**.
- **Feedback Visual:** Notificaciones toast (alerts) y estados de carga (skeletons/spinners) para mejorar la UX.

## 🛠️ Stack Tecnológico

- **Core:** React 19, TypeScript (Strict Mode), Vite.
- **Estilos:** Tailwind CSS v3, Shadcn/ui (Radix UI primitives).
- **Estado & Datos:** TanStack Query v5.
- **Formularios:** React Hook Form + Zod.
- **Testing:** Vitest, React Testing Library, JSDOM.
- **Calidad de Código:** ESLint, Prettier.

## 📂 Estructura del Proyecto

El proyecto sigue una **Arquitectura Basada en Features**, organizando el código por dominio de negocio en lugar de por tipo de archivo técnico.

```text
src/
├── features/               # Lógica específica del dominio
│   └── inventory/          # Módulo de Inventario
│       ├── api/            # Peticiones HTTP (fetch nativo)
│       ├── components/     # UI específica (DataTable, Forms)
│       ├── hooks/          # Custom hooks (useProducts, etc.)
│       └── types/          # Definiciones TypeScript
├── components/
│   ├── ui/                 # Componentes reutilizables (Shadcn/ui)
│   └── layout/             # Layouts globales
├── lib/                    # Utilidades (cn, formatters)
└── test/                   # Configuración de tests
```

## ⚡ Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone (https://github.com/joseagarsol/store-dashboard.git)
    cd store-dashboard
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## 🧪 Testing

El proyecto utiliza **Vitest** para pruebas unitarias y de integración.

- **Ejecutar tests:**
  ```bash
  npm run test
  ```
- **Ejecutar tests una sola vez (CI):**
  ```bash
  npm run test:run
  ```

## 📦 Build para Producción

Para generar los archivos estáticos optimizados para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 📄 Licencia

Este proyecto es para fines educativos y de demostración.
