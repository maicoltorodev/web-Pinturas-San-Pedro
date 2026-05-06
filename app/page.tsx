import { getSiteData } from "@/lib/site-data"
import { HomeClient } from "./home-client"

export default async function Home() {
  const data = await getSiteData()
  return <HomeClient data={data} />
}
