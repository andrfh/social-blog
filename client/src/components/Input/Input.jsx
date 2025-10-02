import './Input.css'

function Input({text, type, name, onChange}) {
  return (
    <input className='input' type={type} placeholder={text} name={name} onChange={onChange}/>
  )
}

export default Input
