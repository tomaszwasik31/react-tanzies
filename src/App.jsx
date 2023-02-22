import React from "react";
import "./App.css";
import Die from "./components/Die";
import nextId from "react-id-generator";

/**
 * Challenge: Update the array of numbers in state to be
 * an array of objects instead. Each object should look like:
 * { value: <random number>, isHeld: false }
 *
 * Making this change will break parts of our code, so make
 * sure to update things so we're back to a working state
 */

function App() {
  const [numbersArray, setNumbersArray] = React.useState(allNewDice());

  const allDices = numbersArray.map((die) => (
    <Die value={die.value} key={die.key} isHeld={die.isHeld} />
  ));

  function reroll() {
    setNumbersArray(allNewDice());
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
        key: nextId(),
      });
    }
    return numbersArray;
  }

  return (
    <main>
      <div className="wrapper">
        <div className="die-wrapper">{allDices}</div>
        <button className="roll-btn" onClick={reroll}>
          {" "}
          Roll dice
        </button>
      </div>
    </main>
  );
}

export default App;
