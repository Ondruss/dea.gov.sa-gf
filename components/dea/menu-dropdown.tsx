"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, X, Settings, Plus, Trash2, Edit2 } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import { useConfig, type MenuCategory, type MenuLink } from "@/components/providers/config-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MenuDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  const { language, t } = useLanguage()
  const { config, addMenuCategory, updateMenuCategory, removeMenuCategory, addMenuLink, updateMenuLink, removeMenuLink } = useConfig()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeItem, setActiveItem] = useState<{ title: string; description: string } | null>(null)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingLink, setEditingLink] = useState<{ categoryId: string; linkId: string } | null>(null)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showAddLink, setShowAddLink] = useState<string | null>(null)

  // New category form
  const [newCategory, setNewCategory] = useState({ title: "", titleEs: "" })
  // New link form
  const [newLink, setNewLink] = useState({ label: "", labelEs: "", description: "", descriptionEs: "" })

  if (!isOpen) return null

  const handleAddCategory = () => {
    if (newCategory.title.trim()) {
      const id = `cat-${Date.now()}`
      addMenuCategory({
        id,
        key: newCategory.title.toLowerCase().replace(/\s+/g, "-"),
        title: newCategory.title,
        titleEs: newCategory.titleEs || newCategory.title,
        links: []
      })
      setNewCategory({ title: "", titleEs: "" })
      setShowAddCategory(false)
    }
  }

  const handleAddLink = (categoryId: string) => {
    if (newLink.label.trim()) {
      addMenuLink(categoryId, {
        id: `link-${Date.now()}`,
        label: newLink.label,
        labelEs: newLink.labelEs || newLink.label,
        description: newLink.description,
        descriptionEs: newLink.descriptionEs || newLink.description,
        href: "#"
      })
      setNewLink({ label: "", labelEs: "", description: "", descriptionEs: "" })
      setShowAddLink(null)
    }
  }

  const activeCategoryData = config.menuCategories.find(c => c.id === activeCategory)

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        
        {/* Dropdown positioned under header */}
        <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="bg-[#112e51] text-white p-4 flex items-center justify-between">
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
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${isAdminMode ? "bg-[#fdb81e] text-[#112e51]" : "hover:bg-white/10"}`}
              >
                <Settings className="h-4 w-4" />
                {isAdminMode ? "Exit Edit" : "Edit Menu"}
              </button>
              <button onClick={onClose} className="hover:text-[#fdb81e]">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
            {isAdminMode ? (
              // Admin Mode
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#112e51]">Edit Menu Categories</h3>
                  <Button onClick={() => setShowAddCategory(true)} size="sm" className="bg-[#112e51]">
                    <Plus className="h-4 w-4 mr-1" /> Add Category
                  </Button>
                </div>

                {/* Add Category Form */}
                {showAddCategory && (
                  <div className="bg-[#f0f0f0] p-4 mb-6 rounded">
                    <h4 className="font-semibold mb-3">New Category</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Title (English)</Label>
                        <Input 
                          value={newCategory.title}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Category name"
                        />
                      </div>
                      <div>
                        <Label>Title (Spanish)</Label>
                        <Input 
                          value={newCategory.titleEs}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, titleEs: e.target.value }))}
                          placeholder="Nombre de categoria"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddCategory} size="sm">Add</Button>
                      <Button onClick={() => setShowAddCategory(false)} variant="outline" size="sm">Cancel</Button>
                    </div>
                  </div>
                )}

                {/* Categories List */}
                <div className="space-y-4">
                  {config.menuCategories.map((category) => (
                    <div key={category.id} className="border rounded-lg overflow-hidden">
                      {/* Category Header */}
                      <div className="bg-[#112e51] text-white p-3 flex items-center justify-between">
                        {editingCategory === category.id ? (
                          <div className="flex-1 grid md:grid-cols-2 gap-2 mr-4">
                            <Input 
                              value={category.title}
                              onChange={(e) => updateMenuCategory(category.id, { title: e.target.value })}
                              className="bg-white text-black h-8"
                              placeholder="English title"
                            />
                            <Input 
                              value={category.titleEs}
                              onChange={(e) => updateMenuCategory(category.id, { titleEs: e.target.value })}
                              className="bg-white text-black h-8"
                              placeholder="Spanish title"
                            />
                          </div>
                        ) : (
                          <span className="font-semibold">{category.title} / {category.titleEs}</span>
                        )}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setEditingCategory(editingCategory === category.id ? null : category.id)}
                            className="p-1 hover:bg-white/20 rounded"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => removeMenuCategory(category.id)}
                            className="p-1 hover:bg-red-500 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="p-3 bg-white">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-600">{category.links.length} links</span>
                          <Button 
                            onClick={() => setShowAddLink(category.id)} 
                            size="sm" 
                            variant="outline"
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Link
                          </Button>
                        </div>

                        {/* Add Link Form */}
                        {showAddLink === category.id && (
                          <div className="bg-[#f9f9f9] p-3 mb-3 rounded border">
                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                              <div>
                                <Label className="text-xs">Label (EN)</Label>
                                <Input 
                                  value={newLink.label}
                                  onChange={(e) => setNewLink(prev => ({ ...prev, label: e.target.value }))}
                                  className="h-8"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Label (ES)</Label>
                                <Input 
                                  value={newLink.labelEs}
                                  onChange={(e) => setNewLink(prev => ({ ...prev, labelEs: e.target.value }))}
                                  className="h-8"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Description (EN)</Label>
                                <Textarea 
                                  value={newLink.description}
                                  onChange={(e) => setNewLink(prev => ({ ...prev, description: e.target.value }))}
                                  className="h-16"
                                />
                              </div>
                              <div>
                                <Label className="text-xs">Description (ES)</Label>
                                <Textarea 
                                  value={newLink.descriptionEs}
                                  onChange={(e) => setNewLink(prev => ({ ...prev, descriptionEs: e.target.value }))}
                                  className="h-16"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => handleAddLink(category.id)} size="sm">Add</Button>
                              <Button onClick={() => setShowAddLink(null)} variant="outline" size="sm">Cancel</Button>
                            </div>
                          </div>
                        )}

                        {/* Links List */}
                        <div className="space-y-2">
                          {category.links.map((link) => (
                            <div key={link.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                              {editingLink?.categoryId === category.id && editingLink?.linkId === link.id ? (
                                <div className="flex-1 space-y-2">
                                  <div className="grid md:grid-cols-2 gap-2">
                                    <Input 
                                      value={link.label}
                                      onChange={(e) => updateMenuLink(category.id, link.id, { label: e.target.value })}
                                      className="h-7 text-sm"
                                      placeholder="Label EN"
                                    />
                                    <Input 
                                      value={link.labelEs}
                                      onChange={(e) => updateMenuLink(category.id, link.id, { labelEs: e.target.value })}
                                      className="h-7 text-sm"
                                      placeholder="Label ES"
                                    />
                                  </div>
                                  <div className="grid md:grid-cols-2 gap-2">
                                    <Textarea 
                                      value={link.description}
                                      onChange={(e) => updateMenuLink(category.id, link.id, { description: e.target.value })}
                                      className="h-14 text-sm"
                                      placeholder="Description EN"
                                    />
                                    <Textarea 
                                      value={link.descriptionEs}
                                      onChange={(e) => updateMenuLink(category.id, link.id, { descriptionEs: e.target.value })}
                                      className="h-14 text-sm"
                                      placeholder="Description ES"
                                    />
                                  </div>
                                  <Button 
                                    onClick={() => setEditingLink(null)} 
                                    size="sm"
                                    variant="outline"
                                  >
                                    Done
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{link.label}</p>
                                    <p className="text-xs text-gray-500">{link.description}</p>
                                  </div>
                                  <button 
                                    onClick={() => setEditingLink({ categoryId: category.id, linkId: link.id })}
                                    className="p-1 hover:bg-gray-200 rounded"
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </button>
                                  <button 
                                    onClick={() => removeMenuLink(category.id, link.id)}
                                    className="p-1 hover:bg-red-100 text-red-600 rounded"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Normal Menu View
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                {config.menuCategories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className="w-full text-left font-bold text-[#112e51] mb-3 pb-2 border-b-2 border-[#fdb81e] hover:text-[#005ea2] flex items-center justify-between group"
                    >
                      {language === "en" ? category.title : category.titleEs}
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <ul className="space-y-2">
                      {category.links.slice(0, 5).map((link) => (
                        <li key={link.id}>
                          <button 
                            onClick={() => setActiveItem({ 
                              title: language === "en" ? link.label : link.labelEs,
                              description: language === "en" ? link.description : link.descriptionEs
                            })}
                            className="text-sm text-gray-700 hover:text-[#005ea2] hover:underline text-left"
                          >
                            {language === "en" ? link.label : link.labelEs}
                          </button>
                        </li>
                      ))}
                      {category.links.length > 5 && (
                        <li>
                          <button 
                            onClick={() => setActiveCategory(category.id)}
                            className="text-sm text-[#005ea2] font-semibold hover:underline"
                          >
                            View all ({category.links.length})
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isAdminMode && (
            <div className="bg-[#f0f0f0] p-4 text-center border-t">
              <button 
                className="text-[#005ea2] font-semibold hover:underline"
                onClick={onClose}
              >
                {t("menuContact")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Page Modal */}
      {activeCategory && activeCategoryData && !isAdminMode && (
        <CategoryDetailModal
          isOpen={!!activeCategory}
          onClose={() => setActiveCategory(null)}
          category={activeCategoryData}
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

interface CategoryDetailModalProps {
  isOpen: boolean
  onClose: () => void
  category: MenuCategory
  onItemClick: (item: { title: string; description: string }) => void
}

function CategoryDetailModal({ isOpen, onClose, category, onItemClick }: CategoryDetailModalProps) {
  const { language, t } = useLanguage()
  const { config } = useConfig()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
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
              <h2 className="text-xl font-bold">{language === "en" ? category.title : category.titleEs}</h2>
            </div>
            <button onClick={onClose} className="hover:text-[#fdb81e]">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">{t("clickItemForMore")}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {category.links.map((link) => (
              <button
                key={link.id}
                onClick={() => onItemClick({
                  title: language === "en" ? link.label : link.labelEs,
                  description: language === "en" ? link.description : link.descriptionEs
                })}
                className="text-left p-4 border hover:border-[#005ea2] hover:bg-[#f0f7ff] transition-colors rounded"
              >
                <h3 className="font-semibold text-[#112e51] mb-1">
                  {language === "en" ? link.label : link.labelEs}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === "en" ? link.description : link.descriptionEs}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#112e51] text-white p-4 flex justify-end">
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
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
