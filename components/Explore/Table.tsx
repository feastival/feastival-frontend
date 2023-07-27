export default function Table() {
  const events = [
    {
      date: "13 Agustus 2023",
      time: "07.00",
      name: "Chvrches",
      artist: "Sentul Convention Center",
      venue: "Bogor",
    },
    {
      date: "13 Agustus 2023",
      time: "07.00",
      name: "Chvrches",
      artist: "Sentul Convention Center",
      venue: "Bogor",
    },
  ];

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Artist
              </th>
              <th scope="col" className="px-6 py-3">
                Venue
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="pl-3">
                    <div className="text-base font-semibold">{event.date}</div>
                    <div className="font-normal text-gray-500">
                      {event.time}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{event.name}</td>
                <td className="px-6 py-4">{event.artist}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">{event.venue}</div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="font-medium hover:underline"
                  >
                    More Detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
