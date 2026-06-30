import VideoSection from './components/VideoSection';
import HeroSection from './components/HeroSection';
import ProgramSection from './components/ProgramSection';
import StatsSection from './components/StatsSection';

export function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <StatsSection />
      <ProgramSection />
      <VideoSection />
    </main>
  );
}
