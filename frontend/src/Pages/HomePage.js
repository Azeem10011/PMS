import React, { useEffect } from "react";
import Header from "../Components/Header";
import { makeStyles } from "@mui/styles";
import bgImage from "../Assets/img/Home/livingRoom.jpg";
import { Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TopRatedGrid from "../Components/TopRatedGrid";
import Footer from "../Components/Footer";
import SectionSearch from "../Components/sectionSearch";
import SectionHow from "../Components/SectionHowItWorks";
import _3DModels from "./3DModels";
import {getPhases} from "../api/apis"


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

const HomePage = () => {
  const styles = useStyles();
  const [phaseList,setPhaseList]=React.useState([]);
  const [age, setAge] = React.useState("");
  const [phase, setPhase] = React.useState('');
  const [OnRent, setOnRent] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState('');
  const [floors, setFloors] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    const { name, value } = event.target;
    switch (name) {
      case 'phase':
        setPhase(value);
        break;
      case 'OnRent':
        setOnRent(value);
        break;
      case 'bedrooms':
        setBedrooms(value);
        break;
      case 'floors':
        setFloors(value);
        break;
      default:
        break;
    }
  };
  const getListOfPhases=async()=>{
    await getPhases().then((response)=>{
      if (response){
        setPhaseList(response)
      }
    })
  }
  const handleSearch = () => {
    document.getElementById("filter_btn").click();
  };
useEffect(()=>{
  getListOfPhases()
},[])
  return (
    <>
      <div className={`${styles.backgroundImg}`}>
        <Header />
        <div className="container mx-auto flex h-full flex-col items-center py-32 justify-center content-center">
          <Typography variant="h3" color={"white"} align="center">
            Find your Real Home
          </Typography>
          <Box sx={{ width: "80%", marginTop: "50px", marginBottom: "50px" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              
              <Grid item xs={6} md={4}>
                <Select
                  value={phase}
                  name="phase"
                  onChange={handleChange}
                  displayEmpty
                  className=" bg-white w-full focus:outline-none hover:outline-none "
                  inputProps={{ "aria-label": "Without label" }}
                  placeholder="ALL PHASES"
                >
                  
                  <MenuItem value={""}><em>All Phases</em></MenuItem>
                  {phaseList.map((obj)=>(
                    <MenuItem value={obj._id}>{obj.name}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6} md={4}>
                <Select
                  value={OnRent}
                  name="OnRent"
                  onChange={handleChange}
                  displayEmpty
                  className=" bg-white w-full"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={""}>
                    <em>Rent Property</em>
                  </MenuItem>
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} md={4}>
                <Select
                  value={bedrooms}
                  name="bedrooms"
                  onChange={handleChange}
                  displayEmpty
                  className=" bg-white w-full"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Rooms</em>
                  </MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} md={4}>
                <Select
                  value={floors}
                  name="floors"
                  onChange={handleChange}
                  displayEmpty
                  className=" bg-white w-full"
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={""}><em>Floors</em></MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button className="p-2 text-white font-bold bg-blue-400 w-full" style={{fontSize:"20px"}} onClick={handleSearch}>
                  Search Result
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <TopRatedGrid OnRent={OnRent} Floor={floors} Bedrooms={bedrooms} Phase={phase} />
      <SectionSearch />
      <SectionHow />
      <_3DModels/>
      <Footer />
    </>
  );
};

export default HomePage;
