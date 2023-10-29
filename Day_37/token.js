import { client } from "./client.js";
client.setUrl("https://api-auth-two.vercel.app");

export const requestRefresh = async (refreshToken) => {
  return client.post("/auth/refresh-token", {
    refreshToken,
  });
};