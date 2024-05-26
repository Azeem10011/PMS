import React from "react";
import { makeStyles } from "@mui/styles";
import bgImage from "../Assets/img/Home/window.jpg";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: "#1B2845",
  },
  bgColor: {
    backgroundColor: "#1B2845",
    opacity: 0.7,
    position: "sticky",
  },
  backgroundImg: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const SectionSearch = () => {
  const styles = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <div
        className={`${styles.backgroundImg} flex flex-col items-center justify-center py-32 px-24 mb-5`}
      >
        <div className=" container mx-auto">
          <Typography variant="h2" color={"white"} className="text-center">
            Are you searching Top Places
          </Typography>
          <Typography variant="p" color={"white"} className="text-center" style={{fontSize:"20px"}}>
          Imagine yourself standing atop a rugged cliff, the wind whispering tales of ancient lands as it whisks through your hair. Below, waves crash against the jagged rocks, painting a mesmerizing portrait of nature's raw power. This is one of the top places that beckons adventurers and dreamers alike, a place where the earth's embrace is both fierce and gentle. As you gaze across the horizon, your eyes feast upon a panorama of breathtaking beauty - from verdant valleys to towering peaks cloaked in mist. Each step feels like a journey into the heart of wonder, where the past meets the present, and the soul finds solace in the majesty of creation. Here, amidst the symphony of nature's symphony, you realize that you are but a small part of something grander, something timeless. Welcome to a world where the ordinary fades into insignificance, and every moment is a masterpiece waiting to be discovered.
          </Typography>
        </div>
      </div>
    </>
  );
};

export default SectionSearch;
