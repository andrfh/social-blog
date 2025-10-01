import './Input.css'

function Input({text, type}) {
  return (
    <input className='input' type={type} placeholder={text}/>
  )
}

export default Input
