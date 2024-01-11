export const fetchCollection = async <Resource>(collection: string): Promise<Resource[] | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.baseApiUrl}/${collection}.json`
  const { data, error } = await useFetch<Resource>(url)
  if (error.value) {
    console.log(`Error while fetching: ${collection}`, error.value)
    return undefined
  }
  if (data.value) {
    const resources: Resource[] = Object.values(data.value)
    return resources
  }
}

export const fetchOne = async<Resource>(collection: string, id: string): Promise<Resource | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.baseApiUrl}/${collection}/${id}.json`
  const { data, error } = await useFetch<Resource>(url)
  if (error.value) {
    console.log(`Error while fetching a resource from: ${collection}`, error.value)
    return undefined
  }
  if (data.value) {
    return data.value
  }
}

export const fetchMany = async<Resource>(collection: string, ids: string[]): Promise<Resource[] | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const getUrl = (id: string) => {
    return `${runtimeConfig.public.baseApiUrl}/${collection}/${id}.json`
  }
  const fetches = ids.map(id => async (): Promise<Resource> => {
    return await $fetch<Resource>(getUrl(id))
  })
  // map below is required to unwrap resources from objects. flat() doesn't work unfortunately, but assigning the resource to it's index in an object works well
  const resources = (await Promise.all(fetches.map(fetch => fetch()))).filter(resource => resource)
  if (resources && resources.length > 0) {
    return resources
  } else {
    console.log(`Error while fetching many ${collection}.`)
  }
}

export const fetchOnCondition = async <Resource>(collection: string, key: string, value: string): Promise<Resource[] | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.baseApiUrl}/${collection}.json?orderBy="${key}"&equalTo="${value}"`
  const { data, error } = await useFetch<Resource>(url)
  if (error.value) {
    console.log(`Error while fetching: ${collection}`, error.value)
    return undefined
  }
  if (data.value) {
    const resources: Resource[] = Object.values(data.value)
    return resources
  }
}
