// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
import "./XToken.sol";

contract WeaponProfileSystem is ERC1155, Ownable(msg.sender) {
    XToken public xToken;

    uint public skinPrice = 20 * 10 ** 15;

    enum Skin { Black, Green, Red, Blue, Purple }

    struct Profile {
        string profileURI;
        uint xp;
        string name;
        uint[5] weaponBalances; // Index 0 = Weapon 1, ..., Index 4 = Weapon 5
        uint XTokenBalance;
        bool[5] skinsOwned; // Index 0 = Black, ..., Index 4 = Purple
    }

    mapping(address => Profile) public profiles;

    constructor(address _xToken) ERC1155("https://game.example/api/item/{id}.json") {
        xToken = XToken(_xToken);
    }

    modifier validWeaponId(uint id) {
        require(id >= 1 && id <= 5, "Invalid weapon ID");
        _;
    }

    modifier validSkinId(uint id) {
        require(id >= 0 && id <= 4, "Invalid skin ID");
        _;
    }

    function setProfile(string memory _uri, string memory _name) external {
        Profile storage p = profiles[msg.sender];
        p.profileURI = _uri;
        p.name = _name;
        p.xp = 0;

        // Give default weapon ID 1
        _mint(msg.sender, 1, 1, "");
        p.weaponBalances[0] = 1;

        // Give default Black skin (index 0)
        p.skinsOwned[uint(Skin.Black)] = true;
    }

    function updateName(string memory newName) external {
        profiles[msg.sender].name = newName;
    }

    function updateXP(uint newXP) external {
        profiles[msg.sender].xp = newXP;
    }

    function mintWeapon(uint id, uint amount) external validWeaponId(id) {
        require(amount > 0, "Amount must be greater than 0");

        require(
            xToken.transferFrom(msg.sender, address(this), amount),
            "XToken transfer failed"
        );

        _mint(msg.sender, id, 1, "");

        profiles[msg.sender].weaponBalances[id - 1] += 1;
        profiles[msg.sender].XTokenBalance += amount;
    }

    function buySkin(uint skinId) external validSkinId(skinId) {
        Profile storage p = profiles[msg.sender];
        require(!p.skinsOwned[skinId], "Skin already owned");

        require(
            xToken.transferFrom(msg.sender, address(this), skinPrice),
            "XToken transfer failed"
        );

        p.skinsOwned[skinId] = true;
        p.XTokenBalance += skinPrice;
    }

    function depositXToken(uint amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            xToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        profiles[msg.sender].XTokenBalance += amount;
    }

    function withdrawXToken(uint amount) external onlyOwner {
        require(xToken.transfer(owner(), amount), "Withdraw failed");
    }

    function getWeaponBalances(address user) external view returns (uint[5] memory) {
        return profiles[user].weaponBalances;
    }

    function getOwnedSkins(address user) external view returns (bool[5] memory) {
        return profiles[user].skinsOwned;
    }

    function getXTokenBalance(address user) external view returns (uint) {
        return profiles[user].XTokenBalance;
    }

    function setSkinPrice(uint newPrice) external onlyOwner {
        skinPrice = newPrice;
    }
}
