import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, Pagination } from 'antd'

import Post from '../Post'
import { fetchPostsList, pageChange } from '../../features/posts/postsSlice'
import { fetchArticle } from '../../features/article/articleSlice'

import style from './postList.module.css'

export default function PostList() {
  const dispatch = useDispatch()

  const status = useSelector((state) => state.postsList.status)
  const posts = useSelector((state) => state.postsList.posts)
  const postsCount = useSelector((state) => state.postsList.postsCount)
  const currentPage = useSelector((state) => state.postsList.currentPage)
  const token = useSelector((state) => state.user.user.token)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const article = useSelector((state) => state.article.article)

  useEffect(() => {
    dispatch(fetchPostsList(token))
  }, [token, article, dispatch])

  const onFavorite = (slug, method) => {
    if (isLoggedIn) {
      const dataForm = {
        resource: `articles/${slug}/favorite`,
        method,
        token,
      }
      dispatch(fetchArticle(dataForm))
    }
  }

  let content
  if (status === 'loading') {
    content = <Spin />
  } else if (status === 'succeeded') {
    content = posts.map((post) => (
      <Post
        key={post.slug}
        slug={post.slug}
        title={post.title}
        tagList={post.tagList}
        favorited={post.favorited}
        favoritesCount={post.favoritesCount}
        authorName={post.author.username}
        avatar={post.author.image}
        createdAt={post.createdAt}
        updatedAt={post.updatedAt}
        description={post.description}
        body={null}
        onFavorite={onFavorite}
      />
    ))
  }

  return (
    <section className={style.container}>
      <div className={style.content}>{content}</div>
      <div className={style.pagination}>
        <Pagination
          size="small"
          defaultCurrent={currentPage}
          total={postsCount}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={(page) => {
            dispatch(pageChange(page))
            dispatch(fetchPostsList())
          }}
        />
      </div>
    </section>
  )
}
