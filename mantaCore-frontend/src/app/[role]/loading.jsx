'use client';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );
}
