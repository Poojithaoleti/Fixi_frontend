// BACKEND API FILE
// ----------------------------------------------
// This file handles backend communication.

// ----------------------------------------------

// const BASE_URL = "https://your-backend-url.com";

// export const loginUser = async (email: string, password: string) => {
//   const response = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Login failed");
//   }

//   return data;
// };