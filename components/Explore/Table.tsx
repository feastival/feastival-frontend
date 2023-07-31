export default function Table() {
  const events = [
    {
      date: '13 Agustus 2023',
      time: '07.00',
      event: 'Young, Live, and Free',
      artist: 'Chvrches',
      venue: 'Sentul Convention Center',
    },
    {
      date: '13 Agustus 2023',
      time: '07.00',
      event: 'Young, Live, and Free',
      artist: 'Chvrches',
      venue: 'Sentul Convention Center',
    },
    {
      date: '13 Agustus 2023',
      time: '07.00',
      event: 'Young, Live, and Free',
      artist: 'Chvrches',
      venue: 'Sentul Convention Center',
    },
  ];

  return (
    <>
      <div className="flex mt-10 justify-center">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h2 className="font-bold text-3xl mb-3">UPCOMING EVENTS</h2>

            <h2 className="font-bold mt-4">Category</h2>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg font-poppins">
            <table className="w-full text-sm text-left  dark:text-gray-400">
              <tbody>
                {events.map((event, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4  whitespace-nowrap dark:text-white"
                    >
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {event.date}
                        </div>
                        <div className="font-normal ">{event.time}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4 font-bold">{event.event}</td>
                    <td className="px-6 py-4 font-bold">{event.artist}</td>
                    <td className="px-6 py-4 ">{event.venue}</td>

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
            <div className="flex justify-center mt-11 mb-11">
              <button className="rounded-xl border py-2 px-9 border-[#9747FF]  text-[#9747FF] text-1xl">
                See All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
