import type { Metadata } from "next"
import { getSiteData } from "@/lib/site-data"
import { AdminForm } from "./admin-form"

export const metadata: Metadata = {
    title: "Panel de Administración — Pinturas San Pedro",
    description: "Gestiona el contenido del sitio",
    robots: { index: false, follow: false },
}

export default async function AdminPage() {
    const data = await getSiteData()
    return <AdminForm initialData={data} />
}
