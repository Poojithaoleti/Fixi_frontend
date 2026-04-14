// ============================================================
// API LAYER
// Mock-first architecture → easily replace with backend
// ============================================================

// 🔧 Change this when backend is ready
// const API_BASE_URL = "https://your-backend-api.com";

// ============================================================
// Generic API Handler (centralized error handling)
// ============================================================

const handleApiCall = async <T>(
  apiCall: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.error("API Error:", error);
    return fallback;
  }
};

// ============================================================
// TYPES
// ============================================================

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
  icon: string; //  backend must send valid icon key
  color: string; // hex color
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
  price: string; // decide: string vs number (important)
  image: string;

  // Optional fields (details screen)
  categoryId?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  provider?: ServiceProvider;
  packages?: ServicePackage[];
  tags?: string[];
}

// ============================================================
// CATEGORIES
// ============================================================

export const fetchCategories = async (): Promise<Category[]> => {
  return handleApiCall(async () => {
    //  BACKEND
    // GET /categories
    // const res = await fetch(`${API_BASE_URL}/categories`);
    // if (!res.ok) throw new Error("Failed to fetch categories");
    // return await res.json();

    return [
      { id: "1", name: "Cleaning", icon: "cleaning-services", color: "#3e2a56" },
      { id: "2", name: "Electrician", icon: "bolt", color: "#3e2a56" },
      { id: "3", name: "Plumbing", icon: "plumbing", color: "#3e2a56" },
      { id: "4", name: "AC Repair", icon: "ac-unit", color: "#3e2a56" },
      { id: "5", name: "Salon", icon: "content-cut", color: "#3e2a56" },
      { id: "6", name: "Painting", icon: "format-paint", color: "#3e2a56" },
      { id: "7", name: "Repair", icon: "settings", color: "#3e2a56" },
      { id: "8", name: "Carpentry", icon: "carpenter", color: "#3e2a56" },
    ];
  }, []);
};

// ============================================================
// OFFERS
// ============================================================

export const fetchOffers = async (): Promise<Offer[]> => {
  return handleApiCall(async () => {
    //  BACKEND
    // GET /offers

    return [
      {
        id: "1",
        title: "First Service Offer",
        description: "Get 20% OFF on your first service.",
        discount: "20%",
        icon: "loyalty",
      },
      {
        id: "2",
        title: "Summer Sale",
        description: "Flat 15% OFF on all services.",
        discount: "15%",
        icon: "local-offer",
      },
    ];
  }, []);
};

// ============================================================
// POPULAR SERVICES
// ============================================================

export const fetchPopularServices = async (): Promise<Service[]> => {
  return handleApiCall(async () => {
    //  BACKEND
    // GET /services/popular

    return [
      {
        id: "1",
        categoryId: "1",
        name: "Full House Cleaning",
        price: "$49 onwards",
        image: "https://via.placeholder.com/300",
      },
      {
        id: "2",
        categoryId: "2",
        name: "Electrical Fixes",
        price: "$29 onwards",
        image: "https://via.placeholder.com/300",
      },
    ];
  }, []);
};

// ============================================================
// SERVICE DETAILS
// ============================================================

export const fetchServiceDetails = async (
  serviceId: string
): Promise<Service | null> => {
  return handleApiCall(async () => {
    //  BACKEND
    // GET /services/:id

    const mockServices: Record<string, Service> = {
      "1": {
        id: "1",
        categoryId: "1",
        name: "Home Deep Cleaning",
        price: "$120",
        image: "https://via.placeholder.com/300",
        rating: 4.9,
        reviewCount: 120,
        description: "Deep cleaning for your entire home.",
        provider: {
          id: "p1",
          name: "CleanPro",
          title: "Professional",
          experience: "5 yrs",
          avatar: "https://via.placeholder.com/100",
        },
        packages: [
          {
            id: "pkg1",
            name: "Basic",
            description: "Basic cleaning",
            price: 80,
          },
          {
            id: "pkg2",
            name: "Standard",
            description: "Includes bathroom cleaning",
            price: 120,
            isPopular: true,
          },
        ],
        tags: ["Eco-friendly", "Professional"],
      },
    };

    return mockServices[serviceId] || null;
  }, null);
};

// ============================================================
// ALL SERVICES
// ============================================================

export const fetchAllServices = async (): Promise<Service[]> => {
  return handleApiCall(async () => {
    // BACKEND
    // GET /services

    return [
      {
        id: "1",
        categoryId: "1",
        name: "Home Deep Cleaning",
        price: "$120",
        image: "https://via.placeholder.com/300",
      },
      {
        id: "2",
        categoryId: "2",
        name: "Electrical Installation",
        price: "$75",
        image: "https://via.placeholder.com/300",
      },
    ];
  }, []);
};

// ============================================================
// BOOKINGS (NEW)
// ============================================================

// Temporary in-memory storage (mock database)
// Replace this with backend DB later
let bookings: any[] = [];

/**
 * Create Booking
 */
export const createBooking = async (data: {
  bookingId: string;
  serviceName?: string;
  price?: number;
}) => {
  return handleApiCall(async () => {
    /**
     * BACKEND INTEGRATION
     * -------------------
     * POST /booking
     * Body:
     * {
     *   serviceId,
     *   packageId,
     *   userId
     * }
     */

    const newBooking = {
      id: data.bookingId,
      serviceName: data.serviceName || "Service",
      date: new Date().toLocaleString(),
      price: data.price || 0,
      status: "confirmed",
    };

    bookings.unshift(newBooking);

    return newBooking;
  }, null);
};

/**
 * Fetch All Bookings
 */
export const fetchBookings = async () => {
  return handleApiCall(async () => {
    /**
     * BACKEND INTEGRATION
     * -------------------
     * GET /bookings
     * Headers:
     * Authorization: Bearer <token>
     */

    return bookings;
  }, []);
};

/**
 * Fetch Single Booking
 */
export const fetchBookingDetails = async (id: string) => {
  return handleApiCall(async () => {
    /**
     * BACKEND INTEGRATION
     * -------------------
     * GET /booking/:id
     */

    const booking = bookings.find((b) => b.id === id);

    return booking || null;
  }, null);
};

// ============================================================
// PAYMENT (NEW)
// ============================================================

/**
 * Initiate Payment
 */
export const initiatePayment = async (bookingId: string) => {
  return handleApiCall(async () => {
    /**
     * BACKEND INTEGRATION
     * -------------------
     * POST /payment/initiate
     * Body:
     * {
     *   bookingId
     * }
     */

    return {
      success: true,
      paymentId: "mock_payment_id",
    };
  }, null);
};

/**
 * Confirm Payment
 */
export const confirmPayment = async (bookingId: string) => {
  return handleApiCall(async () => {
    /**
     * BACKEND INTEGRATION
     * -------------------
     * POST /payment/confirm
     * Body:
     * {
     *   bookingId,
     *   paymentMethod
     * }
     */

    return {
      success: true,
    };
  }, null);
};