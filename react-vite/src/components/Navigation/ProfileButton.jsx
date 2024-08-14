import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './UserMenu.css';


function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

      document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
   

    

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    window.location.reload();
  };
  return (
    <div className="profile-menu-container">
      <button onClick={toggleMenu} className={"user-circle"}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul
          className={`profile-dropdown ${showMenu ? 'show' : ''}`}
        >
          {user ? (
            <>
              <li className={"user-menu-items"}>{user.username}</li>
              <li className={"user-menu-items"}>{user.email}</li>
              <li className={"user-menu-items"} onClick={() => navigate('/past-orders')}>
                Past Orders
              </li>
              <li>
                <button onClick={logout} className={"user-menu-items"}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li className={"user-menu-items"}>
                
                <OpenModalMenuItem
                  itemText="Log In"
                  className="login-signup-button"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className={"user-menu-items"}>
                <OpenModalMenuItem
                  itemText="Sign Up"
                  className="login-signup-button"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
                
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}
export default ProfileButton;

