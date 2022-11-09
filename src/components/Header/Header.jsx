import classNames from 'classnames'

import style from './header.module.css'

export default function Header() {
  return (
    <div className={style.header}>
      <div className={style.logo}>Realworld Blog</div>
      <div>
        <button type="button" className={classNames(style.btn, style['btn-sign-in'])}>
          Sign In
        </button>
        <button type="button" className={classNames(style.btn, style['btn-sign-up'])}>
          Sign Up
        </button>
      </div>
    </div>
  )
}
