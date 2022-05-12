const { network,ethers } = require("hardhat");

module.exports = async function(hre) {
    const {getNamedAccounts, deployments} = hre;
    const {deployer} = await getNamedAccounts();
    const {deploy, log} = deployments
    const chainId = network.config.chainId;
    let vrfCoordinatorV2Address, subscriptionId
    let tokenUris = [
        "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
        "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d",
        "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
    ]
    //if we are working on testnet or mainnet
    //those addresses will exist
    //otherwise ... they don't so we need to mock them

    if(chainId == 31337){
        //make a fake chainlink VRF Node.
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const tx = await vrfCoordinatorV2Mock.createSubscription()
        const txReceipt = await tx.wait(1)
        subscriptionId = txReceipt.events[0].args.subId
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId,"1000000000000000000")
    } else {
        //use the real ones
        vrfCoordinatorV2Address = "0x6168499c0cFfCaCD319c818142124B7A15E857ab"
        subscriptionId = "3748"
    }

    args = [
        vrfCoordinatorV2Address,
        "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
        subscriptionId,
        "500000",
        tokenUris,
    ]

    const randomIpfsNft = await deploy("RandomIpfsNft", {
        from: deployer,
        args: args,
        log: true,
    })
    console.log(randomIpfsNft.address)
}