This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Configuración del Formulario de Contacto

El formulario de contacto utiliza **EmailJS** para enviar correos directamente a `pinturassanpedro@hotmail.com` sin necesidad de credenciales del cliente.

### Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/) y crea una cuenta gratuita (200 emails/mes gratis)

### Paso 2: Configurar Email Service

1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Elige **Gmail** o **Outlook** (usa cualquier cuenta tuya, no la del cliente)
4. Conecta tu cuenta y autoriza el acceso
5. Copia el **Service ID** que se genera

### Paso 3: Crear Email Template

1. Ve a **Email Templates** y haz clic en **Create New Template**
2. Configura el template:
   - **To Email**: `pinturassanpedro@hotmail.com`
   - **Subject**: `Nueva Consulta de {{from_name}} - Pinturas San Pedro`
   - **Content**:
     ```
     Nombre: {{from_name}}
     Email: {{from_email}}
     Teléfono: {{phone}}
     
     Mensaje:
     {{message}}
     ```
3. Guarda el template y copia el **Template ID**

### Paso 4: Obtener Public Key

1. Ve a **Account** > **General**
2. Copia tu **Public Key** (API Key)

### Paso 5: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_aqui
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### Configuración en Vercel

1. Ve a tu proyecto en Vercel
2. Ve a **Settings** > **Environment Variables**
3. Agrega las tres variables de entorno:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Haz redeploy del proyecto para que los cambios surtan efecto

### Ventajas de EmailJS

- ✅ No necesitas credenciales del cliente
- ✅ Plan gratuito: 200 emails/mes
- ✅ Configuración simple y rápida
- ✅ Los correos llegan directamente a `pinturassanpedro@hotmail.com`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
