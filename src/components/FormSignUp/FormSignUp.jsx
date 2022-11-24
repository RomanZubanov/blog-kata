import { useEffect } from 'react'
import { Checkbox } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'

import style from './formSignUp.module.css'

function FormSignUp({ onSignUp, serverErrors }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    control,
  } = useForm()

  const onSubmit = (data) => {
    onSignUp(data)
  }

  useEffect(() => {
    if (typeof serverErrors === 'object' && serverErrors !== null) {
      Object.keys(serverErrors).forEach((key) => {
        setError(key, { message: serverErrors[key] })
      })
    }
  }, [serverErrors, setError])

  const usernameReg = register('username', {
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Too short. Min length 3',
    },
    maxLength: {
      value: 20,
      message: 'Too long. Max length 20',
    },
  })

  const emailReg = register('email', {
    required: 'This field is required',
    pattern: {
      value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter the valid email',
    },
  })

  const passwordReg = register('password', {
    required: 'This field is required',
    minLength: {
      value: 6,
      message: 'Too short. Min length 6',
    },
    maxLength: {
      value: 40,
      message: 'Too long. Max length 40',
    },
  })

  const repeatPasswordReg = register('repeatpassword', {
    required: 'This field is required',
    validate: (value) => value === watch('password'),
  })

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {typeof serverErrors === 'string' && <span className={style.message}>{serverErrors || 'Smth Error'}</span>}
      <label htmlFor="username">
        <span className={style['text-label']}>Username</span>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.username })}
          type="text"
          id="username"
          placeholder="Username"
          name={usernameReg.name}
          onBlur={usernameReg.onBlur}
          onChange={usernameReg.onChange}
          ref={usernameReg.ref}
        />
      </label>
      {errors.username && <span className={style.message}>{errors.username.message || 'Error'}</span>}

      <label htmlFor="email">
        <span className={style['text-label']}>Email address</span>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.email })}
          type="email"
          id="email"
          placeholder="Email address"
          name={emailReg.name}
          onBlur={emailReg.onBlur}
          onChange={emailReg.onChange}
          ref={emailReg.ref}
        />
      </label>
      {errors.email && <span className={style.message}>{errors.email.message || 'Error'}</span>}

      <label htmlFor="password">
        <span className={style['text-label']}>Password</span>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.password })}
          type="password"
          id="password"
          placeholder="Password"
          name={passwordReg.name}
          onBlur={passwordReg.onBlur}
          onChange={passwordReg.onChange}
          ref={passwordReg.ref}
        />
      </label>
      {errors.password && <span className={style.message}>{errors.password.message || 'Error'}</span>}

      <label htmlFor="repeatpassword">
        <span className={style['text-label']}>Repeat Password</span>
        <input
          className={classNames(style['text-input'], { [style['error-input']]: errors.repeatpassword })}
          type="password"
          id="repeatpassword"
          placeholder="repeatpassword"
          name={repeatPasswordReg.name}
          onBlur={repeatPasswordReg.onBlur}
          onChange={repeatPasswordReg.onChange}
          ref={repeatPasswordReg.ref}
        />
      </label>
      {errors.repeatpassword && <span className={style.message}>Password must match</span>}

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
          defaultValue
        />
      </div>
      {errors.agreement && <span className={style.message}>Confirm agreement, please</span>}

      <button className={classNames(style.btn, !isValid && style['btn-disable'])} disabled={!isValid} type="submit">
        Create
      </button>
    </form>
  )
}

export default FormSignUp
