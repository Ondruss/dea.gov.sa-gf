"use client"

import Link from "next/link"
import { ChevronRight, User } from "lucide-react"
import { useConfig } from "@/components/providers/config-provider"
import { useLanguage } from "@/components/providers/language-provider"

export function MostWanted() {
  const { config } = useConfig()
  const { t, language } = useLanguage()

  const sectionTitle = language === "en"
    ? (config.mostWantedTitle || t("mostWanted"))
    : (config.mostWantedTitleEs || t("mostWanted"))

  return (
    <section className="bg-[#112e51] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">{sectionTitle}</h2>
          <Link 
            href="#" 
            className="text-[#fdb81e] font-semibold flex items-center gap-1 hover:underline"
          >
            {t("viewAll")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {config.fugitives.map((fugitive, index) => (
            <Link 
              key={index}
              href={fugitive.href}
              className="bg-white group hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                {fugitive.imageUrl ? (
                  <img 
                    src={fugitive.imageUrl || "/placeholder.svg"} 
                    alt={fugitive.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <User className="h-20 w-20 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-[#d83933] text-white text-xs font-bold px-2 py-1">
                  {t("reward")}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#112e51] text-lg group-hover:text-[#005ea2]">
                  {fugitive.name}
                </h3>
                {fugitive.aka && (
                  <p className="text-sm text-gray-500">AKA: {fugitive.aka}</p>
                )}
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{fugitive.description}</p>
                <p className="text-[#d83933] font-bold mt-3">{fugitive.reward}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
