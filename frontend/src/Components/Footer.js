import React from "react";
import Button from '@mui/material/Button';
// CSS Styles
const sectionStyle = "bg-blue-950 text-white";
const containerStyle = "container mx-auto px-4 pb-8 text-center md:text-left";
const flexContainerStyle = "flex flex-col md:flex-row justify-center";
const columnStyle = "w-full sm:w-1/2 md:w-1/4 p-4 mx-auto";
const linkButtonStyle = "bg-blue-500 text-white px-4 py-2 inline-block";
const listStyle = "flex flex-row sm:flex-col justify-center mx:auto";
const inputStyle = "border border-gray-300 text-black px-3 py-2 rounded-md mt-2 ";
const copyrightStyle = "text-center mt-8 px-4";

const Footer = () => {
  return (
    <section id="footer" className={sectionStyle} style={{marginTop:"20px"}}>
      <div className={containerStyle}>
        <div className={flexContainerStyle} >
          {/* About Us */}
          <div className={columnStyle} style={{marginTop:"30px"}}>
            <div className="mb-4">
              <h4 className="text-2xl font-semibold mb-2">About Us</h4>
              <p className=" text-1xl  text-gray-400 hover:text-white-700 font-semibold text-justify mt-5">
                At PMS, we're transforming property management with blockchain,
                ensuring a secure and transparent experience for owners and
                tenants, setting new industry standards. Join us in shaping the
                future of property management.
              </p>
            </div>
          </div>

          {/* Useful Links */}
        
          <div className={columnStyle} style={{marginTop:"30px"}}>
            <div className="mb-4">
              <h4 className="text-2xl font-semibold mb-2" style={{marginLeft:"30px "}}>Useful Links</h4>
              <ul className={listStyle}  style={{marginLeft:"30px "}} class="mt-5">
                <li className="mr-4 mb-2 sm:mb-0 mt-2">
                  <a href="#" className="text-gray-400 hover:text-white-700">
                    About Us
                  </a>
                </li>
                <li className="mr-4 mb-2 sm:mb-0 mt-2">
                  <a href="#" className="text-gray-400 hover:text-white-700">
                    FAQs Page
                  </a>
                </li>
                <li className="mr-4 mb-2 sm:mb-0 mt-2">
                  <a href="#" className="text-gray-400 hover:text-white-700">
                    Checkout
                  </a>
                </li>
                <li className="mr-4 mb-2 sm:mb-0 mt-2">
                  <a href="#" className="text-gray-400 hover:text-white-700">
                    Services
                  </a>
                </li>
                <li className="mr-4 mb-2 sm:mb-0 mt-2">
                  <a
                    href="/contactus"
                    className="text-gray-400 hover:text-white-700 "
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Get In Touch */}
          <div className={columnStyle} style={{marginTop:"30px"}}>
            <div className="mb-4">
              <h4 className="text-2xl font-semibold mb-2">Get In Touch</h4>
              <h6 className="text-gray-400  hover:text-white-700 mt-5">
                <i className="fa fa-map-marker" style={{marginRight:"10px"}}></i> 65 North Park Avenue, USA
              </h6>
              <h6 className="text-gray-400 hover:text-white-700 mt-3">
                <i className="fa fa-envelope" style={{marginRight:"10px"}}></i>{" "}
                <a
                  href="mailto:info@gmail.com"
                  className="text-gray-400 hover:text-white-700 mt-3"
                >
                  info@gmail.com
                </a>
              </h6>
              <h6 className="text-gray-400 hover:text-white-700 mt-3">
                <i className="fa fa-phone" style={{marginRight:"10px"}}></i> +91 123 456 7890
              </h6>
              <h6 className="text-gray-400 hover:text-white-700 mt-3">
                <i className="fa fa-fax" style={{marginRight:"10px"}}></i> +91 123 456 7890
              </h6>
              <h6 className="text-gray-400 hover:text-white-700 mt-3">
                <i className="fa fa-globe" style={{marginRight:"10px"}}></i> All Country Realhome
              </h6>
            </div>
          </div>

          {/* Follow Us */}
          <div className={columnStyle} style={{marginTop:"30px"}}>
            <div className="mb-4">
              <h4 className="text-2xl font-semibold mb-2">Follow Us</h4>
              <p className="text-gray-400 hover:text-white-700 mt-5">
                Follow & Subscribe your email to get new business tips.
              </p>
              <ul className="flex flex-row justify-center items-center p-4">
                <li className="mr-4">
                  <a
                    href="#"
                    className="bg-blue-900 text-white p-2 rounded-full inline-block"
                    title="Rss"
                  >
                    <i className="fa fa-rss"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a
                    href="#"
                    className="bg-blue-900 text-white p-2 rounded-full inline-block"
                    title="Facebook"
                  >
                    <i class="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a
                    href="#"
                    className="bg-blue-900 text-white p-2 rounded-full inline-block"
                    title="Twitter"
                  >
                    <i class="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a
                    href="#"
                    className="bg-blue-900 text-white p-2 rounded-full inline-block"
                    title="Google "
                  >
                    <i class="fa-brands fa-google"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="bg-blue-900 text-white p-2 rounded-full inline-block"
                    title="Linkedin"
                  >
                    <i class="fa-brands fa-linkedin"></i>
                  </a>
                </li>
              </ul>
              <input
              type="text"
              className={inputStyle}
              placeholder="Enter your E-mail for Subscription"
              style={{ width: "100%", border: "none", outline: "none" }}
              onFocus={(event) => event.target.style.border = "none"} 
              onBlur={(event) => event.target.style.border = "none"} 
              />
              <Button variant="contained" color="primary" style={{marginTop:"10px",width:"100%"}}>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={copyrightStyle}>
          <p className="text-gray-400 hover:text-white-700" style={{cursor:"pointer"}} >
            &copy; 2024 New World. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;

