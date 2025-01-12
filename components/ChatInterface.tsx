'use client'

import { useState, useEffect } from 'react'
import { 
  Send, 
  Loader2, 
  DollarSign, 
  Cigarette as CigaretteIcon, 
  AlertTriangle, 
  TrendingDown,
  Flame,
  Wind,
  CloudFog,
  Package
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import React from 'react' // Dodajte ovaj import

interface Message {
  text: string
  isUser: boolean
  isLoading?: boolean
}

interface Cigarette {
  name: string
  price: number
  nicotine: number
  tar: number
  brand: string
  strength: 'light' | 'medium' | 'strong'
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [selectedCigarettes, setSelectedCigarettes] = useState<[Cigarette | null, Cigarette | null]>([null, null])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<React.ReactNode>(null) // Promijenite ovo
  const [showWarning, setShowWarning] = useState(false)



  useEffect(() => {
    const timer = setTimeout(() => setShowWarning(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const cigaretteDatabase: Cigarette[] = [
    // Marlboro familija
    { name: "Marlboro Red", price: 7.50, nicotine: 0.8, tar: 10, brand: "Marlboro", strength: 'strong' },
    { name: "Marlboro Gold", price: 7.50, nicotine: 0.6, tar: 8, brand: "Marlboro", strength: 'light' },
    { name: "Marlboro Touch", price: 7.30, nicotine: 0.5, tar: 7, brand: "Marlboro", strength: 'light' },
    { name: "Marlboro Silver", price: 7.50, nicotine: 0.4, tar: 6, brand: "Marlboro", strength: 'light' },

    // Drina familija
    { name: "Drina Original", price: 4.50, nicotine: 0.9, tar: 10, brand: "Drina", strength: 'strong' },
    { name: "Drina Gold", price: 4.50, nicotine: 0.7, tar: 9, brand: "Drina", strength: 'medium' },
    { name: "Drina Silver", price: 4.50, nicotine: 0.5, tar: 7, brand: "Drina", strength: 'light' },

    // Winston familija
    { name: "Winston Red", price: 6.00, nicotine: 0.8, tar: 10, brand: "Winston", strength: 'strong' },
    { name: "Winston Blue", price: 6.00, nicotine: 0.6, tar: 8, brand: "Winston", strength: 'light' },
    { name: "Winston Silver", price: 6.00, nicotine: 0.4, tar: 6, brand: "Winston", strength: 'light' },
    { name: "Winston Classic", price: 6.00, nicotine: 0.7, tar: 9, brand: "Winston", strength: 'medium' },

    // Walter Wolf familija
    { name: "Walter Wolf Red", price: 6.50, nicotine: 0.8, tar: 10, brand: "Walter Wolf", strength: 'strong' },
    { name: "Walter Wolf Blue", price: 6.50, nicotine: 0.6, tar: 8, brand: "Walter Wolf", strength: 'light' },
    { name: "Walter Wolf Gold", price: 6.50, nicotine: 0.7, tar: 9, brand: "Walter Wolf", strength: 'medium' },

    // Ostali brendovi...
    // (ostatak baze cigareta ostaje isti)
  ]

  const getStrengthColor = (strength: string): string => {
    switch (strength) {
      case 'light': return 'text-blue-500'
      case 'medium': return 'text-yellow-500'
      case 'strong': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getCigaretteIcon = (strength: string): React => {
    switch (strength) {
      case 'strong':
        return <Flame className="w-6 h-6 text-red-500" />
      case 'medium':
        return <CloudFog className="w-6 h-6 text-yellow-500" />
      case 'light':
        return <Wind className="w-6 h-6 text-blue-500" />
      default:
        return <Package className="w-6 h-6 text-gray-500" />
    }
  }

  const findOptimalCigarette = (cig1: Cigarette, cig2: Cigarette): Cigarette[] => {
    const averageNicotine = (cig1.nicotine + cig2.nicotine) / 2
    const averageTar = (cig1.tar + cig2.tar) / 2
    const maxBudget = Math.max(cig1.price, cig2.price)

    return cigaretteDatabase
      .filter(cig => cig.price <= maxBudget)
      .map(cig => ({
        ...cig,
        score: Math.abs(cig.nicotine - averageNicotine) + 
               Math.abs(cig.tar - averageTar)
      }))
      .sort((a, b) => (a as any).score - (b as any).score)
      .slice(0, 3)
  }

  const handleCigaretteSelect = (cigarette: Cigarette, slot: 0 | 1) => {
    const newSelection = [...selectedCigarettes]
    newSelection[slot] = cigarette
    setSelectedCigarettes(newSelection as [Cigarette | null, Cigarette | null])
    
    if (newSelection[0] && newSelection[1]) {
      setIsLoading(true)
      setTimeout(() => {
        setResult(compareCigarettes(newSelection[0]!, newSelection[1]!))
        setIsLoading(false)
      }, 1000)
    }
  }

  const compareCigarettes = (cig1: Cigarette, cig2: Cigarette )  => {
    const recommendations = findOptimalCigarette(cig1, cig2)
    const savings = ((cig1.price + cig2.price - recommendations[0].price) / 2).toFixed(2)
    
    return (
      <div className="space-y-8 animate-fadeIn">
        {/* Comparison Section */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <CigaretteIcon className="mr-2" /> POREĐENJE
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[cig1, cig2].map((cig, idx) => (
              <div key={idx} className="glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-white">{cig.name}</h3>
                    <div className="flex items-center space-x-2">
                      {getCigaretteIcon(cig.strength)}
                      <span className={`text-sm font-medium ${getStrengthColor(cig.strength)}`}>
                        {cig.strength.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-400">{cig.price} KM</span>
                </div>
                <div className="mt-4 space-y-2 text-gray-300">
                  <p>Nikotin: {cig.nicotine}mg</p>
                  <p>Katran: {cig.tar}mg</p>
                  <p>Brend: {cig.brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
            <TrendingDown className="mr-2" /> PREPORUKE
          </h2>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} 
                className={`glass-card p-6 rounded-lg transform hover:scale-105 transition-transform duration-200 
                  ${index === 0 ? 'border-2 border-green-500' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">
                      {index + 1}. {rec.name}
                      {index === 0 && <span className="ml-2 text-green-400 text-sm">Najbolji izbor</span>}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getCigaretteIcon(rec.strength)}
                      <span className={`text-sm font-medium ${getStrengthColor(rec.strength)}`}>
                        {rec.strength.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-400">{rec.price} KM</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p>Nikotin: {rec.nicotine}mg</p>
                    <p>Katran: {rec.tar}mg</p>
                  </div>
                  <div>
                    <p>Brend: {rec.brand}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Section */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
            <DollarSign className="mr-2" /> UŠTEDA
          </h2>
          <div className="text-center">
            <p className="text-lg text-gray-300 mb-2">
              Ako dijelite {recommendations[0].name}:
            </p>
            <p className="text-4xl font-bold text-green-400">
              {savings} KM
            </p>
            <p className="text-gray-400">po osobi</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass-card rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[0, 1].map((slot) => (
            <div key={slot} className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {slot === 0 ? 'Prva cigareta' : 'Druga cigareta'}
              </label>
              <select 
                className="w-full p-4 glass-input rounded-xl text-lg text-white
                         transition-all duration-200 hover:border-purple-500 cursor-pointer
                         focus:ring-2 focus:ring-purple-500 focus:outline-none pr-12"
                onChange={(e) => {
                  const cigarette = cigaretteDatabase.find(c => c.name === e.target.value)
                  if (cigarette) handleCigaretteSelect(cigarette, slot as 0 | 1)
                }}
                value={selectedCigarettes[slot]?.name || ""}
              >
                <option value="" className="bg-gray-900">Odaberite cigaretu</option>
                {cigaretteDatabase.map(cig => (
                  <option key={cig.name} value={cig.name} className="bg-gray-900 py-2">
                    {cig.name} - {cig.price}KM
                  </option>
                ))}
              </select>
              {selectedCigarettes[slot] && (
                <div className="absolute right-3 top-12 animate-float">
                  {getCigaretteIcon(selectedCigarettes[slot]?.strength || '')}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                <p className="text-gray-300 animate-pulse">Analiziramo cigarete...</p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-8">
              {showWarning && (
                <div className="glass-card border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                    <p className="text-red-400">
                      Pušenje je štetno za vaše zdravlje. Razmislite o prestanku.
                    </p>
                  </div>
                </div>
              )}
              {result}
            </div>
          ) : (
            <div className="text-center p-12">
              <CigaretteIcon className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-float" />
              <p className="text-xl text-gray-300">Odaberite dvije cigarete za poređenje</p>
              <p className="text-sm text-gray-400 mt-2">
                Naš AI sistem će vam pomoći pronaći najbolju opciju
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm">
        <p>© 2024 CIG.ai - Powered by AI</p>
        <p className="text-xs mt-1">Verzija 1.0.0</p>
      </div>
    </div>
  )
}