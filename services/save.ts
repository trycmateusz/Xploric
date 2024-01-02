export const updateResource = async <Resource>(collection: string, id: string, resourceData: Partial<Resource>): Promise<Partial<Resource> | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const data = await $fetch<Partial<Resource>>(`${runtimeConfig.public.baseApiUrl}/${collection}/${id}.json`, {
    method: 'patch',
    body: { ...resourceData }
  })
  if (data) {
    return data
  }
}
