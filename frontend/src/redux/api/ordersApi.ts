import { baseApi } from "./baseApi";

export const orderApi=baseApi.injectEndpoints({

endpoints:(builder)=>({

myOrders:builder.query({

query:()=>"/orders/my-orders"

})

})

})

export const{

useMyOrdersQuery

}=orderApi