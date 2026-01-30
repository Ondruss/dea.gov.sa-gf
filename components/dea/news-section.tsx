"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"

export function NewsSection() {
  const { t, language } = useLanguage()
  const { config } = useConfig()

  const sectionTitle = language === "en"
    ? (config.newsTitle || t("latestNews"))
    : (config.newsTitleEs || t("latestNews"))

  const news = config.news.map(item => ({
    title: language === "en" ? item.title : item.titleEs,
    date: language === "en" ? item.date : item.dateEs,
    href: item.href
  }))

  return (
    <section className="bg-[#f0f0f0] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#112e51] mb-8">{sectionTitle}</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {news.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className="bg-white p-6 hover:shadow-lg transition-shadow border-l-4 border-[#112e51]"
            >
              <span className="text-xs font-semibold text-[#d83933] uppercase tracking-wide">
                {t("pressReleases")}
              </span>
              <h3 className="text-lg font-bold text-[#112e51] mt-2 hover:text-[#d83933] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{item.date}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-[#112e51] hover:bg-[#0a1f3d] text-white">
            {t("viewAllNews")}
          </Button>
        </div>
      </div>
    </section>
  )
}
