import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type UserData={
    given_name: string;
    locale: string;
    name: string;
    email_verified:boolean;
}

//const apiUrl = import.meta.env.VITE_API_URL;
export const goalApi=createApi({
    reducerPath:'goalApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:5000",
        credentials:'include',
        
    }),
    endpoints:(builder)=>({
        getUserInfo:builder.query<UserData,void>({
            query:() => '/userinfo',
        }),
        getloginView:builder.query({
            query:()=> "/login",
        })

    }),
});

export const{
useGetUserInfoQuery,

}=goalApi;