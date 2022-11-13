import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import { fetchServiceUser } from './userSlice'

import style from './forms.module.css'

function FormEditProfile() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.user.token)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const dataForm = {
      resource: 'user',
      method: 'PUT',
      token,
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
        image: data.image,
      },
    }
    dispatch(fetchServiceUser(dataForm))
  }

  return (
    <div className={style['edit-profile-container']}>
      <h3 className={style.title}>Edit profile</h3>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style['text-label']} htmlFor="username">
          Username
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.username })}
          type="text"
          id="username"
          placeholder="Username"
          {...register('username', {
            required: 'This field is required',
            minLength: {
              value: 3,
              message: 'Too short. Min length 3',
            },
            maxLength: {
              value: 100,
              message: 'Too long. Max length 20',
            },
          })}
        />
        {errors.username && <span className={style.message}>{errors.username.message || 'Error'}</span>}

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
          New password
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.password })}
          type="password"
          id="password"
          placeholder="New password"
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

        <label className={style['text-label']} htmlFor="image">
          Avatar image (url)
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.image })}
          type="url"
          id="image"
          placeholder="Avatar image"
          {...register('image')}
        />
        {errors.image && <span className={style.message}>{'Введите крректный URL'}</span>}

        <button className={style.btn} type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export { FormEditProfile }
