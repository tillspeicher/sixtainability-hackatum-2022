export async function loadData(url: string): Promise<Object> {
    const response = await fetch(url, { method: 'GET' })
    console.log("response:", response)
    const data = await response.json()
    return data
}
