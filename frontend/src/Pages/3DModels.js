// import React from "react";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import PlaceContainer from "../Components/PlaceContainer";

// const _3DModels = () => {
//   return (
//     <>
//       <div className="public-places flex flex-col items-center justify-center space-y-8  mt-8 mb-8">
        
//       <PlaceContainer
//         title="City street"
//         description="A bustling city street with shops, pedestrians, and vehicles."
//         src="https://sketchfab.com/models/cc0eff24a1664b80877cfa071b4c1209/embed"
//       />
//       <PlaceContainer
//         title="Small Canadian City Downtown Experiment"
//         description="A small downtown area in a Canadian city, featuring various buildings and streets."
//         src="https://sketchfab.com/models/df06943049cd462b8ab56a2246bb268a/embed"
//       />
//       <PlaceContainer
//         title="Spanish Villa, Spanish House, Hacienda, Lrg v1"
//         description="A large Spanish-style villa with intricate architecture and landscaping."
//         src="https://sketchfab.com/models/138d2586d63a458bb26028a9e38aedb2/embed"
//       />
//       <PlaceContainer
//         title="Rossiya Hotel"
//         description="A grand hotel with luxurious accommodations and amenities."
//         src="https://sketchfab.com/models/4e806b7b2dad417caf7e773eee041d14/embed"
//       />
//       <PlaceContainer
//         title="School Campus"
//         description="A sprawling school campus with buildings, playgrounds, and sports fields."
//         src="https://sketchfab.com/models/71fc9cf0d972446b87576479ebb8b883/embed"
//       />
//       <PlaceContainer
//         title="Hospital Building Cutaway with Characters"
//         description="A detailed cutaway view of a hospital building with medical equipment and staff."
//         src="https://sketchfab.com/models/1f84ad2508674f749290b4d8a9561bfe/embed"
//       />
//       <PlaceContainer
//         title="Park Scene - propart by nandashibs"
//         description="A serene park scene with trees, benches, and walking paths."
//         src="https://sketchfab.com/models/427fc2b0a9b84d75be637a5915673d2a/embed"
//       />
//       <PlaceContainer
//         title="Public Gym"
//         description="A modern gym facility equipped with various exercise machines and amenities."
//         src="https://sketchfab.com/models/9d4673b0f10b48e5b9bf27b4c93f3419/embed"
//       />
//       <PlaceContainer
//         title="Metaverse Gym |Baked| VR/AR Ready"
//         description="A futuristic gym designed for virtual reality and augmented reality workouts."
//         src="https://sketchfab.com/models/4572f2860b414d248a60584c84898134/embed"
//       />
//       <PlaceContainer
//         title="Blue Mosque - Sultanahmet Mosque"
//         description="A majestic mosque with intricate architectural details and beautiful blue domes."
//         src="https://sketchfab.com/models/16e7b1f76eb743129f8e11b529fb6971/embed"
//       />
//       <PlaceContainer
//         title="Street"
//         description="A typical street scene with buildings, vehicles, and pedestrians."
//         src="https://sketchfab.com/models/a0a92282fda5464ab525b16fab8feaa3/embed"
//       />
//     </div>
//     </>
//   );
// };

// export default _3DModels;


import React from 'react';
import PlaceContainer from '../Components/PlaceContainer';
import { useMediaQuery } from '@mui/material';
import { Typography } from "@mui/material";

const _3DModels = () => {
  const places = [
    {
      title: "City street",
      description: "A bustling city street with shops, pedestrians, and vehicles.",
      src: "https://sketchfab.com/models/cc0eff24a1664b80877cfa071b4c1209/embed",
    },
    {
      title: "Town Overview",
      description: "A small downtown area in a Canadian city, featuring various buildings and streets.",
      src: "https://sketchfab.com/models/df06943049cd462b8ab56a2246bb268a/embed",
    },
    {
      title: "Spanish Style Villa",
      description: "A large Spanish-style villa with intricate architecture and landscaping.",
      src: "https://sketchfab.com/models/138d2586d63a458bb26028a9e38aedb2/embed",
    },
    {
      title: "Luxury Hotel",
      description: "A grand hotel with luxurious accommodations and amenities.",
      src: "https://sketchfab.com/models/4e806b7b2dad417caf7e773eee041d14/embed",
    },
    {
      title: "School Campus",
      description: "A sprawling school campus with buildings, playgrounds, and sports fields.",
      src: "https://sketchfab.com/models/71fc9cf0d972446b87576479ebb8b883/embed",
    },
    {
      title: "Hospital Building ",
      description: "A detailed cutaway view of a hospital building with medical equipment and staff.",
      src: "https://sketchfab.com/models/1f84ad2508674f749290b4d8a9561bfe/embed",
    },
    {
      title: "Park Scene",
      description: "A serene park scene with trees, benches, and walking paths.",
      src: "https://sketchfab.com/models/427fc2b0a9b84d75be637a5915673d2a/embed",
    },
    {
      title: "Public Gym",
      description: "A modern gym facility equipped with various exercise machines and amenities.",
      src: "https://sketchfab.com/models/9d4673b0f10b48e5b9bf27b4c93f3419/embed",
    },
    {
      title: "Metaverse Gym |Baked| VR/AR Ready",
      description: "A futuristic gym designed for virtual reality and augmented reality workouts.",
      src: "https://sketchfab.com/models/4572f2860b414d248a60584c84898134/embed",
    },
    {
      title: "Mosque (Jamia Masjid)",
      description: "A majestic mosque with intricate architectural details and beautiful blue domes.",
      src: "https://sketchfab.com/models/16e7b1f76eb743129f8e11b529fb6971/embed",
    },
  ];

  const isMobile = useMediaQuery('(max-width: 600px)'); // Check if it's a mobile device

  return (
    <>
      <div className="public-places flex flex-col items-center justify-center space-y-8 mt-8 mb-8 p-3" >
      <div>
          <Typography variant="h2" color="black" className="text-center">
            3D MODELS
          </Typography>
          <Typography variant="h6" color={"black"} className="mb-4 text-center">
            Reality Viewlizer
          </Typography>
        </div>
        {isMobile ? (
          <>
            {places.map((place, index) => (
              <PlaceContainer
                key={index}
                title={place.title}
                description={place.description}
                src={place.src}
              />
            ))}
          </>
        ) : (
          <>
            <div className="flex flex-wrap justify-center">
              {places.map((place, index) => (
                <div key={index}  className={`w-full md:w-1/2 lg:w-1/3 xl:w-2/4 p-4 ${index % 2 === 0 ? 'mt-20' : ''}`}>
                  <PlaceContainer
                    title={place.title}
                    description={place.description}
                    src={place.src}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default _3DModels;
