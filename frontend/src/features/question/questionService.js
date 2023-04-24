import axios from 'axios'

const API_URL = '/api/questions/'

  // Get questions
  const getQuestions = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

const questionService = {
    getQuestions
}

export default questionService