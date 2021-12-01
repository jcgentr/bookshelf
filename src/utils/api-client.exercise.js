import * as auth from 'auth-provider'

const apiURL = process.env.REACT_APP_API_URL
// data: {name: 'Fluffy', type: 'cat'},
function client(endpoint, customConfig = {}) {
  const {token, data: body, ...customConfigRest} = customConfig
  const config = {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body,
    ...customConfigRest,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    console.log(response)
    if (response.status === 401) {
      await auth.logout()
      return window.location.assign(window.location)
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
