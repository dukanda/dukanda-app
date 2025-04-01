interface TourAgencyToCreate {
  Name: string,
  Description: string,
  ContactEmail: string,
  ContactPhone: string,
  Address: string,
  Logo: File | null,
  TourAgencyTypeId: number,
}


interface TourAgencyToCreate2 {
  userId: string,
  name: string,
  description: string,
  contactEmail: string,
  contactPhone: string,
  address: string,
  logoUrl: string,
  tourAgencyTypeId: number,
  agencyType: string,
  toursCount: number
}
