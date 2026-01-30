"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function GovBanner() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="bg-[#f0f0f0] text-[#1b1b1b] text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-1">
          <img
            src="https://www.dea.gov/themes/flavours_base_uswds/images/icon-dot-gov.svg"
            alt="U.S. flag"
            className="h-3 w-auto"
          />
          <span className="text-xs">{t("govBanner")}</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#005ea2] text-xs font-semibold flex items-center gap-1 ml-2 hover:underline"
          >
            {t("howYouKnow")}
            <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isExpanded && (
          <div className="grid md:grid-cols-2 gap-6 py-4 border-t border-gray-300">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#005ea2] rounded flex items-center justify-center text-white font-bold text-xs">
                .gov
              </div>
              <div>
                <p className="font-bold text-xs">{t("govOfficial")}</p>
                <p className="text-xs text-gray-600">
                  {t("govOfficialDesc")}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-[#005ea2] rounded flex items-center justify-center text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-xs">{t("govSecure")}</p>
                <p className="text-xs text-gray-600">
                  {t("govSecureDesc")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
