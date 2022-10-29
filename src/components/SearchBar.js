import React from 'react'
import { Search } from 'react-bootstrap-icons'

const SearchBar = () => {
    return (
        <div className="mt-1 pt-1 pb-1 row">
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-primary" type="submit"><Search /></button>
            </form>
        </div>
    )
}

export default SearchBar