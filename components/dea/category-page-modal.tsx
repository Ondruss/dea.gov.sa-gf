"use client"

import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"

interface CategoryItem {
  title: string
  description: string
  href: string
}

interface CategoryPageModalProps {
  isOpen: boolean
  onClose: () => void
  categoryKey: string
  items: CategoryItem[]
  onItemClick?: (item: { title: string; description: string }) => void
}

export function CategoryPageModal({ isOpen, onClose, categoryKey, items, onItemClick }: CategoryPageModalProps) {
  const { t } = useLanguage()
  const { config } = useConfig()

  if (!isOpen) return null

  const getCategoryTitle = () => {
    const titles: Record<string, string> = {
      about: t("menuAbout"),
      drugInfo: t("menuDrugInfo"),
      wanted: t("menuWantedFugitives"),
      news: t("menuNews"),
      resources: t("menuResources"),
      operations: t("menuOperations"),
      careers: t("menuCareers"),
      prevention: t("menuPrevention"),
    }
    return titles[categoryKey] || categoryKey
  }

  const getCategoryDescription = () => {
    const descriptions: Record<string, string> = {
      about: t("categoryAboutDesc"),
      drugInfo: t("categoryDrugInfoDesc"),
      wanted: t("categoryWantedDesc"),
      news: t("categoryNewsDesc"),
      resources: t("categoryResourcesDesc"),
      operations: t("categoryOperationsDesc"),
      careers: t("categoryCareersDesc"),
      prevention: t("categoryPreventionDesc"),
    }
    return descriptions[categoryKey] || ""
  }

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header with Logo */}
        <div className="bg-[#112e51] text-white sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fdb81e] rounded-full flex items-center justify-center overflow-hidden">
                {config.logoUrl ? (
                  <img src={config.logoUrl || "/placeholder.svg"} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[#112e51] font-bold text-sm">{config.logoText}</span>
                )}
              </div>
              <div>
                <p className="text-xs opacity-80">Drug Enforcement Administration</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:text-[#fdb81e]">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#112e51] to-[#1a4480] text-white p-8">
          <h1 className="text-3xl font-bold mb-2">{getCategoryTitle()}</h1>
          <p className="text-white/80">{getCategoryDescription()}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-4">
            {items.map((item, idx) => (
              <div 
                key={idx}
                className="border p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => {
                  if (onItemClick) {
                    onItemClick({ title: item.title, description: item.description })
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-[#112e51] group-hover:text-[#005ea2] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#005ea2] flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">{t("clickItemForMore")}</p>
          <Button onClick={onClose} className="bg-[#112e51] hover:bg-[#0a1e3a] text-white">
            {t("close")}
          </Button>
        </div>
      </div>
    </div>
  )
}
