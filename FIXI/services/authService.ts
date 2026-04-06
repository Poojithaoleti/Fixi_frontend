// ============================================================
// AUTH SERVICE (Mock-first → ready for backend integration)
// ============================================================

// 🔥 When backend is ready:
// import { apiRequest } from "../lib/api";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

// ============================================================
// 🧠 MOCK DATABASE (temporary)
// ============================================================

let mockUsers: User[] = [];

// ============================================================
// 🔐 LOGIN
// ============================================================

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // 🔥 BACKEND INTEGRATION
  // POST /auth/login
  // BODY: { email, password }
  // RESPONSE: { token, user }
  //
  // Example:
  // return apiRequest<AuthResponse>("/auth/login", "POST", {
  //   email,
  //   password,
  // });

  // ================= MOCK =================
  await new Promise((res) => setTimeout(res, 800));

  const user = mockUsers.find((u) => u.email === email);

  if (!user) {
    throw new Error("User not found");
  }

  if (password !== "123456") {
    throw new Error("Invalid credentials");
  }

  return {
    token: "mock-token",
    user,
  };
};

// ============================================================
// 🆕 SIGNUP
// ============================================================

export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  // 🔥 BACKEND INTEGRATION
  // POST /auth/signup
  // BODY: { name, email, password }
  // RESPONSE: { token, user }
  //
  // Example:
  // return apiRequest<AuthResponse>("/auth/signup", "POST", {
  //   name,
  //   email,
  //   password,
  // });

  // ================= MOCK =================
  await new Promise((res) => setTimeout(res, 800));

  const existing = mockUsers.find((u) => u.email === email);

  if (existing) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    phone: "",
    address: "",
    avatar: "",
  };

  mockUsers.push(newUser);

  return {
    token: "mock-token",
    user: newUser,
  };
};