const express = require("express");
const compiler = require("compiler-api");
const app = express();
require('dotenv').config()
const port = 3001;
const cors = require("cors");
const corsOptions = {
  origin: [
    process.env.CHROME_EXTENTIONHASH1,
    process.env.CHROME_EXTENTIONHASH2,
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ "hell world": "djdjd" });
});

app.post("/compile", async (req, res) => {
  let finalresult;
  await compiler.compilerApi(req.body, (result) => {
    if(result.compResult === "F")
    {
      finalresult = result.cmpError;
      return res.status(400).json({"status" : "400" , "data" : finalresult});
    }else{
      if(result.rntError !== '')
      {
            finalresult = result.rntError;
            return res.status(400).json({"status" : "400" , "data" : finalresult});
      }else{
            finalresult = result;
            return res.status(200).json({"status" : "200" , "data" : finalresult});
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
