// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Property {
    struct Property {
        uint256 registrationNumber;
        string ownerName;
        string registrationDate;
        string propertyType;
        string province;
        uint256 marla;
        uint256 noOfRooms;
        uint256 noOfFloors;
        string phaseNo;
        uint256 sold_count;
        string location;
        uint256 tax;
    }
    uint public count = 0;
    
    mapping(uint256 => Property) public properties;
    
    function setPropertyData() public {
        Property memory propertyData = Property(
            89,
            "Azeem",
            "12/2/2022",
            "RESSIDENTIAL",
            "PUNJAB",
            10,
            5,
            2,
            "F-9",
            3,
            "31.502545, 74.289242",
            45000
        );
        properties[count++] = propertyData;
    }
    function getPropertyData(uint256 registrationNumber) public view returns (
    uint256,
    string memory,
    string memory,
    string memory,
    string memory,
    uint256,
    uint256,
    uint256,
    string memory,
    uint256,
    string memory,
    uint256
) {
    Property memory propertyData = properties[registrationNumber];
    return (
        propertyData.registrationNumber,
        propertyData.ownerName,
        propertyData.registrationDate,
        propertyData.propertyType,
        propertyData.province,
        propertyData.marla,
        propertyData.noOfRooms,
        propertyData.noOfFloors,
        propertyData.phaseNo,
        propertyData.sold_count,
        propertyData.location,
        propertyData.tax
    );
}
}
