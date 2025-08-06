import { PageSingleDistrictDTO ,PageSingleDivisionDTO} from "@/types";
import { useState, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";

export async function fetchDivisionsByDistrictId(
  districtId: string
): Promise<PageSingleDistrictDTO[]> {
  try {
    const response = await axios.get<PageSingleDistrictDTO[]>(
      `http://localhost:8080/api/v1/divisions/get/${districtId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching divisions:", error);
    throw error;
  }
}

export async function fetchDivisionsByDistrictIdDivisionId(
  districtId: string,
  divisionId: string
): Promise<PageSingleDivisionDTO> {
  try {
    const response = await axios.get<PageSingleDivisionDTO>(
      `http://localhost:8080/api/v1/divisions/get/${districtId}/${divisionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching divisions:", error);
    throw error;
  }
}
