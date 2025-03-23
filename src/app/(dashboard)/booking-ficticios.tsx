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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="p-4 text-left border-b">Nome</th>
            <th className="p-4 text-left border-b">Tour</th>
            <th className="p-4 text-left border-b">Data</th>
            <th className="p-4 text-left border-b">Bilhetes</th>
            <th className="p-4 text-left border-b">Pacote</th>
            <th className="p-4 text-left border-b">Total (kz)</th>
            <th className="p-4 text-left border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="p-4 border-b">{booking.name}</td>
                <td className="p-4 border-b">{booking.tour}</td>
                <td className="p-4 border-b">{booking.date}</td>
                <td className="p-4 border-b">{booking.tickets}</td>
                <td className="p-4 border-b">{booking.package}</td>
                <td className="p-4 border-b"> {booking.total.toFixed(2)} kz</td>
                <td className={`p-4 border-b ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                Nenhum agendamento encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
