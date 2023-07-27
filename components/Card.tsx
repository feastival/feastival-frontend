import Head from "next/head";
import Image from "next/image";

export default function Card() {
  const events = [
    {
      name: "Chvrches",
      date: "13 Agustus 2023",
      venue: "Sentul Convention Center",
      location: "Bogor",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
    {
      name: "Chvrches",
      date: "13 Agustus 2023",
      venue: "Sentul ",
      location: "Bogor",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
    {
      name: "Chvrches",
      date: "13 Agustus 2023",
      venue: "Sentul Convention Center",
      location: "bogor",
      imageUrl1:
        "https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg",
    },
  ];

  return (
    <>
      <Head>
        <title>Event Cards</title>
      </Head>

      <main className="py-6 flex items-center justify-center flex-wrap">
        {events.map((event, index) => (
          <a href="#" key={index} className="group block">
            <div className="overflow-hidden bg-white group-hover:opacity-75 rounded m-3 w-64 h-96">
              <div className="relative h-3/4">
                <img
                  src={event.imageUrl1}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-black font-bold font-bebasNeue text-lg overflow-hidden overflow-ellipsis">
                    {event.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                    {event.date}
                  </p>
                </div>

                <div className="text-right">
                  <h3 className="text-black font-bold font-bebasNeue text-lg overflow-hidden overflow-ellipsis">
                    
                    {event.location}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis">
                  {event.venue}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </main>
    </>
  );
}
