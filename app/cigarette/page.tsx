'use client'

import  { ChatInterface }  from '../../components/ChatInterface'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Cigarette Comparison
          </h1>
          <ChatInterface />
        </div>
      </div>
    </div>
  )
}