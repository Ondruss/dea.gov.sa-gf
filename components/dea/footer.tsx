"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Globe } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"

export function Footer() {
  const { t, language } = useLanguage()
  const { config } = useConfig()

  const headerSubtitle = language === "en"
    ? (config.headerSubtitle || t("drugEnforcementAdmin"))
    : (config.headerSubtitleEs || t("drugEnforcementAdmin"))
  
  return (
    <footer className="bg-[#112e51] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#fdb81e] rounded-full flex items-center justify-center overflow-hidden">
                {config.logoUrl ? (
                  <img src={config.logoUrl || "/placeholder.svg"} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[#112e51] font-bold">{config.logoText}</span>
                )}
              </div>
              <div>
                <p className="font-bold">{headerSubtitle}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {config.footerAddress}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {config.footerPhone}
              </p>
              <p className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {config.footerEmail}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("menuAbout")}</Link></li>
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("menuCareers")}</Link></li>
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("menuNews")}</Link></li>
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("menuContact")}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">{t("resources")}</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("drugFactSheets")}</Link></li>
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("menuPublications")}</Link></li>
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("foia")}</Link></li>
              <li><Link href="#" className="hover:text-[#fdb81e]">{t("privacyPolicy")}</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4">{t("connectWithUs")}</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-[#fdb81e]">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-[#fdb81e]">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-[#fdb81e]">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-[#fdb81e]">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-white/70">{t("submitTipLabel")}</p>
              <p className="font-bold text-[#fdb81e]">1-800-DEA-4288</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
          <p>&copy; 2026 {t("allRightsReserved")}</p>
          <p className="mt-2">
            <Link href="#" className="hover:text-[#fdb81e]">{t("accessibility")}</Link>
            {" | "}
            <Link href="#" className="hover:text-[#fdb81e]">{t("noFearAct")}</Link>
            {" | "}
            <Link href="#" className="hover:text-[#fdb81e]">USA.gov</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
