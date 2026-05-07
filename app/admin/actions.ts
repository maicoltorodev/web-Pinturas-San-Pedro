"use server"

import { revalidatePath } from "next/cache"
import { type CatalogData, updateCatalogData } from "@/lib/site-data"

/**
 * Server action: guarda los datos del catálogo y revalida la ruta del catálogo
 * para que ISR la regenere en la próxima visita.
 */
export async function saveCatalogData(data: CatalogData): Promise<{ success: true; savedAt: number }> {
    await updateCatalogData(data)
    revalidatePath("/catalogo")
    revalidatePath("/admin")
    return { success: true, savedAt: Date.now() }
}
