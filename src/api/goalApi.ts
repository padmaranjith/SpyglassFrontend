import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


//Define the User Data
export type UserData={
    given_name: string;
    locale: string;
    name: string;
    email_verified:boolean;
}

//Define the goal data
export type GoalData={
    goalId?:number;
    userId:number;
    goalName:string;
    description:string;
    targetDate:string;
    targetAmount:number;
    savedamount:number;
    goalImageUrl:string;
}

export type Image={
    imageId?:number;
    imageName:string;
    imageUrl:string;
}

//const apiUrl = import.meta.env.VITE_API_URL;
export const goalApi=createApi({
    reducerPath:'goalApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:5000",
        credentials:'include',
       
    }),
    endpoints:(builder)=>({
        createGoal:builder.mutation({
            query:(goal)=>{
                return {
                    method: 'POST',
                    url: '/goal',
                    body: goal
                }
            }
        }),
        getAllImages:builder.query<Image[], void>({
            query: () => '/goal/images',
        }),
        getUserInfo:builder.query<UserData,void>({
            query: () => '/userinfo',
        }),
        logout:builder.mutation<void,void>({
            query:()=>{
                return {
                    method: 'POST',
                    url: '/logout',
                    
                }
            }
        }),
        getAllGoalsByUserId:builder.query<GoalData[],void>({
            query: () => '/goal',
        }),
        getGoalById:builder.query<GoalData,number>({
            query: (goalId) => `/goal/${goalId}/`,
          }), 

    }),
});

export const{
useCreateGoalMutation,
useGetAllImagesQuery,
useGetUserInfoQuery,
useLogoutMutation,
useGetAllGoalsByUserIdQuery,
useGetGoalByIdQuery
}=goalApi;