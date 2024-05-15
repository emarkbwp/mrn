import { apiSlice } from "../api/apiSlice";
import { setAnalytics } from "./analyticsSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    GetAnalytics: builder.query({
      query: () => {
        return {
          url: `analytics`,
          method: "GET",
          credentials: "include",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setAnalytics(result.data.data));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
