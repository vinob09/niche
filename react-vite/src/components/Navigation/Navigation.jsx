import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../redux/products";
import { NavLink } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaStoreAlt } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import CategoriesDropdown from "./CategoriesDropdown";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useSelector((store) => store.session.user);
  const categories = useSelector(state => state.products.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="gradient-overlay"></div>
      <ul className='navbar-list'>
        <li>
          <NavLink to="/" className={"home-link"}>niche</NavLink>
        </li>
        <li className="categories-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
        >
          <span>categories</span>
          {showDropdown && <CategoriesDropdown categories={categories} />}
        </li>
        <li className="search-bar">
          <input type="text" placeholder="Search" />
        </li>
        {user ? (
          <>
            <li className="favorites-button">
              <NavLink to="/favorites"><FaRegHeart /></NavLink>
            </li>
            <li className="shop-manager-button">
              <NavLink to="/products/my-products"><FaStoreAlt /></NavLink>
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
