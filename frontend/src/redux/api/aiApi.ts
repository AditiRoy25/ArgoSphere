import { baseApi } from "./baseApi";

export const aiApi=baseApi.injectEndpoints({

endpoints:(builder)=>({

recommendation:builder.query({

query:()=>"/ai/recommendation"

})

})

})

export const{

useRecommendationQuery

}=aiApi