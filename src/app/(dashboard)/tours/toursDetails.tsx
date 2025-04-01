import { toursRoutes } from "@/api/routes/Tours/index.routes";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface ToursDetailsProps {
  children?: React.ReactNode;
  tourId: string;
}

export const ToursDetails = ({ children, tourId }: ToursDetailsProps) => {
  const { data } = useQuery({
    queryKey: ["toursDetails", tourId],
    queryFn: async () => await toursRoutes.getToursDetails(tourId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="h-full sm:h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden p-6 flex flex-col gap-6">
        <AlertDialogHeader className="text-center">
          {data && (
            <Image
              src={data.coverImageUrl}
              alt={data.title}
              width={400}
              height={300}
              className="rounded-lg mx-auto w-[300px] h-[300px] object-cover bg-gray-100"
            />
          )}
        </AlertDialogHeader>
        {data && <AlertDialogTitle className="text-xl font-bold text-orange-600">{data.title}</AlertDialogTitle>}

        {data && <p className="text-gray-700 text-md leading-relaxed">{data.description}</p>}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-900 font-bold text-lg">Preço Base: <span className="text-green-500 font-normal">{data?.basePrice?.toLocaleString()} KZ</span>

          </p>
          {data && <p className="text-gray-600 text-md">Cidade: {data.cityName}</p>}
        </div>
        <div className="flex items-center gap-4 border-t pt-4">
          <Avatar>
            {data && <AvatarImage src={data.agencyLogoUrl} alt={data.agencyName} className=" w-full h-full object-cover" />}
            <AvatarFallback className="bg-gray-200 text-gray-500">
              {data && data.agencyName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {data && <span className="text-gray-800 font-semibold text-lg">{data.agencyName}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          {data && data.tourTypes.map((type: { id: number; name: string }) => (
            <span key={type.id} className="px-4 py-2 text-orange-600 bg-orange-100 rounded-full text-sm font-medium">
              {type.name}
            </span>
          ))}
        </div>
        <AlertDialogFooter className="mt-auto flex justify-end gap-4">
          <AlertDialogCancel asChild >
            <Button variant={'outline'} className="px-6 py-2 rounded-lg text-black  ">Fechar</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
