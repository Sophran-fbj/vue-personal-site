import response from "./response";

export async function getMessages(page = 1, limit = 10) {
  return await response.get("/api/message", {
    params: {
      page,
      limit,
    },
  });
}

export async function postMessage(msgInfo) {
  return await response.post("/api/message", msgInfo);
}

