import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import bgImage from "../Assets/img/Home/livingRoom.jpg";
import house1 from "../Assets/img/AreaGuide/house1.jpg";
import house2 from "../Assets/img/Home/livingRoom.jpg";
import house3 from "../Assets/img/AreaGuide/house3.jpg";
import house4 from "../Assets/img/AreaGuide/house4.jpeg";
import house5 from "../Assets/img/AreaGuide/house5.jpg";
import house6 from "../Assets/img/AreaGuide/house6.jpg";
import house7 from "../Assets/img/AreaGuide/house2.jfif";

const Carousal = () => {
  const images = [house1, house2, house3, house4, house5, house6, house7];
  return (
    <Carousel
      showArrows={true}
      dynamicHeight={true}
      autoPlay={true}
      infiniteLoop={true}
      autoFocus={true}
    >
      {images.map((item) => (
        <div>
          <img src={item} />
        </div>
      ))}
    </Carousel>
  );
};

export default Carousal;
