export default function Loading() {
  return (
    <div className="flex flex-col bg-zinc-950 items-center justify-center min-h-screen text-white">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Inner Pulsing Circle */}
        <div className="absolute w-8 h-8 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
      </div>
      
      <h2 className="mt-6 text-lg font-medium text-zinc-300 animate-pulse">
        Logging you in...
      </h2>
      <p className="text-sm text-zinc-400">Please wait a moment</p>
    </div>
  );
}