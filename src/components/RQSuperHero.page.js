import { useParams } from "react-router-dom"
import useSuperHero from "../hooks/useSuperHero"

const RQSuperHero = () => {
  const { heroId } = useParams();
  const { status, error, data, isFetching } = useSuperHero(heroId);

  if (status === 'loading' || isFetching) {
    return <h2>Loading...</h2>
  }

  if (status === 'error') {
    return <h2>{error.message}</h2>
  }

  if (status === 'success') {
    return <h2>{data?.data.name} - {data?.data.alterEgo}</h2>
  }
}

export default RQSuperHero