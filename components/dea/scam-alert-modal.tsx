"use client"

import { X, AlertTriangle, Phone, Mail, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig } from "@/components/providers/config-provider"

interface ScamAlertModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ScamAlertModal({ isOpen, onClose }: ScamAlertModalProps) {
  const { t, language } = useLanguage()
  const { config } = useConfig()

  if (!isOpen) return null

  const scamTitle = language === "en"
    ? (config.scamAlertTitle || t("scamAlertTitle"))
    : (config.scamAlertTitleEs || t("scamAlertTitle"))

  const scamContent = language === "en"
    ? (config.scamAlertContent || "")
    : (config.scamAlertContentEs || "")

  const hasCustomContent = scamContent.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="bg-[#d63e04] text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-bold">{scamTitle}</h2>
          </div>
          <button onClick={onClose} className="hover:text-yellow-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-yellow-800 font-semibold">
              {t("scamAlertWarning")}
            </p>
          </div>

          {hasCustomContent ? (
            <div className="prose prose-sm max-w-none text-gray-700">
              {scamContent.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <h3 className="text-[#112e51] font-bold text-lg mb-3">{t("scamAlertWhat")}</h3>
              <p className="text-gray-700 mb-4">
                {t("scamAlertWhatDesc")}
              </p>

              <h3 className="text-[#112e51] font-bold text-lg mb-3">{t("scamAlertHow")}</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-[#d63e04] flex-shrink-0 mt-0.5" />
                  <span>{t("scamAlertPhone")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-[#d63e04] flex-shrink-0 mt-0.5" />
                  <span>{t("scamAlertEmail")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-[#d63e04] flex-shrink-0 mt-0.5" />
                  <span>{t("scamAlertMoney")}</span>
                </li>
              </ul>

              <h3 className="text-[#112e51] font-bold text-lg mb-3">{t("scamAlertProtect")}</h3>
              <p className="text-gray-700 mb-4">
                {t("scamAlertProtectDesc")}
              </p>

              <div className="bg-[#112e51] text-white p-4 mt-6">
                <p className="font-semibold mb-2">{t("scamAlertReport")}</p>
                <p className="text-sm opacity-90">{t("scamAlertReportDesc")}</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <Button onClick={onClose} className="bg-[#112e51] hover:bg-[#0a1e3a] text-white">
            {t("close")}
          </Button>
        </div>
      </div>
    </div>
  )
}
