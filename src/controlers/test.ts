import { RequestHandler } from "express"
import env from "../util/validateEnv"
const port = env.PORT || 666

export const getTest: RequestHandler = async (req, res, next) => {
  try {
    res.end(`<h1>"test server page on port:${port}" </h1>`)
    // res.status(200).json("ok");
  } catch (error) {
    next(error)
  }
}
