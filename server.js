const app = require("./app");
const { main } = require("./db/connection");

const start = async () => {
  try {
    await main();
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
start();
