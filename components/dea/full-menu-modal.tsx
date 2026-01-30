"use client"

import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"
import { CategoryPageModal } from "./category-page-modal"

interface FullMenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FullMenuModal({ isOpen, onClose }: FullMenuModalProps) {
  const { t } = useLanguage()
  const { config } = useConfig()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<{ title: string; description: string } | null>(null)

  if (!isOpen) return null

  const menuSections = [
    {
      key: "about",
      title: t("menuAbout"),
      links: [
        { label: t("categoryLeadership"), description: t("categoryLeadershipDesc"), href: "#" },
        { label: t("categoryHistory"), description: t("categoryHistoryDesc"), href: "#" },
        { label: t("categoryMission"), description: t("categoryMissionDesc"), href: "#" },
        { label: t("categoryDivisions"), description: t("categoryDivisionsDesc"), href: "#" },
        { label: t("categoryForeignOffices"), description: t("categoryForeignOfficesDesc"), href: "#" },
      ]
    },
    {
      key: "drugInfo",
      title: t("menuDrugInfo"),
      links: [
        { label: t("categoryDrugScheduling"), description: t("categoryDrugSchedulingDesc"), href: "#" },
        { label: t("categoryControlledSubstances"), description: t("categoryControlledSubstancesDesc"), href: "#" },
        { label: t("drugFactSheets"), description: t("drugFactSheetsDesc"), href: "#" },
        { label: t("categoryFentanylAwareness"), description: t("categoryFentanylAwarenessDesc"), href: "#" },
        { label: t("categoryDrugPhotos"), description: t("categoryDrugPhotosDesc"), href: "#" },
      ]
    },
    {
      key: "wanted",
      title: t("menuWantedFugitives"),
      links: [
        { label: t("categoryMostWanted"), description: t("categoryMostWantedDesc"), href: "#" },
        { label: t("categoryFugitiveSearch"), description: t("categoryFugitiveSearchDesc"), href: "#" },
        { label: t("categoryCaptured"), description: t("categoryCapturedDesc"), href: "#" },
        { label: t("categorySubmitTip"), description: t("categorySubmitTipDesc"), href: "#" },
      ]
    },
    {
      key: "news",
      title: t("menuNews"),
      links: [
        { label: t("categoryPressReleases"), description: t("categoryPressReleasesDesc"), href: "#" },
        { label: t("categoryStories"), description: t("categoryStoriesDesc"), href: "#" },
        { label: t("categoryVideos"), description: t("categoryVideosDesc"), href: "#" },
        { label: t("categorySpeeches"), description: t("categorySpeechesDesc"), href: "#" },
        { label: t("categoryTestimony"), description: t("categoryTestimonyDesc"), href: "#" },
      ]
    },
    {
      key: "resources",
      title: t("menuResources"),
      links: [
        { label: t("categoryPublications"), description: t("categoryPublicationsDesc"), href: "#" },
        { label: t("categoryFoia"), description: t("categoryFoiaDesc"), href: "#" },
        { label: t("categoryForms"), description: t("categoryFormsDesc"), href: "#" },
        { label: t("categoryDiversionControl"), description: t("categoryDiversionControlDesc"), href: "#" },
      ]
    },
    {
      key: "operations",
      title: t("menuOperations"),
      links: [
        { label: t("categoryDomesticOps"), description: t("categoryDomesticOpsDesc"), href: "#" },
        { label: t("categoryInternationalOps"), description: t("categoryInternationalOpsDesc"), href: "#" },
        { label: t("categoryInteragency"), description: t("categoryInteragencyDesc"), href: "#" },
        { label: t("categoryHidta"), description: t("categoryHidtaDesc"), href: "#" },
      ]
    },
    {
      key: "careers",
      title: t("menuCareers"),
      links: [
        { label: t("categoryJobOpportunities"), description: t("categoryJobOpportunitiesDesc"), href: "#" },
        { label: t("categorySpecialAgent"), description: t("categorySpecialAgentDesc"), href: "#" },
        { label: t("categoryDiversionInvestigator"), description: t("categoryDiversionInvestigatorDesc"), href: "#" },
        { label: t("categoryIntelligenceAnalyst"), description: t("categoryIntelligenceAnalystDesc"), href: "#" },
        { label: t("categoryStudentPrograms"), description: t("categoryStudentProgramsDesc"), href: "#" },
      ]
    },
    {
      key: "prevention",
      title: t("menuPrevention"),
      links: [
        { label: t("categoryRedRibbon"), description: t("categoryRedRibbonDesc"), href: "#" },
        { label: t("categoryJustThinkTwice"), description: t("categoryJustThinkTwiceDesc"), href: "#" },
        { label: t("categoryGetSmart"), description: t("categoryGetSmartDesc"), href: "#" },
        { label: t("categoryOperationPrevention"), description: t("categoryOperationPreventionDesc"), href: "#" },
      ]
    },
  ]

  const activeSectionData = menuSections.find(s => s.key === activeCategory)

  const handleItemClick = (item: { label: string; description: string }) => {
    setActiveItem({ title: item.label, description: item.description })
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />
        <div className="relative bg-white w-full max-w-5xl mx-4 max-h-[80vh] overflow-y-auto shadow-xl">
          {/* Header with Logo */}
          <div className="bg-[#112e51] text-white p-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fdb81e] rounded-full flex items-center justify-center overflow-hidden">
                {config.logoUrl ? (
                  <img src={config.logoUrl || "/placeholder.svg"} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-[#112e51] font-bold text-sm">{config.logoText}</span>
                )}
              </div>
              <h2 className="text-xl font-bold">{t("fullMenu")}</h2>
            </div>
            <button onClick={onClose} className="hover:text-[#fdb81e]">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {menuSections.map((section) => (
              <div key={section.key}>
                <button
                  onClick={() => setActiveCategory(section.key)}
                  className="w-full text-left font-bold text-[#112e51] mb-3 pb-2 border-b-2 border-[#fdb81e] hover:text-[#005ea2] flex items-center justify-between group"
                >
                  {section.title}
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <ul className="space-y-2">
                  {section.links.slice(0, 5).map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <button 
                        onClick={() => handleItemClick(link)}
                        className="text-sm text-gray-700 hover:text-[#005ea2] hover:underline text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#f0f0f0] p-4 text-center">
            <button 
              className="text-[#005ea2] font-semibold hover:underline"
              onClick={onClose}
            >
              {t("menuContact")}
            </button>
          </div>
        </div>
      </div>

      {/* Category Page Modal */}
      {activeCategory && activeSectionData && (
        <CategoryPageModal
          isOpen={!!activeCategory}
          onClose={() => setActiveCategory(null)}
          categoryKey={activeCategory}
          items={activeSectionData.links.map(link => ({
            title: link.label,
            description: link.description,
            href: link.href
          }))}
          onItemClick={(item) => {
            setActiveCategory(null)
            setActiveItem(item)
          }}
        />
      )}

      {/* Detail Page Modal */}
      {activeItem && (
        <DetailPageModal
          isOpen={!!activeItem}
          onClose={() => setActiveItem(null)}
          title={activeItem.title}
          description={activeItem.description}
        />
      )}
    </>
  )
}

interface DetailPageModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
}

function DetailPageModal({ isOpen, onClose, title, description }: DetailPageModalProps) {
  const { t } = useLanguage()
  const { config } = useConfig()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-white/80">{description}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg mb-6">
              {t("detailPageIntro")}
            </p>

            <div className="bg-[#f0f0f0] border-l-4 border-[#fdb81e] p-4 mb-6">
              <h3 className="font-bold text-[#112e51] mb-2">{t("keyInformation")}</h3>
              <p className="text-gray-600">
                {t("detailPageInfo")}
              </p>
            </div>

            <h2 className="text-xl font-bold text-[#112e51] mb-4">{t("overview")}</h2>
            <p className="text-gray-700 mb-4">
              {t("detailPageOverview")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-white border p-4 shadow-sm">
                <h4 className="font-bold text-[#112e51] mb-2">{t("relatedTopics")}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-[#005ea2] hover:underline cursor-pointer">{t("topicOne")}</li>
                  <li className="text-[#005ea2] hover:underline cursor-pointer">{t("topicTwo")}</li>
                  <li className="text-[#005ea2] hover:underline cursor-pointer">{t("topicThree")}</li>
                </ul>
              </div>
              <div className="bg-white border p-4 shadow-sm">
                <h4 className="font-bold text-[#112e51] mb-2">{t("quickLinks")}</h4>
                <ul className="space-y-2 text-sm">
                  <li className="text-[#005ea2] hover:underline cursor-pointer">{t("linkOne")}</li>
                  <li className="text-[#005ea2] hover:underline cursor-pointer">{t("linkTwo")}</li>
                  <li className="text-[#005ea2] hover:underline cursor-pointer">{t("linkThree")}</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#112e51] mb-4">{t("contactInformation")}</h2>
            <p className="text-gray-700">
              {t("detailPageContact")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#112e51] text-white p-4 flex justify-between items-center">
          <p className="text-sm opacity-80">{t("lastUpdated")}: January 30, 2026</p>
          <button 
            onClick={onClose}
            className="bg-[#fdb81e] text-[#112e51] px-4 py-2 font-semibold hover:bg-[#e5a617] transition-colors"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  )
}
