import { apiSlice } from "./apiSlice";
import type {
  RestaurantApiResponse,
  RestaurantQueryParams,
  Group,
  Category,
  Item,
} from "../../types/restaurant";

export const restaurantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all restaurant data (groups, categories, items)
    getAllRestaurantData: builder.query<
      RestaurantApiResponse,
      RestaurantQueryParams
    >({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        // Add parameters if they exist
        if (params.lang) searchParams.append("lang", params.lang);
        if (params.group_id)
          searchParams.append("group_id", params.group_id.toString());
        if (params.category_id)
          searchParams.append("category_id", params.category_id.toString());
        if (params.search) searchParams.append("search", params.search);
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());

        return `customer/all/items?${searchParams.toString()}`;
      },
      providesTags: ["Restaurant"],
      // Transform response if needed
      transformResponse: (response: RestaurantApiResponse) => {
        return {
          ...response,
          // You can add any data transformations here
          items: response.items.map((item) => ({
            ...item,
            // Convert price from cents to dollars if needed
            displayPrice: item.price / 100,
            // Add full image URL if needed
            fullImageUrl: `https://rapidresturant.rapidsmarterp.com/${item.image}`,
          })),
        };
      },
    }),

    // Get groups only
    getGroups: builder.query<Group[], RestaurantQueryParams>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.lang) searchParams.append("lang", params.lang);
        return `customer/all/items?${searchParams.toString()}`;
      },
      transformResponse: (response: RestaurantApiResponse) => response.group,
      providesTags: ["Restaurant"],
    }),

    // Get categories by group
    getCategoriesByGroup: builder.query<
      Category[],
      { groupId: number; lang?: string }
    >({
      query: ({ groupId, lang = "ar" }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("lang", lang);
        searchParams.append("group_id", groupId.toString());
        return `customer/all/items?${searchParams.toString()}`;
      },
      transformResponse: (response: RestaurantApiResponse) =>
        response.categories,
      providesTags: ["Restaurant"],
    }),

    // Get items by category
    getItemsByCategory: builder.query<
      Item[],
      { categoryId: number; lang?: string }
    >({
      query: ({ categoryId, lang = "ar" }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("lang", lang);
        searchParams.append("category_id", categoryId.toString());
        return `customer/all/items?${searchParams.toString()}`;
      },
      transformResponse: (response: RestaurantApiResponse) => response.items,
      providesTags: ["Restaurant"],
    }),

    // Search items
    searchItems: builder.query<Item[], { search: string; lang?: string }>({
      query: ({ search, lang = "ar" }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("lang", lang);
        searchParams.append("search", search);
        return `customer/all/items?${searchParams.toString()}`;
      },
      transformResponse: (response: RestaurantApiResponse) => response.items,
      providesTags: ["Restaurant"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllRestaurantDataQuery,
  useGetGroupsQuery,
  useGetCategoriesByGroupQuery,
  useGetItemsByCategoryQuery,
  useSearchItemsQuery,
} = restaurantApi;
