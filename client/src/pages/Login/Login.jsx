import './Login.css'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
    const [isReg, setIsReg] = useState(false)
    let navigate = useNavigate();

    return (
        <div className="login">
            {!isReg ? 
            <div className="login_block">
                <h1>Вход</h1>
                <Input text='Логин' type="text" />
                <Input text='Пароль' type="password" />
                <Button text='Войти' onClick={()=>{navigate("/home")}}/>
                <a onClick={()=>{setIsReg(true)}}>Зарегестрироваться</a>
            </div>
            :
            <div className="login_block">
                <h1>Регистрация</h1>
                <Input text='Логин' type="text" />
                <Input text='Пароль' type="password" />
                <Button text='Зарегестрироваться' onClick={()=>{navigate("/home")}}/>
                <a onClick={()=>{setIsReg(false)}}>Авторизация</a>
            </div>
            }
        </div>
    )
}

export default Login
