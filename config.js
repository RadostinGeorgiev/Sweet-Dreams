const host = "https://dummyjson.com";

const endpoints = {
  register: "/users/add",
  login: "/user/login",
  logout: "/users",
  users: "/users",
  items: "/c/401c-ac78-4085-93d7",
  recipes: "/c/c261-c6f9-4b95-b0ea",
  limitedRecipeImages: "/recipes?limit=20&select=image",
};

export { host, endpoints };
