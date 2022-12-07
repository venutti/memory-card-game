import { useState } from "react";
import flags from "../flags/flags";

const createCards = (flags) => {
  return flags.map((flag) => {
    return { flag: flag, isDiscovered: false };
  });
};

const useMemoryCardGameState = () => {
  const [cards, setCards] = useState(createCards(flags));
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(score);

  const shufleCards = () => {
    const shufled = cards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setCards(shufled);
  };

  const increaseScore = () => {
    let newScore = score + 1;
    if (newScore > record) {
      setRecord(newScore);
    }
    setScore(newScore);
  };

  const reset = () => {
    setScore(0);
    cards.forEach((card) => (card.isDiscovered = false));
  };

  const selectCardAt = (index) => {
    let selectedCard = cards[index];
    if (selectedCard.isDiscovered) {
      reset();
    } else {
      selectedCard.isDiscovered = true;
      increaseScore();
    }
    shufleCards();
  };

  return { cards, score, record, selectCardAt };
};

function MemoryCardGame() {
  const { cards, score, record, selectCardAt } = useMemoryCardGameState();
  return (
    <>
      <div className="scoreboard">
        <p>PUNTAJE: {score}</p>
        <p>RECORD: {record}</p>
      </div>
      <div className="board">
        {cards.map((card, i) => (
          <div className="card" key={i}>
            <img
              src={card.flag}
              alt="bandera"
              onClick={() => selectCardAt(i)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default MemoryCardGame;
