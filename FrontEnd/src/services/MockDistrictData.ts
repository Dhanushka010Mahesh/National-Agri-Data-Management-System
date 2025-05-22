import {District} from "@/types"
import { useEffect, useState } from "react";
import axios from 'axios';

export const useDistrictsDetails = () => {
  const [districts, setDistricts] = useState<District[] | null>(null);
  const [disableDistrictCount, setDisableDistrictCount] = useState<number | null>(null);
  const [disableDivisionCount, setDisableDivisionCount] = useState<number | null>(null);
  const [districtCountLive, setDistrictCountLive] = useState<number | null>(null);
  const [divisionCountLive, setDivisionCountLive] = useState<number | null>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [districtsRes, countWithOfficerRes, divisionCountWithOfficerRes, countWithoutOfficerRes, divisionCountWithoutOfficerRes] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/district/getAllDistricts'),
          axios.get('http://localhost:8080/api/v1/district/getDisableDistrictCount'),
          axios.get('http://localhost:8080/api/v1/district/getDisableDivisionCount'),
          axios.get('http://localhost:8080/api/v1/district/getAllLiveDistrictCount'),
          axios.get('http://localhost:8080/api/v1/district/getAllLiveDivisionCount'),
        ]);

        setDistricts(districtsRes.data);
        setDisableDistrictCount(countWithOfficerRes.data);
        setDisableDivisionCount(divisionCountWithOfficerRes.data);
        setDistrictCountLive(countWithoutOfficerRes.data);
        setDivisionCountLive(divisionCountWithoutOfficerRes.data);
       
      } catch (err) {
        setError('Failed to fetch district data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    districts,
    disableDistrictCount,
    disableDivisionCount,
    districtCountLive,
    divisionCountLive,
    loading,
    error,
  };
};


// export const useDistrictsList = () => {
//   const [districts, setDistricts] = useState(null);

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/v1/district/getAllDistricts')
//       .then((response) => {
//         setDistricts(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching districts:', error);
//       });
//   }, []);

//   return districts;
// };

// Function to fetch and log district data
export async function fetchDistrictData(districtId: string): Promise<void> {
  try {
    const response = await axios.get<District>(
      `http://localhost:8080/api/v1/district/districtSelected/${districtId}`
    );
    console.log('District Data:', response.data);
  } catch (error) {
    console.error('Error fetching district data:', error);
  }
}