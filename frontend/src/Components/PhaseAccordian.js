import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PhaseAccordian({ item }) {
  return (
    <div className="p-2">
      <Accordion className=" bg-blue-100">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography className=" text-2xl">{item.name}</Typography>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col lg:flex-row px-20">
          <div className="w-full lg:w-1/2">
            <Typography className="text-lg">
              <span className=" font-bold">Per Square Price: </span>
              {item.per_square_price}
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Total Area: </span>
              {item.total_area} sq ft
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Total Occupied Area: </span>
              {item.total_occupy_area} sq ft
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Total Free Area: </span>
              {item.total_area - item.total_occupy_area} sq ft
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Phase Type: </span>
              {item.phase_type}
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Per Square Price: </span>
              {item.per_square_price} rs
            </Typography>
          </div>
          <div className="">
            <Typography className="text-lg">
              <span className=" font-bold">School: </span>
              {item.school?.name || "No School Yet"}
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Gym: </span>
              {item.gym?.name || "No Gym Yet"}
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">College: </span>
              {item.college?.name || "No College Yet"}
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">University: </span>
              {item.university?.name || "No University Yet"}
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Mosque: </span>
              {item.mosque?.name || "No Mosque Yet"}
            </Typography>
            <Typography className="text-lg">
              <span className=" font-bold">Park: </span>
              {item.park?.name || "No Park Yet"}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
