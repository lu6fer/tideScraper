import express from "express";
import morgan from "morgan";

import mareeInfo from "./mareeInfo.js";
import horaireMaree from "./horaireMaree.js";
import { ForbiddenError } from "./Errors.js";

const app = express();
app.use(morgan(process.env.NODE_ENV !== "production" ? "dev" : "combined"));
const port = 3000;

app.get("/:harborId", async (req, res) => {
  const { harborId } = req.params;
  try {
    return res.json(await horaireMaree("PERROS-GUIREC_TRESTRAOU"));
    //return res.json(await mareeInfo(66));
  } catch (e) {
    /* if (e instanceof ForbiddenError) {
      return res.json(await horaireMaree("PERROS-GUIREC_TRESTRAOU"));
    } */
    return res.status(e.statusCode || 500).json(e);
  }
});

app.get("*", (req, res) => {
  return res.status(404).json({
    message: "NOT FOUND",
  });
});

app.listen(port, () => {
  console.log(`listening on port *:${port}`);
});
