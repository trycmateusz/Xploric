export const fetchRandom = async <Resource>(resourceType: string, randomCharacter: string): Promise<Resource | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const query = `?q=${resourceType}:"%${randomCharacter}%"`
  const url = `${runtimeConfig.public.deezerBaseUrl}/search${query}`
  const { data, error } = await useFetch(url)
  if (error.value) {
    console.log(`Error when fetching a random ${resourceType} from the API, ${error.value}`)
    return undefined
  }
  if (data.value) {
    console.log(data.value)
  }
}
