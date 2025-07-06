// app/unauthorized/page.tsx
export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800">
      <div className="p-6 max-w-md text-center border border-red-200 rounded-xl shadow-md bg-white">
        <h1 className="text-3xl font-bold mb-4">🚫 Access Denied</h1>
        <p className="mb-4">You do not have permission to view this page.</p>
        <a href="/" className="text-blue-600 hover:underline">
          Go back home
        </a>
      </div>
    </div>
  );
}
