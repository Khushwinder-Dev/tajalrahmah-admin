// hooks/useRealTimeCountry.ts
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useNotificationWebSocket } from "./useNotificationWebSocket";
import {
  clearCountry,
  setCountryLoading,
  clearCountryError,
  setSubscribed,
  type CountryDetailsType,
} from "@/store/countrySlice";

export const useRealTimeCountry = (countryId?: string) => {
  const dispatch = useAppDispatch();
  const { connected } = useNotificationWebSocket();

  const { country, loading, error, lastUpdated, isSubscribed } = useAppSelector(
    (state) => state.country
  );

  // Subscribe to country updates when connected and countryId is provided
  useEffect(() => {
    if (connected && countryId && countryId !== country?.id) {
      console.log(`🌍 Subscribing to country updates for ID: ${countryId}`);
      dispatch(setCountryLoading(true));
      dispatch(clearCountryError());

      // Send subscription request
      // wsService.send({
      //   type: 'SUBSCRIBE_COUNTRY',
      //   payload: { countryId }
      // });
    }
  }, [connected, countryId, country?.id, dispatch]);

  // Unsubscribe when countryId changes or component unmounts
  useEffect(() => {
    return () => {
      if (connected && isSubscribed && country?.id) {
        console.log(
          `🌍 Unsubscribing from country updates for ID: ${country.id}`
        );
        // wsService.send({
        //   type: 'UNSUBSCRIBE_COUNTRY',
        //   payload: { countryId: country.id }
        // });
        dispatch(setSubscribed(false));
      }
    };
  }, [connected, isSubscribed, country?.id, dispatch]);

  // Clear country data when countryId becomes null/undefined
  useEffect(() => {
    if (!countryId) {
      dispatch(clearCountry());
    }
  }, [countryId, dispatch]);

  // Function to fetch country details
  const fetchCountryDetails = useCallback(
    (id: string) => {
      if (connected && id) {
        console.log(`🔍 Fetching country details for ID: ${id}`);
        dispatch(setCountryLoading(true));
        dispatch(clearCountryError());

        // wsService.send({
        //   type: 'GET_COUNTRY_DETAILS',
        //   payload: { countryId: id }
        // });
      }
    },
    [connected, dispatch]
  );

  // Function to update country
  const updateCountry = useCallback(
    (countryData: Partial<CountryDetailsType>) => {
      if (connected && country?.id) {
        console.log(`✏️ Updating country: ${country.id}`, countryData);

        // wsService.send({
        //   type: 'UPDATE_COUNTRY_DETAILS',
        //   payload: {
        //     id: country.id,
        //     updates: countryData
        //   }
        // });
      }
    },
    [connected, country?.id]
  );

  // Function to delete country
  const deleteCountry = useCallback(() => {
    if (connected && country?.id) {
      console.log(`🗑️ Deleting country: ${country.id}`);

      // wsService.send({
      //   type: 'DELETE_COUNTRY_DETAILS',
      //   payload: { countryId: country.id }
      // });
    }
  }, [connected, country?.id]);

  // Function to refresh country data
  const refreshCountry = useCallback(() => {
    if (connected && country?.id) {
      console.log(`🔄 Refreshing country data for: ${country.id}`);
      dispatch(setCountryLoading(true));

      // wsService.send({
      //   type: 'REFRESH_COUNTRY_DETAILS',
      //   payload: { countryId: country.id }
      // });
    }
  }, [connected, country?.id, dispatch]);

  // Function to toggle country status
  const toggleCountryStatus = useCallback(() => {
    if (connected && country) {
      const newStatus = country.status === "active" ? "inactive" : "active";
      console.log(`🔄 Toggling country status to: ${newStatus}`);

      // wsService.send({
      //   type: 'TOGGLE_COUNTRY_STATUS',
      //   payload: {
      //     countryId: country.id,
      //     status: newStatus
      //   }
      // });
    }
  }, [connected, country]);

  // Function to create country (if needed)
  const createCountry = useCallback(
    (
      countryData: Omit<CountryDetailsType, "id" | "createdAt" | "updatedAt">
    ) => {
      if (connected) {
        console.log("🆕 Creating new country", countryData);

        // wsService.send({
        //   type: 'CREATE_COUNTRY_DETAILS',
        //   payload: countryData
        // });
      }
    },
    [connected]
  );

  return {
    // State
    country,
    loading,
    error,
    lastUpdated,
    isSubscribed,
    connected,

    // Actions
    fetchCountryDetails,
    updateCountry,
    deleteCountry,
    refreshCountry,
    toggleCountryStatus,
    createCountry,

    // Utility functions
    clearError: () => dispatch(clearCountryError()),
    clearCountry: () => dispatch(clearCountry()),
  };
};
