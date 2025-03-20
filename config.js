const host = "https://dummyjson.com";

const endpoints = {
  register: "/users/add",
  login: "/user/login",
  logout: "/users",
  users: "/users",
  items: "/c/401c-ac78-4085-93d7",
  recipes: "/recipes",
  limitedRecipeImages: "/recipes?limit=20&select=image",
};

export { host, endpoints };
