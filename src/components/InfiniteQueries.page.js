import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Fragment } from 'react/cjs/react.production.min'

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueries = () => {
  const { status, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    ['colors'],
    fetchColors,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1
        } else {
          return undefined
        }
      }
    }
  )

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error!</div>
  }


  return (
    <>
      <h1>Infinite Queries</h1>
      <ul>
        {data?.pages.map((group, index) => (
          <Fragment key={index}>
            {
              group.data.map((color) => {
                return <li key={color.id}>{color.label}</li>
              })
            }
          </Fragment>
        ))}
      </ul>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}

export default InfiniteQueries