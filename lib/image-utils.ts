/**
 * Genera un data URL base64 para usar como placeholder blur
 * Este es un SVG simple que representa un placeholder gris borroso
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  // Crear un SVG simple con un rectángulo gris
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
    </svg>
  `.trim()

  // Convertir a base64
  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

/**
 * Blur data URL pre-generados para uso común
 */
export const blurDataURL = {
  // Para logos y elementos pequeños
  small: generateBlurDataURL(40, 40),
  // Para imágenes de productos
  product: generateBlurDataURL(144, 144),
  // Para imágenes grandes (fachada, hero)
  large: generateBlurDataURL(20, 20),
  // Para imágenes cuadradas
  square: generateBlurDataURL(100, 100),
}