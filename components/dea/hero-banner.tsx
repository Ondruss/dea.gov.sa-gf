"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"
import { StatementModal } from "./statement-modal"

export function HeroBanner() {
  const [isStatementOpen, setIsStatementOpen] = useState(false)
  const { t, language } = useLanguage()
  const { config } = useConfig()

  const heroTitle = language === "en" 
    ? (config.heroTitle || t("heroTitle"))
    : (config.heroTitleEs || t("heroTitle"))
  
  const heroSubtitle = language === "en"
    ? (config.heroSubtitle || t("heroSubtitle"))
    : (config.heroSubtitleEs || t("heroSubtitle"))

  const heroButton = language === "en"
    ? (config.heroButtonText || t("readStatement"))
    : (config.heroButtonTextEs || t("readStatement"))

  return (
    <>
      <div className="relative bg-[#112e51] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#112e51] via-[#112e51]/90 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('${config.heroBackgroundUrl || "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1920&q=80"}')`
          }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              {heroTitle}
            </h2>
            <p className="text-lg opacity-90 mb-6">
              {heroSubtitle}
            </p>
            <Button 
              onClick={() => setIsStatementOpen(true)}
              className="bg-[#fdb81e] hover:bg-[#e5a717] text-[#112e51] font-semibold px-8 py-3"
            >
              {heroButton}
            </Button>
          </div>
        </div>
      </div>
      
      <StatementModal isOpen={isStatementOpen} onClose={() => setIsStatementOpen(false)} />
    </>
  )
}
