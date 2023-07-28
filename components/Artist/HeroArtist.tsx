import Image from 'next/image';
import Link from 'next/link';

export default function HeroArtist() {
  return (
    <div>
      <div className="max-w-screen-lg mx-auto">
        <main className="mt-10">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div className="px-4 lg:px-0">
              <h1 className="text-4xl font-semibold text-black leading-tight text-center mb-5">
                Chvrches: Here With Me
              </h1>
            </div>

            <img
              src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
              className="w-full object-cover lg:rounded"
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
              <p className="pb-6">
                Advantage old had otherwise sincerity dependent additions. It in
                adapted natural hastily is justice. Six draw you him full not
                mean evil. Prepare garrets it expense windows shewing do an. She
                projection advantages resolution son indulgence. Part sure on no
                long life am at ever. In songs above he as drawn to.
              </p>
            </div>

            <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
              <div className="p-4">
                <div className="flex py-2">
                  <img
                    src="https://res.cloudinary.com/djudfrj8s/image/upload/v1688051265/week-20/2018-11-06-chvrches-live-music-hall-koeln_027_rj6wim.jpg"
                    className="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm py-1">
                      {' '}
                      Chvrches
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
