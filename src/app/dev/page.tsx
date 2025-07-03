'use client'

import { useState } from 'react'

export default function DevSettingsPage() {
  const [userType, setUserType] = useState('ADMIN')
  const [permission, setPermission] = useState(50)
  const [status, setStatus] = useState('')

  async function handleSetToken() {
    const res = await fetch('/api/dev', {
      method: 'POST',
      body: JSON.stringify({ userType, permission }),
      headers: { 'Content-Type': 'application/json' },
    })
  
    if (res.ok) {
      setStatus('✅ Token issued and saved by server')
    } else {
      setStatus('❌ Failed to set token')
    }
  }


  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">🛠 Developer Settings</h1>
      
      {/* change user token */}
      <section className="border border-gray-300 p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">🔐 Manual Token Setter</h2>

        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-1">User Type:</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="STUDENT">STUDENT</option>
              <option value="TEACHER">TEACHER</option>
              <option value="PARENT">PARENT</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Permission (0 - 100):</label>
            <input
              type="number"
              min={0}
              max={100}
              value={permission}
              onChange={(e) => setPermission(parseInt(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={handleSetToken}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Set Token
          </button>

          {status && <p className="text-green-600 font-medium">{status}</p>}
        </div>
      </section>
      
      
      
    </div>
  )
}
