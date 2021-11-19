
export async function client(endpoint, method, body) {

  const headers = { 'Content-Type': 'application/json' }
  
  if (body.token) {
    headers.authorization = body.token
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
