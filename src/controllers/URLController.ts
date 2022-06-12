import { URLModel } from "../database/model/Url";
import { Request, response, Response } from "express";
import shortId from "shortid";
import { config } from "../config/Constants";

export class URLController {
  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;

    const url = await URLModel.findOne({ originURL });

    if (url) {
      res.json(url);
      return;
    }

    const hash = shortId.generate();
    const shortURL = `${config.API_URL}/${hash}`;

    const newUrl = await URLModel.create({ hash, shortURL, originURL });

    res.json(newUrl);
  }

  public async redirect(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;
    const url = {
      originURL: "https://web.dio.me/home",
      hash: "gVFcFAytw",
      shortURL: "http://localhost:5000/gVFcFAytw",
    };
    res.redirect(url.originURL);
  }
}
