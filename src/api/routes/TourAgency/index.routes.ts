import { api } from "@/api/axios.config";


class ToursAgenciesRoutes {

  async getTourAgencies() {
    const response = await api.get(`/TourAgencies/`);
    return response.data;
  }

  async createTourAgency(data: TourAgencyToCreate) {
    const response = await api.post(`/TourAgencies/`, data);
    return response.data;
  }

  async getTourAgencyById(id: string) {
    const response = await api.get(`/TourAgencies/${id}`);
    return response.data;
  }

}

export const toursAgenciesRoutes = new ToursAgenciesRoutes();