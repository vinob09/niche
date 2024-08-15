import { NavLink } from 'react-router-dom';
import './CategoriesDropdown.css';

function CategoriesDropdown({ categories }) {
    return (
        <div className='categories-dropdown'>
            <ul>
                {Object.values(categories).map((category) => (
                    <li key={category.id}>
                        <NavLink to={`/categories/${category.id}`}>
                            {category.categoryName}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoriesDropdown;
