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
