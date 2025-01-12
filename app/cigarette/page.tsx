'use client'

import { ChatInterface } from '../../components/ChatInterface'

export default function Page() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Cigarette Comparison
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Pronađite najbolju cigaretu za zajedničko pušenje
        </p>
        <ChatInterface />
      </div>
    </div>
  )
}