import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";
import { RootState } from "../../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://potential-succotash-q7v9wwq9w4r4fxvg7-5000.app.github.dev/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const { accessToken, refreshToken } = (getState() as RootState).auth;
      console.log("tkdfj",accessToken,refreshToken)

      if (refreshToken) {
        headers.set("refresh_token", refreshToken);
      }
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
          refresh_token: data.refreshToken,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.meta.response.headers.get("access_token"),
              user: result.data.user,
              refreshToken: result.meta.response.headers.get("refresh_token"),
            })
          );
        } catch (error) {
          console.error("Error in loadUser query");
        }
      },
    }),
  }),
});

export const { useLoadUserQuery } = apiSlice;
