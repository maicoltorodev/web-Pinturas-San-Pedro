"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionBackground } from "@/components/ui/section-background"
import { cn } from "@/lib/utils"
import { 
  Paintbrush, 
  Palette, 
  Droplet, 
  Brush, 
  Shield, 
  Sparkles, 
  Car, 
  Layers, 
  Wrench,
  LucideIcon
} from "lucide-react"
import Image from "next/image"
import { useState, useMemo, useCallback } from "react"

// Types
export interface ProductPresentation {
  size: string
}

export interface Product {
  name: string
  category: string
  description: string
  features: string[]
  icon: LucideIcon
  color: string
  image: string
  presentations?: ProductPresentation[]
  certifications?: string[]
  uses?: string[]
  benefits?: string[]
  application?: string
  colors?: string[]
}

const products: Product[] = [
  // VINILOS
  {
    name: "Vinilo acrílico",
    category: "Vinilos",
    description: "Vinilo acrílico con acabado mate lavable, ideal para interiores. Con desempeño y cubrimiento, bajo aroma y nivelación.",
    features: ["Acabado mate lavable", "Con cubrimiento", "Bajo aroma", "Con nivelación"],
    icon: Paintbrush,
    color: "from-green-500 to-green-600",
    image: "/productos/vinilo-acrilico.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    certifications: ["NTC 1335 (algunas referencias)"],
    colors: ["Blanco", "Almendra", "Rojo"]
  },
  {
    name: "Vinilo tipo 2 Semilavable",
    category: "Vinilos",
    description: "Vinilo con acabado mate, ideal para interiores. Con cubrimiento y rendimiento, bajo aroma.",
    features: ["Acabado mate", "Con cubrimiento", "Bajo aroma", "Opción semilavable"],
    icon: Paintbrush,
    color: "from-teal-500 to-teal-600",
    image: "/productos/vinilo-semilavable.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    certifications: ["NTC 1335 (algunas referencias)"]
  },
  {
    name: "Vinilo tipo coraza",
    category: "Vinilos",
    description: "Pintura diluible en agua con acabado satinado, hidrofugable y con resistencia. Ideal para fachadas o uso interior con exigencias de impermeabilización y lavabilidad.",
    features: ["Acabado satinado", "Hidrofugable", "Con resistencia", "Fachadas o uso interior"],
    icon: Paintbrush,
    color: "from-purple-500 to-purple-600",
    image: "/productos/vinilo-hidrofugado.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ]
  },
  {
    name: "Vinilo tipo 2 certificado",
    category: "Vinilos",
    description: "Pintura económica con calidad para interiores. Ideal para proyectos con presupuesto ajustado sin comprometer la calidad.",
    features: ["Económica", "Con calidad", "Fácil aplicación"],
    icon: Brush,
    color: "from-gray-500 to-gray-600",
    image: "/productos/vinilo-tipo-2-certificado.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ]
  },
  {
    name: "Vinilo acrílico tipo 1 certificado",
    category: "Vinilos",
    description: "Vinilo acrílico certificado con acabado mate lavable, ideal para interiores. Con desempeño y cubrimiento, bajo aroma y nivelación.",
    features: ["Acabado mate lavable", "Con cubrimiento", "Bajo aroma", "Con nivelación", "Certificado"],
    icon: Paintbrush,
    color: "from-green-600 to-green-700",
    image: "/productos/vinilo-tipo-1-certificado.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    certifications: ["NTC 1335"]
  },
  {
    name: "Vinilo tipo 3",
    category: "Vinilos",
    description: "Pintura económica con calidad para interiores. Ideal para proyectos con presupuesto ajustado sin comprometer la calidad.",
    features: ["Económica", "Con calidad", "Fácil aplicación"],
    icon: Brush,
    color: "from-gray-400 to-gray-500",
    image: "/productos/vinilo-tipo-3.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ]
  },
  
  // ANTICORROSIVO
  {
    name: "Anticorrosivo",
    category: "Anticorrosivo",
    description: "Producto diseñado con protección contra la oxidación y el desgaste.",
    features: ["Protección contra oxidación", "Mejora adhesión del esmalte", "Secado rápido", "Con resistencia"],
    icon: Shield,
    color: "from-orange-500 to-orange-600",
    image: "/productos/anticorrosivo.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    uses: [
      "Primera mano para superficies metálicas en interiores y exteriores",
      "Ventanas, rejas, puentes, barandas",
      "Estructuras metálicas con exposición ambiental moderada"
    ],
    benefits: [
      "Previene la formación de óxido",
      "Mejora la adhesión del esmalte",
      "Fácil aplicación y secado rápido",
      "Con resistencia y durabilidad"
    ],
    application: "Listo para usar. Aplicable con rodillo o brocha. Se disuelve con thinner o varsol."
  },
  
  // ESMALTES
  {
    name: "Esmalte Especial",
    category: "Esmaltes",
    description: "Con protección y decoración de superficies de metal y madera.",
    features: ["Con protección", "Decoración", "Durabilidad"],
    icon: Sparkles,
    color: "from-blue-500 to-blue-600",
    image: "/productos/esmalte-especial.png",
    uses: [
      "Rejas, puertas, ventanas",
      "Marcos, persianas",
      "Tuberías, zócalos"
    ],
    presentations: [
      { size: "Cuñete" },
      { size: "Galón" },
      { size: "1/4" },
      { size: "1/8" }
    ]
  },
  {
    name: "Esmalte Premium",
    category: "Esmaltes",
    description: "Con protección para superficies de metal y madera.",
    features: ["Con protección", "Con calidad", "Con acabado"],
    icon: Sparkles,
    color: "from-amber-500 to-amber-600",
    image: "/productos/esmalte-premium.png",
    uses: [
      "Rejas, puertas, ventanas",
      "Marcos, persianas",
      "Tuberías, zócalos"
    ],
    presentations: [
      { size: "Cuñete" },
      { size: "Galón" },
      { size: "1/4" },
      { size: "1/8" }
    ]
  },
  {
    name: "Esmalte Tipo 1",
    category: "Esmaltes",
    description: "Pintar y proteger superficies de metal y madera.",
    features: ["Protección", "Decoración", "Versatilidad"],
    icon: Sparkles,
    color: "from-blue-400 to-blue-500",
    image: "/productos/esmalte-tipo-1.png",
    uses: [
      "Rejas, puertas, ventanas",
      "Marcos, persianas",
      "Tuberías, zócalos"
    ],
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "1/4" }
    ]
  },
  {
    name: "Esmalte a base agua",
    category: "Esmaltes",
    description: "Esmalte ecológico a base de agua para protección y decoración de superficies de metal y madera.",
    features: ["A base de agua", "Ecológico", "Con protección", "Fácil aplicación"],
    icon: Sparkles,
    color: "from-emerald-500 to-emerald-600",
    image: "/productos/esmalte-base-agua.png",
    uses: [
      "Rejas, puertas, ventanas",
      "Marcos, persianas",
      "Tuberías, zócalos"
    ],
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ]
  },
  
  // TRÁFICO PESADO
  {
    name: "Tráfico Pesado",
    category: "Tráfico Pesado",
    description: "Pintura con desempeño para señalización y demarcación de pavimentos.",
    features: ["Con resistencia al desgaste", "Secado rápido", "Con durabilidad"],
    icon: Car,
    color: "from-red-500 to-red-600",
    image: "/productos/trafico-pesado.png",
    uses: [
      "Estacionamientos",
      "Carreteras",
      "Zonas industriales"
    ],
    presentations: [
      { size: "Cuñete" },
      { size: "Galón" },
      { size: "Medio Cuñete" }
    ]
  },
  
  // ESTUCOS Y REVESTIMIENTOS
  {
    name: "Estuco Plástico Acrílico",
    category: "Estucos",
    description: "Producto de acabado liso para paredes.",
    features: ["Acabado liso", "Con adherencia", "Fácil aplicación"],
    icon: Layers,
    color: "from-indigo-500 to-indigo-600",
    image: "/productos/estuco-plastico-acrilico.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    uses: [
      "Paredes interiores",
      "Superficies de madera en interiores",
      "Aplicación sobre pañetes antes de vinilo o esmalte"
    ]
  },
  {
    name: "Graniplas",
    category: "Estucos",
    description: "Revestimiento para acabados texturizados decorativos.",
    features: ["Acabado texturizado", "Decorativo", "Resistente"],
    icon: Layers,
    color: "from-blue-500 to-blue-600",
    image: "/productos/graniplas.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    uses: [
      "Interiores y exteriores",
      "Acabados modernos y resistentes"
    ]
  },
  {
    name: "Carraplast",
    category: "Estucos",
    description: "Revestimiento decorativo con adherencia y flexibilidad.",
    features: ["Con adherencia", "Flexibilidad", "Decorativo"],
    icon: Layers,
    color: "from-cyan-500 to-cyan-600",
    image: "/productos/garraplast.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    uses: [
      "Protección y embellecimiento de superficies"
    ]
  },
  {
    name: "Pasta Acrílica",
    category: "Estucos",
    description: "Producto para nivelar y preparar superficies antes de pintar.",
    features: ["Nivelación", "Preparación de superficies", "Acabado uniforme"],
    icon: Layers,
    color: "from-slate-500 to-slate-600",
    image: "/productos/pasta acrilica.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    benefits: [
      "Garantiza un acabado uniforme y profesional",
      "Mejora la apariencia final de la pintura"
    ]
  },
  
  // IMPERMEABILIZANTE
  {
    name: "Impermeabilizante",
    category: "Impermeabilizante",
    description: "Protege tu inversión con impermeabilizantes de alto rendimiento. Soluciones profesionales para evitar filtraciones, humedades y deterioro en techos, terrazas, muros y fachadas. Diseñados para resistir condiciones climáticas extremas y alargar la vida útil de cualquier superficie.",
    features: ["Protección contra filtraciones", "Alto rendimiento", "Resistente a condiciones extremas", "Alarga vida útil"],
    icon: Droplet,
    color: "from-blue-500 to-blue-600",
    image: "/productos/Impermeabilizante_Uretanico.png",
    presentations: [
      { size: "Cuñete" },
      { size: "Medio" },
      { size: "Galón" }
    ],
    benefits: [
      "Con durabilidad",
      "Protección frente al clima y la humedad"
    ]
  },
  
  // HERRAMIENTAS
  {
    name: "Brochas básicas",
    category: "Herramientas",
    description: "Brochas de uso general para aplicación profesional de pintura. Disponibles en diferentes tamaños y tipos de cerdas.",
    features: ["Uso general", "Variedad de tamaños", "Diferentes tipos de cerdas"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/brocha.png",
    presentations: [
      { size: "Brocha plana 2\"" },
      { size: "Brocha plana 3\"" },
      { size: "Brocha angular 2\"" },
      { size: "Brocha angular 3\"" },
      { size: "Brocha 1½\"" },
      { size: "Brocha 1\"" }
    ],
    uses: [
      "Aplicación general",
      "Paredes y grandes superficies",
      "Esquinas y bordes",
      "Detalles y acabados finos"
    ]
  },
  {
    name: "Brochas por material",
    category: "Herramientas",
    description: "Brochas especializadas según el tipo de cerdas: sintéticas, naturales o mezcla, cada una optimizada para diferentes tipos de pintura.",
    features: ["Cerdas sintéticas", "Cerdas naturales", "Mezcla natural + sintética"],
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    image: "/productos/brochas-material.png",
    presentations: [
      { size: "Brocha cerdas sintéticas" },
      { size: "Brocha cerdas naturales" },
      { size: "Brocha mezcla cerdas" }
    ],
    uses: [
      "Diferentes tipos de pintura",
      "Aplicación especializada"
    ]
  },
  {
    name: "Rodillos por superficie",
    category: "Herramientas",
    description: "Rodillos especializados según el tipo de superficie: pelo corto para muros lisos, medio para multiusos y largo para superficies rugosas.",
    features: ["Pelo corto (6-8 mm)", "Pelo medio (10-12 mm)", "Pelo largo (15-18 mm)"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/rodillo.png",
    presentations: [
      { size: "Rodillo pelo corto" },
      { size: "Rodillo pelo medio" },
      { size: "Rodillo pelo largo" }
    ],
    uses: [
      "Muros lisos",
      "Multiusos",
      "Superficies rugosas"
    ]
  },
  {
    name: "Rodillos por tamaño",
    category: "Herramientas",
    description: "Rodillos en diferentes tamaños para cubrir desde detalles y esquinas hasta áreas grandes de manera eficiente.",
    features: ["Rodillo 4\"", "Rodillo 7\"", "Rodillo 9\""],
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    image: "/productos/rodillo.png",
    presentations: [
      { size: "Rodillo 4\"" },
      { size: "Rodillo 7\"" },
      { size: "Rodillo 9\"" }
    ],
    uses: [
      "Detalles y esquinas",
      "Estándar de pared",
      "Áreas grandes"
    ]
  },
  {
    name: "Recambios para rodillos",
    category: "Herramientas",
    description: "Recambios para rodillos en diferentes largos de pelo. Ideal para mantener tus rodillos en perfecto estado y continuar trabajando sin interrupciones.",
    features: ["Recambios disponibles", "Diferentes largos", "Fácil instalación"],
    icon: Wrench,
    color: "from-gray-400 to-gray-500",
    image: "/productos/recambio-rodillo.png",
    presentations: [
      { size: "Variedad de tamaños" }
    ],
    uses: [
      "Mantenimiento de rodillos",
      "Reemplazo de recubrimiento"
    ]
  },
  {
    name: "Bandejas",
    category: "Herramientas",
    description: "Recipiente estructurado para verter la pintura, permitiendo una carga controlada del rodillo y eliminando el exceso mediante su zona de descarga.",
    features: ["Carga controlada", "Zona de descarga", "Estructurado"],
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    image: "/productos/bandeja-pintura.png",
    presentations: [
      { size: "Estándar" }
    ],
    uses: [
      "Verter pintura",
      "Carga de rodillos",
      "Eliminar exceso"
    ]
  },
  {
    name: "Rejilla para bandeja",
    category: "Herramientas",
    description: "Rejilla para bandeja que permite eliminar el exceso de pintura del rodillo. Mejora la aplicación y reduce el desperdicio de pintura.",
    features: ["Elimina exceso", "Reduce desperdicio", "Mejora aplicación"],
    icon: Wrench,
    color: "from-gray-400 to-gray-500",
    image: "/productos/rejilla-pintura.png",
    presentations: [
      { size: "Rejilla estándar" }
    ],
    uses: [
      "Control de pintura",
      "Aplicación eficiente"
    ]
  },
  {
    name: "Cinta de Enmascarar Cellux / Estándar",
    category: "Herramientas",
    description: "Para trabajos de precisión y multipropósito, destacada por ser fácil de remover sin transferir pegante a la superficie.",
    features: ["Precisión", "Multipropósito", "Fácil de remover", "No deja pegante"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/cinta-enmascarar.png",
    presentations: [
      { size: "24 mm x 40 yd" },
      { size: "40 mm x 40 mts" }
    ],
    uses: [
      "Trabajos de precisión",
      "Protección de superficies",
      "Líneas limpias"
    ]
  },
  {
    name: "Lonas y plásticos protectores",
    category: "Herramientas",
    description: "Lonas y plásticos protectores para cubrir muebles, pisos y superficies durante trabajos de pintura. Protección esencial para mantener limpio tu espacio.",
    features: ["Protección completa", "Resistentes", "Reutilizables"],
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    image: "/productos/plastico-protector.png",
    presentations: [
      { size: "Variedad de tamaños" }
    ],
    uses: [
      "Protección de muebles",
      "Cubrir pisos",
      "Protección de superficies"
    ]
  },
  {
    name: "Extensión para rodillo",
    category: "Herramientas",
    description: "Varilla extensora para rodillos que permite alcanzar áreas altas sin necesidad de escaleras. Ideal para techos y paredes altas.",
    features: ["Alcance extendido", "Ajustable", "Fácil de usar"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/extension-rodillo.png",
    presentations: [
      { size: "Extensión estándar" }
    ],
    uses: [
      "Áreas altas",
      "Techos",
      "Paredes altas"
    ]
  },
  {
    name: "Cubeta de pintura",
    category: "Herramientas",
    description: "Cubeta de pintura resistente para almacenar y transportar pintura durante tus trabajos. Diseño práctico con asa para fácil manejo.",
    features: ["Resistente", "Con asa", "Fácil manejo"],
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    image: "/productos/cubeta-pintura.png",
    presentations: [
      { size: "Variedad de capacidades" }
    ],
    uses: [
      "Almacenamiento",
      "Transporte",
      "Mezcla de pintura"
    ]
  },
  {
    name: "Cartón corrugado",
    category: "Herramientas",
    description: "Cartón corrugado para protección de superficies durante trabajos de pintura. Ideal para cubrir pisos, muebles y áreas que requieren protección.",
    features: ["Protección de superficies", "Resistente", "Fácil de usar"],
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    image: "/productos/carton-corrugado-Photoroom.png",
    presentations: [
      { size: "Variedad de tamaños" }
    ],
    uses: [
      "Protección de pisos",
      "Cubrir muebles",
      "Protección durante pintura"
    ]
  },
  {
    name: "Disolventes",
    category: "Herramientas",
    description: "Limpieza de herramientas y preparación de superficies para un acabado óptimo.",
    features: ["Limpieza de herramientas", "Preparación de superficies"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/disolvente.png",
    presentations: [
      { size: "Galón" },
      { size: "Medio" }
    ],
    uses: [
      "Limpieza de herramientas",
      "Preparación de superficies"
    ]
  },

  // RODILLOS
  {
    name: "Rodillo Popular 9\"",
    category: "Rodillos",
    description: "Fabricado con sistema de termo fusión (sin costuras) para evitar que se suelte la felpa. Ofrece un óptimo rendimiento en la aplicación de pinturas a base de agua y vinilos.",
    features: ["Sistema termo fusión", "Sin costuras", "Para base agua y vinilos"],
    icon: Paintbrush,
    color: "from-blue-400 to-blue-500",
    image: "/productos/rodillo-popular-9''.png",
    presentations: [{ size: "9\"" }]
  },
  {
    name: "Rodillo Felpa Semiprofesional 9\"",
    category: "Rodillos",
    description: "Posee sistema de termo fusión y no tiene costuras. Está diseñado para ofrecer un acabado de calidad superior en superficies que requieran pinturas a base de agua o vinilos.",
    features: ["Termo fusión", "Sin costuras", "Acabado superior", "Para base agua"],
    icon: Paintbrush,
    color: "from-blue-500 to-blue-600",
    image: "/productos/rodillo-felpa-semiprofesional-9''.png",
    presentations: [{ size: "9\"" }]
  },
  {
    name: "Rodillo Profesional 9\" Anillo",
    category: "Rodillos",
    description: "Elaborado con felpa industrial de alta densidad y sistema de termo fusión. No tiene costuras y no deja huella al pintar. Especial para pinturas base agua.",
    features: ["Felpa industrial alta densidad", "No deja huella", "Termo fusión", "Especial base agua"],
    icon: Paintbrush,
    color: "from-indigo-500 to-indigo-600",
    image: "/productos/rodillo-profesional-9''-anillo.png",
    presentations: [{ size: "9\"" }]
  },
  {
    name: "Rodillo Hilo Antigota 9\"",
    category: "Rodillos",
    description: "Fabricado con hilo de microfibra de última tecnología y termo fusión. Más duradero y ideal para pinturas complejas como epóxicas, de tráfico, esmaltes y vinilos.",
    features: ["Hilo microfibra", "Antigota", "Mayor durabilidad", "Para epóxicas y esmaltes"],
    icon: Paintbrush,
    color: "from-cyan-500 to-cyan-600",
    image: "/productos/rodillo-hilo-antigota-9''.png",
    presentations: [{ size: "9\"" }]
  },
  {
    name: "Rodillo Espuma 9\"",
    category: "Rodillos",
    description: "Hecho de espuma de poliuretano de alta calidad. Es la herramienta básica y efectiva para aplicaciones sencillas de pinturas a base de agua.",
    features: ["Espuma poliuretano", "Alta calidad", "Para aplicaciones sencillas"],
    icon: Paintbrush,
    color: "from-yellow-400 to-yellow-500",
    image: "/productos/rodillo-espuma-9''.png",
    presentations: [{ size: "9\"" }]
  },
  {
    name: "Rodillo Teja de Felpa Industrial",
    category: "Rodillos",
    description: "Su estructura es ergonómica y está diseñada específicamente para adaptarse a la ondulación de las tejas tipo Eternit, facilitando el cubrimiento uniforme.",
    features: ["Estructura ergonómica", "Para tejas onduladas", "Cubrimiento uniforme"],
    icon: Paintbrush,
    color: "from-orange-400 to-orange-500",
    image: "/productos/rodillo-teja-felpa-industrial.png",
    presentations: [{ size: "Estándar" }]
  },
  {
    name: "Mini Rodillos Hilo Antigota",
    category: "Rodillos",
    description: "Versiones pequeñas con tecnología de microfibra y termo fusión. Ideales para marcos, esquinas y áreas de difícil acceso.",
    features: ["Microfibra", "Termo fusión", "Para áreas difíciles", "Epóxicas y esmaltes"],
    icon: Paintbrush,
    color: "from-cyan-400 to-cyan-500",
    image: "/productos/rodillo-mini-hilo-antigota.png",
    presentations: [
      { size: "1\"" }, { size: "2\"" }, { size: "3\"" }, 
      { size: "4\"" }, { size: "5\"" }, { size: "6\"" }
    ]
  },
  {
    name: "Rodillo Junior",
    category: "Rodillos",
    description: "Versiones compactas del rodillo de felpa industrial con termo fusión. Sin costuras, para detalles en pinturas base agua.",
    features: ["Compacto", "Felpa industrial", "Sin costuras", "Para detalles"],
    icon: Paintbrush,
    color: "from-green-400 to-green-500",
    image: "/productos/rodillo-junior.png",
    presentations: [
      { size: "7\"" }, { size: "5\"" }, { size: "3\"" }
    ]
  },
  {
    name: "Rodillo Texturizador",
    category: "Rodillos",
    description: "Rodillo especial con relieve diseñado para crear acabados decorativos, texturas y efectos rústicos en paredes o techos.",
    features: ["Con relieve", "Acabados decorativos", "Efectos rústicos"],
    icon: Paintbrush,
    color: "from-purple-400 to-purple-500",
    image: "/productos/rodillo-texturizador.png",
    presentations: [
      { size: "9\"" }, { size: "7\"" }, { size: "5\"" }, { size: "3\"" }
    ]
  },
  {
    name: "Rodillo Epóxico 9\"",
    category: "Rodillos",
    description: "Reforzado con termo fusión para resistir los químicos de las pinturas epóxicas, de tráfico y esmaltes, asegurando que la felpa no se desprenda.",
    features: ["Resistente a químicos", "Para epóxicas y tráfico", "Felpa asegurada"],
    icon: Paintbrush,
    color: "from-red-400 to-red-500",
    image: "/productos/rodillo-epoxico-9''.png",
    presentations: [{ size: "9\"" }]
  },
  {
    name: "Rodillo Teja Ovejero",
    category: "Rodillos",
    description: "Similar al de felpa industrial pero con material \"ovejero\" para una mayor carga de pintura en superficies irregulares de tejas.",
    features: ["Material ovejero", "Mayor carga de pintura", "Para superficies irregulares"],
    icon: Paintbrush,
    color: "from-amber-400 to-amber-500",
    image: "/productos/rodillo-teja-ovejero.png",
    presentations: [{ size: "Estándar" }]
  },
  {
    name: "Rodillo Felpa Ovejera 9\"",
    category: "Rodillos",
    description: "Rodillo de alta capacidad de absorción con sistema de termo fusión, ideal para cubrir grandes áreas con pintura base agua rápidamente.",
    features: ["Alta absorción", "Termo fusión", "Para grandes áreas"],
    icon: Paintbrush,
    color: "from-amber-200 to-amber-300",
    image: "/productos/rodillo-felpa-ovejera-9''.png",
    presentations: [{ size: "9\"" }]
  },

  // BROCHAS
  {
    name: "Brocha Cerda Popular (Superka)",
    category: "Brochas",
    description: "Es una brocha versátil y económica diseñada para aplicar toda clase de pinturas en trabajos generales.",
    features: ["Versátil", "Económica", "Para trabajos generales"],
    icon: Brush,
    color: "from-orange-300 to-orange-400",
    image: "/productos/brocha-cerda-popular.png",
    presentations: [
      { size: "2 1/2\"" }, { size: "3\"" }, { size: "4\"" }
    ]
  },
  {
    name: "Brocha Cerda Premium",
    category: "Brochas",
    description: "Se distingue por su empaque rojo. Es de calidad superior, con mejor retención de pintura y apta para acabados exigentes con cualquier tipo de pintura.",
    features: ["Calidad superior", "Mejor retención", "Para acabados exigentes"],
    icon: Brush,
    color: "from-red-500 to-red-600",
    image: "/productos/brocha-cerda-premium.png",
    presentations: [
      { size: "1/2\"" }, { size: "1\"" }, { size: "1 1/2\"" }, 
      { size: "2\"" }, { size: "2 1/2\"" }, { size: "3\"" }, 
      { size: "4\"" }, { size: "5\"" }
    ]
  },

  // OTROS (HERRAMIENTAS Y COMPLEMENTOS)
  {
    name: "Mezclador",
    category: "Herramientas",
    description: "Herramienta plástica diseñada para batir la pintura y asegurar que los pigmentos y resinas se integren perfectamente.",
    features: ["Plástico", "Integración de pigmentos", "Fácil uso"],
    icon: Wrench,
    color: "from-gray-400 to-gray-500",
    image: "/productos/mezclador.png"
  },
  {
    name: "Destapacuñete",
    category: "Herramientas",
    description: "Herramienta especializada para abrir las tapas de los cuñetes de pintura de forma rápida, evitando daños y desperdicios.",
    features: ["Apertura rápida", "Evita daños", "Sin desperdicios"],
    icon: Wrench,
    color: "from-gray-500 to-gray-600",
    image: "/productos/destapacuñete.png"
  },
  {
    name: "Espátula Plástica",
    category: "Herramientas",
    description: "Ligeras y flexibles, diseñadas específicamente para aplicar masilla y resanar agujeros en paredes.",
    features: ["Ligera", "Flexible", "Para masilla"],
    icon: Wrench,
    color: "from-blue-300 to-blue-400",
    image: "/productos/espatula-plastica.png",
    presentations: [
      { size: "4\"" }, { size: "5\"" }, { size: "6\"" }
    ]
  },
  {
    name: "Espátula Boreal Acero al Carbón",
    category: "Herramientas",
    description: "Herramienta profesional de alta durabilidad para raspar superficies o aplicar materiales más densos.",
    features: ["Alta durabilidad", "Acero al carbón", "Para raspar"],
    icon: Wrench,
    color: "from-gray-600 to-gray-700",
    image: "/productos/espatula-acero-carbon.png",
    presentations: [
      { size: "4\"" }, { size: "5\"" }
    ]
  },
  {
    name: "Cepillo de Alambre Todo Uso",
    category: "Herramientas",
    description: "Con cerdas de acero, ideal para limpiar superficies oxidadas, remover pintura vieja o limpiar herramientas.",
    features: ["Cerdas de acero", "Remoción de óxido", "Limpieza profunda"],
    icon: Wrench,
    color: "from-red-600 to-red-700",
    image: "/productos/cepillo-alambre.png"
  },
  {
    name: "Lija de Agua Negra",
    category: "Herramientas",
    description: "Para lijado fino y acabados suaves usando agua como lubricante.",
    features: ["Lijado fino", "Acabados suaves", "Uso con agua"],
    icon: Wrench,
    color: "from-gray-800 to-gray-900",
    image: "/productos/lija-agua-negra.png",
    presentations: [{ size: "Granos 60 a 600" }]
  },
  {
    name: "Lija Roja en Seco",
    category: "Herramientas",
    description: "Para desbaste y preparación de superficies de madera o pared sin necesidad de líquidos.",
    features: ["Lijado en seco", "Desbaste", "Para madera o pared"],
    icon: Wrench,
    color: "from-red-400 to-red-500",
    image: "/productos/lija-rojo-seco.png",
    presentations: [{ size: "Granos 60 a 600" }]
  },
  {
    name: "Pasta de Pulir Mercury",
    category: "Herramientas",
    description: "Compuesto abrasivo fino para dar brillo y acabado espejo a superficies pintadas.",
    features: ["Abrasivo fino", "Da brillo", "Acabado espejo"],
    icon: Sparkles,
    color: "from-amber-100 to-amber-200",
    image: "/productos/pasta-pulir.png",
    presentations: [{ size: "700 g" }]
  },
  {
    name: "Disco de Desbaste y Pulido",
    category: "Herramientas",
    description: "Disco Flap Grano 60, diseñado para esmerilar y pulir metal (hierro) y madera.",
    features: ["Grano 60", "Esmerilar", "Pulir metal y madera"],
    icon: Wrench,
    color: "from-blue-700 to-blue-800",
    image: "/productos/disco-desbaste-pulido.png"
  },
  {
    name: "Veteador WI 4+6\"",
    category: "Herramientas",
    description: "Veteador mediano con aplicador de caucho. Ideal para crear efectos decorativos que imitan las vetas naturales de la madera.",
    features: ["Efectos madera", "Aplicador de caucho", "Decorativo"],
    icon: Palette,
    color: "from-amber-600 to-amber-700",
    image: "/productos/veteador-wi.png",
    presentations: [{ size: "4+6\"" }]
  },
  {
    name: "Veteador SBWR-2.5\"",
    category: "Herramientas",
    description: "Veteador de tamaño mediano con mango de madera. Específicamente diseñado para imitar motivos leñosos naturales.",
    features: ["Motivos leñosos", "Mango de madera", "Decorativo"],
    icon: Palette,
    color: "from-amber-700 to-amber-800",
    image: "/productos/veteador-sbwr.png",
    presentations: [{ size: "2.5\"" }]
  },
  {
    name: "Veteador SB-PY 4\"",
    category: "Herramientas",
    description: "Veteador de tamaño mediano con mango de plástico. Recomendado para lograr acabados decorativos tipo madera.",
    features: ["Acabados tipo madera", "Mango plástico", "Decorativo"],
    icon: Palette,
    color: "from-amber-500 to-amber-600",
    image: "/productos/veteador-sb-py.png",
    presentations: [{ size: "4\"" }]
  },
  {
    name: "Veteador SB-PB 5\"",
    category: "Herramientas",
    description: "Versión de tamaño grande con mango de madera. Ideal para superficies más amplias donde se requiera imitar el aspecto natural de la madera.",
    features: ["Superficies amplias", "Aspecto natural", "Tamaño grande"],
    icon: Palette,
    color: "from-amber-400 to-amber-500",
    image: "/productos/veteador-sb-pb.png",
    presentations: [{ size: "5\"" }]
  }
]

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon

  const handleCardClick = useCallback(() => {
    const message = `Hola, necesito ${product.name}`
    const whatsappUrl = `https://wa.me/573223716811?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }, [product.name])

  return (
    <Card 
      onClick={handleCardClick}
      className={cn(
        "h-full border-2 bg-white/98 backdrop-blur-sm",
        "group relative overflow-hidden flex flex-col",
        "transition-all duration-500 ease-out",
        "hover:border-secondary/60 hover:shadow-premium-lg",
        "md:hover:-translate-y-1",
        "cursor-pointer"
      )}
    >
      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
        "md:group-hover:opacity-5 pointer-events-none z-0",
        product.color
      )} />
      
      <CardContent className="p-0 flex-1 flex flex-col relative z-10">
        {/* Header Section - Image + Category Badge */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-50 via-gray-50/50 to-white">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-15 md:opacity-20 transition-opacity duration-500",
              "md:group-hover:opacity-25",
              product.color
            )} />
          </div>
          
          {/* Category Badge - Top Left */}
          <div className="absolute top-4 left-4 z-20">
            <span className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg",
              "bg-white/95 backdrop-blur-sm border-2 border-secondary/20",
              "text-secondary-foreground"
            )}>
              {product.category}
            </span>
          </div>

          {/* Icon - Top Right */}
          <div className="absolute top-4 right-4 z-20">
            <div className={cn(
              "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center",
              "shadow-xl transition-all duration-500",
              "md:group-hover:scale-110 md:group-hover:rotate-3",
              product.color
            )}>
              <Icon className="h-7 w-7 text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Product Image - Centered */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className={cn(
              "relative transition-transform duration-500 md:group-hover:scale-110",
              // Tamaño mayor para productos específicos
              (product.name === "Impermeabilizante" || 
               product.name === "Estuco Plástico Acrílico" || 
               product.name === "Esmalte Tipo 1" || 
               product.name === "Esmalte a base agua" || 
               product.name === "Anticorrosivo")
                ? "w-40 h-40 md:w-44 md:h-44"
                : "w-32 h-32 md:w-36 md:h-36"
            )}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes={(product.name === "Impermeabilizante" || 
                        product.name === "Estuco Plástico Acrílico" || 
                        product.name === "Esmalte Tipo 1" || 
                        product.name === "Esmalte a base agua" || 
                        product.name === "Anticorrosivo")
                        ? "176px" : "144px"}
                loading="lazy"
                quality={90}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 leading-tight transition-colors duration-300 md:group-hover:text-secondary">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Certifications & Colors - Compact */}
          {(product.certifications || product.colors) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.certifications?.map((cert, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/80 border border-blue-200/60 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">{cert}</span>
                </div>
              ))}
              {product.colors?.map((color, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[10px] font-semibold text-foreground">
                  {color}
                </span>
              ))}
            </div>
          )}

          {/* Key Features - Compact Grid */}
          {product.features.length > 0 && (
            <div className="mb-4">
              <ul className="grid grid-cols-2 gap-2">
                {product.features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-xs font-medium text-foreground/80 leading-tight line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Presentaciones - Highlighted */}
          {product.presentations && product.presentations.length > 0 && (
            <div className="mt-auto pt-4 border-t border-border/50">
              <div className="mb-3">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Presentaciones Disponibles</span>
              </div>
              <div className="space-y-2">
                {product.presentations.map((presentation, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex items-center justify-center py-2.5 px-4 rounded-lg",
                      "bg-gradient-to-r from-secondary/5 to-secondary/10",
                      "border border-secondary/20",
                      "transition-all duration-300",
                      "md:group-hover:border-secondary/40 md:group-hover:from-secondary/10 md:group-hover:to-secondary/15"
                    )}
                  >
                    <span className="text-sm font-bold text-foreground">{presentation.size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </CardContent>
    </Card>
  )
}

function FilterBar({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: { 
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void 
}) {
  return (
    <div className="flex flex-wrap gap-2.5 md:gap-3 justify-center mb-12 px-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-5 py-2.5 md:px-6 md:py-3 rounded-full border-2 font-bold text-xs md:text-sm uppercase tracking-wider",
            "transition-all duration-300 ease-out",
            "backdrop-blur-sm",
            selectedCategory === category
              ? "bg-secondary border-secondary text-secondary-foreground shadow-lg scale-105 md:scale-110"
              : "bg-white/90 border-primary-foreground/20 text-foreground/80 hover:border-secondary/60 hover:bg-secondary/5 hover:text-foreground hover:scale-105"
          )}
          aria-label={`Filtrar por ${category}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

// Componente optimizado para grid de productos con animaciones controladas
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCardWrapper key={product.name} product={product} />
      ))}
    </div>
  )
}

// Wrapper simplificado - la animación se maneja con CSS cuando el componente se renderiza
// LazySection ya maneja la carga diferida, solo aplicamos animación visual
function ProductCardWrapper({ product }: { product: Product }) {
  return (
    <div className="opacity-0 animate-fade-in">
      <ProductCard product={product} />
    </div>
  )
}

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos")
  
  // Obtener todas las categorías únicas - memoizado
  const categories = useMemo(() => 
    ["Todos", ...Array.from(new Set(products.map(p => p.category)))],
    []
  )
  
  // Filtrar productos según la categoría seleccionada - memoizado
  const filteredProducts = useMemo(() => 
    selectedCategory === "Todos" 
      ? products 
      : products.filter(product => product.category === selectedCategory),
    [selectedCategory]
  )

  return (
    <section id="products" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      <SectionBackground variant="primary" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={{ icon: Palette, text: "Productos" }}
          title="Nuestros"
          subtitle="Productos"
          description="Ofrecemos una amplia gama de productos de pintura de la más alta calidad. Desde pinturas para interiores hasta productos especializados para cada necesidad."
          className="text-primary-foreground [&_p]:text-primary-foreground/80"
        />

        <FilterBar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  )
}
