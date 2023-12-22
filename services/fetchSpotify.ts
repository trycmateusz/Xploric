import { getCookieValue } from '~/helpers/cookie'
import type { SpotifySearchResponseKey } from '~/types/Spotify'

interface Attributes {
  preview_url: string | null
}

export const fetchRandom = async <Resource extends Attributes>(resourceType: string, resourcePlural: SpotifySearchResponseKey, randomCharacter: string): Promise<Resource[] | undefined> => {
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
    return data.value[resourcePlural].items
  }
}
