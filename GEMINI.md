# Contexto del Proyecto: Store Dashboard

## 1. Visión General

Dashboard profesional para gestión de inventario utilizando FakeStoreAPI.
El proyecto enfatiza la escalabilidad, el tipado estricto y patrones modernos de React.

**IDIOMA DE RESPUESTA OBLIGATORIO:** ESPAÑOL (Spanish).

## 2. Stack Tecnológico (Adherencia Estricta)

- **Core:** React 18+ (Vite), TypeScript (Strict Mode).
- **Estilos:** Tailwind CSS (v3), Shadcn/ui (Estilo New York, colores Zinc).
- **Gestión de Estado:**
  - Estado Servidor: TanStack Query v5 (React Query).
  - Estado Formulario: React Hook Form + Zod (Validación).
  - Estado URL: React Router DOM.
- **Peticiones HTTP:** Fetch API nativo (Prohibido Axios).
- **Testing:** Vitest, React Testing Library, JSDOM.
- **CI/CD:** GitHub Actions.
- **Linting:** ESLint (Flat Config).

## 3. Guías de Arquitectura

Seguimos una **Arquitectura Basada en Features**. El código debe estar colocado por dominio, no por tipo de archivo.

### Estructura de Directorios

```text
src/
├── features/               # Lógica específica del dominio
│   └── inventory/          # Feature de ejemplo (Inventario)
│       ├── api/            # Funciones con fetch y endpoints
│       ├── components/     # UI específica de la feature
│       ├── hooks/          # Custom hooks (useProducts, etc.)
│       └── types/          # Interfaces TS específicas
├── components/
│   ├── ui/                 # Componentes genéricos Shadcn/ui (Button, Input)
│   └── layout/             # Componentes de estructura global
├── lib/                    # Utilidades compartidas (utils.ts)
└── test/                   # Configuración de tests (setup.ts)
```
