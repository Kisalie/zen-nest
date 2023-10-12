import axios from 'axios'

export const setToken = (tokenName, token) => {
  localStorage.setItem(tokenName, token)
}

export const getToken = (tokenName) => {
  return localStorage.getItem(tokenName)
}

export const tokenIsValid = (tokenName) => {
  const token = getToken(tokenName)

  if (!token) return false

  const exp = JSON.parse(atob(token.split('.')[1])).exp
  const now = Date.now() / 1000

  if (exp > now) {
    return true
  }
}

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/auth/login/', { username, password })
    if (response.data && response.data.access) {
      setToken('access-token', response.data.access)
      setToken('refresh-token', response.data.refresh)
      console.log('Successfully logged in!')
      return response.data
    }
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message)
    throw new Error('Error logging in:', error.response ? error.response.data : error.message)
  }
}

export const register = async (username, password, passwordConfirmations) => {
  try {
    const response = await axios.post('/api/auth/register/', { username, password, password_confirmations: passwordConfirmations })
    console.log('Successfully registered!')
    return response.data
  } catch (error) {
    console.error('Error registering:', error.response ? error.response.data : error.message)
    throw new Error('Error registering:', error.response ? error.response.data : error.message)
  }
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  console.log('Logged out!')
}
