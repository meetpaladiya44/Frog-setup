/** @jsxImportSource frog/jsx */

import { ethers } from "ethers";
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import InvestRightABI from "../../utils/InvestRightABI.json";
import { Alchemy, Network } from "alchemy-sdk";
import { neynar } from 'frog/middlewares'

// Configure Alchemy SDK
const alchemyConfig = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string, // Replace with your Alchemy API key
  network: Network.ETH_SEPOLIA, // Use the appropriate network
};

const alchemy = new Alchemy(alchemyConfig);

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Frog Frame",
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  }),
);

let address: string, 
    idG: string, 
    coin: string, 
    reasoningG: string, 
    currentPriceG: bigint, 
    targetPriceG: bigint, 
    stakeAmount: bigint, 
    viewAmount: bigint, 
    targetDate: number = 0;

function setData(idP: string, currentPriceP: bigint, targetPriceP: bigint, reasoningP: string) {
  idG = idP;
  currentPriceG = currentPriceP;
  targetPriceG = targetPriceP;
  reasoningG = reasoningP;
}

async function getPredictionsMain(text: string): Promise<any> {
  try {
    const provider = new ethers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/RlpjIG_DtVn1fVxzOufTIrTAa8YQSM1x"
    );

    const contract = new ethers.Contract(
      "0x7ACC7E73967300a20f4f5Ba92fF9CB548b47Ea30", // Replace with your contract address
      InvestRightABI,
      provider
    );

    const result = await contract.getPredictions(text);
    console.log("Prediction result:", result);
    return result;
  } catch (error: any) {
    console.error("Error getting prediction:", error);
    return "Error: " + error.message;
  }
}

function formatValue(value: any): string {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(formatValue).join(", ");
  }
  return value.toString();
}

function weiToEth(weiValue: bigint): string {
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
  
  const { displayName, followerCount } = c.var.interactor || {}
  console.log("contexttttttttt", c)
  console.log('cast: ', c.var.cast)
  console.log('interactor: ', c.var.interactor)
  console.log(displayName, followerCount)

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

  const { displayName, followerCount } = c.var.interactor || {}
  console.log("contexttttttttt", c)
  console.log('cast: ', c.var.cast)
  console.log('interactor: ', c.var.interactor)
  console.log(displayName, followerCount)

  console.log("Inside the first frame", text);
  const prediction = await getPredictionsMain(text);
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

  setData(text, currentPrice, targetPrice, reasoning);

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
            fontSize: 25,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold",
            position: "relative",
            bottom: "-65px", // Added 'px' for units
            width: "20%",
            left: "-25%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
            fontWeight: "bold",
            position: "relative",
            bottom: "-25px", // Added 'px' for units
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
            fontWeight: "bold",
            position: "relative",
            top: "125px", // Added 'px' for units
            right: "42%",
            maxWidth: "20px",
            overflow: "visible",
            whiteSpace: "pre-wrap",
          }}
        >
          {new Date(Number(formatValue(targetDate)) * 1000).toLocaleDateString()}
        </div>
        <div
          style={{
            color: "white",
            fontSize: 28,
            fontStyle: "normal",
            letterSpacing: "1px",
            lineHeight: 1.4,
            fontWeight: "bold",
            position: "relative",
            top: "80px", // Added 'px' for units
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
    intents: [
      <Button action={`/${encodeURIComponent(text)}/secondframe`}>Read</Button>,
    ],
  });
});

app.frame("/:text/secondframe", async (c) => {
  const { req } = c;
  const text = decodeURIComponent(req.param("text"));
  console.log(typeof currentPriceG);

  const { displayName, followerCount } = c.var.interactor || {}
  console.log("contexttttttttt", c)
  console.log('cast: ', c.var.cast)
  console.log('interactor: ', c.var.interactor)
  console.log(displayName, followerCount)

  
  let stringDummy = "dummy2";
  let jsonObject = JSON.stringify({ key: stringDummy });
  console.log(stringDummy);
  console.log(typeof stringDummy);
  
  const newCurrent = formatValue(currentPriceG);
  const newTarget = formatValue(targetPriceG);
  const newReason = formatValue(reasoningG);
  
  console.log(newCurrent, newTarget, newReason);
  console.log(typeof newCurrent, typeof newTarget, typeof newReason);
  console.log("inside the second frame", text);
  
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
            fontWeight: "bold",
            position: "relative",
            bottom: "-32px", // Added 'px' for units
            maxWidth: "20px",
            overflow: "visible",
            left: "-35%",
            whiteSpace: "pre-wrap",
          }}
        >
          {newCurrent}
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
            fontWeight: "bold",
            position: "relative",
            bottom: "13px", // Added 'px' for units
            left: "15%",
            whiteSpace: "pre-wrap",
          }}
        >
          {`${newTarget}`}
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
            top: "90px", // Added 'px' for units
            left: "10px", // Added 'px' for units
            whiteSpace: "pre-wrap",
          }}
        >
          {(() => {
            const fullText = newReason;
            const maxLength = 150; // Adjust this value to change when text gets truncated
            return fullText.length > maxLength
              ? fullText.slice(0, maxLength)
              : fullText;
          })()}
        </div>
      </div>
    ),
    intents: [
      <Button action={`/${encodeURIComponent(idG)}/thirdframe`}>View Stats</Button>,
      <Button.Link href={`https://invest-right.vercel.app/attestation/${idG}`}>Challenge/Accept</Button.Link>,
    ],
  });
});

app.frame("/:text/thirdframe", (c) => {
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
            fontWeight: "bold",
            position: "relative",
            bottom: "-33px", // Added 'px' for units
            maxWidth: "20px",
            right: "42%",
            whiteSpace: "pre-wrap",
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
            fontWeight: "bold",
            position: "relative",
            bottom: "10px", // Added 'px' for units
            maxWidth: "20px",
            left: "17%",
            whiteSpace: "pre-wrap",
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
            fontWeight: "bold",
            position: "relative",
            top: "80px", // Added 'px' for units
            maxWidth: "20px",
            right: "43%",
            whiteSpace: "pre-wrap",
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
            fontWeight: "bold",
            position: "relative",
            top: "37px", // Added 'px' for units
            maxWidth: "20px",
            left: "16%",
            whiteSpace: "pre-wrap",
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
            fontWeight: "bold",
            position: "relative",
            bottom: "-125px", // Added 'px' for units
            maxWidth: "20px",
            right: "41%",
            whiteSpace: "pre-wrap",
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
            fontWeight: "bold",
            position: "relative",
            top: "80px", // Added 'px' for units
            maxWidth: "20px",
            left: "17%",
            whiteSpace: "pre-wrap",
          }}
        >
          0.5
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={`https://invest-right.vercel.app/attestation/${idG}`}>Challenge/Accept</Button.Link>,
      <Button action={`/${encodeURIComponent(idG)}/secondframe`}>Back</Button>,
    ],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
