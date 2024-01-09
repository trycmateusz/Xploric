export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.log(`Error when copying ${text}: ${error}`)
  }
}
