import response from './response'

export async function getBanners() {
  return await response.get("/api/banner");
}