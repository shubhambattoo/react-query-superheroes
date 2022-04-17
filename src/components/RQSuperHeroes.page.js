import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAddSuperHero, useSuperHeroes } from "../hooks/useSuperHeroes"

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')
  const { data, error, status, refetch } = useSuperHeroes({ onSuccess, onError })

  function onSuccess(data) {
    console.log("side effect on success", data)
  }

  function onError() {
    console.log("side effect on error")
  }

  const { mutate: addHero } = useAddSuperHero()

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo }
    addHero(hero)
  }


  if (status === 'loading') {
    return <h2>Loading...</h2>
  }

  if (status === 'error') {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>fetch heroes</button>
      {data?.data?.map(hero => {
        return <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>
            {hero.name}
          </Link>
        </div>
      })}
      {/* {data.map(hero => {
        return <div key={hero}>{hero}</div>
      })} */}
    </>
  )
}
