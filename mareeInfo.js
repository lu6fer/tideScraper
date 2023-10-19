import * as cheerio from "cheerio";
import { gotScraping } from "got-scraping";
import { ForbiddenError, UnauthorizedError, InternalServerError } from "./Errors.js";

const url = (harborId) => `http://maree.info/${harborId}`;
//const infoSelector = "MareeEntete";
const tideSelector = "MareeJourDetail_0";

const getData = async (harborId) => {
  console.log("getData", { harborId });
  try {
    //const resp = await axios(url(harborId));
    const { body, statusCode } = await gotScraping.get({
      url: url(harborId),
    });
    if (statusCode === 200) {
      return body;
    }
    switch (statusCode) {
      case 403:
        throw new ForbiddenError("maree.info forbidden");
      case 401:
        throw new UnauthorizedError();
      default:
        throw new InternalError();
    }
    //fs.writeFileSync("./resp.json", resp);
    return body;
  } catch (e) {
    console.log("[error]: getData", { message: e.message });
    throw e;
  }
};

const parseHeader = (parsed) => {
  try {
    const lat = parsed("td[itemprop='geo'] > meta[itemprop='latitude']");
    const long = parsed("td[itemprop='geo'] > meta[itemprop='longitude']");
    const name = parsed("#MareeEntetePort > h2[itemprop='name']");
    return {
      latitude: lat.prop("content"),
      longitude: long.prop("content"),
      name: name.text(),
    };
  } catch (e) {
    console.log("[error]: parseHeader", { message: e.message });
    throw e;
  }
};

const parseTide = (parsed) => {
  try {
    let tidal = [];
    const titleData = parsed(`table#${tideSelector} td.PMBM`);
    const tidesData = parsed(`table#${tideSelector}  td.Coef`);
    const hoursData = parsed(`table#${tideSelector}  td.SEPV`);
    let types = [];
    let tides = [];
    let hours = [];
    titleData.each(function () {
      types = parsed(this)
        .text()
        .match(/.{1,2}/g);
    });
    tidesData.each(function () {
      tides = parsed(this)
        .text()
        .replace(/\u00a0/g, "-")
        .split("-");
    });
    hoursData.first().each(function () {
      hours = parsed(this)
        .text()
        .match(/.{1,5}/g);
    });
    types.forEach((type, index) => {
      console.log({ type, tides, hours });
      let coef = "-";
      if (type === "PM" && (index === 0 || index === 2)) {
        coef = tides[index === 2 ? index - 1 : index];
      } else if (type === "PM" && (index === 1 || index === 3)) {
        coef = tides[index === 3 ? index - 1 : index];
      }
      tidal.push({
        type,
        hour: hours[index],
        coef,
      });
    });
    return tidal;
  } catch (e) {
    console.log("[error]: parseTide", { message: e.message });
    throw e;
  }
};

const getTides = async (harborId) => {
  console.log("getTides", { harborId });
  try {
    const html = await getData(harborId);
    const parsed = cheerio.load(html);
    const harbor = parseHeader(parsed);
    const tides = parseTide(parsed);
    console.log("getTides", { harbor, tides });
    return {
      harbor,
      tides,
    };
  } catch (e) {
    console.log("[error]: getTides", { message: e.message });
    throw e;
  }
};

export default getTides;
