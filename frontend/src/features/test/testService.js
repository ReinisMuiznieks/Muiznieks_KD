import axios from 'axios'

const API_URL = '/api/tests/'

  // Get tests
  const getTests = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

const testService = {
    getTests
}

export default testService