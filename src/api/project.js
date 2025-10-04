import response from './response'

export async function getProjects() {
  return await response.get("/api/project");
}