const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying OmniVest Investment Contract to ZetaChain...");

  // ZetaChain Athens Testnet System Contract Address
  const SYSTEM_CONTRACT_ADDRESS = "0x239e96c8f17C85c30100AC26F635Ea15f23E9c67";

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy the contract
  const OmniVestInvestment = await ethers.getContractFactory("OmniVestInvestment");
  const omniVest = await OmniVestInvestment.deploy(SYSTEM_CONTRACT_ADDRESS);

  await omniVest.deployed();

  console.log("✅ OmniVest Investment Contract deployed to:", omniVest.address);
  console.log("🌐 Network: ZetaChain Athens Testnet");
  console.log("📋 Contract Details:");
  console.log("   - System Contract:", SYSTEM_CONTRACT_ADDRESS);
  console.log("   - Deployer:", deployer.address);
  console.log("   - Gas Used:", (await omniVest.deployTransaction.wait()).gasUsed.toString());

  // Verify deployment
  try {
    const totalStats = await omniVest.getTotalStats();
    console.log("📊 Initial Stats:");
    console.log("   - Total Investments:", totalStats[0].toString());
    console.log("   - Total Value Locked:", totalStats[1].toString());
    console.log("   - Next Investment ID:", totalStats[2].toString());
  } catch (error) {
    console.log("⚠️  Could not fetch initial stats:", error.message);
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("🔗 Add this contract address to your frontend configuration");
  
  return omniVest.address;
}

main()
  .then((address) => {
    console.log(`\n📝 Contract Address: ${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });