// ==========================================
// FARM INFO
// ==========================================

export interface CropFarm {

  _id: string;

  farmName: string;

  area: number;

  soilType: string;

}

// ==========================================
// CROP CALENDAR
// ==========================================

export interface CropCalendar {

  _id: string;

  farmer: string;

  farm: CropFarm;

  cropName: string;

  sowingDate: string;

  fertilizerDate?: string;

  irrigationDate?: string;

  harvestDate: string;

  notes?: string;

  createdAt: string;

  updatedAt: string;

}

// ==========================================
// LIST RESPONSE
// ==========================================

export interface CropCalendarResponse {

  success: boolean;

  crops: CropCalendar[];

}

// ==========================================
// SINGLE RESPONSE
// ==========================================

export interface SingleCropResponse {

  success: boolean;

  crop: CropCalendar;

}

// ==========================================
// CREATE PAYLOAD
// ==========================================

export interface CreateCropPayload {

  farm: string;

  cropName: string;

  sowingDate: string;

  fertilizerDate?: string;

  irrigationDate?: string;

  harvestDate: string;

  notes?: string;

}

// ==========================================
// UPDATE PAYLOAD
// ==========================================

export interface UpdateCropPayload {

  farm?: string;

  cropName?: string;

  sowingDate?: string;

  fertilizerDate?: string;

  irrigationDate?: string;

  harvestDate?: string;

  notes?: string;

}

// ==========================================
// COMMON RESPONSE
// ==========================================

export interface CropSuccessResponse {

  success: boolean;

  message: string;

  crop?: CropCalendar;

}

// ==========================================
// DELETE RESPONSE
// ==========================================

export interface DeleteCropResponse {

  success: boolean;

  message: string;

}