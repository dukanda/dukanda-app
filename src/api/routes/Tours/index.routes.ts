import { api } from "@/api/axios.config";


class ToursRoutes {
  async createTours(formData: TourToCreate) {
    const formDataToSend = new FormData();
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Description", formData.Description);
    formDataToSend.append("BasePrice", formData.basePrice.toString());
    formDataToSend.append("StartDate", formData.StartDate);
    formDataToSend.append("EndDate", formData.EndDate);
    formDataToSend.append("CityId", formData.CityId);
    if (formData.Cover) {
      formDataToSend.append("Cover", formData.Cover);
    }
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

  async getToursDetails(tourId: string) {
    const response = await api.get<TourDetails>(`/Tours/${tourId}`);
    return response.data;
  }

  async getToursMyAgency(): Promise<ToursResponse> {
    const response = await api.get("/Tours/my-agency");
    return response.data;
  }

  async getTourById(tourId: string): Promise<TourDetails> {
    const response = await api.get(`/Tours/${tourId}`);
    return response.data;
  }

  async editTours(tourId: string, formData: TourEdit) {
    const response = await api.put(`/Tours/${tourId}`, formData);
    return response.data;
  }

  async addItinerariesInTour(tourId: string, data: ItineraryToCreate) {
    const response = await api.post(`/Tours/${tourId}/itineraries`, data);
    return response.data;
  }

  async addAttractionsInTour(tourId: string, data: AttractionToCreate) {
    const response = await api.post(`/Tours/${tourId}/attractions`, data);
    return response.data;
  }
}

export const toursRoutes = new ToursRoutes();