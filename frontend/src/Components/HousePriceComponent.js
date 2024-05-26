import React from "react";
import { Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const HousePriceComponents = ({ item }) => {
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-700 p-4">
      <div className="flex items-center">
        <HomeRoundedIcon className=" text-blue-950 text-3xl" />
        <div className="ml-5">
          <Typography className="text-lg">{item.text}</Typography>
          <Typography color={"gray"}>{item.type}</Typography>
        </div>
      </div>
      <div className="">
        <Typography>{item.price}</Typography>
        <Typography className=" text-blue-500 text-right">
          {item.more}
        </Typography>
      </div>
    </div>
  );
};

export default HousePriceComponents;
