import { getTokenFromStorage } from "./tokenUtils";

const URL = "http://13.125.83.255:8080";

// GET
export const getRequest = async (endpoint) => {
  try {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// GET with Token
export const getTokenRequest = async (endpoint) => {
  const token = await getTokenFromStorage();
  console.log("token : ", token);
  try {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    const token = await getTokenFromStorage();
    return token;
  } catch (e) {
    console.error("Error: ", e);
    return null;
  }
};

// POST
export const postRequest = async (endpoint, data) => {
  // console.log("확인 : ", data);
  try {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("POST Error:", error);
    con;
    throw error;
  }
};

// PUT
export const putRequest = async (endpoint, data) => {
  const token = await getTokenFromStorage();
  console.log("token : ", token);
  try {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// DELETE
export const deleteRequest = async (endpoint) => {
  try {
    const response = await fetch(`${URL}/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default URL;
