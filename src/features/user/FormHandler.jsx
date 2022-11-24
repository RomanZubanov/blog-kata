import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import UserFormField from '../../components/UserFormField/UserFormField'
import UserFormAgreement from '../../components/UserFormAgreement/UserFormAgreement'
import UserFormBtn from '../../components/UserFormBtn/UserFormBtn'
import UserGeneralError from '../../components/UserGeneralError/UserGeneralError'
import validationRulesMaker from '../../helpers/validationRulesMaker'

import { fetchServiceUser } from './userSlice'

function FormHandler({ formSet }) {
  const dispatch = useDispatch()
  const [generalError, setGeneralError] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    control,
  } = useForm({ mode: 'onTouched' })

  const onSubmit = (data) => {
    const dataForm = {
      method: formSet.method,
      resource: formSet.resource,
      user: data,
    }
    dispatch(fetchServiceUser(dataForm))
  }

  const validationRules = validationRulesMaker(watch)

  const serverErrors = useSelector((state) => state.user.error)

  useEffect(() => {
    if (typeof serverErrors === 'object' && serverErrors !== null) {
      Object.keys(serverErrors).forEach((key) => {
        setError(key, { message: serverErrors[key] })
        if (key.includes(' or ')) {
          setGeneralError(`${key} ${serverErrors[key]}`)
        }
      })
    }
  }, [serverErrors, setError, generalError])

  const fieldsArr = formSet.fields.map((field) => {
    const { title, id, type } = field
    const validation = register(id, validationRules[id])
    return <UserFormField key={id} title={title} id={id} type={type} validation={validation} error={errors[id]} />
  })

  const agreement = (
    <Controller
      name="agreement"
      control={control}
      render={(field) => <UserFormAgreement field={field} errorMessage={errors?.agreement?.message} />}
      rules={{ required: 'Confirm agreement' }}
      defaultValue
    />
  )

  return (
    <div>
      <UserGeneralError generalError={generalError} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {fieldsArr}
        {formSet.agreement && agreement}
        <UserFormBtn title={formSet.button} isValid={isValid} />
      </form>
    </div>
  )
}

export default FormHandler
