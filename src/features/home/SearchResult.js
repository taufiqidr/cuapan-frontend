import { useParams } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import Bar from '../../components/Bar'

const SearchResult = () => {
    const { keyword } = useParams()
    useTitle(`Search Result: `)

    let content
    content = (
        <div>
            <Bar title={'Search Result'} />
            <div className="container-fluid list-group list-group-flush scrollarea">
                <p>{keyword}</p>
            </div>
        </div>
    )
    return content
}

export default SearchResult