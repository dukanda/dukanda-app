import { api } from "@/api/axios.config";

export interface TouristicAttraction {
  items: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    cityId: number;
    cityName: string;
    latitude: number;
    longitude: number;
    city: string;
  }[]
}

class TouristicAttractionRoutes {

  async getAllTouristicAttractions(){
    const response = await api.get<TouristicAttraction>("/TouristAttractions");
    return response.data;
  }
}

export const touristicAttractionRoutes = new TouristicAttractionRoutes();