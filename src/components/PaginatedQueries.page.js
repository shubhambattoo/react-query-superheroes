import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchColors = (pageNumber = 1) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { status, data, isFetching } = useQuery(['colors', pageNumber],
    () => fetchColors(pageNumber),
    { keepPreviousData: true });

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error!</div>
  }

  return (
    <div>
      <h1>Paginated Queries</h1>
      <ul>
        {data?.data.map(color => (
          <li key={color.id}>{color.label}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPageNumber(page => page - 1)}
          disabled={pageNumber === 1}>
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber(page => page + 1)}
          disabled={pageNumber === 4}>
          Next Page
        </button>
      </div>
      {isFetching && 'Loading'}
    </div>
  )
}

export default PaginatedQueriesPage;