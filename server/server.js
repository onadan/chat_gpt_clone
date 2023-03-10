const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const port = 5000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Leo",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 1512,
      top_p: 0.2,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => console.log("server started at port 5000"));
