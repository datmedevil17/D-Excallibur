import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { Suspense, useState } from "react";
import { Experience } from "./components/Experience";
import { Leaderboard } from "./components/Leaderboard";
import { PlayerProfileForm } from "./components/PlayerForm";

function App() {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const handleProfileSubmit = (data) => {
    setPlayerData(data);
    setIsGameStarted(true);
  };

  return (
    <>
      <Loader />
      <Leaderboard />
      {!isGameStarted ? (
        <PlayerProfileForm onSubmit={handleProfileSubmit} />
      ) : (
        <Canvas
          shadows
          camera={{ position: [0, 30, 0], fov: 30, near: 2 }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#242424"]} />
          <SoftShadows size={42} />

          <PerformanceMonitor onDecline={() => setDowngradedPerformance(true)} />

          <Suspense>
            <Physics>
              <Experience
                downgradedPerformance={downgradedPerformance}
                playerData={playerData} 
              />
            </Physics>
          </Suspense>

          {!downgradedPerformance && (
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
            </EffectComposer>
          )}
        </Canvas>
      )}
    </>
  );
}

export default App;