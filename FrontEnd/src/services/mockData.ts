
import { Blog, Land, Category, User, UserRole, Cultivation, CultivationStatus, Division, Notification } from "@/types";

// Mock categories
export const categories: Category[] = [
  { id: "1", name: "Rice Farming" },
  { id: "2", name: "Vegetables" },
  { id: "3", name: "Long-Term Crops" }
];

// Mock blogs
export const blogs: Blog[] = [
  {
    id: "199",
    title: "Modern Rice Farming Techniques",
    content: `
      <p>Ricee farming has evolved significantly over the past decade. Modern techniques now include precision agriculture, drone monitoring, and sustainable water management.</p>
      <h2>Precision Agriculture</h2>
      <p>Using GPS-guided equipment, farmers can now plant, fertilize, and harvest with centimeter-level accuracy. This reduces waste and increases yield.</p>
      <h2>Drone Monitoring</h2>
      <p>Drones equipped with multispectral cameras can detect plant health issues before they're visible to the human eye.</p>
      <h2>Sustainable Water Management</h2>
      <p>Alternate wetting and drying technique can save up to 30% of water compared to continuous flooding, while maintaining or even increasing yields.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    author: {
      id: "1",
      name: "Sachin Perera",
      profilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    },
    createdAt: "2023-04-15T09:00:00Z",
    likeCount: 45,
    viewCount: 230,
    comments: [
      {
        id: "101",
        content: "Great article! I'm implementing these techniques in my farm.",
        userId: "2",
        userName: "Kumara Silva",
        userProfilePicture: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
        createdAt: "2023-04-16T14:30:00Z"
      }
    ]
  },
  {
    id: "2",
    title: "Organic Vegetable Growing Guide for Sri Lankan Climate",
    content: `
      <p>Growing organic vegetables in Sri Lanka's tropical climate presents unique challenges and opportunities.</p>
      <h2>Seasonal Planning</h2>
      <p>Understanding the monsoon patterns is crucial for successful vegetable cultivation in Sri Lanka.</p>
      <h2>Pest Management</h2>
      <p>Natural pest control methods like neem oil extract and companion planting work exceptionally well in our climate.</p>
      <h2>Local Varieties</h2>
      <p>Indigenous vegetable varieties often have better resistance to local pests and diseases.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    author: {
      id: "2",
      name: "Amali Fernando",
      profilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    createdAt: "2023-04-12T11:00:00Z",
    likeCount: 38,
    viewCount: 186,
    comments: []
  },
  {
    id: "3",
    title: "Sustainable Coconut Cultivation Practices",
    content: `
      <p>Coconut is one of Sri Lanka's most important crops. Here's how to cultivate it sustainably.</p>
      <h2>Planting Distance</h2>
      <p>Proper spacing between coconut trees ensures optimal growth and yield.</p>
      <h2>Intercropping</h2>
      <p>Growing other crops between coconut trees maximizes land use and provides additional income.</p>
      <h2>Organic Fertilization</h2>
      <p>Using coconut husks as mulch returns nutrients to the soil and improves moisture retention.</p>
    `,
    imageUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    author: {
      id: "3",
      name: "Nimal Jayasinghe",
      profilePicture: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
    },
    createdAt: "2023-04-10T10:00:00Z",
    likeCount: 29,
    viewCount: 145,
    comments: [
      {
        id: "102",
        content: "I've been using these methods for years. They really work!",
        userId: "4",
        userName: "Lakshmi Perera",
        userProfilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        createdAt: "2023-04-11T08:15:00Z"
      }
    ]
  }
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

// Get mock data functions
export const getMockBlogs = () => blogs;
export const getMockBlogById = (id: string) => blogs.find(blog => blog.id === id);
export const getMockLands = () => lands;
export const getMockLandsByFarmerId = (farmerId: string) => lands.filter(land => land.farmerId === farmerId);
export const getMockLandById = (id: string) => lands.find(land => land.id === id);
export const getMockCategories = () => categories;
export const getMockCategoryById = (id: string) => categories.find(category => category.id === id);
export const getMockNotificationsByUserId = (userId: string) => notifications.filter(notification => notification.userId === userId);
