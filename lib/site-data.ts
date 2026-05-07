import { promises as fs } from "fs"
import path from "path"

/**
 * Capa de datos editables del CATÁLOGO. Single source of truth en
 * `data/site-data.json`. El admin escribe aquí; el catálogo lee de aquí.
 *
 * El server action que llama `updateCatalogData` debe seguir con
 * `revalidatePath("/catalogo")` para regenerar la página estática (ISR
 * on-demand).
 *
 * NOTA: filesystem writes funcionan en dev (incluyendo network IP de tablet).
 * En Vercel runtime el FS es read-only — para producción habría que migrar a
 * Vercel KV / Upstash Redis. Para el demo del cliente: works as-is.
 */

export type CatalogCover = {
    ribbonText: string
    tagline: string
    location: string
}

export type CatalogColorChip = {
    code: string
    name: string
}

export type CatalogMainProduct = {
    label: string
    blurb: string
}

export type CatalogComplementario = {
    label: string
    displayName: string
}

export type CatalogFachadas = {
    title: string
    colorChip: CatalogColorChip
    mainProducts: CatalogMainProduct[]
    complementarios: CatalogComplementario[]
}

export type CatalogData = {
    cover: CatalogCover
    fachadas: CatalogFachadas
}

const DATA_PATH = path.join(process.cwd(), "data", "site-data.json")

const FALLBACK: CatalogData = {
    cover: {
        ribbonText: "Catálogo · 2026",
        tagline: "CREAMOS COLOR!",
        location: "Bogotá · Colombia",
    },
    fachadas: {
        title: "Fachadas",
        colorChip: { code: "PSP-001", name: "Azul San Pedro" },
        mainProducts: [
            { label: "A", blurb: "Mate de alta cobertura para muros exteriores." },
            { label: "B", blurb: "Protege rejas, portones y estructuras metálicas." },
        ],
        complementarios: [
            { label: "C", displayName: "Estuco Acrílico" },
            { label: "D", displayName: "Brocha Premium" },
            { label: "E", displayName: "Rodillo Profesional" },
        ],
    },
}

export async function getCatalogData(): Promise<CatalogData> {
    try {
        const raw = await fs.readFile(DATA_PATH, "utf-8")
        return JSON.parse(raw) as CatalogData
    } catch {
        return FALLBACK
    }
}

export async function updateCatalogData(data: CatalogData): Promise<void> {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true })
    await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8")
}
