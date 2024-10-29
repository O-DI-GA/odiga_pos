import { postRequest } from "./api";
import { storeTokens, removeTokens } from "./tokenUtils";
// 로그인 API
export async function loginAPI(loginData, setIsLogged) {
  console.log(`로그인 :`, loginData); // login Data 콘솔 확인
  const response = await postRequest("/owner/auth/login", loginData);
  // console.log("로그인 응답 : ", response);
  if (response.httpStatusCode === 200) {
    await storeTokens(response.data.accessToken, response.data.refreshToken);
    setIsLogged(true);
    return "success";
  } else {
    return "fail";
  }
}
// 로그아웃 API
export async function logoutAPI(setIsLogged) {
  await removeTokens(); // 토큰 제거
  setIsLogged(false);
}
