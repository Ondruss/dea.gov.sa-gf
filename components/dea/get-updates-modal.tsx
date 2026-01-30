"use client"

import React from "react"

import { useState } from "react"
import { X, CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"

interface GetUpdatesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GetUpdatesModal({ isOpen, onClose }: GetUpdatesModalProps) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribed email:", email)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail("")
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md mx-4 shadow-xl">
        <div className="bg-[#112e51] text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{t("getUpdatesTitle")}</h2>
          <button onClick={onClose} className="hover:text-[#fdb81e]">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <p className="text-xl font-semibold text-[#112e51]">{t("subscribedSuccess")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-[#112e51] rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-[#fdb81e]" />
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-center">{t("getUpdatesDesc")}</p>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t("yourEmail")} <span className="text-[#d83933]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                placeholder="email@example.com"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-[#112e51] hover:bg-[#0a1e3a] text-white font-semibold py-3"
            >
              {t("subscribe")}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
