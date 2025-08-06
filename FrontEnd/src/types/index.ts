// export enum UserRole {
//   FARMER = "FARMER",
//   DIVISION_OFFICER = "DIVISION_OFFICER", 
//   DISTRICT_OFFICER = "DISTRICT_OFFICER",
//   AGRICULTURE_OFFICER = "AGRICULTURE_OFFICER"
// }

// export interface User {
//   id: string;
//   name: string;
//   role: UserRole;
//   nic?: string;
//   email?: string;
//   status?: string;
//   districtId?: string;
//   divisionId?: string;
//   profilePicture?: string;
// }

// export interface JwtPayload {
//   role: string;
//   districtId?: string;
//   divisionId?: string;
//   Id: string;
//   userName: string;
//   email: string;
//   status: string;
//   sub: string;
//   iat: number;
//   exp: number;
// }
export interface PageDistrictsRespondDTO {
  districtsCount?: number;
  divisionsCount?: number;
  farmersCount?: number;
  landsCount?: number;
  districts?: PageSingleDistrictDTO[];
}

export interface PageSingleDistrictDTO {
  districtId?: number;
  name?: string;
  divisionsCount?: number;
  farmersCount?: number;
  landsCount?: number;
  divisions?: PageSingleDivisionDTO[];
}

export interface PageSingleDivisionDTO {
  divisionId?: number; // Corrected from 'divisioId' to 'divisionId'
  name?: string;
  farmersCount?: number;
  landsCount?: number;
}

export interface Address {
  id?:string;
  no: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  district:string;
}

// District and Division types
export interface District {
  id: string;
  name: string;
  divisions: Division[];
  liveStatus?: boolean;
  farmers: number;
  lands: number;
  address?:Address[];
}

export interface Division {
  id: number;
  name: string;
  districtId: string;
  liveStatus: boolean;
  farmers :number;
  lands:number;
  address?:Address[];
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

interface CropTermDTO {
  cropId: number;
  name: string;
  farmerCount: number;
  landCount: number;
  cultivateCount: number;
}

interface AllSingleDivisionPageDTO {
  divisionId: number;
  name: string;
  farmersCount: number;
  landsCount: number;
  cultivateCount: number;
  vegetablesFarming: CropTermDTO[];
  riceFarming: CropTermDTO[];
  longTermCrop: CropTermDTO[];
}
