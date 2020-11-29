import { NavLink } from "react-router-dom";

const Nav = (props) => {
    return (
        <nav>
            {props.loggedIn === false ?
                <>
                    <NavLink to="/register">register</NavLink>
                    <NavLink to="/login">login</NavLink>
                </>
                :
                <>
                    <NavLink to="/login" onClick={()=>{props.setLoggedIn(false)}}>logout</NavLink>
                </>
            }
        </nav>       
    )
}

export default Nav;