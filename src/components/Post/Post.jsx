import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import style from './post.module.css'
import heart from './heart.svg'
import redHeart from './redHeart.svg'
import avatarPlug from './avatar.png'

let key = 0

export default function Post({
  slug,
  title,
  tagList,
  favorited,
  favoritesCount,
  authorName,
  avatar,
  createdAt,
  description,
  body,
}) {
  const tags = tagList.map((tag) => <span key={key++}>{tag}</span>)

  const heartSrc = favorited ? redHeart : heart

  return (
    <article className={style.container}>
      <div className={style.header}>
        <div className={style['left-block']}>
          <div className={style['title-group']}>
            <h2 className={style.title}>
              <Link to={`/articles/${slug}`}>{title.length > 0 ? title : 'no-title'}</Link>
            </h2>
            <div className={style.favoritesCount}>
              <img src={heartSrc} alt="favorite count" />
              <span>{favoritesCount}</span>
            </div>
          </div>
          <div className={style.tag}>{tags}</div>
          <div className={style.text}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
        <div className={style['right-block']}>
          <div>
            <span className={style['author-name']}>{authorName}</span>
            <span className={style.date}>{createdAt}</span>
          </div>
          <div className={style['user-avatar']}>
            <img
              src={avatar}
              alt="user's avatar"
              onError={(e) => {
                e.target.src = avatarPlug
              }}
            />
          </div>
        </div>
      </div>
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  )
}
