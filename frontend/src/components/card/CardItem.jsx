import { useDispatch } from 'react-redux'
import { deleteCard } from '../../features/card/cardSlice'

function CardItem({card}) {
    const dispatch = useDispatch()

  return (
    <div className="card">
        <h2>{card.title}</h2>
        <h3>{card.description}</h3>
        <img src={card.image} alt={card.title} />
        <button onClick={() => dispatch(deleteCard(card._id))}className="close">Delete</button>
    </div>
  )
}

export default CardItem