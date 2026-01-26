export default function Loading() {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-transparent">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Inner Pulsing Circle */}
        <div className="absolute w-8 h-8 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
      </div>
      
      <h2 className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
        Signing you in...
      </h2>
      <p className="text-sm text-gray-500">Please wait a moment</p>
    </div>
  );
}