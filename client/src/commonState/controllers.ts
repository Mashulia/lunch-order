export const saveToken = (token) => {
  localStorage.setItem("jwtToken", JSON.stringify(token));
};

export const getToken = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    return JSON.parse(token);
  }
};
