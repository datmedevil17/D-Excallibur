import { Loader, PerformanceMonitor, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Physics } from "@react-three/rapier";
import { useMultiplayerState } from "playroomkit";
import { Suspense, useState } from "react";
import { Experience } from "./components/Experience";
import { Leaderboard } from "./components/Leaderboard";
import { PlayerProfileForm } from "./components/PlayerForm";
import { XpChangeScreen } from "./components/XpChangeScreen";

function App() {
  const [downgradedPerformance, setDowngradedPerformance] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isXpChange, setIsXpChange] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [kill, setKill] = useState(0);
  const [death, setDeath] = useState(0);
  const [xp, setXp] = useState(0);

  const handleProfileSubmit = (data) => {
    setPlayerData(data);
    setIsXpChange(false);
    setIsGameStarted(true);
  };

  const xpChange = (kill,death,xp,id) => {
    setKill(kill);
    setDeath(death);
    setXp(xp);
    // api call to update db
    setIsXpChange(true);
    setIsGameStarted(false);
  };

  const onBack = () => {
    setIsXpChange(false);
    setIsGameStarted(false);
    setKill(0);
    setDeath(0);
    setXp(0);
    window.location.reload();
  };

  return (
    <>
    {isXpChange ?(<XpChangeScreen kill ={kill} death={death} xp={xp} token = {playerData?.token} onBack={onBack}/>):(<></>)}
      <Loader />
      {!isGameStarted ?(<></>):(<Leaderboard />)}
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
                xpChange={xpChange}
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