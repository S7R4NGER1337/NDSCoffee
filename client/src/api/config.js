export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030'

export function getAdminHeaders() {
  const token = sessionStorage.getItem('adminToken')
  return {
    'Content-type': 'application/json',
    ...(token ? { 'x-admin-token': token } : {}),
  }
}
