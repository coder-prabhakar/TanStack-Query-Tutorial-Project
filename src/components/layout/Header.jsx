import { NavLink } from "react-router";

function Header() {
    return (
        <header>
            <div className="container">
                <h1 className="logo">
                    TanStack Query
                </h1>

                <nav>
                    <NavLink to='/' className='nav-item'>HOME</NavLink>
                    <NavLink to='/trad' className='nav-item'>FETCHOLD</NavLink>
                    <NavLink to='/rq' className='nav-item'>FETCHRQ</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header;
