import type { BucketUploadResponse } from '~/types/Bucket'
import { getHeaderWithAuthorization } from '~/helpers/header'

const uploadImageToBucketAndReturnUrl = async (file: File, collection: string, name: string): Promise<string | undefined> => {
  const runtimeConfig = useRuntimeConfig()
  const headers = getHeaderWithAuthorization()
  headers.append('Content-Type', file.type)
  const url = `https://firebasestorage.googleapis.com/v0/b/${runtimeConfig.public.apiId}.appspot.com/o/${collection}%2F${name}.${file.type.split('/')[1]}?alt=media`
  const { data, error } = await useFetch<BucketUploadResponse>(url, {
    method: 'post',
    headers,
    body: file
  })
  if (error.value) {
    console.log(`Error when uploading an image to bucket ${location}: ${error.value}`)
    return undefined
  }
  if (data.value) {
    return url
  }
}

export const useBucketUpload = () => {
  return {
    uploadImageToBucketAndReturnUrl
  }
}
