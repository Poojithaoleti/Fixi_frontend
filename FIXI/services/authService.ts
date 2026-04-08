// ============================================================
// AUTH SERVICE (Mock-first → ready for backend integration)
// ============================================================

// 🔥 When backend is ready:
// import { apiRequest } from "../lib/api";
import api from "@/lib/axiosConfig";

type GeoPoint = {
  type: "Point";
  coordinates: [number, number];
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  address_text?: string;
  location?: GeoPoint;
  services?: string[];
  experienceYears?: number;
  pricePerHour?: number;
  rating?: number;
  profilePic?: string;
  role?: "customer" | "technician";
  isProfileComplete: boolean;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

export type GoogleAuthResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

export type CompleteCustomerProfilePayload = {
  phone: string;
  address_text: string;
  lat: number;
  lng: number;
};

export type CompleteTechnicianProfilePayload = {
  phone: string;
  services: string[];
  experienceYears: number;
  pricePerHour: number;
  location: GeoPoint;
};

// ============================================================
// 🧠 MOCK DATABASE (temporary)
// ============================================================

let mockUsers: User[] = [];

const isProfileComplete = (user: Partial<User>) =>
  Boolean(user.phone?.trim() && user.address?.trim());

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
    accessToken: "mock-token",
    refreshToken: "mock-refresh-token",
    user: {
      ...user,
      isProfileComplete: isProfileComplete(user),
    },
  };
};

// ============================================================
// 🆕 SIGNUP
// ============================================================

export const signupUser = async (
  name: string,
  email: string,
  password: string,
  role: "customer" | "technician" = "customer"
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
    profilePic: "",
    role,
    isProfileComplete: false,
  };

  mockUsers.push(newUser);

  return {
    accessToken: "mock-token",
    refreshToken: "mock-refresh-token",
    user: newUser,
  };
};

export const loginWithGoogleToken = async (
  idToken: string,
  role: "customer" | "technician"
): Promise<GoogleAuthResponse> => {
  const response = await api.post("/auth/google", { idToken, role });
  const payload = response?.data || {};
  const backendUser = payload.user || {};

  return {
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    user: {
      id: backendUser._id || backendUser.id,
      name: backendUser.name,
      email: backendUser.email,
      phone: backendUser.phone,
      address: backendUser.address || backendUser.address_text,
      address_text: backendUser.address_text,
      location: backendUser.location,
      services: backendUser.services,
      experienceYears: backendUser.experienceYears,
      pricePerHour: backendUser.pricePerHour,
      rating: backendUser.rating,
      role: backendUser.role || role,
      profilePic: backendUser.profilePic,
      isProfileComplete: Boolean(backendUser.isProfileComplete),
    },
  };
};

export const refreshAccessToken = async (
  refreshToken: string,
  role?: "customer" | "technician"
): Promise<{ accessToken: string }> => {
  const response = await api.post("/api/auth/refresh", {
    refreshToken,
    role,
  });

  return {
    accessToken: response?.data?.accessToken,
  };
};

export const completeUserProfile = async (
  payload: CompleteCustomerProfilePayload | CompleteTechnicianProfilePayload,
  role: "customer" | "technician"
): Promise<Partial<User>> => {
  const endpoint = role === "technician" ? "/tech" : "/user";
  const response = await api.post(endpoint, payload);
  const backendUser = response?.data?.data?.user || response?.data?.user || {};

  if (role === "technician") {
    const technicianPayload = payload as CompleteTechnicianProfilePayload;
    return {
      ...backendUser,
      phone: backendUser.phone || technicianPayload.phone,
      services: backendUser.services || technicianPayload.services,
      experienceYears:
        backendUser.experienceYears || technicianPayload.experienceYears,
      pricePerHour: backendUser.pricePerHour || technicianPayload.pricePerHour,
      location: backendUser.location || technicianPayload.location,
      role,
      isProfileComplete: true,
    };
  }

  const customerPayload = payload as CompleteCustomerProfilePayload;
  return {
    ...backendUser,
    phone: backendUser.phone || customerPayload.phone,
    address: backendUser.address || customerPayload.address_text,
    address_text: backendUser.address_text || customerPayload.address_text,
    location:
      backendUser.location || {
        type: "Point",
        coordinates: [customerPayload.lng, customerPayload.lat],
      },
    role,
    isProfileComplete: true,
  };
};