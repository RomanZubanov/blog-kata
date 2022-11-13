/* eslint-disable */

import { useDispatch } from 'react-redux'
import { Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'

import { fetchServiceUser } from './userSlice'

import style from './forms.module.css'

function FormSignUp() {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm()

  const onSubmit = (data) => {
    const dataForm = {
      resource: 'users',
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }
    dispatch(fetchServiceUser(dataForm))
  }

  return (
    <div className={style['sign-up-container']}>
      <h3 className={style.title}>Create new account</h3>
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

        <label className={style['text-label']} htmlFor="repeatpassword">
          Repeat Password
        </label>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.repeatpassword })}
          type="password"
          id="repeatpassword"
          placeholder="repeatpassword"
          {...register('repeatpassword', {
            required: 'This field is required',
            validate: (value) => value === watch('password'),
          })}
        />
        {errors.repeatpassword && <span className={style.message}>{'Password must match'}</span>}

        <div className={style.agreement}>
          <Controller
            name="agreement"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Checkbox onChange={onChange} checked={value} name={name} defaultChecked className="checkbox">
                I agree to the processing of my personal information
              </Checkbox>
            )}
            rules={{ required: true }}
            defaultValue={true}
          />
        </div>
        {errors.agreement && <span className={style.message}>{'Confirm agreement, please'}</span>}

        <button className={style.btn} type="submit">
          Create
        </button>
      </form>
      <div className={style.signin}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </div>
    </div>
  )
}

export { FormSignUp }
