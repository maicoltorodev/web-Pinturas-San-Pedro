import type { Metadata } from "next"
import { getCatalogData } from "@/lib/site-data"
import { AdminForm } from "./admin-form"

export const metadata: Metadata = {
    title: "Panel de Administración — Pinturas San Pedro",
    description: "Gestiona el contenido del catálogo",
    robots: { index: false, follow: false },
}

export default async function AdminPage() {
    const data = await getCatalogData()
    return <AdminForm initialData={data} />
}
