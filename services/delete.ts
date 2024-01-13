export const deleteResource = async (collection: string, id: string): Promise<null | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.baseApiUrl}/${collection}/${id}.json`
  const { data, error } = await useFetch<null>(url, {
    method: 'delete'
  })
  if (data.value === null) {
    return null
  }
  if (error.value) {
    console.log(`Error when deleting a resource from ${collection}: ${error.value}`)
  }
}

export const deleteMany = async (collection: string, ids: string[]): Promise<null | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const getUrl = (id: string) => {
    return `${runtimeConfig.public.baseApiUrl}/${collection}/${id}.json`
  }
  const fetches = ids.map(id => async (): Promise<null | undefined> => {
    return await $fetch<null>(getUrl(id), {
      method: 'delete'
    })
  })
  const deleted = (await Promise.all(fetches.map(fetch => fetch())))
  if (!deleted.includes(undefined)) {
    return null
  } else {
    console.log(`Database error while fetching many ${collection}.`)
    return undefined
  }
}
