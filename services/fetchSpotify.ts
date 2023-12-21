import { getCookieValue } from '~/helpers/cookie'
import { getRandomIndex } from '~/helpers'
import type { SpotifySearchResponseKey, SpotifyApiSong } from '~/types/Spotify'

export const fetchRandom = async <Resource>(resourceType: string, resourcePlural: SpotifySearchResponseKey, randomCharacter: string): Promise<Resource | undefined> => {
  interface ResourceDataItems {
    items: Resource[]
  }
  type ResourceData = {
    [each in SpotifySearchResponseKey]: ResourceDataItems
  }
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.spotifyBaseUrl}/search`
  const accessToken = getCookieValue('access_token')
  const headers = new Headers()
  headers.append('Authorization', `Bearer ${accessToken}`)
  const { data, error } = await useFetch<ResourceData>(url, {
    headers,
    params: {
      q: randomCharacter,
      type: resourceType
    }
  })
  if (error.value) {
    console.log(`Error when fetching a random ${resourceType} from the API, ${error.value}`)
    return undefined
  }
  if (data.value && resourcePlural in data.value) {
    const resources = data.value[resourcePlural].items
    const randomIndex = getRandomIndex(data.value[resourcePlural].items)
    const randomResource = resources[randomIndex]
    if ('preview_url' in randomResource) {
      console.log('123')
    }
    return randomResource
  }
}
