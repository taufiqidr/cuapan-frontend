import { useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const onSearchSubmit = async (e) => {
        e.preventDefault()
        if (keyword) navigate(`/search/${keyword}`)
    }

    const onKeywordChange = e => setKeyword(e.target.value)

    return (
        <div className="mt-1 pt-1 pb-1 row">
            <form className="d-flex" onSubmit={onSearchSubmit}>
                <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" value={keyword} onChange={onKeywordChange} />
                <button className="btn btn-primary" type="submit"><Search /></button>
            </form>
        </div>
    )
}

export default SearchBar