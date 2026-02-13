import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import CelebrationBurst from '@/components/CelebrationBurst';

type ViewState = 'initial' | 'rejected' | 'accepted';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('initial');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [shouldEvade, setShouldEvade] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    // Show celebration burst first
    setShowCelebration(true);
    
    // After celebration, show accepted state
    setTimeout(() => {
      setViewState('accepted');
      setShowCelebration(false);
    }, 2000); // 2 seconds for celebration
  };

  const handleNo = () => {
    if (viewState === 'initial') {
      setViewState('rejected');
      setShouldEvade(true);
    }
  };

  const evadeButton = () => {
    if (!shouldEvade || !containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Calculate available space for button movement
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;

    // Generate random position
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoHover = () => {
    evadeButton();
  };

  const handleNoPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (shouldEvade) {
      e.preventDefault();
      evadeButton();
    }
  };

  const handleNoTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (shouldEvade) {
      e.preventDefault();
      evadeButton();
    }
  };

  // Reset button position when view state changes
  useEffect(() => {
    if (viewState !== 'rejected') {
      setNoButtonPosition({ x: 0, y: 0 });
      setShouldEvade(false);
    }
  }, [viewState]);

  const currentImage = 
    viewState === 'accepted' 
      ? '/assets/generated/happy-capybara-new-cartoon.dim_2048x1536.png'
      : viewState === 'rejected'
      ? '/assets/generated/sad-capybara.dim_2048x1536.png'
      : '/assets/generated/capybara-cartoon-full.dim_2048x1536.png';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
      {showCelebration && <CelebrationBurst />}
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Image Container - Full aspect ratio with contain fit for all states */}
          <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900 dark:to-pink-900">
            <div className="full-aspect-image-container">
              <img 
                src={currentImage}
                alt={viewState === 'accepted' ? 'Happy Capybara' : viewState === 'rejected' ? 'Sad Capybara' : 'Capybara'}
                className="full-aspect-image-contain capybara-float"
              />
            </div>
          </div>

          {/* Interactive Section */}
          <div className="text-center space-y-8" ref={containerRef}>
            {viewState === 'initial' && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-rose-600 dark:text-rose-400 mb-8 animate-pulse">
                  Will you be my valentine Suku?
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={handleYes}
                    size="lg"
                    className="text-xl px-12 py-6 bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleNo}
                    size="lg"
                    variant="outline"
                    className="text-xl px-12 py-6 border-2 border-rose-300 text-rose-600 hover:bg-rose-100 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    No
                  </Button>
                </div>
              </>
            )}

            {viewState === 'rejected' && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold text-rose-600 dark:text-rose-400 mb-8">
                  Did you mean Yes?
                </h1>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-[200px]">
                  <Button
                    onClick={handleYes}
                    size="lg"
                    className="text-xl px-12 py-6 bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Yes
                  </Button>
                  <Button
                    ref={noButtonRef}
                    onMouseEnter={handleNoHover}
                    onPointerDown={handleNoPointerDown}
                    onTouchStart={handleNoTouchStart}
                    size="lg"
                    variant="outline"
                    className="evasive-button text-xl px-12 py-6 border-2 border-rose-300 text-rose-600 hover:bg-rose-100 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-900 shadow-lg hover:shadow-xl"
                    style={{
                      transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                      transition: 'transform 0.3s ease-out',
                    }}
                  >
                    No
                  </Button>
                </div>
              </>
            )}

            {viewState === 'accepted' && (
              <div className="space-y-6 animate-in fade-in duration-700">
                <h1 className="text-5xl md:text-7xl font-bold text-rose-600 dark:text-rose-400 mb-4">
                  You are booked for life
                </h1>
                <div className="flex justify-center gap-2">
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse" />
                  <Heart className="w-10 h-10 text-rose-500 fill-rose-500 animate-pulse delay-100" />
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse delay-200" />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-rose-600 dark:text-rose-400">
        <p className="flex items-center justify-center gap-2">
          Built with <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
        <p className="mt-2">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
