import response from './response'

export async function getBlogs(page = 1, limit = 20, categoryid = -1) {
  return await response.get("/api/blog", {
    params: {
      page,
      limit,
      categoryid
    }
  });
}

export async function getBlogCategories() {
  return await response.get("/api/blogtype");
}

export async function getBlog(id){
  return await response.get(`/api/blog/${id}`);
}

export async function postComment(commentInfo) {
  return await response.post(`/api/comment`, commentInfo);
}

export async function getComments(blogid, page = 1, limit = 10) {
  return await response.get("/api/comment", {
    params: {
      blogid,
      page,
      limit,
    },
  });
}