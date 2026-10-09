/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useRealTimeCountries.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNotificationWebSocket } from "./useNotificationWebSocket";
import { setLoading } from "@/store/countriesSlice";

export const useRealTimeCountries = () => {
  const dispatch = useAppDispatch();
  const { connected } = useNotificationWebSocket();

  const {
    countries,
    selectedCountry,
    loading,
    error,
    lastUpdated,
    totalCount,
    hasMore,
  } = useAppSelector((state) => state.countries);

  // Load initial countries when WebSocket connects
  useEffect(() => {
    if (connected) {
      console.log("🌍 WebSocket connected, requesting countries sync");
      // Send message to request initial country data
      // wsService.send({
      //   type: 'REQUEST_COUNTRIES',
      //   payload: {
      //     limit: pagination.pageSize,
      //     page: pagination.pageIndex,
      //     filters: filters
      //   }
      // });
    }
  }, [connected]);

  // Handle filter changes
  useEffect(() => {
    if (connected) {
      console.log("🔍 Filters changed, requesting filtered countries");
      // wsService.send({
      //   type: 'REQUEST_COUNTRIES_FILTERED',
      //   payload: { filters, pagination }
      // });
    }
  }, [connected]);

  // Function to request more countries (for pagination)
  const loadMoreCountries = () => {
    if (connected && hasMore && !loading) {
      // wsService.send({
      //   type: 'REQUEST_MORE_COUNTRIES',
      //   payload: {
      //     offset: countries.length,
      //     limit: pagination.pageSize
      //   }
      // });
    }
  };

  // Function to refresh countries
  const refreshCountries = () => {
    if (connected) {
      dispatch(setLoading(true));
      // wsService.send({
      //   type: 'REQUEST_COUNTRIES_REFRESH',
      //   payload: { pagination, filters }
      // });
    }
  };

  // Function to create a new country
  const createCountry = (countryData: any) => {
    if (connected) {
      console.log("countryData", countryData);
      // wsService.send({
      //   type: 'CREATE_COUNTRY',
      //   payload: countryData
      // });
    }
  };

  // Function to update a country
  const updateCountry = (countryId: string) => {
    if (connected) {
      console.log("countryId", countryId);
      // wsService.send({
      //   type: 'UPDATE_COUNTRY',
      //   payload: { id: countryId, updates }
      // });
    }
  };

  // Function to delete a country
  const deleteCountry = (countryId: string) => {
    if (connected) {
      console.log("countryId", countryId);
      // wsService.send({
      //   type: 'DELETE_COUNTRY',
      //   payload: { id: countryId }
      // });
    }
  };

  // Function to bulk update countries
  const bulkUpdateCountries = (countryIds: string[]) => {
    if (connected) {
      console.log("countryIds", countryIds);
      // wsService.send({
      //   type: 'BULK_UPDATE_COUNTRIES',
      //   payload: { ids: countryIds, updates }
      // });
    }
  };

  // Function to search countries
  const searchCountries = (query: string) => {
    if (connected) {
      console.log("query", query);
      // wsService.send({
      //   type: 'SEARCH_COUNTRIES',
      //   payload: { query, pagination }
      // });
    }
  };

  return {
    countries,
    selectedCountry,
    loading,
    error,
    lastUpdated,
    totalCount,
    hasMore,
    connected,
    loadMoreCountries,
    refreshCountries,
    createCountry,
    updateCountry,
    deleteCountry,
    bulkUpdateCountries,
    searchCountries,
  };
};
