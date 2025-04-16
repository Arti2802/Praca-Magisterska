export const LogOutButton = () => {
    const handleLogout = () => {
        sessionStorage.setItem('isLogged', 'false'); 
        sessionStorage.setItem('id', '0');
    }
    return (
        <button className="btn btn-outline-light ms-4" onClick={handleLogout}><a className="nav-link" href='/'>Wyloguj się</a></button>
    )
}