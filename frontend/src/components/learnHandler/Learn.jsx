import { useEffect } from "react";
import LearnCard from "./LearnCard";

const Learn = ({ 
  cards, 
  setCards, 
  category_id, 
  userLearnId, 
  currCard, 
  setCurrCard }) => { // saņem mainīgos no LearnController

  useEffect(() => {
    startFunction();
  }, [currCard, cards]);

  const startFunction = () => {
    var data;
    data = cards[currCard].eng_word;
  };

  return (
    <div className="quiz">
      {/* ja ir vārdu kartiņas kategorijā tad padod mainīgos uz LearnCard komponentu */}
      {cards ? (
        <>
          <LearnCard
            currCard={currCard}
            setCurrCard={setCurrCard}
            cards={cards}
            setCards={setCards}
            category_id={category_id}
            userLearnId={userLearnId}
          />
        </>
        // citādi, izvada tekstu
      ) : (
        <div>Sorry we couldn't find any question</div>
      )}
    </div>
  );
};
export default Learn;
