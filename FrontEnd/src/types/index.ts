// User types
export interface User {
  id: string;
  name: string;
  role: UserRole;
  nic: string;
  profilePicture?: string;
}

export enum UserRole {
  GUEST = "GUEST",
  FARMER = "FARMER",
  DIVISION_OFFICER = "DIVISION_OFFICER",
  DISTRICT_OFFICER = "DISTRICT_OFFICER",
  HEAD_OFFICER = "HEAD_OFFICER"
}

// Land types
export interface Land {
  id: string;
  address: Address;
  irrigationType: string;
  paddyLandType?: string;
  farmerId?: string;
  approved: boolean;
  cultivations: Cultivation[];
}

export interface Address {
  street: string;
  no: string;
  city: string;
  state: string;
  postalCode: string;
  district: string;
}

// Cultivation types
export interface Cultivation {
  id: string;
  landId: string;
  cropType: string;
  startDate: string;
  endDate?: string;
  status: CultivationStatus;
}

export enum CultivationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED"
}

// Blog types
export interface Blog {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  createdAt: string;
  likeCount: number;
  viewCount: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userProfilePicture?: string;
  createdAt: string;
}

// District and Division types
export interface District {
  id: string;
  name: string;
  divisions: Division[];
  farmers: number;
  lands: number;
}

export interface Division {
  id: string;
  name: string;
  districtId?: string;
  officerId ?: string ;
  //liveStatus?: number; // Added liveStatus
}

// Category types
export interface Category {
  id: string;
  name: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
