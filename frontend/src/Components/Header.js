// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from "react";
// import { Typography, createTheme } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import logo from "../Assets/img/Home/logo-transparent.png";
// import { Link } from "react-router-dom";

// const theme = createTheme();

// const useStyles = makeStyles((theme) => ({
//   hamburger: {
//     "&hover": { background: theme.palette.primary.main },
//   },
//   textColor: {
//     color: theme.palette.primary.main,
//   },
//   bgColor: {
//     backgroundColor: "#1B2845",
//     position: "sticky",
//   },
// }));

// const Header = ({ navigation }) => {
//   const classes = useStyles();
//   const [isOpen, setIsOpen] = useState(false);
//   const [list, setList] = useState([
//     {
//       id: 1,
//       text: "Home",
//       page: "/",
//     },
//     {
//       id: 2,
//       text: "Rent",
//     },
//     {
//       id: 3,
//       text: "Dealers",
//       page: "/dealers",
//     },
//     {
//       id: 4,
//       text: "Area Guides",
//       page: "/area-guides",
//     },
//     {
//       id: 5,
//       text: "Property",
//       page: "/property-list",
//     },
//     {
//       id: 6,
//       text: "Contact",
//       page: "/contact-us",
//     },
//     {
//       id: 7,
//       text: "Verify",
//       page: "/ver",
//     },
//   ]);
//   return (
//     <div>
//       <nav className={`border-gray-200 ${classes.bgColor}`}>
//         <div className="max-w-screen-xl flex items-center justify-around  p-4">
//           <Link to={"/"} className="flex ml-12 items-center text-white">
//             <img src={logo} className="h-16 w-16 mr-3" alt="Logo" />
//             <Typography variant="h5" style={{fontStyle:"italic"}}>NEW WORLD</Typography>
//           </Link>
//           <div className="flex md:order-2">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className={`inline-flex ${classes.hamburger} items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400`}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className={`${
//               isOpen ? "block" : "hidden"
//             }  items-center justify-between w-full md:flex md:w-auto md:order-1`}
//             id="navbar-cta"
//           >
//             <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
//               {list.map((lis) => (
//                 <li key={lis.id}>
//                   <Link
//                     to={lis.page}
//                     className={`block py-2 pl-3 pr-4 text-white`}
//                     aria-current="page"
//                   >
//                     {lis.text}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Typography, createTheme, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../Assets/img/Home/logo-transparent.png";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  hamburger: {
    "&hover": { background: theme.palette.primary.main },
  },
  textColor: {
    color: "white",
  },
  bgColor: {
    backgroundColor: "#1B2845",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  navbar: {
    height: 80,
    padding: "0 20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  menuList: {
    display: "none",
    flexDirection: "column",
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#1B2845",
    padding: "20px",
    zIndex: 999,
  },
  menuListItem: {
    margin: "10px 0",
  },
}));

const Header = ({ navigation }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile device
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([
    {
      id: 1,
      text: "Home",
      page: "/",
    },
    {
      id: 3,
      text: "Dealers",
      page: "/dealers",
    },
    {
      id: 4,
      text: "Area Guides",
      page: "/area-guides",
    },
    {
      id: 5,
      text: "Property",
      page: "/property-list",
    },
    {
      id: 6,
      text: "Contact",
      page: "/contact-us",
    },
    // {
    //   id: 7,
    //   text: "Verify Property",
    //   page: "/ver",
    // },
  ]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`border-gray-200 ${classes.bgColor} p-2`}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.navbar}
      >
        <Grid item>
          <Link to={"/"} className={classes.logoContainer}>
            <img src={logo} className="h-16 w-16 mr-3" alt="Logo" />
            <Typography
              variant="h5"
              style={{ fontStyle: "italic", color: "white" }}
            >
              NEW WORLD
            </Typography>
          </Link>
        </Grid>

        <Grid item>
          <button
            onClick={toggleMenu}
            className={`inline-flex ${classes.hamburger} items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400`}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </Grid>
        <Grid item xs={12} md="auto">
          <div
            className={`${isOpen ? "block" : "hidden"} ${
              isMobile ? "p-4" : ""
            } ${classes.menuList}`}
          >
            <ul>
              {list.map((item) => (
                <li key={item.id} className={classes.menuListItem}>
                  <Link to={item.page} className={classes.textColor}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Grid>
        {!isMobile && (
          <Grid item>
            <div style={{ display: "flex" }}>
              {list.map((item) => (
                <Typography
                  variant="p1"
                  key={item.id}
                  className={classes.menuListItem}
                  style={{ paddingRight: "20px", fontSize: "20px" }}
                >
                  <Link to={item.page} className={classes.textColor}>
                    {item.text}
                  </Link>
                </Typography>
              ))}
            </div>
          </Grid>
        )}
      </Grid>
    </nav>
  );
};

export default Header;
