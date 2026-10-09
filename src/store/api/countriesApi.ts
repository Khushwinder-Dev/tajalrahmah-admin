import { apiSlice } from "./apiSlice";

// Define types for your data
export interface Country {
  id: string;
  code: string;
  name: string;
  ISD: string;
  flag: string;
  isActive: boolean;
  isDraft: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CountryCreateRequest {
  code: string;
  name: string;
  ISD: string;
}

export interface CountryUpdateRequest extends Partial<CountryCreateRequest> {
  id: string;
}

// Inject endpoints into the API slice
export const countriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all countries
    getCountries: builder.query<
      Country[],
      { status?: string; search?: string }
    >({
      query: ({ status, search } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (search) params.append("search", search);
        return `countries?${params.toString()}`;
      },
      providesTags: ["Country"],
    }),

    // Get single country
    getCountry: builder.query<Country, string>({
      query: (id) => `countries/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Country", id }],
    }),

    // Create country
    createCountry: builder.mutation<Country, CountryCreateRequest>({
      query: (newCountry) => ({
        url: "countries",
        method: "POST",
        body: newCountry,
      }),
      invalidatesTags: ["Country"],
    }),

    // Update country
    updateCountry: builder.mutation<Country, CountryUpdateRequest>({
      query: ({ id, ...patch }) => ({
        url: `countries/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Country", id }],
    }),

    // Delete country
    deleteCountry: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `countries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Country", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCountriesQuery,
  useGetCountryQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} = countriesApi;
