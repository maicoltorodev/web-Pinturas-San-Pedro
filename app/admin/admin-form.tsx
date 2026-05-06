"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, Clock, ImageIcon, Save, Sparkles, Check, ExternalLink } from "lucide-react"
import { type SiteData, type SiteStat } from "@/lib/site-data"
import { saveSiteData } from "./actions"

type Tab = "info" | "hours" | "hero" | "stats"

const TABS: { id: Tab; label: string; icon: typeof Building2 }[] = [
    { id: "info", label: "Información", icon: Building2 },
    { id: "hero", label: "Inicio", icon: Sparkles },
    { id: "hours", label: "Horarios", icon: Clock },
    { id: "stats", label: "Estadísticas", icon: ImageIcon },
]

export function AdminForm({ initialData }: { initialData: SiteData }) {
    const [tab, setTab] = useState<Tab>("info")
    const [data, setData] = useState<SiteData>(initialData)
    const [isPending, startTransition] = useTransition()
    const [savedAt, setSavedAt] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)

    const dirty = JSON.stringify(data) !== JSON.stringify(initialData)

    const onSave = () => {
        setError(null)
        startTransition(async () => {
            try {
                const result = await saveSiteData(data)
                setSavedAt(result.savedAt)
                // Hide toast after 3s
                setTimeout(() => setSavedAt(null), 3000)
            } catch (e) {
                setError(e instanceof Error ? e.message : "Error guardando")
            }
        })
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[oklch(0.32_0.18_252)] flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-[oklch(0.82_0.18_90)]" />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-base font-bold leading-tight truncate">Panel de Administración</h1>
                            <p className="text-xs text-slate-500 leading-tight truncate">Pinturas San Pedro</p>
                        </div>
                    </div>
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[oklch(0.32_0.18_252)] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline">Ver sitio</span>
                    </Link>
                </div>
            </header>

            {/* Tabs */}
            <nav className="bg-white border-b border-slate-200 sticky top-16 z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
                    {TABS.map((t) => {
                        const Icon = t.icon
                        const active = tab === t.id
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTab(t.id)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                                    active
                                        ? "text-[oklch(0.32_0.18_252)] border-[oklch(0.82_0.18_90)]"
                                        : "text-slate-500 border-transparent hover:text-slate-900"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {t.label}
                            </button>
                        )
                    })}
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-32">
                {tab === "info" && (
                    <Section title="Información del Negocio" subtitle="Datos de contacto que aparecen en el footer y la sección de contacto.">
                        <Field label="Teléfono principal">
                            <Input
                                value={data.businessInfo.phone}
                                onChange={(v) => setData({ ...data, businessInfo: { ...data.businessInfo, phone: v } })}
                            />
                        </Field>
                        <Field label="Teléfonos adicionales" hint="Uno por línea">
                            <Textarea
                                rows={3}
                                value={data.businessInfo.additionalPhones.join("\n")}
                                onChange={(v) =>
                                    setData({
                                        ...data,
                                        businessInfo: {
                                            ...data.businessInfo,
                                            additionalPhones: v.split("\n").map((s) => s.trim()).filter(Boolean),
                                        },
                                    })
                                }
                            />
                        </Field>
                        <Field label="Email">
                            <Input
                                type="email"
                                value={data.businessInfo.email}
                                onChange={(v) => setData({ ...data, businessInfo: { ...data.businessInfo, email: v } })}
                            />
                        </Field>
                        <Field label="Dirección">
                            <Input
                                value={data.businessInfo.address}
                                onChange={(v) => setData({ ...data, businessInfo: { ...data.businessInfo, address: v } })}
                            />
                        </Field>
                    </Section>
                )}

                {tab === "hero" && (
                    <Section title="Sección de Inicio" subtitle="El texto grande que ven los visitantes al entrar al sitio.">
                        <Field label="Lema (CREAMOS COLOR!)" hint="Aparece debajo del logo, en mayúsculas con líneas a los lados.">
                            <Input
                                value={data.hero.tagline}
                                onChange={(v) => setData({ ...data, hero: { ...data.hero, tagline: v } })}
                            />
                        </Field>
                        <Field label="Descripción" hint="Texto descriptivo bajo el lema.">
                            <Textarea
                                rows={3}
                                value={data.hero.description}
                                onChange={(v) => setData({ ...data, hero: { ...data.hero, description: v } })}
                            />
                        </Field>
                    </Section>
                )}

                {tab === "hours" && (
                    <Section title="Horarios de Atención" subtitle="Los horarios aparecen en el footer y en la sección de contacto.">
                        <Field label="Lunes - Viernes">
                            <Input
                                value={data.hours.weekdays}
                                onChange={(v) => setData({ ...data, hours: { ...data.hours, weekdays: v } })}
                            />
                        </Field>
                        <Field label="Sábado">
                            <Input
                                value={data.hours.saturday}
                                onChange={(v) => setData({ ...data, hours: { ...data.hours, saturday: v } })}
                            />
                        </Field>
                        <Field label="Domingo">
                            <Input
                                value={data.hours.sunday}
                                onChange={(v) => setData({ ...data, hours: { ...data.hours, sunday: v } })}
                            />
                        </Field>
                    </Section>
                )}

                {tab === "stats" && (
                    <Section title="Estadísticas" subtitle="Las 3 cifras que aparecen en el hero (años de experiencia, clientes, etc).">
                        {data.stats.map((stat, idx) => (
                            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label={`Cifra ${idx + 1} — Número`}>
                                    <Input
                                        value={stat.number}
                                        onChange={(v) => {
                                            const next = [...data.stats]
                                            next[idx] = { ...next[idx], number: v }
                                            setData({ ...data, stats: next })
                                        }}
                                    />
                                </Field>
                                <Field label={`Cifra ${idx + 1} — Etiqueta`}>
                                    <Input
                                        value={stat.label}
                                        onChange={(v) => {
                                            const next: SiteStat[] = [...data.stats]
                                            next[idx] = { ...next[idx], label: v }
                                            setData({ ...data, stats: next })
                                        }}
                                    />
                                </Field>
                            </div>
                        ))}
                    </Section>
                )}
            </main>

            {/* Footer/Save bar */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                        {dirty ? (
                            <span className="text-xs sm:text-sm text-amber-600 font-medium flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                Cambios sin guardar
                            </span>
                        ) : (
                            <span className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                                <Check className="w-4 h-4" />
                                Todo al día
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onSave}
                        disabled={!dirty || isPending}
                        className="inline-flex items-center gap-2 bg-[oklch(0.32_0.18_252)] hover:bg-[oklch(0.28_0.18_252)] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-md"
                    >
                        {isPending ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Guardar cambios
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Toast */}
            {savedAt && (
                <div
                    role="status"
                    className="fixed top-20 right-4 sm:right-6 z-40 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300"
                >
                    <Check className="w-5 h-5" />
                    <span className="font-semibold text-sm">Cambios guardados — el sitio se actualizó</span>
                </div>
            )}

            {/* Error */}
            {error && (
                <div
                    role="alert"
                    className="fixed top-20 right-4 sm:right-6 z-40 bg-red-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2"
                >
                    <span className="font-semibold text-sm">Error: {error}</span>
                </div>
            )}

            {/* Back link discreto en mobile */}
            <Link
                href="/"
                className="fixed bottom-20 left-4 sm:hidden text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 z-20"
            >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver al sitio
            </Link>
        </div>
    )
}

/* ── UI helpers ───────────────────────────────────────────────────────────── */

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-slate-100">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
            </div>
            <div className="px-5 sm:px-6 py-5 space-y-5">{children}</div>
        </div>
    )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold text-slate-700">{label}</span>
                {hint && <span className="text-xs text-slate-400">{hint}</span>}
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
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[oklch(0.32_0.18_252)] focus:ring-2 focus:ring-[oklch(0.32_0.18_252_/_0.15)] transition-colors"
        />
    )
}

function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
    return (
        <textarea
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-mono focus:outline-none focus:border-[oklch(0.32_0.18_252)] focus:ring-2 focus:ring-[oklch(0.32_0.18_252_/_0.15)] transition-colors resize-y"
        />
    )
}
