"use client"

import { X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"

interface StatementModalProps {
  isOpen: boolean
  onClose: () => void
}

export function StatementModal({ isOpen, onClose }: StatementModalProps) {
  const { t, language } = useLanguage()
  const { config } = useConfig()

  if (!isOpen) return null

  const statementDate = language === "en"
    ? (config.statementDate || t("statementDate"))
    : (config.statementDateEs || t("statementDate"))

  const statementHeadline = language === "en"
    ? (config.statementHeadline || t("statementHeadline"))
    : (config.statementHeadlineEs || t("statementHeadline"))

  const statementContent = language === "en"
    ? (config.statementContent || t("statementContent"))
    : (config.statementContentEs || t("statementContent"))

  const quoteTitle = language === "en" ? config.quoteTitle : config.quoteTitleEs

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="bg-[#112e51] text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            <h2 className="text-xl font-bold">{t("statementTitle")}</h2>
          </div>
          <button onClick={onClose} className="hover:text-[#fdb81e]">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 pb-4 border-b">
            <p className="text-sm text-gray-500 mb-2">{statementDate}</p>
            <h3 className="text-2xl font-bold text-[#112e51]">
              {statementHeadline}
            </h3>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {statementContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <p className="font-bold text-[#112e51]">{config.quoteAuthor}</p>
            <p className="text-gray-600">{quoteTitle}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={() => window.print()}>
            {t("print")}
          </Button>
          <Button onClick={onClose} className="bg-[#112e51] hover:bg-[#0a1e3a] text-white">
            {t("close")}
          </Button>
        </div>
      </div>
    </div>
  )
}
