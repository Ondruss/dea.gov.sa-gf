"use client"

import Link from "next/link"
import { Calendar, Shield, Users, BookOpen } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"

export function FeaturedResources() {
  const { t, language } = useLanguage()
  const { config } = useConfig()

  const sectionTitle = language === "en"
    ? (config.featuredResourcesTitle || t("featuredResources"))
    : (config.featuredResourcesTitleEs || t("featuredResources"))

  const defaultResources = [
    {
      title: t("oneHundredDeadliestDays"),
      description: t("oneHundredDeadliestDaysDesc"),
      icon: <Calendar className="h-8 w-8" />,
      href: "#"
    },
    {
      title: t("operationEngagedBystander"),
      description: t("operationEngagedBystanderDesc"),
      icon: <Shield className="h-8 w-8" />,
      href: "#"
    },
    {
      title: t("drugFactSheets"),
      description: t("drugFactSheetsDesc"),
      icon: <BookOpen className="h-8 w-8" />,
      href: "#"
    },
    {
      title: t("deaMuseum"),
      description: t("deaMuseumDesc"),
      icon: <Users className="h-8 w-8" />,
      href: "#"
    },
  ]

  const icons = [
    <Calendar key="cal" className="h-8 w-8" />,
    <Shield key="shield" className="h-8 w-8" />,
    <BookOpen key="book" className="h-8 w-8" />,
    <Users key="users" className="h-8 w-8" />
  ]

  const resources = config.featuredResources.length > 0 
    ? config.featuredResources.map((r, i) => ({
        title: language === "en" ? r.title : r.titleEs,
        description: language === "en" ? r.description : r.descriptionEs,
        icon: icons[i % icons.length],
        href: r.href
      }))
    : defaultResources

  return (
    <section className="bg-[#112e51] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8">{sectionTitle}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Link 
              key={index}
              href={resource.href}
              className="bg-white p-6 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="text-[#112e51] mb-4 flex justify-center group-hover:text-[#d83933] transition-colors">
                {resource.icon}
              </div>
              <h3 className="text-sm font-semibold text-[#112e51] group-hover:text-[#d83933] transition-colors mb-2">
                {resource.title}
              </h3>
              <p className="text-xs text-gray-600">{resource.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
