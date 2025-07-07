'use client'

import { UserPermission, userTypes } from '@/lib/utils/types'
import { useState } from 'react'

export default function DevSettingsPage() {
  
  // token
  const [userType, setUserType] = useState('ADMIN')
  const [permission, setPermission] = useState(100)
  const [status, setStatus] = useState('')

  async function handleSetToken() {
    
    setStatus('Setting token...')
    
    const res = await fetch(`/api/dev/user-type?userType=${userType}&permissionLevel=${permission}`)
  
    if (res.ok) {
      setStatus('✅ Token issued and saved by server')
    } else {
      setStatus('❌ Failed to set token')
    }
  }
  
  // routes


  return (
    <>
        
      {/* change user token */}
      <section className="border border-gray-300 p-4 rounded-xl shadow-sm w-200">
        
        <h2 className="text-lg font-semibold mb-2">🔐 Change User Type</h2>
        
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-1">Users and Permissions</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="border p-2 rounded w-full"
            >
              {userTypes
                .map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
        
          <div>
            <label className="block font-medium mb-1">Permission:</label>
            <select
              value={permission}
              onChange={(e) => setPermission(parseInt(e.target.value))}
              className="border p-2 rounded w-full"
            >
              {Object.entries(UserPermission)
                .filter(([key, value]) => typeof value === "number")
                .map(([key, value]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
            </select>
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
      
      {/* routes */}
      <section className="border border-gray-300 p-4 rounded-xl shadow-sm w-200">
        
        <h2 className="text-lg font-semibold mb-2">🔐 Routes</h2>

        <div className="space-y-3">
          sdfhgsd
        </div>
        
      </section>
      
    </>
  )
}
