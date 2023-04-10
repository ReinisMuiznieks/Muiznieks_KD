import axios from 'axios'

const API_URL = '/api/types/'

  // Get types
  const getTypes = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

const typeService = {
    getTypes
}

export default typeService