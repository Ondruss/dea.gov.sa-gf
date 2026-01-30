"use client"

import { useConfig } from "@/components/providers/config-provider"
import { useLanguage } from "@/components/providers/language-provider"

export function QuoteSection() {
  const { config } = useConfig()
  const { language } = useLanguage()
  
  const quoteText = language === "en" ? config.quoteText : config.quoteTextEs
  const quoteTitle = language === "en" ? config.quoteTitle : config.quoteTitleEs

  return (
    <section className="bg-white py-12 border-l-4 border-[#fdb81e]">
      <div className="max-w-4xl mx-auto px-8">
        <blockquote className="text-xl md:text-2xl text-[#112e51] italic leading-relaxed">
          &ldquo;{quoteText}&rdquo;
        </blockquote>
        <div className="mt-6">
          <p className="font-bold text-[#112e51]">{config.quoteAuthor}</p>
          <p className="text-sm text-gray-600">{quoteTitle}</p>
        </div>
      </div>
    </section>
  )
}
