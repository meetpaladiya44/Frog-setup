export const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pythAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "predictionId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "coin",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "stakeAmount",
                "type": "uint256"
            }
        ],
        "name": "PredictionCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "predictionId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "predictionCorrect",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalReward",
                "type": "uint256"
            }
        ],
        "name": "RewardDistributed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "predictionId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isPositive",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "StakeAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isPositive",
                "type": "bool"
            }
        ],
        "name": "addStake",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "predictionId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_coin",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_reasoning",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_targetPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_viewAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_targetDate",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_pythPriceId",
                "type": "bytes32"
            }
        ],
        "name": "createPrediction",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "priceId",
                "type": "bytes32"
            }
        ],
        "name": "getCurrentPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getPredictions",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "coin",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "reasoning",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "targetPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stakeAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "viewAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "targetDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalPositiveStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalNegativeStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalFeesCollected",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "pythPriceId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "isDistributed",
                        "type": "bool"
                    },
                    {
                        "internalType": "address[]",
                        "name": "positiveStakers",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "negativeStakers",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct InvestRight.Prediction",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasPaidViewFee",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_predictionId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "isWhitelisted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "negativeStakes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "positiveStakes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "predictions",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "coin",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "reasoning",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "currentPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "targetPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stakeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "viewAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "targetDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalPositiveStake",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalNegativeStake",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalFeesCollected",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "pythPriceId",
                "type": "bytes32"
            },
            {
                "internalType": "bool",
                "name": "isDistributed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pyth",
        "outputs": [
            {
                "internalType": "contract IPyth",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "rewardDistribution",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "viewerFees",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "coin",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "reasoning",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "currentPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "targetPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stakeAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "viewAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "targetDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalPositiveStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalNegativeStake",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalFeesCollected",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "pythPriceId",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bool",
                        "name": "isDistributed",
                        "type": "bool"
                    },
                    {
                        "internalType": "address[]",
                        "name": "positiveStakers",
                        "type": "address[]"
                    },
                    {
                        "internalType": "address[]",
                        "name": "negativeStakers",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct InvestRight.Prediction",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
]