import { client } from "client.js";
client.setUrl("https://wc24kq-8080.csb.app");
export const requestRefresh = async function (refreshToken) {
  const { response, data } = await client.post("/auth/refresh-token", {
    refreshToken,
  });
  if (response.ok) {
    return data;
  }
};
export const getRefreshTokenFromLocalStorage = () => {
  const tokens = localStorage.getItem("login_tokens");
  if (tokens) {
    const parsedTokens = JSON.parse(tokens);
    return parsedTokens.refreshToken;
  }
  return null;
};