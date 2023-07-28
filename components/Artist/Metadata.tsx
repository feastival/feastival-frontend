export default function Metadata() {
  const events = [
    {
      date: '13 Agustus 2023',
      time: '07.00',
      event: 'Young, Live, and Free',
      artist: 'Chvrches',
      venue: 'Sentul Convention Center',
      location: 'Jakarta',
      category: 'Concert',
      organizer: 'Ismaya Live',
    },
  ];

  return (
    <>
      <div className="flex mt-10 justify-center font-poppins">
        <div className="relative overflow-x-auto sm:rounded-lg font-poppins">
          <table className="w-full text-sm text-left  dark:text-gray-400">
            <thead className="text-2xl font-bold ">
              <tr>
                <th scope="col" className="px-6">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Venue
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Organizer
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="bg-white border-b text-base">
                  <td className="px-6 py-2 ">{event.date}</td>
                  <td className="px-6 py-2 ">{event.time}</td>
                  <td className="px-6 py-2 ">{event.location}</td>
                  <td className="px-6 py-2 ">{event.venue}</td>
                  <td className="px-6 py-2 ">{event.category}</td>
                  <td className="px-6 py-2 ">{event.organizer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
