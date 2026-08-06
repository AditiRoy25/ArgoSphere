export interface FarmLocation {
  lat: number | null;
  lng: number | null;
}

export interface Farm {
  _id: string;

  farmer: string;

  farmName: string;

  area: number;

  soilType: string;

  location: FarmLocation;

  createdAt: string;
  updatedAt: string;
}

export interface MyFarmsResponse {
  success: boolean;

  farms: Farm[];
}

export interface CreateFarmPayload {
  farmName: string;

  area: number;

  soilType: string;

  location: {
    lat: number;
    lng: number;
  };
}