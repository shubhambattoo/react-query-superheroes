import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = channelId => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email))
  const channelId = user?.data?.channelId
  const { data: courses } = useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
    select: (data) => data.data.courses
  })
  return (<>
    <div>DependentQueries</div>
    <h2>Courses</h2>
    {
      courses?.map(course => <div key={course}>{course}</div>)
    }
  </>)
}

export default DependentQueriesPage;