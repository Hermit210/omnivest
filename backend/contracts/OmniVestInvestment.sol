// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@zetachain/protocol-contracts/contracts/zevm/SystemContract.sol";
import "@zetachain/protocol-contracts/contracts/zevm/interfaces/zContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract OmniVestInvestment is zContract, Ownable, ReentrancyGuard {
    SystemContract public systemContract;
    
    struct Investment {
        uint256 id;
        address investor;
        uint256 amount;
        uint256 chainId;
        string projectName;
        uint256 timestamp;
        bool isActive;
        uint256 expectedReturn;
    }
    
    struct CrossChainPortfolio {
        address owner;
        uint256 totalValue;
        uint256[] investmentIds;
        mapping(uint256 => uint256) chainBalances; // chainId => balance
    }
    
    mapping(address => CrossChainPortfolio) public portfolios;
    mapping(uint256 => Investment) public investments;
    mapping(address => uint256[]) public userInvestments;
    
    uint256 public nextInvestmentId = 1;
    uint256 public totalInvestments;
    uint256 public totalValueLocked;
    
    event CrossChainInvestment(
        uint256 indexed investmentId,
        address indexed investor,
        uint256 amount,
        uint256 sourceChain,
        string projectName
    );
    
    event OmnichainTransfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 sourceChain,
        uint256 targetChain
    );
    
    event PortfolioUpdated(
        address indexed investor,
        uint256 newTotalValue,
        uint256 chainId
    );
    
    constructor(address systemContractAddress) {
        systemContract = SystemContract(systemContractAddress);
    }
    
    // ZetaChain cross-chain message handler
    function onCrossChainCall(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes calldata message
    ) external override {
        // Decode the cross-chain message
        (string memory action, bytes memory data) = abi.decode(message, (string, bytes));
        
        if (keccak256(bytes(action)) == keccak256(bytes("INVEST"))) {
            _handleCrossChainInvestment(context, zrc20, amount, data);
        } else if (keccak256(bytes(action)) == keccak256(bytes("TRANSFER"))) {
            _handleCrossChainTransfer(context, zrc20, amount, data);
        }
    }
    
    function _handleCrossChainInvestment(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes memory data
    ) internal {
        (string memory projectName, uint256 expectedReturn) = abi.decode(data, (string, uint256));
        
        Investment memory newInvestment = Investment({
            id: nextInvestmentId,
            investor: context.origin,
            amount: amount,
            chainId: context.chainID,
            projectName: projectName,
            timestamp: block.timestamp,
            isActive: true,
            expectedReturn: expectedReturn
        });
        
        investments[nextInvestmentId] = newInvestment;
        userInvestments[context.origin].push(nextInvestmentId);
        
        // Update portfolio
        CrossChainPortfolio storage portfolio = portfolios[context.origin];
        portfolio.owner = context.origin;
        portfolio.totalValue += amount;
        portfolio.investmentIds.push(nextInvestmentId);
        portfolio.chainBalances[context.chainID] += amount;
        
        totalInvestments++;
        totalValueLocked += amount;
        nextInvestmentId++;
        
        emit CrossChainInvestment(
            newInvestment.id,
            context.origin,
            amount,
            context.chainID,
            projectName
        );
        
        emit PortfolioUpdated(
            context.origin,
            portfolio.totalValue,
            context.chainID
        );
    }
    
    function _handleCrossChainTransfer(
        zContext calldata context,
        address zrc20,
        uint256 amount,
        bytes memory data
    ) internal {
        (address recipient, uint256 targetChain) = abi.decode(data, (address, uint256));
        
        // Update sender's portfolio
        CrossChainPortfolio storage senderPortfolio = portfolios[context.origin];
        require(senderPortfolio.chainBalances[context.chainID] >= amount, "Insufficient balance");
        
        senderPortfolio.chainBalances[context.chainID] -= amount;
        senderPortfolio.totalValue -= amount;
        
        // Update recipient's portfolio
        CrossChainPortfolio storage recipientPortfolio = portfolios[recipient];
        recipientPortfolio.owner = recipient;
        recipientPortfolio.chainBalances[targetChain] += amount;
        recipientPortfolio.totalValue += amount;
        
        emit OmnichainTransfer(
            context.origin,
            recipient,
            amount,
            context.chainID,
            targetChain
        );
    }
    
    // View functions
    function getPortfolio(address investor) external view returns (
        uint256 totalValue,
        uint256[] memory investmentIds
    ) {
        CrossChainPortfolio storage portfolio = portfolios[investor];
        return (portfolio.totalValue, portfolio.investmentIds);
    }
    
    function getChainBalance(address investor, uint256 chainId) external view returns (uint256) {
        return portfolios[investor].chainBalances[chainId];
    }
    
    function getUserInvestments(address investor) external view returns (uint256[] memory) {
        return userInvestments[investor];
    }
    
    function getInvestment(uint256 investmentId) external view returns (Investment memory) {
        return investments[investmentId];
    }
    
    function getTotalStats() external view returns (
        uint256 _totalInvestments,
        uint256 _totalValueLocked,
        uint256 _nextInvestmentId
    ) {
        return (totalInvestments, totalValueLocked, nextInvestmentId);
    }
    
    // Admin functions
    function updateSystemContract(address newSystemContract) external onlyOwner {
        systemContract = SystemContract(newSystemContract);
    }
    
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        // Emergency function for contract upgrades
        require(token != address(0), "Invalid token address");
        // Implementation depends on token type (ZRC20, etc.)
    }
}