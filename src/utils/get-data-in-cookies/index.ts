
import Cookies from "js-cookie";

export const getCookieByName = (cookieName: string) => {
  const data = typeof window !== "undefined" ? Cookies.get(cookieName) || "" : "";
  return data;
}

export const getAllDataInCookies = () => {
  const userdata = JSON.parse(getCookieByName("dukanda-user") || '{}');

  return {
    userdata
  }
}