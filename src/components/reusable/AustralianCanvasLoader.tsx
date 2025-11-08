
const AustralianCanvasLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 h-full bg-transparent">
      {/* flex flex-col items-center justify-center py-10 h-full bg-gradient-to-br from-amber-50 via-teal-50 to-cyan-100 bg-transparent */}
      <div className="relative">
        {/* Pulsating Australia Shape */}
        <div className="relative w-64 h-48 mb-8">
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ausPulse" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className="stop-color-amber-400" />
                <stop offset="50%" className="stop-color-teal-400" />
                <stop offset="100%" className="stop-color-cyan-600" />
              </linearGradient>
            </defs>

            {/* Australia Shape */}
            <path
              d="M 950 50 L 1050 100 L 1100 200 L 1080 300 L 1050 350 L 1000 380 L 950 390 L 900 380 L 880 350 L 900 300 L 950 250 L 980 200 L 1000 150 L 980 100 Z"
              fill="url(#ausPulse)"
              className="animate-pulse-slow"
            />
          </svg>

          {/* Subtle Glow */}
          <div className="absolute inset-0 blur-3xl opacity-30">
            <div className="w-full h-full bg-gradient-to-r from-amber-300 to-cyan-400 rounded-full animate-ping-slow"></div>
          </div>
        </div>

        {/* Animated Text */}
        <div className="text-center space-y-1">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight animate-fade-in-up">
            The
          </h1>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 via-teal-600 to-cyan-700 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
            Australian
          </h1>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 tracking-tight animate-fade-in-up animation-delay-400">
            Canvas
          </h1>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Tailwind Animations (via @keyframes) */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          80%, 100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default AustralianCanvasLoader;