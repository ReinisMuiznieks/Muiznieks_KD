import axios from 'axios'

const API_URL = '/api/categories/'

// Create new category
const createCategory = async (categoryData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, categoryData, config)
  
    return response.data
  }

// Update category
const updateCategory = async (updatedCategoryData, categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + categoryId, updatedCategoryData, config)

  return response.data
}

  // Get user category
  const getCategories = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

  // Delete category
  const deleteCategory = async (categoryId,token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } 
  
    const response = await axios.delete(API_URL + categoryId, config)
  
    return response.data
  }

const categoryService = {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory
}

export default categoryService