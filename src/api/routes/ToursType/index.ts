import { api } from "@/api/axios.config";


interface TourType {
  id: number;
  name: string;
  icon: string;
}

interface TourTypeResponse {
  items: TourType[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

class ToursType{


  async getToursTypes() {
    const response = await api.get<TourTypeResponse>("/TourTypes");
    return response.data;
  }
}

export const toursTypeRoutes = new ToursType();