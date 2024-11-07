import LoginForm from '@/components/forms/LoginForm';
import {cookies} from "next/headers"


import "./login.css";

const LoginPage = () => {

  return (
    <main className='form-container'>
        <LoginForm />
    </main>
  )
}

export default LoginPage