import { useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import { FaRegHeart} from "react-icons/fa";
import { FaStoreAlt } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <div className="navbar">
      <div className="gradient-overlay"></div>
    <ul className='navbar-list'>
        <li>
          <NavLink to="/" className={"home-link"}>niche</NavLink>
        </li>
        <li className="categories-button">
          <NavLink to="/categories">categories</NavLink>
        </li>
        <li className="search-bar">
          <input type="text" placeholder="Search" />
        </li>
        {user ? (
          <>
            <li className="favorites-button">
              <NavLink to="/favorites"><FaRegHeart/></NavLink>
            </li>
            <li className="shop-manager-button">
            <NavLink to ="/my-products"><FaStoreAlt/></NavLink>
            </li>
          </>
        ) : null}

        <li className='user-cart'>
          <ProfileButton />
          <NavLink to="/shopping-cart" className="shopping-cart"><MdOutlineLocalGroceryStore /></NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
