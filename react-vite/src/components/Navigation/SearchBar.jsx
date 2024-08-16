import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import { csrfFetch } from '../../redux/csrf';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate()

    const handleSearch = (query) => {
        setIsLoading(true)

        csrfFetch('/api/products')
            .then((response) => response.json())
            .then(json =>
                json.filter(product => product && product.name && product.name.toLowerCase().includes(query))
            )
            .then((products) => {
                console.log(products)
                setOptions(products)
                setIsLoading(false)
            })
    };

    const selectProduct = (e, product) => {
        e.stopPropagation()
        console.log('this works')
        navigate(`/products/${product.id}`)
    }

    const filterBy = () => true

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id='async-search'
            isLoading={isLoading}
            labelKey='name'
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for Products"
            renderMenuItemChildren={product => (
                <button onClick={(e) => selectProduct(e, product)}>
                    {product.name}
                </button>
            )}
        />
    )
}

export default SearchBar;
