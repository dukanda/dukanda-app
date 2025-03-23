import { api } from "@/api/axios.config";

class ToursAgenciesRoutes {

  async getTourAgencies() {
    const response = await api.get(`/TourAgencies/`);
    return response.data;
  }

  async createTourAgency(data: TourAgencyToCreate) {
    const formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("contactEmail", data.contactEmail);
    formData.append("contactPhone", data.contactPhone);
    formData.append("address", data.address);
    formData.append("logoUrl", data.logoUrl); // Adiciona o arquivo
    formData.append("tourAgencyTypeId", data.tourAgencyTypeId.toString());
    formData.append("agencyType", data.agencyType);
    formData.append("toursCount", data.toursCount.toString());

    const response = await api.post(`/TourAgencies/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async getTourAgencyById(id: string) {
    const response = await api.get(`/TourAgencies/${id}`);
    return response.data;
  }

}

export const toursAgenciesRoutes = new ToursAgenciesRoutes();