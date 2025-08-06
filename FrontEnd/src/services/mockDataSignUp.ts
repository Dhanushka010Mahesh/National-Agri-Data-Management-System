import axios from "axios";
export interface District {
    id: number;
    name: string;
  }
  
  export interface Division {
    id: number;
    name: string;
    districtId: number;
  }
 

const BASE_URL = "http://localhost:8080/api/v1";

// export const districts = async (districtId: number, districtName: string) => {
//   const response = await axios.post(`${BASE_URL}/division/get`, {
//     districtId,
//     districtName
//   });
//   return response.data;
// };

// export const divisions = async (divisionId: number, divisionName: string, districtId: number) => {
//   const response = await axios.post(`${BASE_URL}/district/get`, {
//     divisionId,
//     divisionName,
//     districtId
//   });
  
//   return response.data;
// };

  export const districts: District[] = [
    { id: 1, name: "Colombo" },
    { id: 2, name: "Gampaha" },
    { id: 3, name: "Kandy" },
    { id: 4, name: "Galle" },
    { id: 5, name: "Matara" },
    { id: 6, name: "Hambantota" },
    { id: 7, name: "Jaffna" },
    { id: 8, name: "Kilinochchi" },
    { id: 9, name: "Mannar" },
    { id: 10, name: "Mullaitivu" },
    { id: 11, name: "Vavuniya" },
    { id: 12, name: "Puttalam" },
    { id: 13, name: "Kurunegala" },
    { id: 14, name: "Kalutara" },
    { id: 15, name: "Ratnapura" },
    { id: 16, name: "Kegalle" },
    { id: 17, name: "Anuradhapura" },
    { id: 18, name: "Polonnaruwa" },
    { id: 19, name: "Matale" },
    { id: 20, name: "Nuwara Eliya" },
    { id: 21, name: "Badulla" },
    { id: 22, name: "Monaragala" },
    { id: 23, name: "Ampara" },
    { id: 24, name: "Batticaloa" },
    { id: 25, name: "Trincomalee" }
  ];
  
  export const divisions: Division[] = [
    { id: 1, name: "Galagedara", districtId: 3 },
    { id: 2, name: "Harispattuwa", districtId: 3 },
    { id: 3, name: "Kundasale", districtId: 3 },
    { id: 4, name: "Akurana", districtId: 3 },
    { id: 5, name: "Pathadumbara", districtId: 3 },
    { id: 1, name: "Colombo Central", districtId: 1 },
    { id: 7, name: "Colombo North", districtId: 1 },
    { id: 8, name: "Colombo South", districtId: 1 },
    { id: 9, name: "Kelaniya", districtId: 1 },
    { id: 10, name: "Kaduwela", districtId: 1 },
    { id: 11, name: "Negombo", districtId: 2 },
    { id: 12, name: "Katana", districtId: 2 },
    { id: 13, name: "Divulapitiya", districtId: 2 },
    { id: 14, name: "Mirigama", districtId: 2 },
    { id: 15, name: "Gampaha", districtId: 2 }
  ];
  
  export const states = [
    "Central_Province",
    "Eastern_Province",
    "North_Central_Province",
    "Northern_Province",
    "North_Western_Province",
    "Sabaragamuwa_Province",
    "Southern_Province",
    "Uva_Province",
    "Western_Province"
  ];
  
  export const getDistrictById = (id: number): District | undefined => {
    return districts.find(district => district.id === id);
  };
  
  export const getDivisionById = (id: number): Division | undefined => {
    return divisions.find(division => division.id === id);
  };
  
  export const getDivisionsByDistrictId = (districtId: number): Division[] => {
    return divisions.filter(division => division.districtId === districtId);
  };