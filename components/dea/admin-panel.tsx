"use client"

import React from "react"
import { useState, useRef } from "react"
import { Settings, X, Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConfig } from "@/components/providers/config-provider"
import { ImageIcon } from "lucide-react"

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"logo" | "header" | "hero" | "stats" | "about" | "resources" | "news" | "fugitives" | "quote" | "statement" | "scam" | "footer">("logo")
  const { config, updateConfig, updateStat, addStat, removeStat, updateFugitive, addFugitive, removeFugitive, updateNews, addNews, removeNews, updateResource, addResource, removeResource } = useConfig()
  const logoInputRef = useRef<HTMLInputElement>(null)
  const heroImageRef = useRef<HTMLInputElement>(null)
  const fugitiveImageRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateConfig({ logoUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateConfig({ heroBackgroundUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFugitiveImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateFugitive(index, { imageUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { key: "logo", label: "Logo" },
    { key: "header", label: "Header" },
    { key: "hero", label: "Hero Banner" },
    { key: "quote", label: "Citat" },
    { key: "stats", label: "Statistiky" },
    { key: "about", label: "O DEA" },
    { key: "resources", label: "Zdroje" },
    { key: "news", label: "Novinky" },
    { key: "fugitives", label: "Hledani" },
    { key: "statement", label: "Prohlaseni" },
    { key: "scam", label: "Scam Alert" },
    { key: "footer", label: "Paticka" },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#112e51] text-white p-4 rounded-full shadow-lg hover:bg-[#0a1e3a] transition-colors"
        title="Admin Panel"
      >
        <Settings className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
            <div className="bg-[#112e51] text-white p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Admin Panel - Uprava vsech textu</h2>
              <button onClick={() => setIsOpen(false)} className="hover:text-[#fdb81e]">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex border-b bg-gray-50 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`px-3 py-2 font-semibold text-xs transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-white text-[#112e51] border-b-2 border-[#fdb81e]"
                      : "text-gray-600 hover:text-[#112e51]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {/* Logo Tab */}
              {activeTab === "logo" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Logo nastaveni</h3>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {config.logoUrl ? (
                        <img src={config.logoUrl || "/placeholder.svg"} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => logoInputRef.current?.click()}
                        className="bg-[#112e51] hover:bg-[#0a1e3a] text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Nahrat logo
                      </Button>
                      {config.logoUrl && (
                        <Button
                          onClick={() => updateConfig({ logoUrl: "" })}
                          variant="outline"
                          className="ml-2"
                        >
                          Odstranit
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Text v logu (pokud neni obrazek)
                    </label>
                    <input
                      type="text"
                      value={config.logoText}
                      onChange={(e) => updateConfig({ logoText: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>
                </div>
              )}

              {/* Header Tab */}
              {activeTab === "header" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Header texty</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (EN)</label>
                      <input
                        type="text"
                        value={config.headerTitle}
                        onChange={(e) => updateConfig({ headerTitle: e.target.value })}
                        placeholder="United States"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (ES)</label>
                      <input
                        type="text"
                        value={config.headerTitleEs}
                        onChange={(e) => updateConfig({ headerTitleEs: e.target.value })}
                        placeholder="Estados Unidos"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Podnadpis (EN)</label>
                      <input
                        type="text"
                        value={config.headerSubtitle}
                        onChange={(e) => updateConfig({ headerSubtitle: e.target.value })}
                        placeholder="Drug Enforcement Administration"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Podnadpis (ES)</label>
                      <input
                        type="text"
                        value={config.headerSubtitleEs}
                        onChange={(e) => updateConfig({ headerSubtitleEs: e.target.value })}
                        placeholder="Administracion de Control de Drogas"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Banner Tab */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Hero Banner</h3>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-48 h-32 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {config.heroBackgroundUrl ? (
                        <img src={config.heroBackgroundUrl || "/placeholder.svg"} alt="Hero" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <input
                        ref={heroImageRef}
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => heroImageRef.current?.click()}
                        className="bg-[#112e51] hover:bg-[#0a1e3a] text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Nahrat pozadi
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (EN)</label>
                      <input
                        type="text"
                        value={config.heroTitle}
                        onChange={(e) => updateConfig({ heroTitle: e.target.value })}
                        placeholder="DEA Administrator's Statement..."
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (ES)</label>
                      <input
                        type="text"
                        value={config.heroTitleEs}
                        onChange={(e) => updateConfig({ heroTitleEs: e.target.value })}
                        placeholder="Declaracion del Administrador..."
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Podnadpis (EN)</label>
                      <input
                        type="text"
                        value={config.heroSubtitle}
                        onChange={(e) => updateConfig({ heroSubtitle: e.target.value })}
                        placeholder="Read the full statement..."
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Podnadpis (ES)</label>
                      <input
                        type="text"
                        value={config.heroSubtitleEs}
                        onChange={(e) => updateConfig({ heroSubtitleEs: e.target.value })}
                        placeholder="Lea la declaracion completa..."
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Text tlacitka (EN)</label>
                      <input
                        type="text"
                        value={config.heroButtonText}
                        onChange={(e) => updateConfig({ heroButtonText: e.target.value })}
                        placeholder="Read Statement"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Text tlacitka (ES)</label>
                      <input
                        type="text"
                        value={config.heroButtonTextEs}
                        onChange={(e) => updateConfig({ heroButtonTextEs: e.target.value })}
                        placeholder="Leer Declaracion"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Quote Tab */}
              {activeTab === "quote" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Citat sekce</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Citat (EN)</label>
                    <textarea
                      value={config.quoteText}
                      onChange={(e) => updateConfig({ quoteText: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Citat (ES)</label>
                    <textarea
                      value={config.quoteTextEs}
                      onChange={(e) => updateConfig({ quoteTextEs: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Autor (jmeno)</label>
                    <input
                      type="text"
                      value={config.quoteAuthor}
                      onChange={(e) => updateConfig({ quoteAuthor: e.target.value })}
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Titul (EN)</label>
                      <input
                        type="text"
                        value={config.quoteTitle}
                        onChange={(e) => updateConfig({ quoteTitle: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Titul (ES)</label>
                      <input
                        type="text"
                        value={config.quoteTitleEs}
                        onChange={(e) => updateConfig({ quoteTitleEs: e.target.value })}
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === "stats" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Drug Seizures - Statistiky</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (EN)</label>
                      <input
                        type="text"
                        value={config.statsTitle}
                        onChange={(e) => updateConfig({ statsTitle: e.target.value })}
                        placeholder="DEA 2026 Drug Seizures"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (ES)</label>
                      <input
                        type="text"
                        value={config.statsTitleEs}
                        onChange={(e) => updateConfig({ statsTitleEs: e.target.value })}
                        placeholder="Incautaciones de Drogas DEA 2026"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Datum aktualizace (EN)</label>
                      <input
                        type="text"
                        value={config.statsLastUpdated}
                        onChange={(e) => updateConfig({ statsLastUpdated: e.target.value })}
                        placeholder="January 30, 2026"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Datum aktualizace (ES)</label>
                      <input
                        type="text"
                        value={config.statsLastUpdatedEs}
                        onChange={(e) => updateConfig({ statsLastUpdatedEs: e.target.value })}
                        placeholder="30 de enero de 2026"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-700">Statistiky</h4>
                      <Button
                        onClick={() => addStat({ label: "New Stat", value: "0", sublabel: "" })}
                        size="sm"
                        className="bg-[#112e51] hover:bg-[#0a1e3a] text-white"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Pridat
                      </Button>
                    </div>

                    {config.stats.map((stat, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 border">
                        <div className="flex items-start justify-between mb-3">
                          <span className="font-semibold text-sm text-gray-600">Stat #{idx + 1}</span>
                          <button
                            onClick={() => removeStat(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Hodnota</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateStat(idx, { value: e.target.value })}
                              className="w-full border border-gray-300 px-2 py-1 text-sm"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Popis</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateStat(idx, { label: e.target.value })}
                              className="w-full border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Pills Seized"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Podpopis</label>
                            <input
                              type="text"
                              value={stat.sublabel || ""}
                              onChange={(e) => updateStat(idx, { sublabel: e.target.value })}
                              className="w-full border border-gray-300 px-2 py-1 text-sm"
                              placeholder="Fentanyl"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* About Tab */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">O DEA sekce</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (EN)</label>
                      <input
                        type="text"
                        value={config.aboutTitle}
                        onChange={(e) => updateConfig({ aboutTitle: e.target.value })}
                        placeholder="About DEA"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (ES)</label>
                      <input
                        type="text"
                        value={config.aboutTitleEs}
                        onChange={(e) => updateConfig({ aboutTitleEs: e.target.value })}
                        placeholder="Sobre la DEA"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Popis (EN)</label>
                    <textarea
                      value={config.aboutDescription}
                      onChange={(e) => updateConfig({ aboutDescription: e.target.value })}
                      placeholder="The Drug Enforcement Administration (DEA) is..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Popis (ES)</label>
                    <textarea
                      value={config.aboutDescriptionEs}
                      onChange={(e) => updateConfig({ aboutDescriptionEs: e.target.value })}
                      placeholder="La Administracion de Control de Drogas (DEA) es..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Mise nadpis (EN)</label>
                      <input
                        type="text"
                        value={config.missionTitle}
                        onChange={(e) => updateConfig({ missionTitle: e.target.value })}
                        placeholder="Our Mission"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Mise nadpis (ES)</label>
                      <input
                        type="text"
                        value={config.missionTitleEs}
                        onChange={(e) => updateConfig({ missionTitleEs: e.target.value })}
                        placeholder="Nuestra Mision"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mise popis (EN)</label>
                    <textarea
                      value={config.missionDescription}
                      onChange={(e) => updateConfig({ missionDescription: e.target.value })}
                      placeholder="To enforce the controlled substances laws..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mise popis (ES)</label>
                    <textarea
                      value={config.missionDescriptionEs}
                      onChange={(e) => updateConfig({ missionDescriptionEs: e.target.value })}
                      placeholder="Hacer cumplir las leyes de sustancias controladas..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === "resources" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Featured Resources</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (EN)</label>
                      <input
                        type="text"
                        value={config.featuredResourcesTitle}
                        onChange={(e) => updateConfig({ featuredResourcesTitle: e.target.value })}
                        placeholder="Featured Resources"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (ES)</label>
                      <input
                        type="text"
                        value={config.featuredResourcesTitleEs}
                        onChange={(e) => updateConfig({ featuredResourcesTitleEs: e.target.value })}
                        placeholder="Recursos Destacados"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => addResource({
                        title: "Novy zdroj",
                        titleEs: "Nuevo recurso",
                        description: "Popis",
                        descriptionEs: "Descripcion",
                        href: "#"
                      })}
                      size="sm"
                      className="bg-[#112e51] hover:bg-[#0a1e3a] text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Pridat zdroj
                    </Button>
                  </div>

                  {config.featuredResources.map((resource, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 border">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-semibold text-[#112e51]">Zdroj #{idx + 1}</span>
                        <button
                          onClick={() => removeResource(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Nazev (EN)</label>
                          <input
                            type="text"
                            value={resource.title}
                            onChange={(e) => updateResource(idx, { title: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Nazev (ES)</label>
                          <input
                            type="text"
                            value={resource.titleEs}
                            onChange={(e) => updateResource(idx, { titleEs: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Popis (EN)</label>
                          <input
                            type="text"
                            value={resource.description}
                            onChange={(e) => updateResource(idx, { description: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Popis (ES)</label>
                          <input
                            type="text"
                            value={resource.descriptionEs}
                            onChange={(e) => updateResource(idx, { descriptionEs: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Odkaz</label>
                        <input
                          type="text"
                          value={resource.href}
                          onChange={(e) => updateResource(idx, { href: e.target.value })}
                          className="w-full border border-gray-300 px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* News Tab */}
              {activeTab === "news" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Novinky sekce</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (EN)</label>
                      <input
                        type="text"
                        value={config.newsTitle}
                        onChange={(e) => updateConfig({ newsTitle: e.target.value })}
                        placeholder="Latest News"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (ES)</label>
                      <input
                        type="text"
                        value={config.newsTitleEs}
                        onChange={(e) => updateConfig({ newsTitleEs: e.target.value })}
                        placeholder="Ultimas Noticias"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => addNews({
                        title: "Nova zprava",
                        titleEs: "Nueva noticia",
                        date: "January 30, 2026",
                        dateEs: "30 de enero de 2026",
                        href: "#"
                      })}
                      size="sm"
                      className="bg-[#112e51] hover:bg-[#0a1e3a] text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Pridat zpravu
                    </Button>
                  </div>

                  {config.news.map((newsItem, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 border">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-semibold text-[#112e51]">Zprava #{idx + 1}</span>
                        <button
                          onClick={() => removeNews(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Titulek (EN)</label>
                          <input
                            type="text"
                            value={newsItem.title}
                            onChange={(e) => updateNews(idx, { title: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Titulek (ES)</label>
                          <input
                            type="text"
                            value={newsItem.titleEs}
                            onChange={(e) => updateNews(idx, { titleEs: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Datum (EN)</label>
                            <input
                              type="text"
                              value={newsItem.date}
                              onChange={(e) => updateNews(idx, { date: e.target.value })}
                              className="w-full border border-gray-300 px-2 py-1 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Datum (ES)</label>
                            <input
                              type="text"
                              value={newsItem.dateEs}
                              onChange={(e) => updateNews(idx, { dateEs: e.target.value })}
                              className="w-full border border-gray-300 px-2 py-1 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Odkaz</label>
                          <input
                            type="text"
                            value={newsItem.href}
                            onChange={(e) => updateNews(idx, { href: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fugitives Tab */}
              {activeTab === "fugitives" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Most Wanted - Nejhledanejsi osoby</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (EN)</label>
                      <input
                        type="text"
                        value={config.mostWantedTitle}
                        onChange={(e) => updateConfig({ mostWantedTitle: e.target.value })}
                        placeholder="DEA's Most Wanted"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nazev sekce (ES)</label>
                      <input
                        type="text"
                        value={config.mostWantedTitleEs}
                        onChange={(e) => updateConfig({ mostWantedTitleEs: e.target.value })}
                        placeholder="Los Mas Buscados de la DEA"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => addFugitive({
                        name: "Nova osoba",
                        aka: "",
                        description: "",
                        reward: "$0",
                        imageUrl: "",
                        href: "#"
                      })}
                      size="sm"
                      className="bg-[#112e51] hover:bg-[#0a1e3a] text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Pridat osobu
                    </Button>
                  </div>

                  {config.fugitives.map((fugitive, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 border">
                      <div className="flex items-start justify-between mb-3">
                        <span className="font-semibold text-[#112e51]">Osoba #{idx + 1}</span>
                        <button
                          onClick={() => removeFugitive(idx)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex gap-4 mb-4">
                        <div className="w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {fugitive.imageUrl ? (
                            <img src={fugitive.imageUrl || "/placeholder.svg"} alt={fugitive.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <input
                            ref={(el) => { fugitiveImageRefs.current[idx] = el }}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFugitiveImageUpload(idx, e)}
                            className="hidden"
                          />
                          <Button
                            onClick={() => fugitiveImageRefs.current[idx]?.click()}
                            size="sm"
                            className="bg-[#112e51] hover:bg-[#0a1e3a] text-white"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Nahrat foto
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Jmeno</label>
                          <input
                            type="text"
                            value={fugitive.name}
                            onChange={(e) => updateFugitive(idx, { name: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Prezdivka (AKA)</label>
                          <input
                            type="text"
                            value={fugitive.aka}
                            onChange={(e) => updateFugitive(idx, { aka: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Odmena</label>
                          <input
                            type="text"
                            value={fugitive.reward}
                            onChange={(e) => updateFugitive(idx, { reward: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Odkaz</label>
                          <input
                            type="text"
                            value={fugitive.href}
                            onChange={(e) => updateFugitive(idx, { href: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs text-gray-500 mb-1">Popis</label>
                          <textarea
                            value={fugitive.description}
                            onChange={(e) => updateFugitive(idx, { description: e.target.value })}
                            className="w-full border border-gray-300 px-2 py-1 text-sm resize-none"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Statement Tab */}
              {activeTab === "statement" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Prohlaseni administratora</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Datum (EN)</label>
                      <input
                        type="text"
                        value={config.statementDate}
                        onChange={(e) => updateConfig({ statementDate: e.target.value })}
                        placeholder="January 30, 2026"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Datum (ES)</label>
                      <input
                        type="text"
                        value={config.statementDateEs}
                        onChange={(e) => updateConfig({ statementDateEs: e.target.value })}
                        placeholder="30 de enero de 2026"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (EN)</label>
                    <input
                      type="text"
                      value={config.statementHeadline}
                      onChange={(e) => updateConfig({ statementHeadline: e.target.value })}
                      placeholder="DEA Administrator's Statement..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (ES)</label>
                    <input
                      type="text"
                      value={config.statementHeadlineEs}
                      onChange={(e) => updateConfig({ statementHeadlineEs: e.target.value })}
                      placeholder="Declaracion del Administrador de la DEA..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Obsah (EN)</label>
                    <textarea
                      value={config.statementContent}
                      onChange={(e) => updateConfig({ statementContent: e.target.value })}
                      placeholder="Today, we announce the results of..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Obsah (ES)</label>
                    <textarea
                      value={config.statementContentEs}
                      onChange={(e) => updateConfig({ statementContentEs: e.target.value })}
                      placeholder="Hoy anunciamos los resultados de..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={8}
                    />
                  </div>
                </div>
              )}

              {/* Scam Alert Tab */}
              {activeTab === "scam" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Scam Alert obsah</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (EN)</label>
                      <input
                        type="text"
                        value={config.scamAlertTitle}
                        onChange={(e) => updateConfig({ scamAlertTitle: e.target.value })}
                        placeholder="DEA Scam Alert"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nadpis (ES)</label>
                      <input
                        type="text"
                        value={config.scamAlertTitleEs}
                        onChange={(e) => updateConfig({ scamAlertTitleEs: e.target.value })}
                        placeholder="Alerta de Estafa de la DEA"
                        className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vlastni obsah (EN)</label>
                    <p className="text-xs text-gray-500 mb-2">Pokud vyplnite, prepise vychozi text. Pro odstavce pouzijte prazdny radek.</p>
                    <textarea
                      value={config.scamAlertContent}
                      onChange={(e) => updateConfig({ scamAlertContent: e.target.value })}
                      placeholder="WARNING: Scammers are impersonating..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={8}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Vlastni obsah (ES)</label>
                    <textarea
                      value={config.scamAlertContentEs}
                      onChange={(e) => updateConfig({ scamAlertContentEs: e.target.value })}
                      placeholder="ADVERTENCIA: Los estafadores se hacen pasar..."
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                      rows={8}
                    />
                  </div>
                </div>
              )}

              {/* Footer Tab */}
              {activeTab === "footer" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg text-[#112e51]">Paticka - kontaktni udaje</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Adresa</label>
                    <input
                      type="text"
                      value={config.footerAddress}
                      onChange={(e) => updateConfig({ footerAddress: e.target.value })}
                      placeholder="700 Army Navy Drive, Arlington, VA 22202"
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon</label>
                    <input
                      type="text"
                      value={config.footerPhone}
                      onChange={(e) => updateConfig({ footerPhone: e.target.value })}
                      placeholder="(202) 307-7165"
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email / Web</label>
                    <input
                      type="text"
                      value={config.footerEmail}
                      onChange={(e) => updateConfig({ footerEmail: e.target.value })}
                      placeholder="dea.gov"
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
