import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


//Define the User Data
export type UserData={
    given_name: string;
    locale: string;
    name: string;
    email_verified:boolean;
    picture:string;
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

const apiUrl = import.meta.env.VITE_API_URL;
export const goalApi=createApi({
    reducerPath:'goalApi',
    baseQuery: fetchBaseQuery({
        //baseUrl:"http://localhost:5000",
        baseUrl:apiUrl,
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
          
          updateGoal: builder.mutation<GoalData,GoalData>({
            query: goal => ({
              method: 'PUT',
              url: `/goal/${goal.goalId}`,
              body: goal,
            })
        }),
        
        updateAmount:builder.mutation<void, { goalId: number; savedamount: number }>({
             query: ({ goalId, savedamount }) => {
                return {
                    method: 'PUT',
                    url: `/goal/${goalId}/savedamount?savedAmount=${savedamount}`,                     
                    
                }
            }
        }),
        deleteGoal: builder.mutation<void, number>({
            query: goalId => {
                return {
                    method: 'DELETE',
                    url:`/goal/${goalId}`
                }
            }
        }),
    }),
});

export const{
useCreateGoalMutation,
useGetAllImagesQuery,
useGetUserInfoQuery,
useLogoutMutation,
useGetAllGoalsByUserIdQuery,
useGetGoalByIdQuery,
useDeleteGoalMutation,
useUpdateAmountMutation,
useUpdateGoalMutation
}=goalApi;