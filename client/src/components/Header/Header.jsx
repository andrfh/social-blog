import './Header.css'

function Header({active}) {
    return (
        <header className="header">
            <span className="left_source">
                <a href="/home" className={active == 'home' ? 'active' : ''} >Главная</a>
                <a href="/posts" className={active == 'posts' ? 'active' : ''} >Статьи</a>
            </span>
            <span className="right_source">
                <a href="#" className={active == 'profile' ? 'active' : ''} >Профиль</a>
                <input type="search" placeholder='Поиск статей'/>
            </span>
        </header>
    )
}

export default Header
