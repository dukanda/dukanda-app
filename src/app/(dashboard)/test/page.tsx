"use client";

import { toursTypeRoutes } from "@/api/routes/ToursType";
import { useQuery } from "@tanstack/react-query";


export default function Test() {

  const getToursTypes = useQuery({
    queryKey: ['toursTypes'],
    queryFn: async () => {
      return await toursTypeRoutes.getToursTypes();
    },
  });

  console.log("getToursTypes", getToursTypes.data?.items);
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h1>Test</h1>
    </div>
  );
}