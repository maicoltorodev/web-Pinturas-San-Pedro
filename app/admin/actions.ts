"use server"

import { revalidatePath } from "next/cache"
import { type SiteData, updateSiteData } from "@/lib/site-data"

/**
 * Server action: guarda los datos del admin y revalida las rutas afectadas.
 * `updateSiteData` ya hace `revalidateTag('site-data')` para invalidar el
 * cache de la lectura. Adicionalmente forzamos revalidación de las rutas
 * estáticas para que ISR las regenere en la próxima visita.
 */
export async function saveSiteData(data: SiteData): Promise<{ success: true; savedAt: number }> {
    await updateSiteData(data)
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, savedAt: Date.now() }
}
