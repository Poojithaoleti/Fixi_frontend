// API layer
// Currently returns mock data
// TODO: Replace with real backend endpoints later

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  image: string;
}

// 🔧 Change this later when backend is ready
//const API_BASE_URL = "https://your-backend-api.com";

// ------------------ Categories ------------------

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    // TODO: Replace with backend call
    // const res = await fetch(`${API_BASE_URL}/categories`);
    // return await res.json();

    // Mock data for development
    return [
      { id: "1", name: "Cleaning", icon: "cleaning-services", color: "#3e2a56" },
      { id: "2", name: "Electrician", icon: "bolt", color: "#3e2a56" },
      { id: "3", name: "Plumbing", icon: "plumbing", color: "#3e2a56" },
      { id: "4", name: "AC Repair", icon: "ac-unit", color: "#3e2a56" },
      { id: "5", name: "Salon at Home", icon: "content-cut", color: "#3e2a56" },
      { id: "6", name: "Painting", icon: "format-paint", color: "#3e2a56" },
      { id: "7", name: "Appliance Repair", icon: "settings-input-component", color: "#3e2a56" },
      { id: "8", name: "Carpentry", icon: "carpenter", color: "#3e2a56" },
    ];
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return [];
  }
};

// ------------------ Offers ------------------

export const fetchOffers = async (): Promise<Offer[]> => {
  try {
    // TODO: Replace with backend call
    // const res = await fetch(`${API_BASE_URL}/offers`);
    // return await res.json();

    return [
      {
        id: "1",
        title: "First Service Offer",
        description: "Get 20% OFF on your first cleaning or plumbing service.",
        discount: "20%",
        icon: "loyalty",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch offers", error);
    return [];
  }
};

// ------------------ Popular Services ------------------

export const fetchPopularServices = async (): Promise<Service[]> => {
  try {
    // TODO: Replace with backend call
    // const res = await fetch(`${API_BASE_URL}/services/popular`);
    // return await res.json();

    return [
      {
        id: "1",
        name: "Full House Cleaning",
        price: "$49 onwards",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKLafDT4bflNujvd_Ml02sR8PnoBJ444-EIqeahtwk1iOl1NQOUaVVf4pw4Qiv1HO4QhYX5Vll4LDxEFJOMrWPSngmgutOultT3JIxdvTbu5qjtqGD_W1YFDaHCGW4xoSJmVHF4lmiwwBhA1jtWl8ZxkmUKE9ikaP1cJGC1hj5zwXb-aKKfVrAN0NG32hH7nsOLRE-TOBWxkUiO1IiVPmN5X4BHn91FEWaYuZmiS6yUlxFbo8BV9Lc56SD2MOEcl1rTe66en5D62M",
      },
      {
        id: "2",
        name: "Electrical Fixes",
        price: "$29 onwards",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWRMR0n1GTrg9Eb89oBkFhgqT5ZTVPdzs2kRBDd7Fvu-4KqEtw4UYZhnzRhvn4_LcfAhEmZ2oXOM8JED81In5dejJkeqPpazE-jbxMe2i0B5f2lRKJhPbU8-3yg8iySc8gEogIaJ1OVvy11trTUHvaD2YsG7_sJKCCYUDDW78Yrf6Tfq47YnfDgcisbwIgerpAyLu0ZgsLUj6OlpZyPO_ns-VRSPf-zilBWlmv7sbJL9jwI0tG4eSpf7h3NRJFsnOKtBSvw0A0-jg",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch services", error);
    return [];
  }
};