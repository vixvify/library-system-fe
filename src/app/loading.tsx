export default function Loading() {
  const placeholders = Array.from({ length: 6 }, (_, index) => index);

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="h-8 w-32 rounded-xl bg-white/10" />
            <div className="mt-3 h-4 w-48 rounded-lg bg-white/5" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-8 w-20 rounded-full bg-white/5 ring-1 ring-white/10" />
            <div className="h-8 w-20 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-black/20 px-4 py-8 text-center text-sm text-gray-400 ring-1 ring-white/10">
          Loading books...
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {placeholders.map((placeholder) => (
            <div
              key={placeholder}
              className="rounded-2xl bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="h-3 w-16 rounded-full bg-white/10" />
                <div className="h-5 w-20 rounded-full bg-white/10" />
              </div>

              <div className="mt-5 h-5 w-4/5 rounded-lg bg-white/10" />
              <div className="mt-3 h-5 w-2/3 rounded-lg bg-white/5" />

              <div className="mt-5 flex items-center justify-between rounded-xl bg-black/20 px-3 py-3 ring-1 ring-white/10">
                <div className="h-3 w-14 rounded-full bg-white/10" />
                <div className="h-3 w-24 rounded-full bg-white/10" />
              </div>

              <div className="my-5 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
              <div className="h-10 rounded-xl bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
