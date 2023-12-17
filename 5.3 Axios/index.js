import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const URl_BORED = "https://bored-api.appbrewery.com";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${URl_BORED}/random`);
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let resp;
    let result;
    if (req.body.type === "") {
      resp = await axios.get(`${URl_BORED}/random`);
      result = resp.data;
    } else {
      resp = await axios.get(
        `${URl_BORED}/filter?type=${req.body.type}&participants=${req.body.participants}`
      );
      const random_num = Math.floor(Math.random() * resp.data.length);
      result = resp.data[random_num];
    }
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 404) {
      res.render("index.ejs", {
        error: "No activities that match your criteria.",
      });
    } else {
      res.render("index.ejs", {
        error: `Something went wrong ${error.response.status}`,
      });
    }
  }

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
