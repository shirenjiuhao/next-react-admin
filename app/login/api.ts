import req from "@/utils/request";
const mockJsApi = "https://66c00493ba6f27ca9a558dbf.mockapi.io/nextAdmin/";
export const loginApi = (username: string, password: string) =>
  req.post(mockJsApi + "/login", { username, password });

export const registerApi = (username: string, password: string) =>
  req.post(mockJsApi + "/user", { username, password });
