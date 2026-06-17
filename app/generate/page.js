// "use client"

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// 1. Your core component that uses searchParams goes here
function GenerateForm() {
  const searchParams = useSearchParams()
  const handleFromUrl = searchParams.get('handle') || ""

  // State management for your form fields
  const [handle, setHandle] = useState(handleFromUrl)
  const [links, setLinks] = useState([{ text: "", url: "" }])
  const [picture, setPicture] = useState("")
  const [description, setDescription] = useState("")

  const handleAddLink = () => {
    setLinks([...links, { text: "", url: "" }])
  }

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links]
    updatedLinks[index][field] = value
    setLinks(updatedLinks)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle your submission API logic to /api/add here
    console.log({ handle, links, picture, description })
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Left Column: Form Setup */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-950 mb-6">Create your BitLink</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1 */}
          <div>
            <label className="block text-lg font-semibold text-indigo-950 mb-2">
              Step 1: Claim your Handle
            </label>
            <input 
              type="text" 
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="Choose a Handle" 
              className="w-full max-w-xs px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Step 2 */}
          <div>
            <label className="block text-lg font-semibold text-indigo-950 mb-2">
              Step 2: Add Links
            </label>
            {links.map((link, index) => (
              <div key={index} className="flex gap-2 mb-2 max-w-md">
                <input 
                  type="text" 
                  placeholder="Enter link text" 
                  value={link.text}
                  onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-full focus:outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Enter link" 
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  className="w-1/2 px-4 py-2 border rounded-full focus:outline-none"
                />
              </div>
            ))}
            <button 
              type="button"
              onClick={handleAddLink}
              className="mt-2 bg-teal-900 text-white px-4 py-2 rounded-full font-medium hover:bg-teal-800 transition"
            >
              + Add Link
            </button>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-indigo-950">
              Step 3: Add a picture and Description
            </label>
            <input 
              type="text" 
              placeholder="Enter link to your Picture" 
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none"
            />
            <input 
              type="text" 
              placeholder="Enter Description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none"
            />
          </div>

          <button 
            type="submit"
            className="bg-slate-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-700 transition"
          >
            Create your BitLink
          </button>
        </form>
      </div>

      {/* Right Column: Decorative Vector graphics placeholder */}
      <div className="hidden md:block">
        <div className="bg-purple-900 rounded-2xl p-8 text-white min-h-[400px] flex flex-col justify-between relative overflow-hidden">
          {/* You can replace this wrapper with your absolute positioned mock image elements */}
          <div className="z-10">
            <span className="bg-teal-400 text-purple-950 font-bold px-3 py-1 rounded-full text-xs">GAME OVER</span>
          </div>
          <div className="absolute right-0 bottom-0 opacity-80">
            {/* Put your image elements here */}
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Main structural page layout featuring your padding and Suspense boundary wrapper
export default function Generate() {
  return (
    <main className="pt-40 pb-12 px-6 min-h-screen bg-pink-200">
      <Suspense fallback={<div className="text-center text-indigo-950 font-semibold">Loading generator template...</div>}>
        <GenerateForm />
      </Suspense>
    </main>
  )
}