import { useEffect, useState } from "react";
import LearnCard from "./LearnCard";

const Learn2 = ({ cards, setCards, category_id, userLearnId, currCard, setCurrCard }) => {

  useEffect(() => {
    startFunction();
    console.log("curr" + currCard);
  }, [currCard, cards]);

  const startFunction = () => {
    var data;

    data = cards[currCard].eng_word;
    console.log(data);
  };

  return (
    <div className="quiz">
      {cards ? (
        <>
          <div className="quizInfo">
            <span>{/* Score : {score} */}</span>
          </div>
          <LearnCard
            currCard={currCard}
            setCurrCard={setCurrCard}
            cards={cards}
            setCards={setCards}
            category_id={category_id}
            userLearnId={userLearnId}
          />
        </>
      ) : (
        <div>Sorry we couldn't find any question</div>
      )}
    </div>
  );
};
export default Learn2;
