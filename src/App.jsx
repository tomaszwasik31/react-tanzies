import React from "react";
import "./App.css";
import Die from "./components/Die";
import nextId from "react-id-generator";

/**
 * Challenge: Update the `rollDice` function to not just roll
 * all new dice, but instead to look through the existing dice
 * to NOT role any that are being `held`.
 *
 * Hint: this will look relatively similiar to the `holdDice`
 * function below. When creating new dice, remember to use
 * `id: nanoid()` so any new dice have an `id` as well.
 */

function App() {
  const [numbersArray, setNumbersArray] = React.useState(allNewDice());

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
