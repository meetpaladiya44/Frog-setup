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
      "0x384d7cE3FcD8502234446d9F080A97Af432382FC", // Replace with your contract address
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

function formatValue(value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(formatValue).join(", ");
  }
  return value.toString();
}

function weiToEth(weiValue) {
  const ethValue = parseFloat(ethers.formatEther(weiValue));

  if (ethValue < 0.01) {
    // For very small amounts, use more decimal places
    return ethValue.toFixed(7);
  } else {
    // For larger amounts, round to 2 decimal places
    return ethValue.toFixed(2);
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
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const background = `${baseUrl}/bg1.png`;

  const prediction = await getPredictions(text);
  console.log(prediction);

  const [
    address,
    coin,
    reasoning,
    currentPrice,
    targetPrice,
    stakeAmount,
    viewAmount,
    targetDate,
    totalPositiveStake,
    totalNegativeStake,
    totalFeesCollected,
    pythPriceId,
    isDistributed,
    positiveStakers,
    negativeStakers,
  ] = prediction;

  return c.res({
    action: "/second/newframe",
    image: (
      <div
        style={{
          alignItems: "center",
          backgroundImage: `url('${background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          imageAspectRatio: "1:1",
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
            fontSize: 25,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            bottom: "-65",
            width: "20%",
            left: "-25%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // border: "1px solid red",
          }}
        >
          {coin}
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            // bottom: "-25",
            // left: "150",
            // whiteSpace: "pre-wrap",
            bottom: "-25",
            maxWidth: "20px",
            overflow: "visible",
            left: "18%",
            whiteSpace: "pre-wrap",
          }}
        >
          {weiToEth(viewAmount)}
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            // top: "125",
            // left: "-205",
            // whiteSpace: "pre-wrap",
            maxWidth: "20px",
            overflow: "visible",
            top: "125",
            right: "42%",
            whiteSpace: "pre-wrap",
          }}
        >
          {new Date(
            Number(formatValue(targetDate)) * 1000
          ).toLocaleDateString()}
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            // top: "80",
            // left: "125",
            // whiteSpace: "pre-wrap",
            top: "80",
            right: "-17%",
            maxWidth: "20px",
            overflow: "visible",
            whiteSpace: "pre-wrap",
          }}
        >
          50%
        </div>
      </div>
    ),
    intents: [<Button>Read</Button>],
  });
});

app.frame("/second/newframe", (c) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const background = `${baseUrl}/bg2.png`;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          backgroundImage: `url('${background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          imageAspectRatio: "1:1",
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
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            bottom: "-32",
            maxWidth: "20px",
            overflow: "visible",
            left: "-35%",
            whiteSpace: "pre-wrap",
            // border: "1px solid red",
          }}
        >
          2700 
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            maxWidth: "20px",
            overflow: "visible",
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            bottom: "13",
            // border: "1px solid red",
            left: "15%",
            whiteSpace: "pre-wrap",
          }}
        >
          3000
        </div>
        <div
          style={{
            color: "white",
            fontSize: 20,
            width: "40%",
            height: "20%",
            overflow: "visible",
            maxWidth: "1000px",
            fontStyle: "normal",
            letterSpacing: "1px",
            textAlign: "left",
            lineHeight: 1.4,
            fontWeight: "bold",
            position: "relative",
            top: "90",
            left: "10",
            whiteSpace: "pre-wrap",
          }}
        >
          {(() => {
            const fullText = "Upcoming protocol upgrade promises enhanced scalability, attracting more developers and users to the ecosystem.";
            const maxLength = 150; // Adjust this value to change when text gets truncated
            return fullText.length > maxLength
              ? fullText.slice(0, maxLength)
              : fullText;
          })()}
        </div>
      </div>
    ),
    intents: [
    <Button action="/third/frame/route">View Stats</Button>,
    <Button.Link href="https://invest-right.vercel.app/attestation">Challenge/Accept</Button.Link>
  ],

  });
});

app.frame("/third/frame/route", (c) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const background = `${baseUrl}/bg3.png`;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          backgroundImage: `url('${background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          imageAspectRatio: "1:1",
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
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            bottom: "-33",
            maxWidth: "20px",
            right: "42%",
            whiteSpace: "pre-wrap",
            // border: "1px solid red",
          }}
        >
          0.0001
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            bottom: "10",
            maxWidth: "20px",
            left: "17%",
            whiteSpace: "pre-wrap",
            // border: "1px solid red",
          }}
        >
          0.0003
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            top: "80",
            maxWidth: "20px",
            right: "43%",
            whiteSpace: "pre-wrap",
            // border: "1px solid red",
          }}
        >
          0.0001
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            top: "37",
            maxWidth: "20px",
            left: "16%",
            whiteSpace: "pre-wrap",
            // border: "1px solid red",
          }}
        >
          0
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            bottom: "-125",
            maxWidth: "20px",
            right: "41%",
            whiteSpace: "pre-wrap",
            // border: "1px solid red",
          }}
        >
          50%
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold", // Add this line to make the text bold
            position: "relative",
            top: "80",
            maxWidth: "20px",
            left: "17%",
            whiteSpace: "pre-wrap",
            // border: "1px solid red",
          }}
        >
          0.5
        </div>
      </div>
    ),
    intents: [
    <Button.Link href="https://invest-right.vercel.app/attestation">Challenge/Accept</Button.Link>,
    <Button action="/second/newframe">Back</Button>
  ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);