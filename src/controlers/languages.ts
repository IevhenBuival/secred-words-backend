import languageModel from "../model/language"
import charsetModel from "../model/charset"
import { RequestHandler } from "express"
import mongoose from "mongoose"
import createHttpError from "http-errors"
//import { assertIsDefined } from "../util/assertIsDefined";

export const getLanguages: RequestHandler = async (req, res, next) => {
  try {
    const languages = await languageModel.find().exec()
    res.status(200).json(languages)
  } catch (error) {
    next(error)
  }
}

export const getLanguage: RequestHandler = async (req, res, next) => {
  const ID = req.params.langID
  try {
    if (!mongoose.isValidObjectId(ID)) {
      throw createHttpError(400, "Invalid word ID")
    }
    const searchedLang = await languageModel.findById(ID).exec()
    if (!searchedLang) {
      throw createHttpError(404, "language whith id:" + ID + " not found")
    }
    res.status(200).json(searchedLang)
  } catch (error) {
    next(error)
  }
}

interface ICreateWordBody {
  name?: string
  charset?: string
}

export const createLanguage: RequestHandler<unknown, unknown, ICreateWordBody, unknown> = async (req, res, next) => {
  const language = req.body.name
  const charset = req.body.charset

  try {
    if (!language) {
      throw createHttpError(400, "You mast assign name to language")
    }
    const isDouble = await languageModel.findOne({ name: language }).exec()

    if (isDouble) throw createHttpError(409, "Language alrady exist")

    const charSetID = await charsetModel.findOne({ name: charset }).exec()
    if (!charSetID) throw createHttpError(401, "Invalid charset for language")

    const newLang = await languageModel.create({
      name: language,
      charset: charSetID._id,
    })
    /* 201 resurse created */
    res.status(201).json(newLang)
  } catch (error) {
    next(error)
  }
}

interface IUpdateLangParams {
  langID?: string
}
interface IUpdateLangBody {
  name?: string
  charset?: string
}

export const updateLanguage: RequestHandler<IUpdateLangParams, unknown, IUpdateLangBody, unknown> = async (
  req,
  res,
  next
) => {
  const Id = req.params.langID
  const newName = req.body.name
  const newCharSet = req.body.charset
  //const authUser = req.session.userId;

  try {
    //assertIsDefined(authUser);
    if (!mongoose.isValidObjectId(Id)) throw createHttpError(400, "Invalid word ID")

    const searchedRecord = await languageModel.findById(Id).exec()

    if (!newName) throw createHttpError(400, "You mast assign title")

    if (!searchedRecord) {
      throw createHttpError(404, "language whith id:" + Id + " not found")
    }

    const charSetID = await charsetModel.findOne({ name: newCharSet }).exec()
    if (!charSetID) throw createHttpError(401, "Invalid charset for lenguage")

    searchedRecord.name = newName
    searchedRecord.charset = charSetID._id

    const UpdatedLanguage = await searchedRecord.save()

    res.status(200).json(UpdatedLanguage)
  } catch (error) {
    next(error)
  }
}
