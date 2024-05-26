import React, { useEffect } from "react";
import AgentCard from "../Components/AgentCard";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import user1Image from "../Assets/img/Home/logo-transparent.png";
import user2Image from "../Assets/img/Home/logo-transparent.png";
import user3Image from "../Assets/img/Home/logo-transparent.png";
import { Grid, Paper, styled } from "@mui/material";
import { getDealers } from "../api/apis";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Dealers = () => {
  const [agents, setAgents] = React.useState([]);
  const LoadDealers = async () => {
    await getDealers().then((response) => {
      if (response) {
        setAgents(response);
      }
    });
  };

  useEffect(() => {
    LoadDealers();
  }, []);
  // Function to handle click on the "Saved" icon
  const handleSaveClick = (agentName) => {
    // Add your save functionality here
    console.log(`${agentName} saved`);
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {agents.map((agent, index) => (
            <Grid item key={index} xs={6}>
              <Item>
                <AgentCard agent={agent} onSaveClick={handleSaveClick} />
              </Item>
            </Grid>
          ))}
        </Grid>{" "}
        {/* Add the closing tag for Grid component */}
      </div>
      <Footer />
    </>
  );
};

export default Dealers;
