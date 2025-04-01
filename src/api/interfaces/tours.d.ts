
interface TourToCreate {
  Title: string;
  Description: string;
  basePrice: number;
  StartDate: string;
  EndDate: string;
  CityId: string;
  Cover: File | null;
  TourTypeIds: number[];
}
