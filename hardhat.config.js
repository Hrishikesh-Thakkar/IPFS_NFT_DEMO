require("@nomiclabs/hardhat-waffle")
require("hardhat-deploy");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      chainId: 4,
      url: "https://rinkeby.infura.io/v3/46b4277f47404a41a92f2b9c0264f7ca",
      accounts:["8bf99d4e9c94e347832581f69cce6e96919151d5cb3147da05c7aed565bb25ae"],
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
