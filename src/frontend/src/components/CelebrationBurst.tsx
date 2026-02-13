import { Heart } from 'lucide-react';

export default function CelebrationBurst() {
  return (
    <div className="celebration-overlay">
      <div className="celebration-container">
        {/* Create multiple hearts with different animations */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Heart
            key={i}
            className="celebration-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${1.5 + Math.random() * 1}s`,
            }}
          />
        ))}
        
        {/* Center burst text */}
        <div className="celebration-text">
          <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-ping" />
          <p className="text-4xl md:text-6xl font-bold text-rose-600 dark:text-rose-400 mt-4">
            🎉 Yes! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
