const host = "https://sweet-dreams-server-production.up.railway.app";
// const host = "https://sweet-dreams-server.onrender.com";

const endpoints = {
  register: "/users/register",
  login: "/users/login",
  logout: "/users/logout",
  authors: "/data/authors",
  blog: "/data/blog",
  recipes: "/data/recipes",
  comments: "/data/comments",
};

export { host, endpoints };
