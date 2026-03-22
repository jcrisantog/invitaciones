# ✨ Magic Invitations

Plataforma de **invitaciones digitales personalizadas** para eventos — especialmente cumpleaños. Cada invitado recibe un link único con su nombre, un diseño temático animado, y puede confirmar asistencia directamente por WhatsApp.

---

## 🎯 Descripción

Magic Invitations permite a los organizadores de eventos crear invitaciones digitales interactivas y visualmente atractivas. El sistema genera URLs únicas por invitado, ofreciendo una experiencia personalizada con múltiples temas visuales, animaciones con Framer Motion y confirmación de asistencia vía WhatsApp.

### Características Principales

- 🎨 **10 temas visuales** — Gold Premium, Superhéroe, Princesa, Unicornio, K-Pop, Cyberpunk Neon, Aurora Minimal, Stellar Dark, Gamer Neon, Mariposa Mágica
- 📱 **Diseño mobile-first** — Optimizado para verse perfecto en smartphones
- 👤 **Links únicos por invitado** — Cada persona recibe su propia URL personalizada
- ⏱️ **Countdown en tiempo real** — Cuenta regresiva animada al evento (zona horaria México)
- ✅ **RSVP con WhatsApp** — Confirmación que se guarda en BD y abre WhatsApp pre-llenado
- 📅 **Agregar a Google Calendar** — Un clic para añadir el evento al calendario con fecha/hora correcta
- 📍 **Integración con Google Maps** — Botón directo al lugar del evento
- 🎛️ **Panel de administración** — CRUD completo de eventos e invitados
- 📊 **Importación/exportación Excel** — Carga masiva y descarga de ligas de invitados
- 🔧 **Secciones configurables** — Programa, galería, código de vestimenta, mesa de regalos, música, mensaje especial, contador de confirmados

---

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| **Next.js 16** | Framework full-stack (App Router, SSR) |
| **React 19** | UI Components |
| **TypeScript** | Tipado estático |
| **Tailwind CSS v4** | Estilos utility-first |
| **Framer Motion** | Animaciones y transiciones |
| **Lucide React** | Iconografía |
| **Insforge SDK** | Backend-as-a-Service (DB, Auth) |
| **SheetJS (xlsx)** | Importar/exportar listas en Excel |

---

## 📁 Estructura del Proyecto

```
magic-invitations/
├── src/
│   ├── app/
│   │   ├── page.tsx                          # Landing page
│   │   ├── layout.tsx                        # Layout global
│   │   ├── globals.css                       # Estilos globales y sistema de temas
│   │   ├── admin/
│   │   │   └── page.tsx                      # Panel de administración (CRUD)
│   │   ├── api/
│   │   │   └── rsvp/
│   │   │       └── route.ts                  # API para guardar confirmaciones
│   │   └── i/
│   │       └── [eventSlug]/
│   │           └── [guestSlug]/
│   │               └── page.tsx              # Ruta dinámica de invitación
│   ├── components/
│   │   ├── InvitationPage.tsx                # Página principal de invitación
│   │   ├── ThemeEngine.tsx                   # Motor de CSS custom properties
│   │   ├── FuturisticBackgrounds.tsx         # Fondos animados por tema
│   │   ├── Ballpit.jsx                       # Fondo 3D interactivo (Three.js)
│   │   └── invitation/
│   │       ├── CountdownSection.tsx          # Cuenta regresiva
│   │       ├── EventInfoSection.tsx          # Info + Calendar + Maps
│   │       ├── ProgramSection.tsx            # Programa de actividades
│   │       ├── GallerySection.tsx            # Galería de fotos
│   │       ├── SpecialMessageSection.tsx     # Mensaje personalizado
│   │       ├── DressCodeSection.tsx          # Código de vestimenta
│   │       ├── GiftsSection.tsx              # Mesa de regalos / datos bancarios
│   │       ├── MusicSection.tsx              # Links a Spotify / YouTube
│   │       ├── ConfirmedCountSection.tsx     # Contador de confirmados
│   │       └── RsvpSection.tsx               # Formulario RSVP + WhatsApp
│   ├── lib/
│   │   ├── insforge.ts                       # Cliente de Insforge (DB)
│   │   ├── themes.ts                         # Definición de los 10 temas
│   │   └── utils.ts                          # Utilidades (cn helper)
│   └── types/
│       └── index.ts                          # Tipos TypeScript (Event, Guest, Theme)
├── public/
│   ├── butterfly/                            # Assets tema Mariposa
│   ├── gamer-neon/                           # Assets tema Gamer
│   └── unicorn-rainbow/                      # Assets tema Unicornio
├── package.json
├── tsconfig.json
├── next.config.ts
└── .gitignore
```

---

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+
- npm o pnpm
- Cuenta en [Insforge](https://insforge.com) (backend)

### 1. Clonar el repositorio

```bash
git clone https://github.com/jcrisantog/invitaciones.git
cd invitaciones
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_INSFORGE_URL=https://tu-proyecto.insforge.co
NEXT_PUBLIC_INSFORGE_ANON_KEY=tu-anon-key-aqui
```

### 4. Base de datos

Crea las siguientes tablas en tu proyecto de Insforge:

**Tabla `events`:**

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid (PK) | Identificador único |
| `created_at` | timestamptz | Fecha de creación |
| `host_name` | text | Nombre del anfitrión |
| `host_whatsapp` | text | WhatsApp del anfitrión |
| `celebrant_name` | text | Nombre del festejado |
| `event_date` | timestamptz | Fecha y hora del evento |
| `location_name` | text | Nombre del lugar |
| `location_url` | text | URL de Google Maps |
| `time_display` | text | Hora para mostrar |
| `special_message` | text | Mensaje especial |
| `program` | jsonb | Programa de actividades |
| `style_id` | text | ID del tema visual |
| `music_urls` | jsonb | URLs de Spotify/YouTube |
| `gift_registry` | jsonb | Mesa de regalos |
| `section_visibility` | jsonb | Visibilidad de secciones |
| `dress_code` | jsonb | Código de vestimenta |
| `gallery_urls` | jsonb | URLs de fotos |
| `event_slug` | text (unique) | Slug para la URL |

**Tabla `guests`:**

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid (PK) | Identificador único |
| `created_at` | timestamptz | Fecha de creación |
| `event_id` | uuid (FK → events) | Evento al que pertenece |
| `name` | text | Nombre del invitado |
| `unique_slug` | text | Slug único del invitado |
| `confirmed` | boolean | ¿Ha confirmado? |
| `adults_count` | integer | Adultos confirmados |
| `kids_count` | integer | Niños confirmados |
| `confirmed_at` | timestamptz | Fecha de confirmación |

### 5. Levantar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## 📖 Uso

### Para el organizador (Admin)

1. Ir a `/admin`
2. Crear un evento con datos básicos (festejado, fecha, lugar, WhatsApp)
3. Configurar secciones opcionales (programa, mesa de regalos, dress code, etc.)
4. Agregar invitados manualmente o cargar un Excel con columna `nombre`
5. Seleccionar un tema visual
6. Guardar — automáticamente se exporta un Excel con los links únicos

### Para el invitado

1. Recibe un link como: `tudominio.com/i/cumple-carlitos/familia-perez`
2. Ve una pantalla de bienvenida con su nombre
3. Toca "Entrar" para ver la invitación completa
4. Navega las secciones (countdown, lugar, programa, galería, etc.)
5. Confirma asistencia seleccionando adultos/niños
6. La confirmación se guarda en la base de datos y se abre WhatsApp

---

## 🎨 Temas Disponibles

| Tema | Emoji | Descripción |
|---|---|---|
| Gold Premium | ✨ | Elegante, oscuro y dorado |
| Superhéroe | 🦸 | Colores fuertes, estilo comic |
| Princesa | 👑 | Pasteles, flores y tiara |
| Unicornio | 🦄 | Tierno, suave y lleno de magia |
| K-Pop | 🎤 | Neones, moderno y audaz |
| Cyberpunk Neon | 👁️‍🗨️ | Sci-fi, neones y rejillas animadas |
| Aurora Minimal | 🌌 | Degradados dinámicos y glassmorfismo |
| Stellar Dark | ☄️ | Estrellas, espacio oscuro y brillos |
| Gamer Neon | 🎮 | Vibrante neón, estilo gaming |
| Mariposa Mágica | 🦋 | Plateado y púrpura con destellos |

---

## 🔗 URLs del Proyecto

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/admin` | Panel de administración |
| `/i/[eventSlug]/[guestSlug]` | Invitación personalizada |
| `/api/rsvp` | API para guardar confirmaciones |

---

## 📦 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run start     # Servidor de producción
npm run lint      # Linter
```

---

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.
