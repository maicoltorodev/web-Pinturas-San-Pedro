import { promises as fs } from "fs"
import path from "path"

/**
 * Capa de datos editables del sitio. Single source of truth en `data/site-data.json`.
 *
 * Lectura cacheada con `unstable_cache` + tag — invalidación on-demand desde el
 * server action del admin via `revalidateTag('site-data')`. Esto habilita ISR:
 * el sitio público sirve estático, pero al guardar en /admin se regenera la
 * próxima request.
 *
 * NOTA: filesystem writes funcionan en dev (incluyendo network IP de tablet).
 * En Vercel runtime el FS es read-only — para producción habría que migrar a
 * Vercel KV / Upstash Redis. Para el demo del cliente: works as-is.
 */

export type SiteStat = {
    number: string
    label: string
}

export type SiteData = {
    businessInfo: {
        phone: string
        additionalPhones: string[]
        email: string
        address: string
    }
    hours: {
        weekdays: string
        saturday: string
        sunday: string
    }
    hero: {
        tagline: string
        description: string
    }
    stats: SiteStat[]
}

const DATA_PATH = path.join(process.cwd(), "data", "site-data.json")

const FALLBACK: SiteData = {
    businessInfo: {
        phone: "+573223716811",
        additionalPhones: ["+573112297182", "+573224579483", "+573116048063"],
        email: "pinturassanpedro@hotmail.com",
        address: "Calle 132D N 145A-02, Bogotá",
    },
    hours: {
        weekdays: "7am - 6pm",
        saturday: "7am - 5pm",
        sunday: "8am - 1pm",
    },
    hero: {
        tagline: "CREAMOS COLOR!",
        description: "Pinturas de la más alta calidad. Calidad certificada, más de 30 años de experiencia.",
    },
    stats: [
        { number: "30+", label: "Años de Experiencia" },
        { number: "500+", label: "Clientes Satisfechos" },
        { number: "100%", label: "Satisfacción" },
    ],
}

/**
 * Lee el JSON. Si falla (no existe / corrupto) usa fallback.
 * El `revalidatePath` del server action invalida el render, lo cual incluye
 * las llamadas a fs.readFile dentro del render — así se mantiene la coherencia
 * sin necesidad de un layer de cache adicional.
 */
export async function getSiteData(): Promise<SiteData> {
    try {
        const raw = await fs.readFile(DATA_PATH, "utf-8")
        return JSON.parse(raw) as SiteData
    } catch {
        return FALLBACK
    }
}

/**
 * Escribe el JSON. Llamar desde un Server Action que después haga
 * `revalidatePath` de las rutas afectadas.
 */
export async function updateSiteData(data: SiteData): Promise<void> {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8")
}
