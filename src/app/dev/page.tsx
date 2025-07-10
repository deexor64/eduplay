'use client'

import { TeacherRoleEnum, UserTypeEnum } from '@/lib/utils/types'
import { useState } from 'react'

export default function DevSettingsPage() {
  

  const [userType, setUserType] = useState(UserTypeEnum.TEACHER)
  const [teacherRole, setTeacherRole] = useState(TeacherRoleEnum.ADMIN)
  const [status, setStatus] = useState('')


  async function handleSetToken() {
    
    setStatus('Setting token...')
    
    const res = await fetch(`/api/dev/user?userType=${userType}&teacherRole=${teacherRole}`)
  
    if (res.ok) {
      setStatus('✅ Token issued and saved by server')
    } else {
      setStatus('❌ Failed to set token')
    }
  }


  return (
    <div className="space-y-8">
        
      {/* Usertype and permissions */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 rounded-2xl shadow-xl shadow-gray-900/5 hover:shadow-2xl transition-all duration-300">
        
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Change User Type
          </h2>
        </div>
        
        {/* Form Controls */}
        <div className="space-y-6">
          {/* User Type Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              User Type
            </label>
            <div className="relative">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserTypeEnum)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
            >
              {Object.values(UserTypeEnum)
                .map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        
          {/* Teacher permission Level Dropdown */}
          { userType === "TEACHER" && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teacher Role
              </label>
              <div className="relative">
              <select
                value={teacherRole}
                onChange={(e) => setTeacherRole(e.target.value as TeacherRoleEnum)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
              >
                {Object.entries(TeacherRoleEnum)
                  .map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
              </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSetToken}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Set Token
          </button>

          {/* Status Feedback */}
          {status && (
            <div className={`p-4 rounded-xl ${
              status.includes('✅') 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : status.includes('❌') 
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p className="font-medium">{status}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Routes Overview */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 rounded-2xl shadow-xl shadow-gray-900/5 hover:shadow-2xl transition-all duration-300">
        
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Routes
          </h2>
        </div>

        {/* Route Cards Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Authentication Route Card */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2">Authentication</h3>
              <p className="text-sm text-blue-700">Sign in, sign up, and user management routes</p>
            </div>
            
            {/* Activities Route Card */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <h3 className="font-semibold text-green-900 mb-2">Activities</h3>
              <p className="text-sm text-green-700">Create, view, and manage learning activities</p>
            </div>
            
            {/* Templates Route Card */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-2">Templates</h3>
              <p className="text-sm text-purple-700">Activity templates and synchronization</p>
            </div>
            
            {/* Users Route Card */}
            <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
              <h3 className="font-semibold text-orange-900 mb-2">Users</h3>
              <p className="text-sm text-orange-700">User management and permissions</p>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}
