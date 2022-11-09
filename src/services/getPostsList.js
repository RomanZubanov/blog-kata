export default async function getPostList(currentPage = 1) {
  const offset = (currentPage - 1) * 10
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=10&offset=${offset}`)
    if (response.ok) {
      return await response.json()
    }
    throw new Error(`${response.status}`)
  } catch (err) {
    return Promise.reject(err)
  }
}
