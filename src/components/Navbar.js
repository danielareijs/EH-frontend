import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";


const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const handleLogout = () => {
    logout();
  }

  const handleClickScroll = (el) => {
    const element = document.getElementById(el);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


    
    return ( 
        <nav id="navbar" className="container">
          <Link to="/">
            <img src="/images/EH-logoWhite.png" alt="logo" className="logo"/>
          </Link>
          {!user && (
            <ul className="visitor-nav-list">
              <li onClick={() => handleClickScroll('contact')}><p>Contact</p></li>
            </ul>
          )}
          {user && (
            <ul className="admin-nav-list">
              {/* <li onClick={() => navigate('/')}><p>Home</p></li> */}
              <li onClick={()=> navigate('/content')}><p>Content</p></li>
              <li onClick={handleLogout}><p>Log out</p></li>
            </ul>
          )}
        </nav>
     );
}
 
export default Navbar;