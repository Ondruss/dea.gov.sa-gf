"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

const STORAGE_KEY = "dea-site-config"

export interface DrugStat {
  label: string
  value: string
  sublabel?: string
}

export interface Fugitive {
  name: string
  aka: string
  description: string
  reward: string
  imageUrl: string
  href: string
}

export interface NewsItem {
  title: string
  titleEs: string
  date: string
  dateEs: string
  href: string
}

export interface ResourceItem {
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  href: string
}

export interface MenuLink {
  id: string
  label: string
  labelEs: string
  description: string
  descriptionEs: string
  href: string
}

export interface MenuCategory {
  id: string
  key: string
  title: string
  titleEs: string
  links: MenuLink[]
}

export interface SiteConfig {
  // Logo
  logoUrl: string
  logoText: string
  
  // Header
  headerTitle: string
  headerTitleEs: string
  headerSubtitle: string
  headerSubtitleEs: string
  
  // Hero Banner
  heroTitle: string
  heroTitleEs: string
  heroSubtitle: string
  heroSubtitleEs: string
  heroButtonText: string
  heroButtonTextEs: string
  heroBackgroundUrl: string
  
  // Quote Section
  quoteText: string
  quoteTextEs: string
  quoteAuthor: string
  quoteTitle: string
  quoteTitleEs: string
  
  // Drug Stats
  statsTitle: string
  statsTitleEs: string
  stats: DrugStat[]
  statsLastUpdated: string
  statsLastUpdatedEs: string
  
  // About Section
  aboutTitle: string
  aboutTitleEs: string
  aboutDescription: string
  aboutDescriptionEs: string
  missionTitle: string
  missionTitleEs: string
  missionDescription: string
  missionDescriptionEs: string
  
  // Featured Resources
  featuredResourcesTitle: string
  featuredResourcesTitleEs: string
  featuredResources: ResourceItem[]
  
  // News Section
  newsTitle: string
  newsTitleEs: string
  news: NewsItem[]
  
  // Most Wanted
  mostWantedTitle: string
  mostWantedTitleEs: string
  fugitives: Fugitive[]
  
  // Statement
  statementHeadline: string
  statementHeadlineEs: string
  statementDate: string
  statementDateEs: string
  statementContent: string
  statementContentEs: string
  
  // Scam Alert
  scamAlertTitle: string
  scamAlertTitleEs: string
  scamAlertContent: string
  scamAlertContentEs: string
  
  // Footer
  footerAddress: string
  footerPhone: string
  footerEmail: string
  
  // Menu Categories
  menuCategories: MenuCategory[]
}

const defaultMenuCategories: MenuCategory[] = [
  {
    id: "cat-1",
    key: "about",
    title: "About DEA",
    titleEs: "Sobre la DEA",
    links: [
      { id: "about-1", label: "Leadership", labelEs: "Liderazgo", description: "Meet DEA leadership team", descriptionEs: "Conozca al equipo de liderazgo de la DEA", href: "#" },
      { id: "about-2", label: "History", labelEs: "Historia", description: "DEA history and milestones", descriptionEs: "Historia y hitos de la DEA", href: "#" },
      { id: "about-3", label: "Mission", labelEs: "Mision", description: "Our mission statement", descriptionEs: "Nuestra declaracion de mision", href: "#" },
      { id: "about-4", label: "Divisions", labelEs: "Divisiones", description: "DEA organizational structure", descriptionEs: "Estructura organizacional de la DEA", href: "#" },
      { id: "about-5", label: "Foreign Offices", labelEs: "Oficinas en el Extranjero", description: "International operations", descriptionEs: "Operaciones internacionales", href: "#" },
    ]
  },
  {
    id: "cat-2",
    key: "drugInfo",
    title: "Drug Information",
    titleEs: "Informacion sobre Drogas",
    links: [
      { id: "drug-1", label: "Drug Scheduling", labelEs: "Clasificacion de Drogas", description: "DEA drug schedules explained", descriptionEs: "Explicacion de clasificaciones de drogas", href: "#" },
      { id: "drug-2", label: "Controlled Substances", labelEs: "Sustancias Controladas", description: "List of controlled substances", descriptionEs: "Lista de sustancias controladas", href: "#" },
      { id: "drug-3", label: "Drug Fact Sheets", labelEs: "Fichas Informativas", description: "Information about specific drugs", descriptionEs: "Informacion sobre drogas especificas", href: "#" },
      { id: "drug-4", label: "Fentanyl Awareness", labelEs: "Conciencia sobre Fentanilo", description: "Fentanyl dangers and facts", descriptionEs: "Peligros y hechos del fentanilo", href: "#" },
      { id: "drug-5", label: "Drug Photos", labelEs: "Fotos de Drogas", description: "Drug identification photos", descriptionEs: "Fotos de identificacion de drogas", href: "#" },
    ]
  },
  {
    id: "cat-3",
    key: "wanted",
    title: "Wanted Fugitives",
    titleEs: "Fugitivos Buscados",
    links: [
      { id: "wanted-1", label: "Most Wanted", labelEs: "Los Mas Buscados", description: "Top fugitives list", descriptionEs: "Lista de principales fugitivos", href: "#" },
      { id: "wanted-2", label: "Fugitive Search", labelEs: "Busqueda de Fugitivos", description: "Search fugitive database", descriptionEs: "Buscar en la base de datos de fugitivos", href: "#" },
      { id: "wanted-3", label: "Captured", labelEs: "Capturados", description: "Recently captured fugitives", descriptionEs: "Fugitivos capturados recientemente", href: "#" },
      { id: "wanted-4", label: "Submit a Tip", labelEs: "Enviar Informacion", description: "Report drug activity", descriptionEs: "Reportar actividad de drogas", href: "#" },
    ]
  },
  {
    id: "cat-4",
    key: "news",
    title: "News & Media",
    titleEs: "Noticias y Medios",
    links: [
      { id: "news-1", label: "Press Releases", labelEs: "Comunicados de Prensa", description: "Latest press releases", descriptionEs: "Ultimos comunicados de prensa", href: "#" },
      { id: "news-2", label: "Stories", labelEs: "Historias", description: "DEA stories and features", descriptionEs: "Historias y articulos de la DEA", href: "#" },
      { id: "news-3", label: "Videos", labelEs: "Videos", description: "Video content", descriptionEs: "Contenido de video", href: "#" },
      { id: "news-4", label: "Speeches", labelEs: "Discursos", description: "Official speeches", descriptionEs: "Discursos oficiales", href: "#" },
      { id: "news-5", label: "Testimony", labelEs: "Testimonios", description: "Congressional testimony", descriptionEs: "Testimonio ante el Congreso", href: "#" },
    ]
  },
  {
    id: "cat-5",
    key: "resources",
    title: "Resources",
    titleEs: "Recursos",
    links: [
      { id: "res-1", label: "Publications", labelEs: "Publicaciones", description: "DEA publications", descriptionEs: "Publicaciones de la DEA", href: "#" },
      { id: "res-2", label: "FOIA", labelEs: "FOIA", description: "Freedom of Information Act", descriptionEs: "Ley de Libertad de Informacion", href: "#" },
      { id: "res-3", label: "Forms", labelEs: "Formularios", description: "DEA forms and applications", descriptionEs: "Formularios y solicitudes", href: "#" },
      { id: "res-4", label: "Diversion Control", labelEs: "Control de Desviacion", description: "Diversion control division", descriptionEs: "Division de control de desviacion", href: "#" },
    ]
  },
  {
    id: "cat-6",
    key: "operations",
    title: "Operations",
    titleEs: "Operaciones",
    links: [
      { id: "ops-1", label: "Domestic Operations", labelEs: "Operaciones Domesticas", description: "U.S. operations", descriptionEs: "Operaciones en EE.UU.", href: "#" },
      { id: "ops-2", label: "International Operations", labelEs: "Operaciones Internacionales", description: "Global enforcement", descriptionEs: "Cumplimiento global", href: "#" },
      { id: "ops-3", label: "Interagency", labelEs: "Interagencias", description: "Partner agencies", descriptionEs: "Agencias asociadas", href: "#" },
      { id: "ops-4", label: "HIDTA", labelEs: "HIDTA", description: "High Intensity Drug Trafficking Areas", descriptionEs: "Areas de Alto Trafico de Drogas", href: "#" },
    ]
  },
  {
    id: "cat-7",
    key: "careers",
    title: "Careers",
    titleEs: "Carreras",
    links: [
      { id: "career-1", label: "Job Opportunities", labelEs: "Oportunidades de Empleo", description: "Current job openings", descriptionEs: "Vacantes actuales", href: "#" },
      { id: "career-2", label: "Special Agent", labelEs: "Agente Especial", description: "Become a special agent", descriptionEs: "Convertirse en agente especial", href: "#" },
      { id: "career-3", label: "Diversion Investigator", labelEs: "Investigador de Desviacion", description: "DI career path", descriptionEs: "Carrera de investigador", href: "#" },
      { id: "career-4", label: "Intelligence Analyst", labelEs: "Analista de Inteligencia", description: "Intelligence careers", descriptionEs: "Carreras de inteligencia", href: "#" },
      { id: "career-5", label: "Student Programs", labelEs: "Programas Estudiantiles", description: "Internships and programs", descriptionEs: "Pasantias y programas", href: "#" },
    ]
  },
  {
    id: "cat-8",
    key: "prevention",
    title: "Prevention",
    titleEs: "Prevencion",
    links: [
      { id: "prev-1", label: "Red Ribbon Week", labelEs: "Semana del Lazo Rojo", description: "Annual awareness campaign", descriptionEs: "Campana anual de concientizacion", href: "#" },
      { id: "prev-2", label: "Just Think Twice", labelEs: "Piensalo Dos Veces", description: "Youth drug prevention", descriptionEs: "Prevencion de drogas para jovenes", href: "#" },
      { id: "prev-3", label: "Get Smart About Drugs", labelEs: "Infórmate sobre las Drogas", description: "Drug education resources", descriptionEs: "Recursos educativos sobre drogas", href: "#" },
      { id: "prev-4", label: "Operation Prevention", labelEs: "Operacion Prevencion", description: "School programs", descriptionEs: "Programas escolares", href: "#" },
    ]
  },
]

const defaultConfig: SiteConfig = {
  logoUrl: "",
  logoText: "DEA",
  
  headerTitle: "United States",
  headerTitleEs: "Estados Unidos",
  headerSubtitle: "Drug Enforcement Administration",
  headerSubtitleEs: "Administracion de Control de Drogas",
  
  heroTitle: "",
  heroTitleEs: "",
  heroSubtitle: "",
  heroSubtitleEs: "",
  heroButtonText: "",
  heroButtonTextEs: "",
  heroBackgroundUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1920&q=80",
  
  quoteText: "Multiple agencies and jurisdictions poured their blood, sweat, and tears into dismantling criminal organizations, and today we continue our mission to protect American communities.",
  quoteTextEs: "Multiples agencias y jurisdicciones vertieron su sangre, sudor y lagrimas en desmantelar organizaciones criminales, y hoy continuamos nuestra mision de proteger a las comunidades estadounidenses.",
  quoteAuthor: "VASE JMENO ZDE",
  quoteTitle: "DEA Administrator",
  quoteTitleEs: "Administrador de la DEA",
  
  statsTitle: "",
  statsTitleEs: "",
  stats: [
    { label: "Pills Seized", value: "0", sublabel: "Fentanyl" },
    { label: "Powder Seized", value: "0 kg", sublabel: "Fentanyl" },
    { label: "Pills Seized", value: "0", sublabel: "Methamphetamine" },
    { label: "Powder Seized", value: "0 kg", sublabel: "Cocaine" },
  ],
  statsLastUpdated: "",
  statsLastUpdatedEs: "",
  
  aboutTitle: "",
  aboutTitleEs: "",
  aboutDescription: "",
  aboutDescriptionEs: "",
  missionTitle: "",
  missionTitleEs: "",
  missionDescription: "",
  missionDescriptionEs: "",
  
  featuredResourcesTitle: "",
  featuredResourcesTitleEs: "",
  featuredResources: [],
  
  newsTitle: "",
  newsTitleEs: "",
  news: [
    {
      title: "Prolific Fentanyl Distributor in Greater Seattle Area Sentenced to Six Years in Prison",
      titleEs: "Distribuidor prolifico de fentanilo en el area de Seattle condenado a seis anos de prision",
      date: "January 26, 2026",
      dateEs: "26 de enero de 2026",
      href: "#"
    },
    {
      title: "DEA Announces New Los Angeles Field Division Special Agent in Charge",
      titleEs: "La DEA anuncia nuevo agente especial a cargo de la Division de Los Angeles",
      date: "January 26, 2026",
      dateEs: "26 de enero de 2026",
      href: "#"
    },
    {
      title: "Ohio Man Pleads Guilty to Fentanyl Crimes",
      titleEs: "Hombre de Ohio se declara culpable de delitos relacionados con fentanilo",
      date: "January 26, 2026",
      dateEs: "26 de enero de 2026",
      href: "#"
    },
    {
      title: "Orange County Couple Receives Lengthy Federal Prison Sentences in Methamphetamine Trafficking Conspiracy",
      titleEs: "Pareja del Condado de Orange recibe largas sentencias federales en conspiracion de trafico de metanfetaminas",
      date: "January 23, 2026",
      dateEs: "23 de enero de 2026",
      href: "#"
    },
  ],
  
  mostWantedTitle: "",
  mostWantedTitleEs: "",
  fugitives: [
    {
      name: "JMENO OSOBY 1",
      aka: "Prezdivka 1",
      description: "Popis osoby",
      reward: "UP TO $15 MILLION",
      imageUrl: "",
      href: "#"
    },
    {
      name: "JMENO OSOBY 2",
      aka: "Prezdivka 2",
      description: "Popis osoby",
      reward: "$5,000,000",
      imageUrl: "",
      href: "#"
    },
    {
      name: "JMENO OSOBY 3",
      aka: "Prezdivka 3",
      description: "Popis osoby",
      reward: "UP TO $10 MILLION",
      imageUrl: "",
      href: "#"
    },
  ],
  
  statementHeadline: "",
  statementHeadlineEs: "",
  statementDate: "",
  statementDateEs: "",
  statementContent: "",
  statementContentEs: "",
  
  scamAlertTitle: "",
  scamAlertTitleEs: "",
  scamAlertContent: "",
  scamAlertContentEs: "",
  
  footerAddress: "700 Army Navy Drive, Arlington, VA 22202",
  footerPhone: "(202) 307-7165",
  footerEmail: "dea.gov",
  
  menuCategories: defaultMenuCategories,
}

interface ConfigContextType {
  config: SiteConfig
  updateConfig: (newConfig: Partial<SiteConfig>) => void
  updateStat: (index: number, stat: Partial<DrugStat>) => void
  addStat: (stat: DrugStat) => void
  removeStat: (index: number) => void
  updateFugitive: (index: number, fugitive: Partial<Fugitive>) => void
  addFugitive: (fugitive: Fugitive) => void
  removeFugitive: (index: number) => void
  updateNews: (index: number, news: Partial<NewsItem>) => void
  addNews: (news: NewsItem) => void
  removeNews: (index: number) => void
  updateResource: (index: number, resource: Partial<ResourceItem>) => void
  addResource: (resource: ResourceItem) => void
  removeResource: (index: number) => void
  // Menu category functions
  addMenuCategory: (category: MenuCategory) => void
  updateMenuCategory: (categoryId: string, updates: Partial<MenuCategory>) => void
  removeMenuCategory: (categoryId: string) => void
  addMenuLink: (categoryId: string, link: MenuLink) => void
  updateMenuLink: (categoryId: string, linkId: string, updates: Partial<MenuLink>) => void
  removeMenuLink: (categoryId: string, linkId: string) => void
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

function getInitialConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...defaultConfig, ...parsed }
    }
  } catch (error) {
    console.error("[v0] Failed to load config from localStorage:", error)
  }
  return defaultConfig
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load config from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      console.log("[v0] Loading config from localStorage:", saved ? "found" : "not found")
      if (saved) {
        const parsed = JSON.parse(saved)
        console.log("[v0] Parsed config:", parsed)
        setConfig({ ...defaultConfig, ...parsed })
      }
    } catch (error) {
      console.error("[v0] Failed to load config from localStorage:", error)
    }
    setIsLoaded(true)
  }, [])

  // Save config to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        console.log("[v0] Saving config to localStorage")
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
      } catch (error) {
        console.error("[v0] Failed to save config to localStorage:", error)
      }
    }
  }, [config, isLoaded])

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }))
  }

  const updateStat = (index: number, stat: Partial<DrugStat>) => {
    setConfig(prev => ({
      ...prev,
      stats: prev.stats.map((s, i) => i === index ? { ...s, ...stat } : s)
    }))
  }

  const addStat = (stat: DrugStat) => {
    setConfig(prev => ({
      ...prev,
      stats: [...prev.stats, stat]
    }))
  }

  const removeStat = (index: number) => {
    setConfig(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }))
  }

  const updateFugitive = (index: number, fugitive: Partial<Fugitive>) => {
    setConfig(prev => ({
      ...prev,
      fugitives: prev.fugitives.map((f, i) => i === index ? { ...f, ...fugitive } : f)
    }))
  }

  const addFugitive = (fugitive: Fugitive) => {
    setConfig(prev => ({
      ...prev,
      fugitives: [...prev.fugitives, fugitive]
    }))
  }

  const removeFugitive = (index: number) => {
    setConfig(prev => ({
      ...prev,
      fugitives: prev.fugitives.filter((_, i) => i !== index)
    }))
  }

  const updateNews = (index: number, news: Partial<NewsItem>) => {
    setConfig(prev => ({
      ...prev,
      news: prev.news.map((n, i) => i === index ? { ...n, ...news } : n)
    }))
  }

  const addNews = (news: NewsItem) => {
    setConfig(prev => ({
      ...prev,
      news: [...prev.news, news]
    }))
  }

  const removeNews = (index: number) => {
    setConfig(prev => ({
      ...prev,
      news: prev.news.filter((_, i) => i !== index)
    }))
  }

  const updateResource = (index: number, resource: Partial<ResourceItem>) => {
    setConfig(prev => ({
      ...prev,
      featuredResources: prev.featuredResources.map((r, i) => i === index ? { ...r, ...resource } : r)
    }))
  }

  const addResource = (resource: ResourceItem) => {
    setConfig(prev => ({
      ...prev,
      featuredResources: [...prev.featuredResources, resource]
    }))
  }

  const removeResource = (index: number) => {
    setConfig(prev => ({
      ...prev,
      featuredResources: prev.featuredResources.filter((_, i) => i !== index)
    }))
  }

  // Menu category functions
  const addMenuCategory = (category: MenuCategory) => {
    setConfig(prev => ({
      ...prev,
      menuCategories: [...prev.menuCategories, category]
    }))
  }

  const updateMenuCategory = (categoryId: string, updates: Partial<MenuCategory>) => {
    setConfig(prev => ({
      ...prev,
      menuCategories: prev.menuCategories.map(cat => 
        cat.id === categoryId ? { ...cat, ...updates } : cat
      )
    }))
  }

  const removeMenuCategory = (categoryId: string) => {
    setConfig(prev => ({
      ...prev,
      menuCategories: prev.menuCategories.filter(cat => cat.id !== categoryId)
    }))
  }

  const addMenuLink = (categoryId: string, link: MenuLink) => {
    setConfig(prev => ({
      ...prev,
      menuCategories: prev.menuCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, links: [...cat.links, link] }
          : cat
      )
    }))
  }

  const updateMenuLink = (categoryId: string, linkId: string, updates: Partial<MenuLink>) => {
    setConfig(prev => ({
      ...prev,
      menuCategories: prev.menuCategories.map(cat => 
        cat.id === categoryId 
          ? { 
              ...cat, 
              links: cat.links.map(link => 
                link.id === linkId ? { ...link, ...updates } : link
              )
            }
          : cat
      )
    }))
  }

  const removeMenuLink = (categoryId: string, linkId: string) => {
    setConfig(prev => ({
      ...prev,
      menuCategories: prev.menuCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, links: cat.links.filter(link => link.id !== linkId) }
          : cat
      )
    }))
  }

  return (
    <ConfigContext.Provider value={{ 
      config, 
      updateConfig, 
      updateStat, 
      addStat, 
      removeStat,
      updateFugitive,
      addFugitive,
      removeFugitive,
      updateNews,
      addNews,
      removeNews,
      updateResource,
      addResource,
      removeResource,
      addMenuCategory,
      updateMenuCategory,
      removeMenuCategory,
      addMenuLink,
      updateMenuLink,
      removeMenuLink,
    }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider")
  }
  return context
}
