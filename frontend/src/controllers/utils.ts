export async function loadData(url: string): Promise<Object> {
  const response = await fetch(url, { method: "GET" })
  const data = await response.json()
  return data
}
