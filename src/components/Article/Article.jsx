import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Post from '../Post'

import style from './article.module.css'
import { fetchArticle } from '../PostList/postListSlice'

export default function Article() {
  const { slug } = useParams()

  const dispatch = useDispatch()

  const post = useSelector((state) => state.postList.article.article)
  const userName = useSelector((state) => state.user.user.username)

  useEffect(() => {
    const dataForm = {
      resource: `articles/${slug}`,
      method: 'GET',
    }
    dispatch(fetchArticle(dataForm))
  }, [])

  if (slug === post?.slug) {
    return (
      <div className={style.container}>
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
          body={post.body}
          showBtn={userName === post.author.username}
        />
      </div>
    )
  }

  return <div>Нет статьи</div>
}
