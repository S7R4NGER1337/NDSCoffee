import { API_URL } from './config'

export async function userAuthenticated(userData) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({
      name: userData.username,
      password: userData.password,
    }),
    headers: { 'Content-type': 'application/json' },
  })

  if (!response.ok) return null

  const data = await response.json()
  return data.token || null
}
