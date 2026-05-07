"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Building2, Save, Check, ExternalLink } from "lucide-react"
import { type CatalogData } from "@/lib/site-data"
import { saveCatalogData } from "./actions"

type Tab = "cover" | "fachadas"

const TABS: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: "cover", label: "Portada", icon: BookOpen },
    { id: "fachadas", label: "Fachadas", icon: Building2 },
]

export function AdminForm({ initialData }: { initialData: CatalogData }) {
    const [tab, setTab] = useState<Tab>("cover")
    const [data, setData] = useState<CatalogData>(initialData)
    const [isPending, startTransition] = useTransition()
    const [savedAt, setSavedAt] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const dirty = JSON.stringify(data) !== JSON.stringify(initialData)

    const onSave = () => {
        setError(null)
        startTransition(async () => {
            try {
                const result = await saveCatalogData(data)
                setSavedAt(result.savedAt)
                setTimeout(() => setSavedAt(null), 3000)
            } catch (e) {
                setError(e instanceof Error ? e.message : "Error guardando")
            }
        })
    }

    return (
        <div
            className="min-h-screen relative"
            style={{
                background: "var(--color-primary)",
                color: "#ffffff",
            }}
        >
            {/* Círculos amarillos decorativos — referencia a la fachada */}
            <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                <div style={{
                    position: "absolute",
                    top: "-12vw", right: "-12vw",
                    width: "32vw", height: "32vw",
                    maxWidth: "320px", maxHeight: "320px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                    opacity: 0.85,
                }} />
                <div style={{
                    position: "absolute",
                    bottom: "-10vw", left: "-10vw",
                    width: "26vw", height: "26vw",
                    maxWidth: "260px", maxHeight: "260px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                    opacity: 0.85,
                }} />
            </div>

            {/* Marco interior — mismo lenguaje del catálogo */}
            <div
                aria-hidden
                style={{
                    position: "fixed",
                    inset: "7px",
                    border: "1px solid color-mix(in srgb, var(--color-secondary) 38%, transparent)",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            {/* Cinta amarilla con título — mismo lenguaje de la portada del catálogo */}
            <header
                style={{
                    position: "relative",
                    zIndex: 5,
                    background: "linear-gradient(180deg, #fde68a 0%, var(--color-secondary) 45%, #b45309 100%)",
                    boxShadow:
                        "0 10px 24px rgba(0,0,0,0.28), " +
                        "inset 0 1px 0 rgba(255,255,255,0.55), " +
                        "inset 0 -2px 0 rgba(120,53,15,0.25)",
                    padding: "clamp(0.9rem, 3.2vh, 1.3rem) clamp(1rem, 4vw, 2rem)",
                    paddingTop: "calc(env(safe-area-inset-top, 0px) + clamp(0.9rem, 3.2vh, 1.3rem))",
                    overflow: "hidden",
                }}
            >
                {/* Líneas de costura */}
                <div aria-hidden style={{ position: "absolute", top: "6px", left: 0, right: 0, height: "1px", background: "rgba(120,53,15,0.30)" }} />
                <div aria-hidden style={{ position: "absolute", bottom: "6px", left: 0, right: 0, height: "1px", background: "rgba(120,53,15,0.30)" }} />

                <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <h1 style={{
                            margin: 0,
                            fontStyle: "italic",
                            fontWeight: 900,
                            fontSize: "clamp(1.3rem, 5vw, 2rem)",
                            lineHeight: 1,
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            color: "var(--color-primary)",
                            textShadow: "0 1px 0 rgba(255,255,255,0.3)",
                        }}>
                            Admin
                        </h1>
                        <span style={{
                            fontSize: "clamp(9px, 2vw, 11px)",
                            fontWeight: 800,
                            letterSpacing: "0.32em",
                            textTransform: "uppercase",
                            color: "rgba(11,21,48,0.7)",
                            lineHeight: 1,
                        }}>
                            Pinturas San Pedro
                        </span>
                    </div>
                    <Link
                        href="/catalogo"
                        target="_blank"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.5rem 0.85rem",
                            borderRadius: "999px",
                            backgroundColor: "rgba(11,21,48,0.85)",
                            color: "#ffffff",
                            border: "1px solid rgba(11,21,48,0.4)",
                            fontSize: "11px",
                            fontWeight: 800,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Ver Catálogo</span>
                    </Link>
                </div>
            </header>

            {/* Tabs */}
            <nav className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="flex gap-1 border-b border-white/10">
                    {TABS.map((t) => {
                        const Icon = t.icon
                        const active = tab === t.id
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className="flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors"
                                style={{
                                    color: active ? "var(--color-secondary)" : "rgba(255,255,255,0.55)",
                                    borderColor: active ? "var(--color-secondary)" : "transparent",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                }}
                            >
                                <Icon className="w-4 h-4" />
                                {t.label}
                            </button>
                        )
                    })}
                </div>
            </nav>

            {/* Content */}
            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-32">
                {tab === "cover" && (
                    <Section
                        title="Portada del Catálogo"
                        subtitle="La página inicial del catálogo — lo primero que ven los clientes."
                    >
                        <Field label="Cinta superior" hint="El texto en la cinta diagonal amarilla.">
                            <Input
                                value={data.cover.ribbonText}
                                onChange={(v) => setData({ ...data, cover: { ...data.cover, ribbonText: v } })}
                            />
                        </Field>
                        <Field label="Lema" hint="El lema bajo el logo (en italic).">
                            <Input
                                value={data.cover.tagline}
                                onChange={(v) => setData({ ...data, cover: { ...data.cover, tagline: v } })}
                            />
                        </Field>
                        <Field label="Ubicación lateral" hint="Texto vertical en el lateral izquierdo.">
                            <Input
                                value={data.cover.location}
                                onChange={(v) => setData({ ...data, cover: { ...data.cover, location: v } })}
                            />
                        </Field>
                    </Section>
                )}

                {tab === "fachadas" && (
                    <div className="space-y-6">
                        <Section title="Fachadas — Encabezado" subtitle="El título y el chip de color que aparecen en la página de Fachadas.">
                            <Field label="Título de la categoría">
                                <Input
                                    value={data.fachadas.title}
                                    onChange={(v) => setData({ ...data, fachadas: { ...data.fachadas, title: v } })}
                                />
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Código del color destacado">
                                    <Input
                                        value={data.fachadas.colorChip.code}
                                        onChange={(v) =>
                                            setData({
                                                ...data,
                                                fachadas: { ...data.fachadas, colorChip: { ...data.fachadas.colorChip, code: v } },
                                            })
                                        }
                                    />
                                </Field>
                                <Field label="Nombre del color destacado">
                                    <Input
                                        value={data.fachadas.colorChip.name}
                                        onChange={(v) =>
                                            setData({
                                                ...data,
                                                fachadas: { ...data.fachadas, colorChip: { ...data.fachadas.colorChip, name: v } },
                                            })
                                        }
                                    />
                                </Field>
                            </div>
                        </Section>

                        <Section title="Productos Principales" subtitle="Las cards A y B con el blurb que describe cada producto.">
                            {data.fachadas.mainProducts.map((p, idx) => (
                                <Field key={idx} label={`Card ${p.label} — Descripción corta`}>
                                    <Textarea
                                        rows={2}
                                        value={p.blurb}
                                        onChange={(v) => {
                                            const next = [...data.fachadas.mainProducts]
                                            next[idx] = { ...next[idx], blurb: v }
                                            setData({ ...data, fachadas: { ...data.fachadas, mainProducts: next } })
                                        }}
                                    />
                                </Field>
                            ))}
                        </Section>

                        <Section title="Complementarios" subtitle="Los nombres que se muestran en las mini-cards C, D y E.">
                            {data.fachadas.complementarios.map((c, idx) => (
                                <Field key={idx} label={`Mini-card ${c.label}`}>
                                    <Input
                                        value={c.displayName}
                                        onChange={(v) => {
                                            const next = [...data.fachadas.complementarios]
                                            next[idx] = { ...next[idx], displayName: v }
                                            setData({ ...data, fachadas: { ...data.fachadas, complementarios: next } })
                                        }}
                                    />
                                </Field>
                            ))}
                        </Section>
                    </div>
                )}
            </main>

            {/* Save bar — fixed bottom */}
            <div
                className="fixed bottom-0 inset-x-0 z-30"
                style={{
                    background: "rgba(4,8,28,0.92)",
                    backdropFilter: "blur(12px)",
                    borderTop: "1px solid color-mix(in srgb, var(--color-secondary) 25%, transparent)",
                }}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                        {dirty ? (
                            <span style={{
                                fontSize: "clamp(11px, 2.5vw, 13px)",
                                fontWeight: 700,
                                color: "var(--color-secondary)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}>
                                <span style={{
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--color-secondary)",
                                    animation: "pulse 1.5s ease-in-out infinite",
                                }} />
                                Cambios sin guardar
                            </span>
                        ) : (
                            <span style={{
                                fontSize: "clamp(11px, 2.5vw, 13px)",
                                color: "rgba(255,255,255,0.55)",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                            }}>
                                <Check className="w-4 h-4" />
                                Todo al día
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onSave}
                        disabled={!dirty || isPending}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: dirty && !isPending
                                ? "linear-gradient(180deg, #fde68a 0%, var(--color-secondary) 45%, #b45309 100%)"
                                : "rgba(255,255,255,0.15)",
                            color: dirty && !isPending ? "var(--color-primary)" : "rgba(255,255,255,0.5)",
                            fontWeight: 900,
                            fontSize: "clamp(12px, 2.6vw, 14px)",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            padding: "0.7rem 1.25rem",
                            borderRadius: "999px",
                            border: "1px solid rgba(255,255,255,0.15)",
                            cursor: dirty && !isPending ? "pointer" : "not-allowed",
                            boxShadow: dirty && !isPending ? "0 6px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)" : "none",
                            transition: "transform 200ms ease",
                            fontStyle: "italic",
                        }}
                    >
                        {isPending ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                Guardando
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Guardar
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Toast success */}
            {savedAt && (
                <div
                    role="status"
                    style={{
                        position: "fixed",
                        top: "calc(env(safe-area-inset-top, 0px) + 5rem)",
                        right: "1rem",
                        zIndex: 40,
                        background: "linear-gradient(180deg, #fde68a 0%, var(--color-secondary) 45%, #b45309 100%)",
                        color: "var(--color-primary)",
                        padding: "0.85rem 1.25rem",
                        borderRadius: "999px",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontWeight: 900,
                        fontSize: "13px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                    }}
                    className="animate-in fade-in slide-in-from-top-2 duration-300"
                >
                    <Check className="w-5 h-5" />
                    <span>Catálogo actualizado</span>
                </div>
            )}

            {error && (
                <div
                    role="alert"
                    style={{
                        position: "fixed",
                        top: "calc(env(safe-area-inset-top, 0px) + 5rem)",
                        right: "1rem",
                        zIndex: 40,
                        background: "#dc2626",
                        color: "#ffffff",
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        fontSize: "13px",
                        fontWeight: 700,
                    }}
                >
                    Error: {error}
                </div>
            )}

            {/* Back link mobile */}
            <Link
                href="/catalogo"
                className="fixed bottom-20 left-4 sm:hidden z-20"
                style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    textDecoration: "none",
                }}
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Catálogo
            </Link>

            <style>{`
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
            `}</style>
        </div>
    )
}

/* ── UI helpers ───────────────────────────────────────────────────────────── */

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <div
            style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(251,191,36,0.22)",
                borderRadius: "16px",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    padding: "1.1rem 1.25rem",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <h2 style={{
                    margin: 0,
                    fontSize: "clamp(15px, 3vw, 18px)",
                    fontWeight: 900,
                    fontStyle: "italic",
                    color: "#ffffff",
                    letterSpacing: "0.01em",
                }}>
                    {title}
                </h2>
                <p style={{
                    margin: "4px 0 0",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                }}>
                    {subtitle}
                </p>
            </div>
            <div className="p-5 space-y-4">{children}</div>
        </div>
    )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <div className="flex items-center justify-between mb-1.5">
                <span style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-secondary)",
                }}>
                    {label}
                </span>
                {hint && (
                    <span style={{
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.4)",
                    }}>
                        {hint}
                    </span>
                )}
            </div>
            {children}
        </label>
    )
}

function Input({ value, onChange, type = "text" }: { value: string; onChange: (v: string) => void; type?: string }) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: "100%",
                padding: "0.7rem 0.9rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(0,0,0,0.25)",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 200ms ease, box-shadow 200ms ease",
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-secondary)"
                e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-secondary) 18%, transparent)"
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"
                e.currentTarget.style.boxShadow = "none"
            }}
        />
    )
}

function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
    return (
        <textarea
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: "100%",
                padding: "0.7rem 0.9rem",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "rgba(0,0,0,0.25)",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: 1.5,
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-secondary)"
                e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--color-secondary) 18%, transparent)"
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"
                e.currentTarget.style.boxShadow = "none"
            }}
        />
    )
}
