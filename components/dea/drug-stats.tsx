"use client"

import { useConfig } from "@/components/providers/config-provider"
import { useLanguage } from "@/components/providers/language-provider"

export function DrugStats() {
  const { config } = useConfig()
  const { t, language } = useLanguage()

  const statsTitle = language === "en" 
    ? (config.statsTitle || t("drugSeizures"))
    : (config.statsTitleEs || t("drugSeizures"))

  const statsUpdated = language === "en"
    ? (config.statsLastUpdated || "January 30, 2026")
    : (config.statsLastUpdatedEs || "30 de enero de 2026")

  return (
    <section className="bg-[#f0f0f0] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#112e51] mb-8 text-center">{statsTitle}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {config.stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-bold text-[#112e51]">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              {stat.sublabel && (
                <p className="text-xs font-semibold text-[#d83933] mt-1">{stat.sublabel}</p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500">
          {t("updatedOn")} {statsUpdated}
        </p>
      </div>
    </section>
  )
}
