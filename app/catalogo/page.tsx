import { getCatalogData } from "@/lib/site-data"
import { CatalogoClient } from "./catalogo-client"

export default async function CatalogoPage() {
    const data = await getCatalogData()
    return <CatalogoClient catalogData={data} />
}
