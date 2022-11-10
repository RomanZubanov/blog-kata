import { Link } from 'react-router-dom'
import classNames from 'classnames'

import style from './header.module.css'

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <Link to="/signin">Realworld Blog</Link>
      </div>
      <div>
        <Link to="/signin">
          <button type="button" className={classNames(style.btn, style['btn-sign-in'])}>
            Sign In
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" className={classNames(style.btn, style['btn-sign-up'])}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}
