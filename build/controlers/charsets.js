"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharSets = void 0;
const charset_1 = __importDefault(require("../model/charset"));
const getCharSets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const charsets = yield charset_1.default.find().exec();
        if (charsets.length > 0)
            res.status(200).json(charsets);
        else {
            const newcharsets = [
                yield charset_1.default.create({
                    name: "Latin",
                }),
                yield charset_1.default.create({
                    name: "Cyrilic",
                }),
            ];
            res.status(200).json(newcharsets);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getCharSets = getCharSets;
//# sourceMappingURL=charsets.js.map