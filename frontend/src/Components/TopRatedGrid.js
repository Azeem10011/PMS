import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import sectionImage from "../Assets/img/Home/2.jpg";
import { Link } from "react-router-dom";
import { getCompleteProperties } from "../api/apis";
import image_1 from "../Assets/houseimage/1.jpg";
import image_2 from "../Assets/houseimage/2.jpg";
import image_3 from "../Assets/houseimage/3.jpg";
import image_4 from "../Assets/houseimage/4.jpg";
import image_5 from "../Assets/houseimage/5.jpg";
import image_6 from "../Assets/houseimage/6.jpg";
import image_7 from "../Assets/houseimage/7.jpg";
import image_8 from "../Assets/houseimage/8.jpg";
import image_9 from "../Assets/houseimage/9.jpg";

const useStyles = makeStyles((theme) => ({
  bgColor: {
    backgroundColor: "#EBF8FE",
  },
}));

function TopRatedGrid(prop) {
  const styles = useStyles();
  const imagearray = [
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_6,
    image_7,
    image_8,
    image_9,
  ];
  const [data, setData] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const loadProperties = async () => {
    await getCompleteProperties().then((response) => {
      if (response) {
        setData(response);
      } else {
      }
    });
  };
  useEffect(() => {
    loadProperties();
  }, []);

  const Filter = () => {
    let result = [];
    if (prop.OnRent == false || prop.OnRent == true) {
      data.map((obj) => {
        if (obj.property.on_rent == prop.OnRent) {
          result.push(obj);
        }
      });
    }
    if (prop.Phase) {
      const ph = [];
      result.map((obj, index) => {
        if (obj.phase._id == prop.Phase) {
          ph.push(obj);
        }
      });
      result = ph;
    }
    if (prop.Bedrooms) {
      const bd = [];
      result.map((obj, index) => {
        if (obj.property.no_of_rooms == prop.Bedrooms) {
          bd.push(obj);
        }
      });
      result = bd;
    }
    if (prop.Floor) {
      const fl = [];
      result.map((obj, index) => {
        if (obj.property.no_of_floors == prop.Floor) {
          fl.push(obj);
        }
      });
      result = fl;
    }
    setFilterResult(result);
  };

  return (
    <div className={` py-10 px-4`} style={{ marginBottom: "25px" }}>
      <div className=" container mx-auto">
        <div className=" text-center p-5 ">
          <Typography variant="h3">New & Top Rated Property</Typography>
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            Find new & top rated property for you.
          </Typography>
        </div>
        <Grid
          className=" w-full mx-auto"
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ marginTop: "7px" }}
        >
          {filterResult.length == 0 &&
            data.slice(0, 6).map((item, index) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    style={{ maxHeight: "340px", minHeight: "340px" }}
                    image={imagearray[index]}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      align="center"
                      component="div"
                    >
                      {item.phase.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      align="center"
                      component="div"
                      style={{ marginTop: "-9px" }}
                    >
                      ({item.phase.phase_type})
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.property_type}
                      </span>{" "}
                      / TYPE
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.property_style}
                      </span>{" "}
                      / STYLE
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.on_rent ? "Yes" : "No"}
                      </span>{" "}
                      / On RENT
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.no_of_rooms}
                      </span>{" "}
                      / ROOMS
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.no_of_floors}
                      </span>{" "}
                      / FLOORS
                    </Typography>
                    <Typography
                      variant="h6"
                      align="end"
                      style={{ fontStyle: "italic" }}
                    >
                      {" "}
                      <span style={{ fontSize: "25px", fontStyle: "italic" }}>
                        {item.phase.per_square_price * item.no_of_square_feet}
                      </span>{" "}
                      / PKR
                    </Typography>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <Link to="/property-list">
                        {" "}
                        <Button variant="outlined">Buy Property </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          {filterResult.length > 0 &&
            filterResult.slice(0, 6).map((item, index) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    style={{ maxHeight: "340px", minHeight: "340px" }}
                    image={imagearray[index]}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      align="center"
                      component="div"
                    >
                      {item.phase.name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      align="center"
                      component="div"
                      style={{ marginTop: "-9px" }}
                    >
                      ({item.phase.phase_type})
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.property_type}
                      </span>{" "}
                      / TYPE
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.property_style}
                      </span>{" "}
                      / STYLE
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.on_rent ? "Yes" : "No"}
                      </span>{" "}
                      / On RENT
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.no_of_rooms}
                      </span>{" "}
                      / ROOMS
                    </Typography>
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.property.no_of_floors}
                      </span>{" "}
                      / FLOORS
                    </Typography>
                    <Typography
                      variant="h6"
                      align="end"
                      style={{ fontStyle: "italic" }}
                    >
                      {" "}
                      <span style={{ fontSize: "25px", fontStyle: "italic" }}>
                        {item.phase.per_square_price * item.no_of_square_feet}
                      </span>{" "}
                      / PKR
                    </Typography>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <Link to="/property-list">
                        {" "}
                        <Button variant="outlined">Buy Property </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <button onClick={Filter} style={{ display: "none" }} id="filter_btn">
          hello
        </button>
      </div>
    </div>
  );
}

export default TopRatedGrid;

// {
//   id: "1",
//   name: "Moder Family Room",
//   price: "4.5",
//   image: { sectionImage },
//   beds: "4",
//   bath: "2",
// },
// {
//   id: "2",
//   name: "Moder Family Room",
//   price: "4.5",
//   image: { sectionImage },
//   beds: "4",
//   bath: "2",
// },
// {
//   id: "3",
//   name: "Moder Family Room",
//   price: "4.5",
//   image: { sectionImage },
//   beds: "4",
//   bath: "2",
// },
// {
//   id: "4",
//   name: "Moder Family Room",
//   price: "4.5",
//   image: { sectionImage },
//   beds: "4",
//   bath: "2",
// },
// {
//   id: "5",
//   name: "Moder Family Room",
//   price: "4.5",
//   image: { sectionImage },
//   beds: "4",
//   bath: "2",
// },
// {
//   id: "6",
//   name: "Moder Family Room",
//   price: "4.5",
//   image: { sectionImage },
//   beds: "4",
//   bath: "2",
// },
