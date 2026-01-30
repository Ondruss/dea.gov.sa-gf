"use client"

import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"
import { SubmitTipModal } from "./submit-tip-modal"
import { GetUpdatesModal } from "./get-updates-modal"
import { MenuDropdown } from "./menu-dropdown"
import { ScamAlertModal } from "./scam-alert-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTipModalOpen, setIsTipModalOpen] = useState(false)
  const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState(false)
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false)
  const [isScamAlertOpen, setIsScamAlertOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { config } = useConfig()

  return (
    <>
      <header className="bg-[#112e51] text-white relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-16 h-16 bg-[#fdb81e] rounded-full flex items-center justify-center overflow-hidden">
                {config.logoUrl ? (
                  <img src={config.logoUrl || "/placeholder.svg"} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[#112e51] font-bold text-xl">{config.logoText}</span>
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-xs uppercase tracking-wider opacity-80">
                  {language === "en" ? (config.headerTitle || t("unitedStates")) : (config.headerTitleEs || t("unitedStates"))}
                </p>
                <p className="text-lg font-bold">
                  {language === "en" ? (config.headerSubtitle || t("drugEnforcementAdmin")) : (config.headerSubtitleEs || t("drugEnforcementAdmin"))}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => setIsUpdatesModalOpen(true)}
                className="text-sm hover:text-[#fdb81e] transition-colors"
              >
                {t("getUpdates")}
              </button>
              <button 
                onClick={() => setIsScamAlertOpen(true)}
                className="text-sm text-[#fdb81e] font-semibold hover:underline"
              >
                {t("scamAlert")}
              </button>
              <button 
                onClick={() => setIsFullMenuOpen(true)}
                className={`text-sm hover:text-[#fdb81e] transition-colors flex items-center gap-1 ${isFullMenuOpen ? "text-[#fdb81e]" : ""}`}
              >
                {t("fullMenu")} <ChevronDown className={`h-3 w-3 transition-transform ${isFullMenuOpen ? "rotate-180" : ""}`} />
              </button>
              <div className="flex items-center gap-2 border-l border-white/30 pl-6">
                <button
                  onClick={() => setLanguage("en")}
                  className={`text-sm ${language === "en" ? "text-[#fdb81e] font-semibold" : "hover:text-[#fdb81e]"}`}
                >
                  {t("english")}
                </button>
                <span className="text-white/50">|</span>
                <button
                  onClick={() => setLanguage("es")}
                  className={`text-sm ${language === "es" ? "text-[#fdb81e] font-semibold" : "hover:text-[#fdb81e]"}`}
                >
                  {t("spanish")}
                </button>
              </div>
            </nav>

            {/* Submit Tip Button */}
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setIsTipModalOpen(true)}
                className="bg-[#d83933] hover:bg-[#b31e17] text-white font-semibold px-6"
              >
                {t("submitATip")}
              </Button>
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/20">
              <nav className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    setIsUpdatesModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="text-sm hover:text-[#fdb81e] text-left"
                >
                  {t("getUpdates")}
                </button>
                <button 
                  onClick={() => {
                    setIsScamAlertOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="text-sm text-[#fdb81e] font-semibold text-left"
                >
                  {t("scamAlert")}
                </button>
                <button 
                  onClick={() => {
                    setIsFullMenuOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="text-sm hover:text-[#fdb81e] text-left"
                >
                  {t("fullMenu")}
                </button>
                <div className="flex items-center gap-4 pt-2 border-t border-white/20">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`text-sm ${language === "en" ? "text-[#fdb81e] font-semibold" : "hover:text-[#fdb81e]"}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("es")}
                    className={`text-sm ${language === "es" ? "text-[#fdb81e] font-semibold" : "hover:text-[#fdb81e]"}`}
                  >
                    Espanol
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <SubmitTipModal isOpen={isTipModalOpen} onClose={() => setIsTipModalOpen(false)} />
      <GetUpdatesModal isOpen={isUpdatesModalOpen} onClose={() => setIsUpdatesModalOpen(false)} />
      <MenuDropdown isOpen={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
      <ScamAlertModal isOpen={isScamAlertOpen} onClose={() => setIsScamAlertOpen(false)} />
    </>
  )
}
