import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({hasLoggedIn}) {
  return (
    <div className="navbar">
      <div className="gradient-overlay"></div>
    <ul>
        <li>
          <NavLink to="/" className={"home-link"}>niche™</NavLink>
        </li>
        <li className="categories-button">
          <NavLink to="/categories">categories</NavLink>
        </li>
        <li className="search-bar">
          <input type="text" placeholder="Search" />
        </li>
        {hasLoggedIn ? (
          <>
            <li className="favorites-button">
              <NavLink to="/favorites">favorites</NavLink>
            </li>
            <li className="products-button">
              <NavLink to="/past-orders">products</NavLink>
            </li>
          </>
        ) : null}

        <li className='user-cart'>
          <ProfileButton />
          <NavLink to="/shopping-cart" className="shopping-cart">cart</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
