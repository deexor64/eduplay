"use client"

export default function Unauthorized() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="relative p-8 max-w-md text-center">
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 to-orange-100/20 rounded-3xl blur-3xl"></div>
        
        {/* Main content card */}
        <div className="relative p-8 border border-red-200/50 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm">
          
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Access Denied
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            You don't have the necessary permissions to access this page. Please contact your administrator if you believe this is an error.
          </p>
          
          {/* Action buttons */}
          <button 
            onClick={() => window.history.back()}
            className="space-y-3 inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Go Back
          </button>
       
        </div>
        
        {/* Footer note */}
        <p className="mt-6 text-sm text-gray-500">
          Error Code: 403 - Forbidden
        </p>

      </div>
    </div>
    
  );
}
