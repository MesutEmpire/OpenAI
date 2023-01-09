import { AnyNsRecord } from "dns";
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
require("dotenv").config();

const configuration = new Configuration({
  organization: `${process.env.OPENAI_ORGANIZATION}`,
  apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAIApi(configuration);

const getAllEngines = (req: Request, res: Response) => {
  openai
    .listEngines()
    .then((response: any) => res.json(response.data.data))
    .catch((err: any) => res.json(err.message));
};
const getAllModels = (req: Request, res: Response) => {
  openai
    .listModels()
    .then((response: any) => res.json(response.data.data))
    .catch((err: any) => res.json(err.message));
};
const createCompletion = (req: Request, res: Response) => {
  console.log(req.body);
  const { model, prompt } = req.body;
  openai
    .createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: 100,
      temperature: 0,
    })
    .then((response: any) => res.json(response.data.choices))
    .catch((err: any) => res.json(err.message));
};
const createEdit = (req: Request, res: Response) => {
  const { input, instruction } = req.body;
  openai
    .createEdit({
      model: "text-davinci-edit-001",
      input: input,
      instruction: instruction,
      temperature: 0,
    })
    .then((response: any) => res.json(response.data.choices))
    .catch((err: any) => res.json(err.message));
};
const createImage = (req: Request, res: Response) => {
  const { prompt, number } = req.body;
  openai
    .createImage({
      prompt: prompt,
      n: number,
      size: "1024x1024",
    })
    .then((response: any) => res.json(response.data))
    .catch((err: any) => res.json(err.message));
};
module.exports = { getAllEngines, getAllModels, createCompletion, createEdit,createImage};
