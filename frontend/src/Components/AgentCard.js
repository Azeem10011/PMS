import React from "react";
// import  {FaBookmark,}  from "react-icons/fa";

const AgentCard = ({ agent, onSaveClick }) => {
  // Check if agent exists
  if (!agent) return null;

  const openWhatsApp = (item) => {
    if (item && item.contact_no && item.name) {
      let phoneNumber = item.contact_no.replace(/[^\d]/g, "").trim();

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
      const message = `Hello ${item.name}, I am contacting with you, because I need some deatils about the society.`;
      const whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}&app_absent=0`;
      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    } else {
      console.error("Invalid item:", item);
    }
  };

  return (
    <div>
      {" "}
      {/* Removed max-w-md class */}
      <div className=" relative">
        <button
          className="p-2 py-2 bg-yellow-500 text-white text-xs font-bold uppercase rounded-t-md absolute top-0 left-0 focus:outline-none"
          onClick={() => onSaveClick(agent.name)}
        >
          {/* <FaBookmark className="w-6 h-6" /> */}
        </button>
        <div className="text-center pt-10">
          <img
            src={
              agent.image ||
              "https://firebasestorage.googleapis.com/v0/b/property-pms.appspot.com/o/Dealer%2Fa5daed3d-6ab9-4989-b7fa-45c97385a60c?alt=media&token=178c1449-acf8-4c65-acb1-4be06119561c"
            }
            alt="Agent"
            className="w-32 h-32 rounded-full mx-auto mb-2"
          />
          <div className="font-bold text-xl mb-1">{agent.name}</div>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 mb-2">
            CNIC: {agent.cnic || "34012-3423453-1"}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Contact Number: {agent.contact_no}
          </p>
          <p className="text-sm text-gray-600 mb-2">Email: {agent.email}</p>
          <p className="text-sm text-gray-600 mb-2">Role: {agent.role.name}</p>
        </div>
        {/* <div className="text-right pr-4 pt-2 absolute top-0 right-0">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none">
            Call
          </button>
        </div> */}
        <div className="text-center pb-4">
          <button
            onClick={() => openWhatsApp(agent)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
          >
            Contact me
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
