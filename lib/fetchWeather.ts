// lib/fetchWeather.ts
export async function fetchWeather(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) throw new Error("Missing OPENWEATHER_API_KEY in .env")

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Weather API failed: ${res.status}`)

  const data = await res.json()

  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    condition: data.weather[0].main, // e.g. Rain, Clear, Snow
  }
}
