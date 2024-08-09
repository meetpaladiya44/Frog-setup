// /** @jsxImportSource frog/jsx */

// import { Button, Frog, TextInput } from "frog";
// import { devtools } from "frog/dev";
// import { handle } from "frog/next";
// import { serveStatic } from "frog/serve-static";

// const app = new Frog({
//   assetsPath: "/",
//   basePath: "/api",
//   title: "Frog Frame",
// });

// // app.frame("/", (c) => {
// //   const { buttonValue, inputText, status } = c;
// //   const fruit = inputText || buttonValue;
// //   console.log(c);
// //   return c.res({
// //     image: (
// //       <div
// //         style={{
// //           color: "white",
// //           alignItems: "center",
// //           fontSize: "30px",
// //           background:
// //             status === "response"
// //               ? "linear-gradient(to right, #432889, #17101F)"
// //               : "linear-gradient(to right, #432889, #17101F)",
// //           backgroundSize: "100% 100%",
// //           display: "flex",
// //           flexDirection: "column",
// //           flexWrap: "nowrap",
// //           height: "100%",
// //           justifyContent: "center",
// //           textAlign: "center",
// //           width: "100%",
// //         }}
// //       >
// //         Scan it
// //       </div>
// //     ),
// //     intents: [
// //       <Button.Link href="http://localhost:3001/login">
// //         Go To WorldID page
// //       </Button.Link>,
// //       // <Button.Transaction target="/contract">Call the Contract</Button.Transaction>
// //     ],
// //   });
// // });

// // app.transaction('/contract', (c) => {
// //   // Contract transaction response.
// //   return c.contract({
// //     abi,
// //     chainId: 'eip155:84532',
// //     functionName: 'retrieve',
// //     to: '0xd9145CCE52D386f254917e481eB44e9943F39138'
// //   })
// // })

// // devtools(app, { serveStatic });

// // export const GET = handle(app);
// // export const POST = handle(app);

// // app.frame('/', (c) => {
// //   console.log(c);
// //   return c.res({
// //     action: "/second",
// //     image: (
// //       <div
// //         style={{
// //           color: 'white',
// //           alignItems: 'center',
// //           fontSize: '30px',
// //           background: 'linear-gradient(to right, #432889, #17101F)',
// //           backgroundSize: '100% 100%',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           flexWrap: 'nowrap',
// //           height: '100%',
// //           justifyContent: 'center',
// //           textAlign: 'center',
// //           width: '100%',
// //         }}
// //       >
// //         First you have to login
// //       </div>
// //     ),
// //     intents: [
// //       // <Button.Link href='http://localhost:3000/login'>Go To WorldID page</Button.Link>
// //       <Button>Please log in with WorldID first</Button>
// //     ],
// //   })
// // })

// // app.frame('/second', (c) => {
// //   console.log(c);
// //   return c.res({
// //     action: "/",
// //     image: (
// //       <div
// //         style={{
// //           color: 'white',
// //           alignItems: 'center',
// //           fontSize: '30px',
// //           background: 'linear-gradient(to right, #432889, #17101F)',
// //           backgroundSize: '100% 100%',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           flexWrap: 'nowrap',
// //           height: '100%',
// //           justifyContent: 'center',
// //           textAlign: 'center',
// //           width: '100%',
// //         }}
// //       >
// //         This is our Second frame
// //       </div>
// //     ),
// //     intents: [
// //       // <Button.Link href='http://localhost:3000/login'>Go To WorldID page</Button.Link>
// //       <Button>Now you can attest, go back to the first frame</Button>
// //     ],
// //   })
// // })

// app.frame('/', (c) => {
//   const { buttonValue, inputText, status } = c
//   const fruit = inputText || buttonValue
//   console.log(c);
//   return c.res({
//     image: (
//       <div
//         style={{
//           alignItems: 'center',
//           background:
//             status === 'response'
//               ? 'linear-gradient(to right, #432889, #17101F)'
//               : 'black',
//           backgroundSize: '100% 100%',
//           display: 'flex',
//           flexDirection: 'column',
//           flexWrap: 'nowrap',
//           height: '100%',
//           justifyContent: 'center',
//           textAlign: 'center',
//           width: '100%',
//         }}
//       >
//         <div
//           style={{
//             color: 'white',
//             fontSize: 60,
//             fontStyle: 'normal',
//             letterSpacing: '-0.025em',
//             lineHeight: 1.4,
//             marginTop: 30,
//             padding: '0 120px',
//             whiteSpace: 'pre-wrap',
//           }}
//         >
//           {status === 'response'
//             ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
//             : 'Welcome!'}
//         </div>
//       </div>
//     ),
//     intents: [
//       <TextInput placeholder="Enter custom fruit..." />,
//       <Button value="apples">Apples</Button>,
//       <Button value="oranges">Oranges</Button>,
//       <Button value="bananas">Bananas</Button>,
//       status === 'response' && <Button.Reset>Reset</Button.Reset>,
//     ],
//   })
// })

// devtools(app, { serveStatic })

// export const GET = handle(app)
// export const POST = handle(app)
