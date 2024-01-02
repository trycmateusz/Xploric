import { getHeaderWithAuthorization } from '~/helpers/header'
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
  const { data, error } = await useFetch<ResourceData>(url, {
    headers: getHeaderWithAuthorization(),
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
export const fetchOne = async <Resource>(resourcePlural: SpotifySearchResponseKey, id: string): Promise<Resource | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.spotifyBaseUrl}/${resourcePlural}/${id}`
  const { data, error } = await useFetch<Resource>(url, {
    headers: getHeaderWithAuthorization()
  })
  if (error.value) {
    console.log(`Error when fetching ${resourcePlural} from the API, ${error.value}`)
    return undefined
  }
  if (data.value) {
    return data.value as Resource
  }
}
export const fetchMany = async <Resource>(resourcePlural: SpotifySearchResponseKey, ids: string[]): Promise<Resource[] | undefined> => {
  type ResourceData = {
    [each in SpotifySearchResponseKey]: Resource[]
  }
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.spotifyBaseUrl}/${resourcePlural}`
  const { data, error } = await useFetch<ResourceData>(url, {
    headers: getHeaderWithAuthorization(),
    params: {
      ids: ids.join(',')
    }
  })
  if (error.value) {
    console.log(`Error when fetching ${resourcePlural} from the API, ${error.value}`)
    return undefined
  }
  if (data.value && resourcePlural in data.value) {
    return data.value[resourcePlural]
  }
}
