import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Typography, TextField, Button } from "@mui/material";
import Footer from "../Components/Footer";
import VerificationCard from "../Components/VerificationCard";
import PreviousOwnerCard from "../Components/PreviousOwnerCard";
import { useParams } from "react-router-dom";
import { verification } from "../api/apis";

const Verification_View = () => {
  const [plot, setPlot] = useState();
  const [showPreviousOwners, setShowPreviousOwners] = useState(false);
  const { plot_no } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format the date to "May 1, 2024"
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const verify = async () => {
      const res = await verification(plot_no);
      console.log(res);
      setPlot(res);
    };
    verify();
  }, []);

  const renderPreviousOwnersButton = () => {
    if (parseInt(plot.transactions.length) > 1) {
      return (
        <Button
          onClick={() => setShowPreviousOwners(!showPreviousOwners)}
          variant="outlined"
        >
          Show Previous Owners
        </Button>
      );
    }
    return null;
  };

  return (
    <>
      <Header />
      <br />
      <div className="bg-gray-100 border-4 pb-20 ml-3 mr-3 mb-3">
        <Typography variant="h5" color="gray">
          Online Property Verification View
        </Typography>
        {plot && (
          <div>
            <div className="flex justify-center flex-wrap">
              <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
                <VerificationCard
                  iconClass="fa-calendar"
                  title="Registration No"
                  content={plot?.plot_no}
                />
                <VerificationCard
                  iconClass="fa-user"
                  title="Owner Name"
                  content={plot?.transactions[0]?.buyer?.name}
                />
              </div>
            </div>
            <div className="flex justify-center flex-wrap">
              <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
                <VerificationCard
                  iconClass="fa-calendar"
                  title="Registration Date"
                  content={formatDate(plot.createdAt)}
                />
                <VerificationCard
                  iconClass="fa-map-pin"
                  title="Property Type"
                  content={plot?.property.property_type}
                />
              </div>
            </div>
            <div className="flex justify-center flex-wrap">
              <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
                <VerificationCard
                  iconClass="fa-bed"
                  title="No of Rooms"
                  content={plot?.property.no_of_rooms}
                />
                <VerificationCard
                  iconClass="fa-stairs"
                  title="No of Floors"
                  content={plot?.property.no_of_floors}
                />
              </div>
            </div>
            <div className="flex justify-center flex-wrap">
              <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
                <VerificationCard
                  iconClass="fa-street-view"
                  title="Phase No"
                  content={plot?.phase.name}
                />
                {/* <VerificationCard
                  iconClass="fa-street-view"
                  title="Latitude & Longitude"
                  content={plot.location}
                /> */}
              </div>
            </div>
            <div className="flex justify-center flex-wrap">
              <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
                {/* <VerificationCard
                  iconClass="fa-percent"
                  title="Tax"
                  content={plot.tax}
                /> */}
                <VerificationCard
                  iconClass="fa-sort-numeric-asc"
                  title="Sold Counts"
                  content={
                    <>
                      <div className="flex justify-center">
                        {plot?.transactions.length - 1}
                      </div>
                      <br></br>
                      {renderPreviousOwnersButton(plot)}
                    </>
                  }
                />
              </div>
            </div>
            {/* Render previous owners if showPreviousOwners is true */}

            {showPreviousOwners && (
              <div className="flex justify-center mb-4">
                <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
                  {plot?.transactions.slice(0, -1).map((owner, index) => (
                    <PreviousOwnerCard key={index} owner={owner} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Verification_View;
