async function main() {
  const Counter = await hre.ethers.deployContract("Counter");

  await Counter.waitForDeployment();

  console.log(
    '`Counter deployed to ${Counter.address}`'
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
