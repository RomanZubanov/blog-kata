export default async function serviceArticle(dataForm) {
  const data =
    JSON.stringify({
      article: dataForm.article,
    }) || null

  console.log('data', data)

  const token = dataForm.token ? `Token ${dataForm.token}` : null
  const method = dataForm.method || 'POST'

  if (method !== 'GET') {
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
        return response
      }
      const response = await res.json()
      console.log(response)
      throw new Error(`${res.status}`)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  try {
    const res = await fetch(`https://blog.kata.academy/api/${dataForm.resource}`)
    console.log(res.ok, res.status, res.statusText)
    if (res.ok) {
      const response = await res.json()
      console.log(response)
      return response
    }
    const response = await res.json()
    console.log(response)
    throw new Error(`${res.status}`)
  } catch (err) {
    return Promise.reject(err)
  }
}
