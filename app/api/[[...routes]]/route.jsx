/** @jsxImportSource frog/jsx */

import { ethers } from "ethers";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import InvestRightABI from "../../utils/InvestRightABI.json";
import { Alchemy, Network } from "alchemy-sdk";
// Configure Alchemy SDK
const alchemyConfig = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY, // Replace with your Alchemy API key
  network: Network.ETH_SEPOLIA, // Use the appropriate network
};

const alchemy = new Alchemy(alchemyConfig);

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Frog Frame",
});

async function getPredictions(text) {
  try {
    const provider = new ethers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/RlpjIG_DtVn1fVxzOufTIrTAa8YQSM1x"
    );

    const contract = new ethers.Contract(
      "0x7b257B3137a32b54214Bad43fd801f726b05a627", // Replace with your contract address
      InvestRightABI,
      provider
    );

    const result = await contract.getPredictions(text);
    console.log("Prediction result:", result);
    return result;
  } catch (error) {
    console.error("Error getting prediction:", error);
    return "Error: " + error.message;
  }
}

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  const fruit = inputText || buttonValue;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {status === "response"
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ""}`
            : "Welcome!"}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.frame("/:text", async (c) => {
  const { req, status } = c;
  const text = req.param("text") || "Crypto Test";

  const prediction = await getPredictions(text);

  const [
    address,
    symbol,
    name,
    totalVotes,
    totalScore,
    totalAmountStaked,
    totalRewardsClaimed,
    lastUpdateTime,
    totalRewards,
    amountStaked,
    rewardsClaimed,
    lastStakeId,
    isActive,
    stakers,
    stakesIds,
  ] = prediction;

  console.log(prediction);
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 30,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {address}
        </div>
      </div>
    ),
    intents: [<Button>Get Started</Button>],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
