import { api } from "@/api/axios.config";


class ToursAgenciesRoutes {

  async getTourAgencies() {
    const response = await api.get(`/TourAgencies/`);
    return response.data;
  }

  async createTourAgency(data: TourAgencyToCreate) {
    const formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Description", data.Description);
    formData.append("ContactEmail", data.ContactEmail);
    formData.append("ContactPhone", data.ContactPhone);
    formData.append("Address", data.Address);
    if (data.Logo) {
      formData.append("Logo", data.Logo);
    }
    formData.append("TourAgencyTypeId", data.TourAgencyTypeId.toString());

    const response = await api.post(`/TourAgencies`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async getTourAgencyById(id: string) {
    const response = await api.get<TourAgency>(`/TourAgencies/${id}`);
    return response.data;
  }

  async getToursMyAgency(){
    const response = await api.get("/Tours/my-agency")
    return response.data;
  }

}

export const toursAgenciesRoutes = new ToursAgenciesRoutes();