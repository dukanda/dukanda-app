import { api } from "@/api/axios.config";

class ToursRoutes {
  async createTourAgency(formData: TourToCreate) {
    const formDataToSend = new FormData();
    formDataToSend.append("AgencyId", formData.agencyId);
    formDataToSend.append("CityId", formData.city);
    formDataToSend.append("TourTypeIds", formData.tourTypeIds.toString());
    formDataToSend.append("EndDate", formData.endDate);
    formDataToSend.append("StartDate", formData.startDate);
    formDataToSend.append("Cover", formData.cover);
    formDataToSend.append("BasePrice", formData.basePrice.toString());
    formDataToSend.append("Title", formData.title);
    formDataToSend.append("Description", formData.description);

    const response = await api.post("/Tours", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export const toursRoutes = new ToursRoutes();