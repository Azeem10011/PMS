const CONTACT_ADDRESS = "0x1477E9162cc71b4051E317315da13D823eAaaADf";

const CONTACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "properties",
    outputs: [
      {
        internalType: "string",
        name: "registrationNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "registrationDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "propertyType",
        type: "string",
      },
      {
        internalType: "string",
        name: "province",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "marla",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "noOfRooms",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "noOfFloors",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "phaseNo",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "sold_count",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "tax",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_propertyId",
        type: "uint256",
      },
    ],
    name: "setPropertyData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

module.exports = {
  CONTACT_ABI,
  CONTACT_ADDRESS,
};
