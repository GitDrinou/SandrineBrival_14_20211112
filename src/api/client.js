
/**
 * Connextion to the API
 * @param {string} endpoint API endpoint with server url
 * @param {string} method API method (GET, POST, PUT...)
 * @param {object} body contain all datas sent by the redux store reducer
 * @param {string} token secure key 
 * @returns API server response
 */

export async function client(endpoint, method, body, token) {

  const headers = { 'Content-Type': 'application/json' }
  
  if (token) {
    headers.authorization = token
  }
        
  const config = {
    method: method,
    headers: {
      ...headers
    },
  }
  
  if (body) {
    config.body = JSON.stringify(body)
  }
  
  let data

  try {
    const response = await fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}
