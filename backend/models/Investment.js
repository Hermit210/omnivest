import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    projectName: {
        type: String,
        required: true
    },
    chainId: {
        type: Number,
        required: true
    },
    chainName: {
        type: String,
        required: true
    },
    initialAmount: {
        type: Number,
        required: true,
        min: 0
    },
    currentAmount: {
        type: Number,
        default: function() {
            return this.initialAmount;
        }
    },
    tokenSymbol: {
        type: String,
        default: 'ETH'
    },
    transactionHash: {
        type: String,
        required: true
    },
    expectedAPY: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled', 'pending'],
        default: 'active'
    },
    investmentType: {
        type: String,
        enum: ['defi', 'yield-farming', 'staking', 'liquidity-pool', 'nft'],
        default: 'defi'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
investmentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for efficient queries
investmentSchema.index({ walletAddress: 1, status: 1 });
investmentSchema.index({ chainId: 1 });
investmentSchema.index({ createdAt: -1 });

export default mongoose.model('Investment', investmentSchema);