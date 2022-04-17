import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from '../utils/axiosUtils'

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({ url: '/superheroes' })
}

const addSuperHero = (hero) => {
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export function useSuperHeroes({ onSuccess, onError }) {
  return useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // staleTime: 30000,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: false,
      // refetchIntervalInBackground: true,
      // enabled: false,
      onSuccess,
      onError,
      // select: (data) => data.data.map(superHero => superHero.name)
    }
  )

}

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('super-heroes')
    //   queryClient.setQueryData('super-heroes', (oldData) => {
    //     return { ...oldData, data: [...oldData.data, data.data] }
    //   })
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', oldQueryData => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        }
      })
      return { previousHeroData }
    },
    onError: (_err, _newHero, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}
