export const copyToClipboard = async (text: string): Promise<string | undefined> => {
  try {
    await navigator.clipboard.writeText(text)
    return text
  } catch (error) {
    console.log(`Error when copying ${text}: ${error}`)
  }
}

export const copyLink = async () => {
  const { addToast } = useToasts()
  const copied = await copyToClipboard(window.location.href)
  if (copied) {
    addToast('Link copied')
  }
}
