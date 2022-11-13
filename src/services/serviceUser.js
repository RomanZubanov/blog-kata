export default async function serviceUser(dataForm) {
  const data = JSON.stringify({
    user: dataForm.user,
  })

  const token = dataForm.token ? `Token ${dataForm.token}` : null
  const method = dataForm.method || 'POST'

  try {
    const res = await fetch(`https://blog.kata.academy/api/${dataForm.resource}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: data,
    })
    console.log(res.ok, res.status, res.statusText)
    if (res.ok) {
      const response = await res.json()
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response))
      return response
    }
    const response = await res.json()
    console.log(response)
    throw new Error(`${res.status}`)
  } catch (err) {
    return Promise.reject(err)
  }
}
