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

interface TourEdit {
  id?: string;
  title: string;
  description: string;
  basePrice: number;
  startDate: string;
  endDate: string;
  cityId: number;
  tourTypeIds: number[];
}

interface ToursResponse {
  items: Tour[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface Itinerary {
  id: string;
  tourId: string;
  date: string; // Data no formato ISO 8601
  title: string;
  description: string;
  displayOrder: number;
}

interface Attraction {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isFeatured: boolean;
  cityId: number;
  cityName: string;
  latitude: number;
  longitude: number;
}

interface Package {
  id: string;
  tourId: string;
  name: string;
  price: number;
  benefits: {
    id: string;
    name: string;
    description: string;
  }[];
}

interface TourDetails {
  itineraries: Itinerary[];
  attractions: Attraction[];
  packages: Package[];
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

interface ItineraryToCreate {
  tourId: string; // UUID do tour
  date: date; // Data no formato ISO 8601
  title: string; // Título do itinerário
  description: string; // Descrição do itinerário
  displayOrder: number; // Ordem de exibição
}

interface AttractionToCreate {
  tourId: string; // UUID do tour
  touristAttractionId: string; // UUID da atração turística
}
interface PackageToCreate {
  tourId: string;
  name: string;
  price: number;
  benefits: {
    name: string;
    description: string;
  }[];
}