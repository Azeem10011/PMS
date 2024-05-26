import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { getPhases, getSociety } from "../api/apis";
import Carousal from "../Components/Carousal";
import { Typography } from "@mui/material";
import HousePriceComponents from "../Components/HousePriceComponent";
import PhaseAccordian from "../Components/PhaseAccordian";
import RangeTable from "../Components/RangeTable";
import Footer from "../Components/Footer";

const AreaGuides = () => {
  const [society, setSociety] = useState();
  const [phases, setPhases] = useState([]);
  const getSocietyApi = async () => {
    const data = await getSociety();
    setSociety(data[0]);
  };

  const getPhasesApi = async () => {
    const data = await getPhases();
    console.log(data);
    setPhases(data);
  };

  const prices = [
    {
      id: 0,
      text: "House Prices",
      price: "1.55 Crore - 71.71 Crore",
      type: "For Sale",
      more: "50+ Houses",
    },
    {
      id: 1,
      text: "Plot Prices",
      price: "25 Lakh - 90 Crore",
      type: "For Sale",
      more: "100+ Plots",
    },
    {
      id: 2,
      text: "House Prices",
      price: "45 Thousand - 15 Lakh",
      type: "For Rent",
      more: "60+ Houses",
    },
  ];

  const arrayRanges = [
    {
      id: 0,
      text: `House Prices in ${society?.name}`,
      rows: [
        {
          id: 0,
          name: "5 Marla",
          priceRange: "PKR 1.55 Crore - 3.6 Crore",
        },
        {
          id: 1,
          name: "6 Marla",
          priceRange: "PKR 2.15 Crore - 4 Crore",
        },
        {
          id: 2,
          name: "7 Marla",
          priceRange: "PKR 3.39 Crore - 6.5 Crore",
        },
        {
          id: 3,
          name: "8 Marla",
          priceRange: "PKR 2.6 Crore - 5.75 Crore",
        },
        {
          id: 4,
          name: "10 Marla",
          priceRange: "PKR 1.1 Crore - 8.6 Crore",
        },
        {
          id: 5,
          name: "11 Marla",
          priceRange: "PKR 4 Crore - 9.6 Crore",
        },
      ],
    },
    {
      id: 1,
      text: `Plots Prices in ${society?.name}`,
      rows: [
        {
          id: 0,
          name: "5 Marla",
          priceRange: "PKR 25.5 Lakh - 1.8 Crore",
        },
        {
          id: 1,
          name: "6 Marla",
          priceRange: "PKR 50 Lakh - 2 Crore",
        },
        {
          id: 2,
          name: "7 Marla",
          priceRange: "PKR 70 Lakh - 2.1 Crore",
        },
        {
          id: 3,
          name: "8 Marla",
          priceRange: "PKR 97 Lakh - 2.2 Crore",
        },
        {
          id: 4,
          name: "10 Marla",
          priceRange: "PKR 1.25 Crore - 3 Crore",
        },
        {
          id: 5,
          name: "11 Marla",
          priceRange: "PKR 2 Crore - 5.6 Crore",
        },
      ],
    },
    {
      id: 2,
      text: `Commercial Plots Prices in ${society?.name}`,
      rows: [
        {
          id: 0,
          name: "2 Marla",
          priceRange: "PKR 1.55 Crore - 4.5 Crore",
        },
        {
          id: 1,
          name: "4 Marla",
          priceRange: "PKR 1.56 Crore - 10 Crore",
        },
        {
          id: 2,
          name: "5 Marla",
          priceRange: "PKR 1 Crore - 12 Crore",
        },
        {
          id: 3,
          name: "8 Marla",
          priceRange: "PKR 3 Crore - 15.5 Crore",
        },
        {
          id: 4,
          name: "9 Marla",
          priceRange: "PKR 2.3 Crore - 17.6 Crore",
        },
        {
          id: 5,
          name: "16 Marla",
          priceRange: "PKR 7 Crore - 20.6 Crore",
        },
      ],
    },
    {
      id: 3,
      text: `House Rent in ${society?.name}`,
      rows: [
        {
          id: 0,
          name: "5 Marla",
          priceRange: "PKR 45 Thousand - 1.5 Lakh",
        },
        {
          id: 1,
          name: "6 Marla",
          priceRange: "PKR 58 Thousand - 1.5 Lakh",
        },
        {
          id: 2,
          name: "7 Marla",
          priceRange: "PKR 80 Thousand - 1.5 Lakh",
        },
        {
          id: 3,
          name: "8 Marla",
          priceRange: "PKR 55 Thousand - 1.75 Lakh",
        },
        {
          id: 4,
          name: "10 Marla",
          priceRange: "PKR 60 Thousand - 3 Lakh",
        },
        {
          id: 5,
          name: "13 Marla",
          priceRange: "PKR 1.4 Lakh - 1.9 Lakh",
        },
      ],
    },
  ];

  useEffect(() => {
    getSocietyApi();
    getPhasesApi();
  }, []);
  return (
    <>
      <Header />
      <div className=" w-5/6 mx-auto mt-12">
        <Typography variant="h3">{society?.name}</Typography>
        <div className="mt-3 flex flex-col md:flex-row">
          <div className=" w-full md:w-1/2">
            <Carousal />
          </div>
          <div className="ml-4 mb-10 md:mb-0 w-full md:w-1/2">
            <Typography variant="h5">Highlights & Overview</Typography>
            {prices.map((housePrice) => (
              <HousePriceComponents key={housePrice.id} item={housePrice} />
            ))}
            <div className="flex flex-col lg:flex-row p-4">
              <div className="w-full lg:w-1/2">
                <Typography className="text-lg">
                  <span className="font-bold">Total Area: </span>
                  {society?.total_area} sq ft
                </Typography>
                <Typography className="text-lg">
                  <span className="font-bold">Total Commercial Area: </span>
                  {society?.commercial_area} sq ft
                </Typography>
                <Typography className="text-lg">
                  <span className="font-bold">Total Non-Commercial Area: </span>
                  {society?.total_occupy_non_commercial_area} sq ft
                </Typography>
              </div>
              <div className="">
                <Typography className="text-lg">
                  <span className="font-bold">Total Occupied Area: </span>
                  {society?.total_occupy_area} sq ft
                </Typography>
                <Typography className="text-lg">
                  <span className="font-bold">
                    Total Occupied Commertial Area:
                  </span>
                  {society?.total_occupy_commercial_area} sq ft
                </Typography>
                <Typography className="text-lg">
                  <span className="font-bold">
                    Total Occupied Non-Commertial Area:{" "}
                  </span>
                  {society?.total_occupy_non_commercial_area} sq ft
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-16">
          <Typography variant="h4" className="mb-4">
            {society?.name} Area Guide
          </Typography>
          <Typography className=" text-lg p-2">
            Welcome to Our Society: A Haven of Tranquility and Community Nestled
            in the heart of our vibrant city, our society stands as a beacon of
            modern living, offering a harmonious blend of comfort, convenience,
            and community. As you enter our gates, you are greeted by lush
            greenery and meticulously landscaped gardens, creating a serene and
            welcoming atmosphere. The architecture is a testament to elegance
            and modernity, with thoughtfully designed homes that cater to your
            every need. Our society is more than just a place to live; it's a
            community. Residents here form bonds that last a lifetime, coming
            together for social events, cultural celebrations, and shared
            interests. Whether you're looking for a friendly game of tennis, a
            relaxing swim in the pool, or simply a quiet stroll in the park, our
            society has something for everyone. Safety and security are
            paramount here, with round-the-clock security personnel and advanced
            surveillance systems ensuring your peace of mind at all times.
            Convenience is key, with a range of amenities including shopping
            centers, schools, and healthcare facilities located within easy
            reach. At the core of our society is a commitment to sustainability
            and environmental responsibility. We have implemented eco-friendly
            practices such as rainwater harvesting and waste segregation,
            ensuring that we leave behind a greener, cleaner planet for future
            generations. Join us at our society, where luxury meets community,
            and every day is a celebration of modern living. Welcome home.
          </Typography>
        </div>
        <div className="mb-16">
          <Typography variant="h4" className="mb-4">
            Popular Socities and Localities in {society?.name}
          </Typography>
          {phases.map((phase) => (
            <PhaseAccordian key={phase.id} item={phase} />
          ))}
        </div>
        <div className="mb-5">
          {arrayRanges.map((array) => (
            <div>
              <Typography variant="h4" className="font-bold">
                {array.text}
              </Typography>
              <RangeTable rows={array.rows} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AreaGuides;
