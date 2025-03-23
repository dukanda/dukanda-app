import { Button } from "@/components/ui/button";
import { CircleFadingPlus, MapPin, CalendarDays, DollarSign } from "lucide-react";
import { CreateTours } from "./createTours";
import Image from "next/image";

interface Tour {
  id: number;
  title: string;
  description: string;
  basePrice: number;
  startDate: string;
  endDate: string;
  city: string;
  cover: string;
}

const mockTours: Tour[] = [
  {
    id: 1,
    title: "Tour pela Amazônia",
    description: "Explore a floresta amazônica com guias experientes.",
    basePrice: 1500,
    startDate: "2025-04-10",
    endDate: "2025-04-15",
    city: "Manaus",
    cover: "/images/amazon.jpg",
  },
  {
    id: 2,
    title: "Passeio em Fernando de Noronha",
    description: "Descubra as praias paradisíacas de Noronha.",
    basePrice: 2500,
    startDate: "2025-05-20",
    endDate: "2025-05-25",
    city: "Fernando de Noronha",
    cover: "/images/noronha.jpg",
  },
  {
    id: 3,
    title: "Tour Cultural em Salvador",
    description: "Vivencie a cultura baiana com muita música e gastronomia.",
    basePrice: 1200,
    startDate: "2025-06-10",
    endDate: "2025-06-12",
    city: "Salvador",
    cover: "/images/salvador.jpg",
  },
];

export default function ToursScreen() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* Botão para criar passeios */}
      <div>
        <CreateTours>
          <Button className="bg-green-700 hover:bg-green-600 flex gap-4">
            <CircleFadingPlus size={20} /> Criar Passeios
          </Button>
        </CreateTours>
      </div>

      {/* Verificação de Passeios */}
      {mockTours.length === 0 ? (
        <div className="flex justify-center items-center h-96 text-gray-500">
          Sem passeios cadastrados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTours.map((tour) => (
            <div key={tour.id} className="border rounded-lg overflow-hidden shadow-md bg-white">
              <Image
                src={tour.cover}
                alt={tour.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{tour.description}</p>
                
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
                  <MapPin size={16} />
                  <span>{tour.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2 text-gray-700">
                  <CalendarDays size={16} />
                  <span>
                    {tour.startDate} - {tour.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2 text-green-600 font-semibold">
                  <DollarSign size={16} />
                  <span>R$ {tour.basePrice.toFixed(2)}</span>
                </div>
                
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-500">Ver em Detalhes</Button>
                <Button variant={"outline"} className="w-full mt-4 border border-green-500 text-green-500">Editar</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
