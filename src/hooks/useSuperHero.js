import { useQuery, useQueryClient } from "react-query";
import axios from 'axios'

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1]
  return axios.get('http://localhost:4000/superheroes/' + heroId)
}

function useSuperHero(heroId) {
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero
        }
      }
      return undefined;
    },
    initialDataUpdatedAt: () => queryClient.getQueryState('super-heroes')?.dataUpdatedAt
  })
}
export default useSuperHero;