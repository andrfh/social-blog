import './Login.css'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {
    const [isReg, setIsReg] = useState(false)
    const [loginData, setLoginData] = useState({login: "", password: ""});
    const [registerData, setRegisterData] = useState({login: "", password: "", name: "", surname: ""});
    let navigate = useNavigate();

    const onLogin = (event) => {
        event.preventDefault(); 
        axios.post(`${__API_ROOT__}/api/login`, loginData).then((resp) => { 
            console.log(resp.data)
            navigate("/home")
        });
    } 

    const onRegister = (event) => {
        event.preventDefault(); 
        axios.post(`${__API_ROOT__}/api/register`, registerData).then((resp) => { 
            console.log(resp.data)
            navigate("/home")
        });
    }

    const onLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const onRegChange = (event) => {
        const { name, value } = event.target;
        setRegisterData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <div className="login">
            {!isReg ? 
            <form className="login_block" onSubmit={onLogin} method='post'>
                <h1>Вход</h1>
                <Input name='login' text='Логин' type="text" onChange={onLoginChange}/>
                <Input name='password' text='Пароль' type="password" onChange={onLoginChange}/>
                <Button text='Войти' type='submit'/>
                <a onClick={()=>{setIsReg(true)}}>Зарегестрироваться</a>
            </form >
            :
            <form className="login_block" onSubmit={onRegister} method='post'>
                <h1>Регистрация</h1>
                <Input name='login' text='Логин' type="text" onChange={onRegChange}/>
                <Input name='password' text='Пароль' type="text" onChange={onRegChange}/>
                <Input name='name' text='Имя' type="text" onChange={onRegChange}/>
                <Input name='surname' text='Фамилия' type="text" onChange={onRegChange}/>
                <Button text='Зарегестрироваться' type='submit'/>
                <a onClick={()=>{setIsReg(false)}}>Авторизация</a>
            </form>
            }
        </div>
    )
}

export default Login
