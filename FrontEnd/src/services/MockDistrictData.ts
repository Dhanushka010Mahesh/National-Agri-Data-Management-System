// import {District} from "@/types"
// import { useEffect, useState } from "react";
// import axios from 'axios';

// export const useDistrictsDetails = () => {
//   const [districts, setDistricts] = useState<District[] | null>(null);
//   const [disableDistrictCount, setDisableDistrictCount] = useState<number | null>(null);
//   const [disableDivisionCount, setDisableDivisionCount] = useState<number | null>(null);
//   const [districtCountLive, setDistrictCountLive] = useState<number | null>(null);
//   const [divisionCountLive, setDivisionCountLive] = useState<number | null>(null);

//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [districtsRes, countWithOfficerRes, divisionCountWithOfficerRes, countWithoutOfficerRes, divisionCountWithoutOfficerRes] = await Promise.all([
//           axios.get('http://localhost:8080/api/v1/district/get'),
//           axios.get('http://localhost:8080/api/v1/users/farmer/count'),
//           axios.get('http://localhost:8080/api/v1/users/district-officer/count'),
//           axios.get('http://localhost:8080/api/v1/users/division-officer/count'),
//           axios.get('http://localhost:8080/api/v1/users/division-officer/count/3'),
//           // localhost:8080/api/v1/district/pageDataGet
//         ]);

//         setDistricts(districtsRes.data);
//         setDisableDistrictCount(countWithOfficerRes.data);
//         setDisableDivisionCount(divisionCountWithOfficerRes.data);
//         setDistrictCountLive(countWithoutOfficerRes.data);
//         setDivisionCountLive(divisionCountWithoutOfficerRes.data);

//       } catch (err) {
//         setError('Failed to fetch district data. Please try again later.');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return {
//     districts,
//     disableDistrictCount,
//     disableDivisionCount,
//     districtCountLive,
//     divisionCountLive,
//     loading,
//     error,
//   };
// };

import { useState, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { PageDistrictsRespondDTO, PageSingleDistrictDTO } from "@/types";

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

export const usePageDistrictData = () => {
  const [pageDistrictData, setPageDistrictData] = useState<
    PageDistrictsRespondDTO[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    let retryCount = 0;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      while (retryCount <= MAX_RETRIES) {
        try {
          const response = await axios.get<PageDistrictsRespondDTO[]>(
            `http://localhost:8080/api/v1/district/get`,
            { signal: abortController.signal }
          );
          setPageDistrictData(response.data);
          break; // Exit retry loop on success
        } catch (err) {
          if (abortController.signal.aborted) {
            return; // Exit if request was aborted
          }

          const axiosError = err as AxiosError;
          if (
            axiosError.response?.status === 429 ||
            axiosError.code === "ECONNABORTED"
          ) {
            // Retry for rate limits or timeouts
            if (retryCount < MAX_RETRIES) {
              retryCount++;
              await new Promise((resolve) =>
                setTimeout(resolve, RETRY_DELAY * retryCount)
              );
              continue;
            }
          }

          // Set specific error message based on error type
          let errorMessage = "Failed to fetch district page data.";
          if (axiosError.response) {
            errorMessage += ` Server responded with status ${axiosError.response.status}.`;
          } else if (axiosError.request) {
            errorMessage += " No response received from server.";
          } else {
            errorMessage += ` Error: ${axiosError.message}`;
          }
          setError(errorMessage);
          console.error("Error fetching data:", axiosError);
          break;
        } finally {
          if (!abortController.signal.aborted && retryCount >= MAX_RETRIES) {
            setLoading(false);
          }
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Cleanup on unmount
    };
  }, []);

  return useMemo(
    () => ({
      pageDistrictData,
      loading,
      error,
    }),
    [pageDistrictData, loading, error]
  );
};
