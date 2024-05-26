import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getCompleteProperties, getDealers } from "../api/apis";
import sectionImage from "../Assets/img/Home/2.jpg";
import image_1 from "../Assets/houseimage/1.jpg";
import image_2 from "../Assets/houseimage/2.jpg";
import image_3 from "../Assets/houseimage/3.jpg";
import image_4 from "../Assets/houseimage/4.jpg";
import image_5 from "../Assets/houseimage/5.jpg";
import image_6 from "../Assets/houseimage/6.jpg";
import image_7 from "../Assets/houseimage/7.jpg";
import image_8 from "../Assets/houseimage/8.jpg";
import image_9 from "../Assets/houseimage/9.jpg";
import image_10 from "../Assets/houseimage/10.jpg";
import image_11 from "../Assets/houseimage/11.jpg";
import image_12 from "../Assets/houseimage/12.jpg";
import image_13 from "../Assets/houseimage/13.jpg";
import image_14 from "../Assets/houseimage/14.jpg";
import image_15 from "../Assets/houseimage/15.jpg";
import image_16 from "../Assets/houseimage/16.jpg";
import image_17 from "../Assets/houseimage/17.jpg";
import image_18 from "../Assets/houseimage/18.jpg";
import image_19 from "../Assets/houseimage/19.jpg";
import image_20 from "../Assets/houseimage/20.jpg";
import image_21 from "../Assets/houseimage/21.jpg";
import image_22 from "../Assets/houseimage/22.jpg";
import image_23 from "../Assets/houseimage/23.jpg";
import image_24 from "../Assets/houseimage/24.jpg";
import image_25 from "../Assets/houseimage/25.jpg";
import image_26 from "../Assets/houseimage/26.jpg";
import image_27 from "../Assets/houseimage/27.jpg";
import image_28 from "../Assets/houseimage/28.jpg";
import image_29 from "../Assets/houseimage/29.jpg";
import image_30 from "../Assets/houseimage/30.jpg";

const useStyles = makeStyles((theme) => ({
  bgColor: {
    backgroundColor: "#EBF8FE",
  },
}));

function GridPropertyList(prop) {
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
    image_10,
    image_11,
    image_12,
    image_13,
    image_14,
    image_15,
    image_16,
    image_17,
    image_18,
    image_19,
    image_20,
    image_21,
    image_22,
    image_23,
    image_24,
    image_25,
    image_26,
    image_27,
    image_28,
    image_29,
    image_30,
  ];

  const openWhatsApp = (item) => {
    if (
      item.dealer &&
      item.dealer.contact_no &&
      item.dealer.name &&
      item.plot_no
    ) {
      let phoneNumber = item.dealer.contact_no.replace(/[^\d]/g, "").trim();

      // Check if the phone number starts with '0' and remove it
      if (phoneNumber.startsWith("0")) {
        phoneNumber = phoneNumber.substring(1);
      }

      // Prepend the country code +92
      phoneNumber = `92${phoneNumber}`;

      // Ensure the phone number has the correct length
      if (phoneNumber.length !== 12) {
        // 2 for country code + 10 for local number
        console.error("Invalid phone number length:", phoneNumber);
        return;
      }
      console.log(phoneNumber);
      const message = `Hello ${item.dealer.name}, I am interested in buying this property with plot number ${item.plot_no}`;
      const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}&app_absent=0`;
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    } else {
      console.error("Invalid item:", item);
    }
  };

  const [data, setData] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const loadProperties = async () => {
    try {
      const dealers = await getDealers();
      const properties = await getCompleteProperties();

      if (properties) {
        setData(
          properties.map((property, index) => {
            return { ...property, dealer: dealers[index % dealers.length] };
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadProperties();
  }, []);

  const FilterReset = () => {
    setFilterResult([]);
    loadProperties();
  };
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
          {filterResult.length === 0 &&
            data.map((item, index) => (
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
                      <span style={{ fontSize: "20px" }}>{item.plot_no}</span> /
                      Plot No
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
                    <Typography variant="body2" style={{ marginTop: "10px" }}>
                      {" "}
                      <span style={{ fontSize: "20px" }}>
                        {item.dealer.name}
                      </span>{" "}
                      / Dealer
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
                      <Link to={`/verification/${item.plot_no}`}>
                        <Button
                          variant="outlined"
                          className=" cursor-pointer mr-5"
                        >
                          See Details
                        </Button>
                      </Link>
                      <Button
                        onClick={() => openWhatsApp(item)}
                        variant="outlined"
                        className=" cursor-pointer"
                      >
                        Contact Dealer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          {filterResult.length > 0 &&
            filterResult.map((item, index) => (
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
                      <Button
                        onClick={() => openWhatsApp(item)}
                        variant="outlined"
                        className=" cursor-pointer"
                      >
                        Buy Property{" "}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <button onClick={Filter} style={{ display: "none" }} id="filter_btn">
          hello
        </button>
        <button
          onClick={FilterReset}
          style={{ display: "none" }}
          id="filter_btn_Reset"
        >
          hello
        </button>
      </div>
    </div>
  );
}

export default GridPropertyList;
