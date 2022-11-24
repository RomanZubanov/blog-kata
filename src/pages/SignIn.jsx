import FormHandler from '../features/user/FormHandler'
import UserFormContainer from '../components/UserFormContainer/UserFormContainer'
import UserFromLink from '../components/UserFormLink/UserFromLink'

function SignIn() {
  const formSet = {
    method: 'POST',
    resource: 'users/login',
    fields: [
      { id: 'email', title: 'Email address', type: 'email' },
      { id: 'password', title: 'Password', type: 'password' },
    ],
    button: 'Login',
  }

  return (
    <UserFormContainer title="Sign In">
      <FormHandler formSet={formSet} />
      <UserFromLink text="Don’t have an account? " link="Sign Up." to="/sign-up" />
    </UserFormContainer>
  )
}
export default SignIn
