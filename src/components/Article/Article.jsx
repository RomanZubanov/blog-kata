import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Post from '../Post'

import style from './article.module.css'

export default function Article() {
  const { slug } = useParams()

  const posts = useSelector((state) => state.postList.posts)

  if (posts.length > 0) {
    console.log(posts)
    const post = posts.find((post) => post.slug === slug)

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
        />
      </div>
    )
  }
}
