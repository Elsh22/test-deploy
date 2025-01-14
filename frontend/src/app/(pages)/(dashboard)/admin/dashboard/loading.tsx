export default function Loading() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
          
          {/* Loading text */}
          <h2 className="mt-4 text-xl font-semibold text-gray-700">
            Loading...
          </h2>
          
          {/* Loading message */}
          <p className="mt-2 text-sm text-gray-500">
            Please wait while we load your dashboard
          </p>
        </div>
      </div>
    );
  }