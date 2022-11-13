/* eslint-disable */

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { getUserLocal, logOut } from '../Forms/userSlice'

import style from './header.module.css'
import avatarPlug from '../Post/avatar.png'

export default function Header() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userLocal = localStorage.getItem('user') || null
    if (userLocal) {
      dispatch(getUserLocal(JSON.parse(userLocal)))
    }
  }, [])

  const user = useSelector((state) => state.user)

  const buttons = (
    <div>
      <Link to="/sign-in">
        <button type="button" className={classNames(style.btn, style['btn-sign-in'])}>
          Sign In
        </button>
      </Link>
      <Link to="/sign-up">
        <button type="button" className={classNames(style.btn, style['btn-sign-up'])}>
          Sign Up
        </button>
      </Link>
    </div>
  )

  const userInfo = (
    <div className={style['user-info']}>
      <Link to="/new-article">
        <div className={style['create-article']}>Create article</div>
      </Link>
      <div>
        <Link to="/profile">
          <span className={style['author-name']}>{user.user.username}</span>
        </Link>
      </div>
      <div className={style['user-avatar']}>
        <Link to="/profile">
          <img
            src={user.user.image || avatarPlug}
            alt="user's avatar"
            onError={(e) => {
              e.target.src = avatarPlug
            }}
          />
        </Link>
      </div>
      <button
        type="button"
        className={classNames(style.btn, style['btn-log-out'])}
        onClick={() => {
          dispatch(logOut())
          localStorage.removeItem('user')
        }}
      >
        Log Out
      </button>
    </div>
  )

  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to="/">Realworld Blog</Link>
      </div>
      {user.isLoggedIn ? userInfo : buttons}
    </div>
  )
}
