import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";

interface BookingsTableProps {
  status: string;
}

const mockBookings = [
  {
    id: 1,
    name: "João Silva",
    tour: "Tour pela Amazônia",
    status: "active",
    date: "2025-04-10",
    tickets: 2,
    package: "Pacote Premium",
    total: 3000.0,
  },
  {
    id: 2,
    name: "Maria Oliveira",
    tour: "Passeio em Fernando de Noronha",
    status: "pending",
    date: "2025-05-20",
    tickets: 1,
    package: "Pacote Básico",
    total: 2500.0,
  },
  {
    id: 3,
    name: "Carlos Souza",
    tour: "Tour Cultural em Salvador",
    status: "canceled",
    date: "2025-06-10",
    tickets: 4,
    package: "Pacote Família",
    total: 4800.0,
  },
];

export const BookingsTable = ({ status }: BookingsTableProps) => {
  const filteredBookings = status === "all"
    ? mockBookings
    : mockBookings.filter((booking) => booking.status === status);

  return (
    <div className="rounded-[12px] mt-5   ">
      <Table className="min-w-full bg-white border border-gray-200 rounded-md ">
        <TableHeader className="rounded-md">
          <TableRow>
            <TableHead className="p-4 text-left border-b">Nome</TableHead>
            <TableHead className="p-4 text-left border-b">Tour</TableHead>
            <TableHead className="p-4 text-left border-b">Data</TableHead>
            <TableHead className="p-4 text-left border-b">Bilhetes</TableHead>
            <TableHead className="p-4 text-left border-b">Pacote</TableHead>
            <TableHead className="p-4 text-left border-b">Total (kz)</TableHead>
            <TableHead className="p-4 text-left border-b">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-gray-100">
                <TableCell className="p-4 border-b">{booking.name}</TableCell>
                <TableCell className="p-4 border-b">{booking.tour}</TableCell>
                <TableCell className="p-4 border-b">{booking.date}</TableCell>
                <TableCell className="p-4 border-b">{booking.tickets}</TableCell>
                <TableCell className="p-4 border-b">{booking.package}</TableCell>
                <TableCell className="p-4 border-b"> {booking.total.toFixed(2)} kz</TableCell>
                <TableCell className={`p-4 border-b ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="p-4 text-center text-gray-500">
                Nenhum agendamento encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "canceled":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
}
