# Pinturas San Pedro - Sitio Web Profesional

Sitio web profesional para Pinturas San Pedro, una empresa con más de 30 años de experiencia en la venta de pinturas de alta calidad en Bogotá, Colombia.

## 🚀 Características

- **Next.js 16** con App Router
- **TypeScript** con modo estricto
- **Tailwind CSS 4** para estilos
- **Optimización de rendimiento** (lazy loading, code splitting, optimización de imágenes)
- **SEO avanzado** (structured data JSON-LD, sitemap, robots.txt)
- **Accesibilidad** (WCAG AA, ARIA labels, navegación por teclado)
- **Responsive design** optimizado para móvil y desktop
- **Componentes reutilizables** y arquitectura escalable

## 📁 Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal con metadata y structured data
│   ├── page.tsx           # Página principal
│   ├── sitemap.ts         # Sitemap dinámico
│   ├── robots.ts          # Robots.txt
│   └── globals.css        # Estilos globales
├── components/             # Componentes React
│   ├── ui/                # Componentes UI reutilizables
│   ├── header.tsx         # Header con navegación
│   ├── hero.tsx           # Sección hero
│   ├── services.tsx       # Servicios
│   ├── testimonials.tsx   # Testimonios
│   ├── contact.tsx        # Contacto
│   └── footer.tsx         # Footer
├── lib/
│   ├── constants/         # Constantes centralizadas
│   │   ├── site.ts        # Configuración del sitio
│   │   ├── services.ts    # Datos de servicios
│   │   ├── testimonials.ts # Testimonios
│   │   └── navigation.ts  # Enlaces de navegación
│   ├── config/            # Configuración
│   │   ├── metadata.ts    # Metadata SEO
│   │   └── seo.ts         # Structured data
│   ├── types/             # Tipos TypeScript
│   └── utils.ts           # Utilidades
├── hooks/                  # Custom hooks
└── public/                 # Archivos estáticos
```

## 🛠️ Tecnologías

- **Framework**: Next.js 16.0.10
- **Lenguaje**: TypeScript 5
- **Estilos**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI, Lucide React
- **Carousel**: Swiper
- **Analytics**: Vercel Analytics & Speed Insights
- **Email**: EmailJS

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

### EmailJS (Opcional)

Si deseas usar el formulario de contacto con EmailJS:

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email
3. Crea un template
4. Agrega las variables de entorno correspondientes

## 🎨 Personalización

### Colores y Estilos

Los colores principales están definidos en `app/globals.css` usando variables CSS:

- `--primary`: Azul profundo (color principal)
- `--secondary`: Amarillo brillante (color de acento)
- `--background`: Blanco
- `--foreground`: Azul oscuro (texto)

### Contenido

Todo el contenido está centralizado en `lib/constants/`:

- `site.ts`: Información de contacto, redes sociales, horarios
- `services.ts`: Servicios ofrecidos
- `testimonials.ts`: Testimonios de clientes
- `navigation.ts`: Enlaces de navegación

## 📱 Responsive Design

El sitio está completamente optimizado para:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accesibilidad

- Navegación por teclado completa
- ARIA labels en todos los elementos interactivos
- Contraste de colores WCAG AA
- Estructura semántica HTML5
- Skip links para navegación rápida

## 🔍 SEO

- Structured data (JSON-LD) para LocalBusiness y Organization
- Sitemap dinámico
- Robots.txt configurado
- Metadata optimizada para Open Graph y Twitter Cards
- Canonical URLs

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno
3. Vercel detectará Next.js automáticamente
4. ¡Listo!

### Otros Proveedores

El proyecto puede desplegarse en cualquier plataforma que soporte Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Ejecutar ESLint
- `npm run analyze` - Analizar bundle (requiere ANALYZE=true)

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén configurados)
npm test
```

## 📄 Licencia

Este proyecto es privado y propiedad de Pinturas San Pedro.

## 👥 Contribución

Este es un proyecto privado. Para cambios o mejoras, contacta al equipo de desarrollo.

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Pinturas San Pedro**
