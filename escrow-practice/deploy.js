const ethers = require('ethers');

/**
 * Deploys the Escrow contract with a 1 ether deposit
 *
 * @param {array} abi - interface for the Escrow contract
 * @param {string} bytecode - EVM code for the Escrow contract
 * @param {ethers.types.Signer} signer - the depositor EOA
 * @param {string} arbiterAddress - hexadecimal address for arbiter
 * @param {string} beneficiaryAddress - hexadecimal address for benefiiciary
 * 
 * @return {promise} a promise of the contract deployment
 */
async function deploy(abi, bytecode, signer, arbiterAddress, beneficiaryAddress) {
    const factory = new ethers.ContractFactory(abi, bytecode, signer);

    // Specify the constructor arguments for the Escrow contract
    const constructorArgs = [arbiterAddress, beneficiaryAddress];

    // Deploy the Escrow contract with a 1 Ether deposit
    const overrides = {
        value: ethers.utils.parseEther("1"), // 1 Ether deposit
    };

    const deploymentPromise = factory.deploy(...constructorArgs, overrides);

    // Wait for the contract to be deployed
    const deployedContract = await deploymentPromise;

    // Return the deployed contract instance
    return deployedContract;
}

module.exports = deploy;