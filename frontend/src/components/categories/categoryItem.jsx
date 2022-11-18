import { useDispatch } from 'react-redux'
import { deleteCategory } from '../../features/categories/categorySlice'

function CategoryItem({category}) {
    const dispatch = useDispatch()

  return (
    <div className="category">
        <h2>{category.name}</h2>
        <button onClick={() => dispatch(deleteCategory(category._id))}className="close">Delete</button>
    </div>
  )
}

export default CategoryItem