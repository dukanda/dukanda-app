
interface TourToCreate {
  AgencyId: string;
  Title: string;
  Description: string;
  basePrice: number;
  StartDate: string;
  EndDate: string;
  CityId: string;
  Cover: string;
  TourTypeIds: number[];
}
