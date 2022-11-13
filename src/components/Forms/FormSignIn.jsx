import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import style from './forms.module.css'
import { fetchServiceUser } from './userSlice'

function FormSignIn() {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const dataForm = {
      resource: 'users/login',
      user: {
        email: data.email,
        password: data.password,
      },
    }
    dispatch(fetchServiceUser(dataForm))
  }

  return (
    <div className={style['sign-in-container']}>
      <h3 className={style.title}>Sign In</h3>
      <form className={style.form} name="sign-in" onSubmit={handleSubmit(onSubmit)}>
        <label className={style['text-label']} htmlFor="email">
          Email address
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.email })}
          type="email"
          id="email"
          placeholder="Email address"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter the valid email',
            },
            minLength: {
              value: 3,
              message: 'Too short. Min length 3',
            },
            maxLength: {
              value: 200,
              message: 'Too long. Max length 20',
            },
          })}
        />
        {errors.email && <span className={style.message}>{errors.email.message || 'Error'}</span>}

        <label className={style['text-label']} htmlFor="password">
          Password
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.password })}
          type="password"
          id="password"
          placeholder="Password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Too short. Min length 6',
            },
            maxLength: {
              value: 40,
              message: 'Too long. Max length 40',
            },
          })}
        />
        {errors.password && <span className={style.message}>{errors.password.message || 'Error'}</span>}

        <button className={style.btn} type="submit">
          Login
        </button>
      </form>
      <div className={style.signin}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </div>
    </div>
  )
}

export { FormSignIn }
