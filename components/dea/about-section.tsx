"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"

export function AboutSection() {
  const { t, language } = useLanguage()
  const { config } = useConfig()
  
  const aboutTitle = language === "en"
    ? (config.aboutTitle || t("aboutDea"))
    : (config.aboutTitleEs || t("aboutDea"))

  const aboutDesc = language === "en"
    ? (config.aboutDescription || t("aboutDeaDesc"))
    : (config.aboutDescriptionEs || t("aboutDeaDesc"))

  const missionTitle = language === "en"
    ? (config.missionTitle || t("missionTitle"))
    : (config.missionTitleEs || t("missionTitle"))

  const missionDesc = language === "en"
    ? (config.missionDescription || t("missionDesc"))
    : (config.missionDescriptionEs || t("missionDesc"))

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-[#112e51] rounded-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-[#fdb81e] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-[#112e51] font-bold text-3xl">{config.logoText}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-[#112e51] mb-6">{aboutTitle}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {aboutDesc}
            </p>
            <h3 className="text-xl font-bold text-[#112e51] mb-2 mt-6">{missionTitle}</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {missionDesc}
            </p>
            <Button className="bg-[#112e51] hover:bg-[#0a1f3d] text-white">
              {t("learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
