import { ImageResponse } from "next/og"
import { readFileSync } from "fs"
import { join } from "path"

export const alt = "Catálogo de Vinilos | Pinturas San Pedro"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  const logoData = readFileSync(join(process.cwd(), "public/logo-og.png"))
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0c1830 0%, #172554 55%, #1e3a8a 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Blob decorativo superior derecho */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "200px", background: "rgba(251,191,36,0.12)", display: "flex" }} />
        {/* Blob decorativo inferior izquierdo */}
        <div style={{ position: "absolute", bottom: "-100px", left: "-60px", width: "500px", height: "500px", borderRadius: "250px", background: "rgba(29,78,216,0.25)", display: "flex" }} />

        {/* Contenido principal */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 10 }}>
          {/* Logo */}
          <img
            src={logoSrc}
            width={320}
            height={200}
            style={{ objectFit: "contain", marginBottom: "16px" }}
          />

          {/* Título */}
          <div style={{ fontSize: "108px", fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: "-2px", textAlign: "center", display: "flex" }}>
            Catálogo
          </div>

          {/* Subtítulo */}
          <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.5)", marginTop: "20px", letterSpacing: "3px", display: "flex" }}>
            VINILOS · INTERIORES · EXTERIORES
          </div>
        </div>

        {/* Swatches */}
        <div style={{ position: "absolute", bottom: "52px", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "18px", background: "#f8faff", border: "2px solid rgba(255,255,255,0.2)", display: "flex" }} />
          <div style={{ width: "36px", height: "36px", borderRadius: "18px", background: "#1d4ed8", border: "2px solid rgba(255,255,255,0.2)", display: "flex" }} />
          <div style={{ width: "36px", height: "36px", borderRadius: "18px", background: "#fde047", border: "2px solid rgba(255,255,255,0.2)", display: "flex" }} />
          <div style={{ width: "36px", height: "36px", borderRadius: "18px", background: "#0c1830", border: "2px solid rgba(255,255,255,0.2)", display: "flex" }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
