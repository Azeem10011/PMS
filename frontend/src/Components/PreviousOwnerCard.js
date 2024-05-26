import React, { useEffect } from "react";
import { CardContent, Typography } from "@mui/material";
import VerificationCard from "./VerificationCard";
import { getFromBlockChain } from "../api/apis";

const PreviousOwnerCard = ({ owner }) => {
  console.log("Owner", owner);
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format the date to "May 1, 2024"
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const getBlock = async () => {
      const res = await getFromBlockChain(owner.blockId);
      console.log(res);
    };
    if (owner.blockId) getBlock();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <style>{`
        .flex {
          display: flex;
          justify-content: center;
        }
        `}</style>{" "}
      <CardContent>
        <Typography variant="h5" color="gray">
          Previous Owner
        </Typography>
        <div className="flex justify-center flex-wrap">
          <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
            <VerificationCard
              iconClass="fa-user"
              title="Owner Name"
              content={owner?.buyer.name}
            />
            <VerificationCard
              iconClass="fa-calendar"
              title="Registration Date"
              content={formatDate(owner?.createdAt)}
            />
          </div>
        </div>
        <div className="flex justify-center flex-wrap">
          <div className="flex flex-wrap sm:flex-no-wrap md:flex-wrap lg:flex-no-wrap xl:flex-wrap">
            <VerificationCard
              iconClass="fa-percent"
              title="CNIC"
              content={owner?.buyer.cnic}
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default PreviousOwnerCard;
