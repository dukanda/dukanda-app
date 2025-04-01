import { api } from "@/api/axios.config";

interface Tour {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  startDate: string;
  endDate: string;
  agencyName: string;
  agencyLogoUrl: string;
  cityName: string;
  coverImageUrl: string;
  tourTypes: {
    id: number;
    name: string;
    icon: string;
  }[];
  created: string;
}

interface ToursResponse {
  items: Tour[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

class ToursRoutes {
  async createTours(formData: TourToCreate) {
    const formDataToSend = new FormData();
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("BasePrice", formData.basePrice.toString());
    formDataToSend.append("StartDate", formData.StartDate);
    formDataToSend.append("EndDate", formData.EndDate);
    formDataToSend.append("CityId", formData.CityId);
    formDataToSend.append("Cover", formData.Cover); 
    formData.TourTypeIds.forEach((id) => {
      formDataToSend.append("TourTypeIds", id.toString());
    });

    const response = await api.post("/Tours", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Authorization": `Bearer ${token}`,
      },

    });
    return response.data;
  }

  async getToursMyAgency(): Promise<ToursResponse> {
    const response = await api.get("/Tours/my-agency");
    return response.data;
  }
}

export const toursRoutes = new ToursRoutes();