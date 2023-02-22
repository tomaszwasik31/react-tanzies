import React from "react";
import "./App.css";
import Die from "./components/Die";
import nextId from "react-id-generator";

/**
 * Challenge: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 * 
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
 */

function App() {
  const [tenzies, setTenzies] = React.useState(false);

  const [numbersArray, setNumbersArray] = React.useState(allNewDice());
  React.useEffect(() => {
    if (
      numbersArray.every(
        (dice) => dice.isHeld && numbersArray[0].value === dice.value
      )
    ) {
      console.log("game won");
      setTenzies(true);
    }
  }, [numbersArray]);

  function allNewDice() {
    let numbersArray = [];
    for (let i = 0; i < 10; i++) {
      numbersArray.push({
        value: randomNumber(),
        isHeld: false,
        id: nextId(),
      });
    }
    return numbersArray;
  }

  const allDices = numbersArray.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      handleClick={() => holdDice(die.id)}
    />
  ));

  function rollDice() {
    setNumbersArray((prevArray) =>
      prevArray.map((die) => {
        return die.isHeld ? die : { ...die, value: randomNumber() };
      })
    );
  }
  function randomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function holdDice(id) {
    setNumbersArray((oldArray) =>
      oldArray.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      <div className="wrapper">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-wrapper">{allDices}</div>
        <button className="roll-btn" onClick={rollDice}>
          Roll dice
        </button>
      </div>
    </main>
  );
}

export default App;
