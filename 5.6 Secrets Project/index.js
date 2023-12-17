import express from "express";
import axios from "axios";

const BEARER_TOKEN = "860c5247-5766-4e86-9ec7-ffe64219cc7c";
const API_URL = "https://secrets-api.appbrewery.com";
const config = {
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};
const port = 3000;
const app = express();
app.use(express.static("public"));
app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${API_URL}/random`, config);
    res.render("index.ejs", {
      secret: data.secret,
      user: data.username,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server start on localhost:3000");
});
// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
