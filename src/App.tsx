import React, { useState, useEffect } from 'react';

import { Enemy } from './types/enemy.type';

const App: React.FC = () => {
  const [firingRange, setFiringRange] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [turn, setTurn] = useState<number>(0);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const input: { name: string; distance: string; speed: number }[] = [
      { name: 'FirstEnemy', distance: '150m', speed: 25 },
      { name: 'SecondEnemy', distance: '120m', speed: 50 },
      { name: 'ThirdEnemy', distance: '90m', speed: 75 },
    ];
    setFiringRange(parseInt(input[0].distance));
    const initializedEnemies: Enemy[] = input.map(enemy => ({
      ...enemy,
      distanceRemaining: parseInt(enemy.distance),
    }));
    setEnemies(initializedEnemies);
  };

  const moveEnemies = () => {
    const updatedEnemies = enemies.map(enemy => ({
      ...enemy,
      distanceRemaining: Math.max(0, enemy.distanceRemaining - enemy.speed),
    }));
    setEnemies(updatedEnemies);
  };

  const fireTower = () => {
    const remainingEnemies = enemies.filter(enemy => enemy.distanceRemaining > firingRange);
    if (remainingEnemies.length < enemies.length) {
      setEnemies(remainingEnemies);
    }
  };

  const checkGameOver = () => {
    if (enemies.some(enemy => enemy.distanceRemaining <= firingRange)) {
      setGameOver(true);
    }
  };

  const playTurn = () => {
    if (!gameOver) {
      setTurn(prevTurn => prevTurn + 1);
      fireTower();
      moveEnemies();
      checkGameOver();
    }
  };

  return (
    <>
      <div>
        <p>Firing range is {firingRange}m</p>
        {enemies.map(enemy => (
          <p key={enemy.name}>
            Turn {turn}:
            {enemy.distanceRemaining <= firingRange
              ? `Kill ${enemy.name} at ${enemy.distanceRemaining}m`
              : ''}
          </p>
        ))}
        {gameOver && <p>Tower WIN in {turn} turn(s)</p>}
      </div>
      {!gameOver && <button onClick={playTurn}>Next Turn</button>}
    </>
  );
};

export default App;
