import { baseApi } from "./baseApi";

import type {

    LearningHomeResponse,

    LearningCategoriesResponse,

    CoursesResponse,

    CourseQueryParams,

    SearchCoursesResponse,

    EnrollCourseResponse,

    MyCoursesResponse,

    AdminCourseQueryParams,

    CreateCoursePayload,

    UpdateCoursePayload,

    CourseResponse,

    DeleteCourseResponse,

    AdminEnrollmentsResponse,

    AdminEnrollmentQueryParams,

} from "@/types/learning";


export const learningApi =
    baseApi.injectEndpoints({

        endpoints: (builder) => ({

            // ==========================================
            // PUBLIC
            // GET /api/learning
            // ==========================================

            getLearningHome:
                builder.query<
                    LearningHomeResponse,
                    void
                >({

                    query: () => ({
                        url: "/learning",
                        method: "GET",
                    }),

                    providesTags: [
                        "Learning",
                    ],
                }),


            // ==========================================
            // PUBLIC
            // GET /api/learning/categories
            // ==========================================

            getLearningCategories:
                builder.query<
                    LearningCategoriesResponse,
                    void
                >({

                    query: () => ({
                        url:
                            "/learning/categories",

                        method:
                            "GET",
                    }),

                    providesTags: [
                        "Learning",
                    ],
                }),


            // ==========================================
            // PUBLIC
            // GET /api/learning/courses
            // ==========================================

            getLearningCourses:
                builder.query<
                    CoursesResponse,
                    CourseQueryParams | void
                >({

                    query: (params) => ({

                        url:
                            "/learning/courses",

                        method:
                            "GET",

                        params:
                            params || undefined,

                    }),

                    providesTags: [
                        "Learning",
                    ],
                }),


            // ==========================================
            // PUBLIC SEARCH
            // GET /api/learning/search?q=soil
            // ==========================================

            searchLearningCourses:
                builder.query<
                    SearchCoursesResponse,
                    string
                >({

                    query: (q) => ({

                        url:
                            "/learning/search",

                        method:
                            "GET",

                        params: {
                            q,
                        },

                    }),

                }),


            // ==========================================
            // FARMER
            // POST /courses/:id/enroll
            // ==========================================

            enrollCourse:
                builder.mutation<
                    EnrollCourseResponse,
                    string
                >({

                    query: (courseId) => ({

                        url:
                            `/learning/courses/${courseId}/enroll`,

                        method:
                            "POST",

                    }),

                    invalidatesTags: [
                        "Learning",
                        "MyCourses",
                        "AdminEnrollments",
                    ],

                }),


            // ==========================================
            // FARMER
            // GET /my-courses
            // ==========================================

            getMyCourses:
                builder.query<
                    MyCoursesResponse,
                    void
                >({

                    query: () => ({

                        url:
                            "/learning/my-courses",

                        method:
                            "GET",

                    }),

                    providesTags: [
                        "MyCourses",
                    ],

                }),


            // ==========================================
            // ADMIN
            // GET /admin/courses
            // ==========================================

            getAdminCourses:
                builder.query<
                    CoursesResponse,
                    AdminCourseQueryParams | void
                >({

                    query: (params) => ({

                        url:
                            "/learning/admin/courses",

                        method:
                            "GET",

                        params:
                            params || undefined,

                    }),

                    providesTags: [
                        "AdminCourses",
                    ],

                }),


            // ==========================================
            // ADMIN
            // GET /admin/courses/:id
            // ==========================================

            getAdminCourseById:
                builder.query<
                    CourseResponse,
                    string
                >({

                    query: (id) => ({

                        url:
                            `/learning/admin/courses/${id}`,

                        method:
                            "GET",

                    }),

                    providesTags:
                        (
                            result,
                            error,
                            id
                        ) => [

                            {
                                type:
                                    "AdminCourse",
                                id,
                            },

                        ],

                }),


            // ==========================================
            // ADMIN
            // POST /admin/courses
            // ==========================================

            // createCourse:
            //     builder.mutation<
            //         CourseResponse,
            //         CreateCoursePayload,
                    
            //     >({

            //         query: (body) => ({

            //             url:
            //                 "/learning/admin/courses",

            //             method:
            //                 "POST",

            //             body,

            //         }),

            //         invalidatesTags: [

            //             "AdminCourses",

            //             "Learning",

            //         ],

            //     }),

createCourse:
  builder.mutation<
    CourseResponse,
    // CreateCoursePayload,
    FormData
  >({
    query: (formData) => ({
      url: "/learning/admin/courses",
      method: "POST",
      body: formData,
    }),

    invalidatesTags: [
      "AdminCourses",
      "Learning",
    ],
  }),





            // ==========================================
            // ADMIN
            // PATCH /admin/courses/:id
            // ==========================================

            updateCourse:
                builder.mutation<
                    CourseResponse,
                    {
                        id: string;
                        data: UpdateCoursePayload;
                    }
                >({

                    query: ({
                        id,
                        data,
                    }) => ({

                        url:
                            `/learning/admin/courses/${id}`,

                        method:
                            "PATCH",

                        body:
                            data,

                    }),

                    invalidatesTags:
                        (
                            result,
                            error,
                            {
                                id
                            }
                        ) => [

                            "AdminCourses",

                            "Learning",

                            {
                                type:
                                    "AdminCourse",
                                id,
                            },

                        ],

                }),


            // ==========================================
            // ADMIN
            // DELETE /admin/courses/:id
            // ==========================================

            deleteCourse:
                builder.mutation<
                    DeleteCourseResponse,
                    string
                >({

                    query: (id) => ({

                        url:
                            `/learning/admin/courses/${id}`,

                        method:
                            "DELETE",

                    }),

                    invalidatesTags: [

                        "AdminCourses",

                        "AdminEnrollments",

                        "Learning",

                        "MyCourses",

                    ],

                }),


            // ==========================================
            // ADMIN
            // GET /admin/enrollments
            // ==========================================

            getAdminEnrollments:
                builder.query<
                    AdminEnrollmentsResponse,
                    AdminEnrollmentQueryParams | void
                >({

                    query: (params) => ({

                        url:
                            "/learning/admin/enrollments",

                        method:
                            "GET",

                        params:
                            params || undefined,

                    }),

                    providesTags: [
                        "AdminEnrollments",
                    ],

                }),

        }),

        overrideExisting: false,

    });


export const {

    // PUBLIC

    useGetLearningHomeQuery,

    useGetLearningCategoriesQuery,

    useGetLearningCoursesQuery,

    useSearchLearningCoursesQuery,

    useLazySearchLearningCoursesQuery,


    // FARMER

    useEnrollCourseMutation,

    useGetMyCoursesQuery,


    // ADMIN

    useGetAdminCoursesQuery,

    useGetAdminCourseByIdQuery,

    useCreateCourseMutation,

    useUpdateCourseMutation,

    useDeleteCourseMutation,

    useGetAdminEnrollmentsQuery,

} = learningApi;