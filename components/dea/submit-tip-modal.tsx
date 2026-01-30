"use client"

import React from "react"

import { useState } from "react"
import { X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/providers/language-provider"

interface SubmitTipModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SubmitTipModal({ isOpen, onClose }: SubmitTipModalProps) {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    details: ""
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send the tip data to your backend
    console.log("Tip submitted:", { ...formData, isAnonymous })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", subject: "", details: "" })
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="bg-[#112e51] text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{t("submitTipTitle")}</h2>
          <button onClick={onClose} className="hover:text-[#fdb81e]">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <p className="text-xl font-semibold text-[#112e51]">{t("thankYou")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <p className="text-gray-600 mb-6">{t("submitTipDesc")}</p>
            
            <div className="space-y-4">
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 accent-[#112e51]"
                />
                <span className="text-sm text-gray-700">{t("anonymous")}</span>
              </label>

              {!isAnonymous && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {t("yourName")} <span className="text-gray-400 font-normal">{t("optional")}</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {t("yourEmail")} <span className="text-gray-400 font-normal">{t("optional")}</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {t("yourPhone")} <span className="text-gray-400 font-normal">{t("optional")}</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t("tipSubject")} <span className="text-[#d83933]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {t("tipDetails")} <span className="text-[#d83933]">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  placeholder={t("tipDetailsPlaceholder")}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#112e51] resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-[#d83933] hover:bg-[#b31e17] text-white font-semibold py-3"
            >
              {t("submitTipBtn")}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
