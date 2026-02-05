import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, FileText } from "lucide-react"
import { siteConfig, contactInfo } from "@/lib/constants/site"

export const metadata: Metadata = {
  title: `Política de Privacidad - ${siteConfig.name}`,
  description: "Política de privacidad y protección de datos personales",
  alternates: {
    canonical: "/privacidad",
  },
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen" role="main">
      <Header />
      <section className="pt-24 pb-20 md:pt-32 md:pb-28" aria-labelledby="privacy-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
            <h1 id="privacy-heading" className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Política de Privacidad
            </h1>
            <p className="text-foreground/70 text-lg">
              Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-secondary" />
                1. Información que Recopilamos
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                En Pinturas San Pedro, recopilamos información que usted nos proporciona directamente cuando:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Solicita una cotización o consulta</li>
                <li>Se comunica con nosotros a través de WhatsApp, correo electrónico o redes sociales</li>
                <li>Visita nuestras instalaciones físicas</li>
                <li>Interactúa con nuestro sitio web</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                La información que podemos recopilar incluye: nombre, número de teléfono, dirección de correo electrónico, dirección física, y cualquier otra información que usted decida compartir con nosotros.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-secondary" />
                2. Uso de la Información
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Procesar y responder a sus consultas y solicitudes de cotización</li>
                <li>Proporcionar nuestros servicios</li>
                <li>Mejorar nuestra atención y experiencia del cliente</li>
                <li>Enviar información sobre promociones y actualizaciones (con su consentimiento)</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Shield className="h-6 w-6 text-secondary" />
                3. Protección de Datos
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-secondary" />
                4. Compartir Información
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en los siguientes casos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Cuando sea necesario para proporcionar nuestros servicios (por ejemplo, con proveedores de servicios de entrega)</li>
                <li>Cuando sea requerido por ley o por orden judicial</li>
                <li>Con su consentimiento explícito</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Sus Derechos
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Acceder a su información personal</li>
                <li>Rectificar información inexacta o incompleta</li>
                <li>Solicitar la eliminación de su información personal</li>
                <li>Oponerse al procesamiento de su información</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Cookies y Tecnologías Similares
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar su experiencia. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Cambios a esta Política
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "última actualización".
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Contacto
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Si tiene preguntas o inquietudes sobre esta política de privacidad o sobre cómo manejamos su información personal, puede contactarnos:
              </p>
              <div className="space-y-2 text-foreground/80">
                <p><strong>Email:</strong> pinturassanpedro@hotmail.com</p>
                <p><strong>Teléfonos:</strong> {contactInfo.phone}, {contactInfo.additionalPhones?.join(', ')}</p>
                <p><strong>Dirección:</strong> Calle 132D N 145A-02, Bogotá, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
