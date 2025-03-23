import { api } from "@/api/axios.config";

class ToursRoutes {
  async createTourAgency(formData: TourToCreate) {
    const formDataToSend = new FormData();
    formDataToSend.append("AgencyId", formData.AgencyId);
    formDataToSend.append("CityId", formData.CityId);
    formDataToSend.append("TourTypeIds", formData.TourTypeIds.toString());
    formDataToSend.append("EndDate", formData.EndDate);
    formDataToSend.append("StartDate", formData.StartDate);
    formDataToSend.append("Cover", formData.Cover);
    formDataToSend.append("BasePrice", formData.basePrice.toString());
    formDataToSend.append("Title", formData.Title);
    formDataToSend.append("Description", formData.Description);

    const response = await api.post("/Tours", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

export const toursRoutes = new ToursRoutes();