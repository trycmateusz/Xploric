export const updateResource = async <Resource>(collection: string, id: string, resourceData: Partial<Resource>): Promise<Partial<Resource> | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  try {
    const url = `${runtimeConfig.public.baseApiUrl}/${collection}/${id}.json`
    const data = await $fetch<Partial<Resource>>(url, {
      method: 'patch',
      body: JSON.stringify(resourceData)
    })
    if (data) {
      return data
    }
  } catch (error) {
    console.log(`Error while updating a resource to ${collection}: ${error}`)
  }
}

export const createResource = async <Resource>(collection: string, resource: Resource, id: string): Promise<Resource | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  try {
    const url = `${runtimeConfig.public.baseApiUrl}/${collection}/${id}.json`
    const data = await $fetch<Resource>(url, {
      method: 'put',
      body: JSON.stringify({
        ...resource
      })
    })
    if (data) {
      return data
    }
  } catch (error) {
    console.log(`Error while creating a resource in ${collection}: ${error}`)
  }
}
