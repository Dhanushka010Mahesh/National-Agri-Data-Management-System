
import { Blog, Land, Category, User, UserRole, Cultivation, CultivationStatus, Division, Notification } from "@/types";

// Mock categories
export const categories: Category[] = [
  { id: "1", name: "Rice Farming" },
  { id: "2", name: "Vegetables" },
  { id: "3", name: "Long-Term Crops" }
];

// Mock lands
export const lands: Land[] = [
  {
    id: "1",
    address: {
      street: "Paddy Field Road",
      no: "45",
      city: "Polonnaruwa",
      state: "North Central",
      postalCode: "51000",
      district: "Polonnaruwa"
    },
    irrigationType: "Canal",
    paddyLandType: "Lowland",
    farmerId: "1",
    approved: true,
    cultivations: [
      {
        id: "c1",
        landId: "1",
        cropType: "Rice",
        startDate: "2023-01-15",
        status: CultivationStatus.APPROVED
      }
    ]
  },
  {
    id: "2",
    address: {
      street: "Vegetable Garden Lane",
      no: "12",
      city: "Nuwara Eliya",
      state: "Central",
      postalCode: "22200",
      district: "Nuwara Eliya"
    },
    irrigationType: "Sprinkler",
    farmerId: "1",
    approved: true,
    cultivations: [
      {
        id: "c2",
        landId: "2",
        cropType: "Carrots",
        startDate: "2023-02-20",
        endDate: "2023-05-10",
        status: CultivationStatus.COMPLETED
      }
    ]
  },
  {
    id: "3",
    address: {
      street: "Coconut Grove",
      no: "78",
      city: "Kurunegala",
      state: "North Western",
      postalCode: "60000",
      district: "Kurunegala"
    },
    irrigationType: "Drip",
    farmerId: "4",
    approved: false,
    cultivations: []
  }
];



// Mock notifications
export const notifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    message: "Your rice cultivation has been approved",
    isRead: false,
    createdAt: "2023-04-18T09:00:00Z",
    link: "/farmer/cultivation/c1"
  },
  {
    id: "2",
    userId: "1",
    message: "New agricultural subsidy available for vegetable farmers",
    isRead: true,
    createdAt: "2023-04-15T11:30:00Z",
    link: "/blogs/subsidy-announcement"
  },
  {
    id: "3",
    userId: "2",
    message: "5 new farmer registrations pending approval",
    isRead: false,
    createdAt: "2023-04-18T08:15:00Z",
    link: "/division-officer/farmers/pending"
  }
];

export const getMockLands = () => lands;
export const getMockLandsByFarmerId = (farmerId: string) => lands.filter(land => land.farmerId === farmerId);
export const getMockLandById = (id: string) => lands.find(land => land.id === id);
export const getMockCategories = () => categories;
export const getMockCategoryById = (id: string) => categories.find(category => category.id === id);
export const getMockNotificationsByUserId = (userId: string) => notifications.filter(notification => notification.userId === userId);
