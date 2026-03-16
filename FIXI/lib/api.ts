// API layer
// Currently returns mock data
// TODO: Replace with real backend endpoints later

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  isPopular?: boolean;
}

export interface ServiceProvider {
  id: string;
  name: string;
  title: string;
  experience: string;
  avatar: string;
}

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
  // Extended fields for service details page
  categoryId?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  provider?: ServiceProvider;
  packages?: ServicePackage[];
  tags?: string[];
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
    // GET /services/popular
    // Returns array of popular services across all categories

    return [
      {
        id: "1",
        categoryId: "1",
        name: "Full House Cleaning",
        price: "$49 onwards",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKLafDT4bflNujvd_Ml02sR8PnoBJ444-EIqeahtwk1iOl1NQOUaVVf4pw4Qiv1HO4QhYX5Vll4LDxEFJOMrWPSngmgutOultT3JIxdvTbu5qjtqGD_W1YFDaHCGW4xoSJmVHF4lmiwwBhA1jtWl8ZxkmUKE9ikaP1cJGC1hj5zwXb-aKKfVrAN0NG32hH7nsOLRE-TOBWxkUiO1IiVPmN5X4BHn91FEWaYuZmiS6yUlxFbo8BV9Lc56SD2MOEcl1rTe66en5D62M",
      },
      {
        id: "2",
        categoryId: "2",
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

// ------------------ Service Details ------------------

export const fetchServiceDetails = async (serviceId: string): Promise<Service | null> => {
  try {
    // TODO: BACKEND INTEGRATION - REPLACE ALL MOCK DATA BELOW
    // GET /services/:id
    // 
    // Proper implementation:
    // const response = await fetch(
    //   `${API_BASE_URL}/services/${serviceId}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
    // 
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch service: ${response.statusText}`);
    // }
    // 
    // const data = await response.json();
    // return data;

    // ============================================================
    // MOCK DATA - FOR DEVELOPMENT/TESTING ONLY
    // Replace with actual backend call above
    // ============================================================

    const mockServices: Record<string, Service> = {
      "1": {
        id: "1",
        categoryId: "1",
        name: "Home Deep Cleaning",
        price: "$120",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA59AfUZv66mMoIfylLASWDLWkQbdRV3V6yeB5mGhMXMrsFUaIhrkJlUyd3IOvBejbJ_s6P62RJsZdKafYeNm1LJdw12hZx6WjMsKS_ZOQqM5JGjMqFR6n9pUkxrmSkd3hBAAWdmzGbZ7_QcE5s7qf1x_tDVg03Kt1wtk-b3SZcjGep8oI0F-SV3hauTCSwtFb26YB7NsI_MEmYFufe8iKnEMwbUuQqqatGxCy1I9-Z9yYL6mG-Xh6bojvgkhZ6CnQJuqkcGLYINJY",
        rating: 4.9,
        reviewCount: 120,
        description: "Our comprehensive deep cleaning service covers every corner of your home. We use eco-friendly products to remove tough stains, sanitize surfaces, and leave your space sparkling like new.",
        provider: {
          id: "p1",
          name: "SparkleClean Solutions",
          title: "Professional Provider",
          experience: "5 yrs exp.",
          avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkVohJxOhJ1S9Tvy70DqmybgcrgChRNFF0S43sLFZgbI5NPDdmvvpGZWTDhHbQ7Fp3Caw6iJqEaHL3SbdOppnY4khs1owFw3k_vNvMizLaspGHKanLH10pyPxaCIZCVHI2EnzIiEy9YdSM_2v1CDGWT9dIFt7l1S-Im1bjxN84w_bgX4ayF5ly4t_tVKwhf1oVChfmMgzEfws5T565wYvFNvUMD_rUr98uja4PFTygPEn4vPKH_f0wa7dLw4FQjFKXD0ikcM2oB6Q",
        },
        packages: [
          {
            id: "pkg1",
            name: "Basic Package",
            description: "Living room, kitchen & floor mopping",
            price: 80,
          },
          {
            id: "pkg2",
            name: "Standard Package",
            description: "Everything in Basic + Bathroom deep clean",
            price: 120,
            isPopular: true,
          },
          {
            id: "pkg3",
            name: "Premium Package",
            description: "Standard + Windows & Carpet steam clean",
            price: 180,
          },
        ],
        tags: ["Eco-friendly", "Insured", "Professional"],
      },
      "2": {
        id: "2",
        categoryId: "2",
        name: "Electrical Installation",
        price: "$75",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWRMR0n1GTrg9Eb89oBkFhgqT5ZTVPdzs2kRBDd7Fvu-4KqEtw4UYZhnzRhvn4_LcfAhEmZ2oXOM8JED81In5dejJkeqPpazE-jbxMe2i0B5f2lRKJhPbU8-3yg8iySc8gEogIaJ1OVvy11trTUHvaD2YsG7_sJKCCYUDDW78Yrf6Tfq47YnfDgcisbwIgerpAyLu0ZgsLUj6OlpZyPO_ns-VRSPf-zilBWlmv7sbJL9jwI0tG4eSpf7h3NRJFsnOKtBSvw0A0-jg",
        rating: 4.7,
        reviewCount: 95,
        description: "Professional electrical services for all your installation and repair needs. Licensed electricians with years of experience.",
        provider: {
          id: "p2",
          name: "ElectroExperts",
          title: "Certified Electrician",
          experience: "8 yrs exp.",
          avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkVohJxOhJ1S9Tvy70DqmybgcrgChRNFF0S43sLFZgbI5NPDdmvvpGZWTDhHbQ7Fp3Caw6iJqEaHL3SbdOppnY4khs1owFw3k_vNvMizLaspGHKanLH10pyPxaCIZCVHI2EnzIiEy9YdSM_2v1CDGWT9dIFt7l1S-Im1bjxN84w_bgX4ayF5ly4t_tVKwhf1oVChfmMgzEfws5T565wYvFNvUMD_rUr98uja4PFTygPEn4vPKH_f0wa7dLw4FQjFKXD0ikcM2oB6Q",
        },
        packages: [
          {
            id: "pkg4",
            name: "Basic Installation",
            description: "Single outlet or switch installation",
            price: 50,
          },
          {
            id: "pkg5",
            name: "Standard Installation",
            description: "Multiple outlets/switches or light fixture",
            price: 75,
            isPopular: true,
          },
          {
            id: "pkg6",
            name: "Premium Wiring",
            description: "Full room electrical wiring",
            price: 150,
          },
        ],
        tags: ["Licensed", "Certified", "Guaranteed"],
      },
    };

    return mockServices[serviceId] || null;
  } catch (error) {
    console.error("Failed to fetch service details", error);
    return null;
  }
};

// ------------------ All Services ------------------

export const fetchAllServices = async (): Promise<Service[]> => {
  try {
    // TODO: BACKEND
    // GET /services

    // Using existing mock data
    return [
      {
        id: "1",
        categoryId: "1",
        name: "Home Deep Cleaning",
        price: "$120",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA59AfUZv66mMoIfylLASWDLWkQbdRV3V6yeB5mGhMXMrsFUaIhrkJlUyd3IOvBejbJ_s6P62RJsZdKafYeNm1LJdw12hZx6WjMsKS_ZOQqM5JGjMqFR6n9pUkxrmSkd3hBAAWdmzGbZ7_QcE5s7qf1x_tDVg03Kt1wtk-b3SZcjGep8oI0F-SV3hauTCSwtFb26YB7NsI_MEmYFufe8iKnEMwbUuQqqatGxCy1I9-Z9yYL6mG-Xh6bojvgkhZ6CnQJuqkcGLYINJY",
      },
      {
        id: "2",
        categoryId: "2",
        name: "Electrical Installation",
        price: "$75",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWRMR0n1GTrg9Eb89oBkFhgqT5ZTVPdzs2kRBDd7Fvu-4KqEtw4UYZhnzRhvn4_LcfAhEmZ2oXOM8JED81In5dejJkeqPpazE-jbxMe2i0B5f2lRKJhPbU8-3yg8iySc8gEogIaJ1OVvy11trTUHvaD2YsG7_sJKCCYUDDW78Yrf6Tfq47YnfDgcisbwIgerpAyLu0ZgsLUj6OlpZyPO_ns-VRSPf-zilBWlmv7sbJL9jwI0tG4eSpf7h3NRJFsnOKtBSvw0A0-jg",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch all services", error);
    return [];
  }
};