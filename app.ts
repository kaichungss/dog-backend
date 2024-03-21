require("module-alias/register");
import * as dotenv from "dotenv";
import express from "express";
import expressWs from "express-ws";
import bodyParser from "body-parser";
import path from "path";
import router from "@/router";
import swaggerSpec from '@/utils/swagger';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';

dotenv.config();

const {app} = expressWs(express());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.send("the server restarts");
});

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  app.use(router);
  console.log(`the server restarts：http://127.0.0.1:${port}`);
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

