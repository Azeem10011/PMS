import React from "react";
import Header from "../Components/Header";
import { makeStyles } from "@mui/styles";
import "@fortawesome/fontawesome-free/css/all.css";
import Footer from "../Components/Footer";
import "../contactUs.css";
import { Typography } from "@mui/material";

const ContactPage = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (you can send data to the server, for example)
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Header />
      <div class="contactContainer " style={{marginTop:"50px",marginBottom:"50px"}}>
        <div class="content container mx-auto">
          <div class="left-side">
            <div class="address details">
              <i class="fas fa-map-marker-alt"></i>
              <Typography variant="h6">Address</Typography>
              <Typography variant="p1">Islamabad</Typography>
              <div class="text-two">Pakistan</div>
            </div>
            <div class="phone details">
              <i class="fas fa-phone-alt"></i>
              <div class="topic">Phone</div>
              <div class="text-one">+92 300 8204851</div>
              <div class="text-two">+92 320 5452562</div>
            </div>
            <div class="email details">
              <i class="fas fa-envelope"></i>
              <div class="topic">Email</div>
              <div class="text-one">Hello123@gmail.com</div>
              <div class="text-two">Hello456@gmail.com</div>
            </div>
          </div>

          <div className="right-side">
            <Typography variant="h3">Contact Us</Typography>
            <Typography variant="p1">
              Do you have any questions, feedback, or inquiries? Feel free to
              get in touch with us through our contact page.
            </Typography>
            <form onSubmit={handleSubmit} class="mt-4">
              <div className="input-box" style={{marginBottom:"20px",height:"70px"}}>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box" style={{marginBottom:"20px",height:"70px"}}>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box message-box" style={{marginBottom:"20px"}}>
                <textarea
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="button">
                <button
                  className="p-4 text-white font-bold bg-blue-900 "
                  type="submit"
                  value="Send Now"
                  style={{width:"270px",borderRadius:"6px"}}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default ContactPage;
