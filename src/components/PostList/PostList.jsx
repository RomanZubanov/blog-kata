import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin, Pagination } from 'antd'

import Post from '../Post'

import { fetchPostList, pageChange } from './postListSlice'

import style from './postList.module.css'

export default function PostList() {
  const dispatch = useDispatch()

  const status = useSelector((state) => state.postList.status)
  const posts = useSelector((state) => state.postList.posts)
  const postsCount = useSelector((state) => state.postList.postsCount)
  const currentPage = useSelector((state) => state.postList.currentPage)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPostList())
    }
  }, [status, dispatch])

  let content
  if (status === 'loading') {
    content = <Spin />
  } else if (status === 'succeeded') {
    content = posts.map((post) => {
      return (
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
        />
      )
    })
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
            dispatch(fetchPostList())
          }}
        />
      </div>
    </section>
  )
}
