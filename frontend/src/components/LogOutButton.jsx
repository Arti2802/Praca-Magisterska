export const LogOutButton = () => {
    const handleLogout = () => {
        sessionStorage.setItem('isLogged', 'false'); 
        sessionStorage.setItem('id', '0');
    }
    return (
        <div className="d-flex justify-content-end">
            <button className="btn btn-outline-light" onClick={handleLogout}><a className="nav-link" href='/'>Wyloguj się</a></button>
        </div>
    )
}