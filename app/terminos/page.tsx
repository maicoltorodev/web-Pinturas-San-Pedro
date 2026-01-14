import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, CheckCircle, AlertCircle, Scale } from "lucide-react"

export const metadata = {
  title: "Términos y Condiciones - Pinturas San Pedro",
  description: "Términos y condiciones de uso de productos de Pinturas San Pedro",
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-6">
              <FileText className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-foreground/70 text-lg">
              Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Scale className="h-6 w-6 text-secondary" />
                1. Aceptación de los Términos
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Al acceder y utilizar los productos de Pinturas San Pedro, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros productos.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-secondary" />
                2. Productos
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Pinturas San Pedro se compromete a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Proporcionar productos de calidad certificada</li>
                <li>Ofrecer productos de pintura de calidad con más de 30 años de experiencia</li>
                <li>Proporcionar información precisa sobre productos y disponibilidad</li>
                <li>Mantener estándares de calidad en todos nuestros productos</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-secondary" />
                3. Cotizaciones y Pagos
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Todas las cotizaciones son personalizadas según las necesidades del proyecto. Los valores finales se confirmarán al momento de la cotización formal. Aceptamos los siguientes métodos de pago:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Efectivo</li>
                <li>Transferencia bancaria</li>
                <li>Otros métodos acordados previamente</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Cotizaciones y Contratos
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Las cotizaciones proporcionadas tienen validez por un período determinado (generalmente 30 días) y están sujetas a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Disponibilidad de productos y materiales</li>
                <li>Condiciones específicas del proyecto</li>
                <li>Confirmación escrita del cliente</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Garantías y Devoluciones
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Respecto a nuestros productos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Los productos deben ser utilizados según las instrucciones del fabricante</li>
                <li>Las devoluciones se evaluarán caso por caso</li>
                <li>Los productos personalizados o mezclados no son elegibles para devolución</li>
                <li>Se requiere comprobante de compra para cualquier reclamación</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Responsabilidades del Cliente
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                El cliente se compromete a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Proporcionar información precisa y completa para las cotizaciones</li>
                <li>Utilizar los productos según las instrucciones del fabricante</li>
                <li>Realizar pagos según los términos acordados</li>
                <li>Comunicar cualquier cambio o problema de manera oportuna</li>
              </ul>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Limitación de Responsabilidad
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Pinturas San Pedro no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso de nuestros productos, excepto cuando sea requerido por ley. Nuestra responsabilidad se limita al valor del producto proporcionado.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Propiedad Intelectual
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseños, es propiedad de Pinturas San Pedro y está protegido por leyes de propiedad intelectual. No se permite la reproducción sin autorización previa.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Modificaciones de los Términos
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor al ser publicadas en este sitio web. Es su responsabilidad revisar periódicamente estos términos.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Ley Aplicable y Jurisdicción
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Estos términos y condiciones se rigen por las leyes de la República de Colombia. Cualquier disputa será resuelta en los tribunales competentes de Bogotá, Colombia.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Contacto
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Para cualquier consulta sobre estos términos y condiciones, puede contactarnos:
              </p>
              <div className="space-y-2 text-foreground/80">
                <p><strong>Email:</strong> pinturassanpedro@hotmail.com</p>
                <p><strong>Teléfono:</strong> +57 322 3716811</p>
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
