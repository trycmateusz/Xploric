interface ImagesComposable {
  getAbsolutePath(fileName: string): string | undefined;
}
const glob = import.meta.glob('~/assets/img/*.(svg)', {
  eager: true
})
const getAbsolutePath = (fileName: string): string | undefined => {
  const fileNameWithoutTilde = fileName.slice(1, fileName.length)
  const image = glob[fileNameWithoutTilde]
  return (image as { default: string }).default
}

export const useImages = (): ImagesComposable => {
  return {
    getAbsolutePath
  }
}
