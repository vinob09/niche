import { useState } from "react"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import { fetchProducts } from '../../redux/products'

export const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(true)

        fetchProducts()
        .then((response) => response.json())
        .then(((json) =>
            results = json.filter((product) => {
                return product && product.name && product.name.toLowerCase().includes(query)
            })
        ))
        .then((result) => {
            setOptions(result)
            setIsLoading(false)
        })
    };

    const filterBy = () => true

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id='async-search'
            isLoading={isLoading}
            labelKey='products'
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for Products"
            renderMenuItemChildren={(options.map(product => {
                <span>{product.name}</span>
            }))}
        />
    )
}

export default SearchBar;
