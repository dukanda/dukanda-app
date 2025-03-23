import { api } from "@/api/axios.config";


class CitiesRoutes {
  public static CITIES = "/cities";

  async getAllCities() {
    const response = await api.get<Province>(CitiesRoutes.CITIES);
    return response;
  }
}

export const citiesRoutes = new CitiesRoutes();