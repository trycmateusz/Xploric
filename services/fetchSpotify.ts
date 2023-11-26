export const fetchRandom = async <Resource>(resourceType: string, randomCharacter: string): Promise<Resource | undefined> => {
  interface ResourceData {
    data: Resource[]
  }
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.spotifyBaseUrl}/search?q=${randomCharacter}&type=${resourceType}`
  const { data, error } = await useFetch<ResourceData>(url)
  if (error.value) {
    console.log(`Error when fetching a random ${resourceType} from the API, ${error.value}`)
    return undefined
  }
  if (data.value) {
    const randomIndex = Math.floor(Math.random() * data.value.data.length)
    return data.value.data[randomIndex]
  }
}