import {useState, useEffect} from 'react'
import { FaUser } from 'react-icons/fa'
function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const {username, email, password} = formData
  return (
    <>
    <section className='heading'>
        <h1>
    <FaUser/> Register
        </h1>
        <p>Please create an account</p>
    </section>

    <section className='form'>
<form>
    <input type='text' className='form-control' id='username' name='username' value={username}/>
</form>
    </section>
    </>
  )
}
export default Register