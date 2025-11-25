import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [level, setLevel] = useState(1);
  const [pointsPerClick, setPointsPerClick] = useState(1);
  const [clickCost, setClickCost] = useState(10);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  

  const costIncrease = 5;

  //таймер игры
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  //проверка уровня
  useEffect(() => {
    if (!gameStarted) return;
    
    const newLevel = Math.floor(clicks / 10) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
    }
  }, [clicks, level, gameStarted]);

  const handleClick = () => {
    if (!gameActive) return;
    
    setClicks(prev => prev + 1);
    setScore(prev => prev + pointsPerClick);
  };

  const upgradeClick = () => {
    if (score >= clickCost && gameActive) {
      setScore(prev => prev - clickCost);
      setPointsPerClick(prev => prev + 1);
      setClickCost(prev => prev + costIncrease);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameActive(true);
    setTimeLeft(30);
  };

  const resetGame = () => {
    setScore(0);
    setClicks(0);
    setLevel(1);
    setPointsPerClick(1);
    setClickCost(10);
    setTimeLeft(30);
    setGameActive(false);
    setGameStarted(false);
  };

  return (
    <div className="App">
      <div className="game-container">
        <h1>Кликер-игра</h1>
        
        {!gameStarted ? (
          <div className="start-screen">
            <div className="welcome-message">
              <h2>Добро пожаловать в Кликер-игру!</h2>
              <div className="instructions">
                <h3>Как играть:</h3>
                <ul>
                  <li>Кликайте по кнопке чтобы зарабатывать очки</li>
                  <li>Покупайте улучшения для увеличения очков за клик</li>
                  <li>У вас есть 30 секунд!</li>
                  <li>Уровень повышается каждые 10 кликов</li>
                </ul>
              </div>
              <button className="start-button" onClick={startGame}>
                Начать игру
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="stats">
              <div className="stat">
                <span>Счёт: </span>
                <strong>{score}</strong>
              </div>
              <div className="stat">
                <span>Уровень: </span>
                <strong>{level}</strong>
              </div>
              <div className="stat">
                <span>Кликов: </span>
                <strong>{clicks}</strong>
              </div>
              <div className="stat">
                <span>Время: </span>
                <strong>{timeLeft}с</strong>
              </div>
            </div>

            <div className="click-area">
              <button 
                className="click-button" 
                onClick={handleClick}
                disabled={!gameActive}
              >
                Кликай!<br/>
                <small>+{pointsPerClick} очков</small>
              </button>
            </div>

            <div className="upgrades">
              <button 
                className="upgrade-button"
                onClick={upgradeClick}
                disabled={score < clickCost || !gameActive}
              >
                Улучшить клик (+1)<br/>
                <small>Стоимость: {clickCost} очков</small>
                <br/>
                <small>Следующее: {clickCost + costIncrease} очков</small>
              </button>
            </div>

            {!gameActive && gameStarted && (
              <div className="game-over">
                <h2>Игра окончена!</h2>
                <p>Ваш финальный счёт: {score}</p>
                <p>Уровень: {level}</p>
                <p>Улучшений куплено: {pointsPerClick - 1}</p>
                <button className="restart-button" onClick={resetGame}>
                  Играть снова
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;