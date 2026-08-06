// ==========================================
// COURSE
// ==========================================

export type CourseLevel =
    | "Beginner"
    | "Intermediate"
    | "Advanced";


export type CourseStatus =
    | "active"
    | "inactive";


export type EnrollmentStatus =
    | "enrolled"
    | "completed";


export interface LearningCourse {

    _id: string;

    title: string;

    description: string;

    image: string;

    category: string;

    level: CourseLevel;

    duration: number;

    trainer: string;

    isFeatured: boolean;

    isBestseller: boolean;

    status: CourseStatus;

    createdAt: string;

    updatedAt: string;
}


// ==========================================
// LEARNING HOME
// GET /api/learning
// ==========================================

export interface LearningStats {

    courses: number;

    trainers: number;

    learners: number;
}


export interface LearningHomeData {

    stats: LearningStats;

    categories: string[];

    featuredCourses: LearningCourse[];
}


export interface LearningHomeResponse {

    success: boolean;

    message: string;

    data: LearningHomeData;
}


// ==========================================
// CATEGORIES
// GET /api/learning/categories
// ==========================================

export interface LearningCategoriesResponse {

    success: boolean;

    message: string;

    data: string[];
}


// ==========================================
// PAGINATION
// ==========================================

export interface Pagination {

    total: number;

    page: number;

    limit: number;

    totalPages: number;
}


// ==========================================
// PUBLIC COURSES
// GET /api/learning/courses
// ==========================================

export interface CourseQueryParams {

    category?: string;

    level?: CourseLevel;

    page?: number;

    limit?: number;
}


export interface CoursesResponse {

    success: boolean;

    message: string;

    data: LearningCourse[];

    pagination: Pagination;
}


// ==========================================
// SEARCH
// GET /api/learning/search?q=soil
// ==========================================

export interface SearchCoursesResponse {

    success: boolean;

    message: string;

    data: LearningCourse[];
}


// ==========================================
// ENROLLMENT
// ==========================================

export interface CourseEnrollment {

    _id: string;

    user: string;

    course: LearningCourse;

    progress: number;

    status: EnrollmentStatus;

    enrolledAt: string;

    completedAt: string | null;

    createdAt: string;

    updatedAt: string;
}


// ==========================================
// ENROLL COURSE
// POST /courses/:id/enroll
// ==========================================

export interface EnrollCourseResponse {

    success: boolean;

    message: string;

    data: CourseEnrollment;
}


// ==========================================
// MY COURSES
// GET /my-courses
// ==========================================

export interface MyCoursesResponse {

    success: boolean;

    message: string;

    data: CourseEnrollment[];
}


// ==========================================
// ADMIN USER
// Used by populated enrollment
// ==========================================

export interface EnrollmentUser {

    _id: string;

    name: string;

    email: string;

    role: string;
}


// ==========================================
// ADMIN ENROLLMENT
// ==========================================

export interface AdminEnrollment {

    _id: string;

    user: EnrollmentUser;

    course: LearningCourse;

    progress: number;

    status: EnrollmentStatus;

    enrolledAt: string;

    completedAt: string | null;

    createdAt: string;

    updatedAt: string;
}


// ==========================================
// ADMIN ENROLLMENTS RESPONSE
// ==========================================

export interface AdminEnrollmentsResponse {

    success: boolean;

    message: string;

    data: AdminEnrollment[];

    pagination: Pagination;
}


// ==========================================
// ADMIN COURSE FILTER
// ==========================================

export interface AdminCourseQueryParams {

    search?: string;

    category?: string;

    level?: CourseLevel;

    status?: CourseStatus;

    page?: number;

    limit?: number;
}


// ==========================================
// CREATE COURSE BODY
// ==========================================

export interface CreateCoursePayload {

    title: string;

    description: string;

    image?: string;

    category: string;

    level?: CourseLevel;

    duration: number;

    trainer?: string;

    isFeatured?: boolean;

    isBestseller?: boolean;

    status?: CourseStatus;
}


// ==========================================
// UPDATE COURSE BODY
// ==========================================

export interface UpdateCoursePayload {

    title?: string;

    description?: string;

    image?: string;

    category?: string;

    level?: CourseLevel;

    duration?: number;

    trainer?: string;

    isFeatured?: boolean;

    isBestseller?: boolean;

    status?: CourseStatus;
}


// ==========================================
// CREATE/UPDATE/SINGLE COURSE RESPONSE
// ==========================================

export interface CourseResponse {

    success: boolean;

    message: string;

    data: LearningCourse;
}


// ==========================================
// DELETE RESPONSE
// ==========================================

export interface DeleteCourseResponse {

    success: boolean;

    message: string;
}


// ==========================================
// ADMIN ENROLLMENT FILTER
// ==========================================

export interface AdminEnrollmentQueryParams {

    status?: EnrollmentStatus;

    course?: string;

    page?: number;

    limit?: number;
}