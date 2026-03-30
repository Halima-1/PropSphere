// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PropertyManagement {
    // using SafeERC20 for IERC20;

    IERC20 public immutable paymentToken;
    address tokenAddress = 0x4AeB54Dcb53330df6F2885CBCCD3667a04B0e949;
    address owner;

    constructor() {
        paymentToken = IERC20(tokenAddress);
        owner = msg.sender;
    }

    enum PropertyType {
        vehicle,
        land,
        house,
        jewelry,
        clothe,
        electricalDevice
    }

    enum PropertyCategory {
        Luxury,
        middleRange,
        affordable
    }
    enum Warranty {
        yes,
        no
    }
    enum PropertyStatus {
        newProperty,
        fairlyUsed,
        old
    }

    struct Properties {
        uint id;
        PropertyType propType;
        PropertyCategory category;
        Warranty warranty;
        PropertyStatus status;
        uint amount;
        string imgUri;
        address propertyOwner;
        uint timeStamp;
        bool listed;
        bool soldOut;
    }

    struct saleRecord {
        address owner;
        address buyer;
        uint price;
        uint timeStamp;
    }

    error NOT_THE_OWNER();
    error PROPERTY_NOT_FOUND();
    error INVALID_PROPERTY();
    error SOLD_OUT();
    error ZERO_AMOUNT();
    error NOT_LISTED();
    error ALREADY_LISTED();
    error INSUFFICIENT_ALLOWANCE();
    error INSUFFICIENT_BALANCE();
    error PROPERTY_DOES_NOT_EXIST();
    error NOT_PROPERTY_OWNER();
    error BUYING_OWN_PROPERTY_NOT_ALLOWED();

    mapping(uint => uint) propertyIdToIndex;
    mapping(uint => Properties) propertyDetails;
    mapping(address => uint) _balances;
    mapping(uint => saleRecord[]) salesHistory;

    event PropertyAdded(
        PropertyType indexed propType,
        PropertyCategory indexed category,
        uint indexed amount
    );
    event propertyListed(
        uint indexed _id,
        PropertyType indexed propType,
        uint indexed amount
    );
    event propertyUnListed(
        uint indexed _id,
        PropertyType indexed propType,
        uint indexed amount
    );
    event PropertySold(
        uint indexed _id,
        address indexed buyer,
        uint indexed amount
    );
    event propertyDeleted(uint indexed _id, PropertyType indexed propType);
    event propertyUpdated(
        uint indexed _id,
        PropertyType indexed propType,
        uint indexed amount
    );

    modifier OnlyOwner() {
        if (msg.sender != owner) {
            revert NOT_THE_OWNER();
        }
        _;
    }

    // modifier  onlyPropertyOwner () {
    //     if
    // }
    Properties[] public properties;
    uint propertyId;

    function addProperty(
        uint _amount,
        PropertyCategory _category,
        PropertyType _propType,
        PropertyStatus _status,
        Warranty _warranty,
        string memory _imgUri
    ) external {
        if (_amount == 0) revert ZERO_AMOUNT();
        propertyId = propertyId + 1;
        Properties memory property = Properties({
            id: propertyId,
            propType: _propType,
            category: _category,
            warranty: _warranty,
            status: _status,
            amount: _amount * 10 ** 18,
            imgUri: _imgUri,
            propertyOwner: msg.sender,
            timeStamp: block.timestamp,
            listed: false,
            soldOut: false
        });
        propertyIdToIndex[propertyId] = properties.length;
        propertyDetails[propertyId] = property;
        properties.push(property);

        emit PropertyAdded(_propType, _category, _amount);
    }

    function listProperty(uint _id) external {
        Properties storage property = propertyDetails[_id];
        if (msg.sender != property.propertyOwner) revert NOT_PROPERTY_OWNER();
        if (property.listed) revert ALREADY_LISTED();
        property.listed = true;

        emit propertyListed(_id, property.propType, property.amount);
    }

    function UnlistProperty(uint _id) external OnlyOwner {
        Properties storage property = propertyDetails[_id];
        if (msg.sender != property.propertyOwner) revert NOT_PROPERTY_OWNER();
        if (!property.listed) revert NOT_LISTED();
        property.listed = false;

        emit propertyUnListed(_id, property.propType, property.amount);
    }

    function buyProperty(uint _id) external returns (uint) {
        Properties storage property = propertyDetails[_id];
        if (msg.sender == property.propertyOwner)
            revert BUYING_OWN_PROPERTY_NOT_ALLOWED();
        if (_id == 0) revert PROPERTY_DOES_NOT_EXIST();
        if (!property.listed) revert NOT_LISTED();
        // if (_id !== property.id) revert Invalid_property();
        if (property.soldOut) revert SOLD_OUT();
        uint amount = property.amount;
        address propertyOwner = property.propertyOwner;
        uint buyerBalance = paymentToken.balanceOf(msg.sender);
        if (buyerBalance < amount) revert INSUFFICIENT_BALANCE();
        uint buyerAllowance = paymentToken.allowance(msg.sender, address(this));
        if (buyerAllowance < amount) revert INSUFFICIENT_ALLOWANCE();
        property.soldOut = true;

        salesHistory[_id].push(
            saleRecord({
                owner: propertyOwner,
                buyer: msg.sender,
                price: amount,
                timeStamp: block.timestamp
            })
        );

        bool success = paymentToken.transferFrom(
            msg.sender,
            propertyOwner,
            amount
        );
        require(success, "Transaction failed");

        emit PropertySold(_id, msg.sender, property.amount);

        return amount;
    }

    function removeProperty(uint _id) external OnlyOwner {
        Properties storage property = propertyDetails[_id];
        if (msg.sender != property.propertyOwner) revert NOT_PROPERTY_OWNER();
        uint indexToRemove = propertyIdToIndex[_id];
        uint lastIndex = properties.length - 1;
        require(propertyIdToIndex[_id] < properties.length);

        if (indexToRemove != lastIndex) {
            Properties memory lastProperty = properties[lastIndex];
            properties[indexToRemove] = lastProperty;

            propertyIdToIndex[lastProperty.id] = indexToRemove;
        }
        properties.pop();
        delete propertyIdToIndex[_id];

        emit propertyDeleted(_id, property.propType);
    }

    function getAllProperties() external view returns (Properties[] memory) {
        return properties;
    }

    function getPropertyById(
        uint _id
    ) external view returns (Properties memory) {
        require(_id <= properties.length, "Property not found");
        return properties[_id - 1];
    }

    // function getSaleHistory(uint _propId) external OnlyOwner returns(salesHistory[] memory){
    //     return salesHistory[_propId];
    // }

    // function getAllSalesHistory() external OnlyOwner returns(salesHistory[] memory){
    //     salesHistory[] memory allSales = new salesHistory[](properties.length);
    //     for (uint i = 0; i < properties.length; i++) {
    //         allSales[i] = salesHistory[i];
    //     }
    //     return allSales;
    // }
}
