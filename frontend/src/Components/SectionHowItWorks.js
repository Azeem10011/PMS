import React from "react";
import { makeStyles } from "@mui/styles";
import user from "../Assets/img/Home/user.png";
import search from "../Assets/img/Home/search.png";
import book from "../Assets/img/Home/book.png";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: "#1B2845",
  },
}));

const SectionHowItWorks = () => {
  const styles = useStyles();

  const loop = [
    {
      id: 1,
      img: user,
      title: "Create an Account",
    },
    {
      id: 2,
      img: search,
      title: "Find & Search Property",
    },
    {
      id: 3,
      img: book,
      title: "Book Your Property",
    },
  ];

  return (
    <>
      <div className={`bg-white flex flex-col items-center justify-center p-5`} style={{marginBottom:"100px",marginTop:"50px"}}>
        <div>
          <Typography variant="h2" color="black" className="text-center">
            See How It Works
          </Typography>
          <Typography variant="h6" color={"black"} className="mb-4 text-center">
            How to start working with us and working process
          </Typography>
        </div>
        <div className="flex flex-col md:flex-row items-center m-2 mt-4">
          {loop.map((item) => (
            <div
              key={item.id}
              className="m-2 flex flex-col items-center w-full p-3"
            >
              <img src={item.img} alt="User" className="mb-4 w-24 h-24" />
              <Typography variant="h6" color={"black"}>
                {item.title}
              </Typography>
              <Typography variant="p" color={"black"} className="text-center">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have Ipsum available.
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionHowItWorks;
