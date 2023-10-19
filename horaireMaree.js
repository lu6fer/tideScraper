import * as cheerio from "cheerio";
import { gotScraping } from "got-scraping";
//import axios from "axios";

const url = (harbor) => `https://www.horaire-maree.fr/maree/${harbor}/`;
//const infoSelector = "MareeEntete";
const tideSelector = "MareeJourDetail_0";

const getData = async (harborId) => {
  console.log("getData", { harborId });
  try {
    /*const { data } = await axios(url(harborId));
      return data*/
    const { body } = await gotScraping.get({
      url: url(harborId),
    });
    return body;
  } catch (e) {
    console.log("[error]: getData", { message: e.message });
    throw e;
  }
};

const parseName = ($) => {
  return $("#i_header_tbl_gauche > h2").text();
};

const parseTides = ($) => {
  const coefAm = $("#i_donnesJour > table > tbody > tr:nth-child(3) > td:nth-child(1) > strong").text();
  const coefPm = $("#i_donnesJour > table > tbody > tr:nth-child(3) > td:nth-child(4)").text();
  const am = {
    bm: $("#i_donnesJour > table > tbody > tr:nth-child(3) > td:nth-child(2) > strong").text(),
    pm: $("#i_donnesJour > table > tbody > tr:nth-child(3) > td:nth-child(3) > strong").text(),
  };
  const pm = {
    bm: $("#i_donnesJour > table > tbody > tr:nth-child(3) > td:nth-child(5) > strong").text(),
    pm: $("#i_donnesJour > table > tbody > tr:nth-child(3) > td:nth-child(6) > strong").text(),
  };

  return [
    { type: "PM", hour: am.pm, coef: coefAm },
    { type: "BM", hour: am.bm, coef: "-" },
    { type: "PM", hour: pm.pm, coef: coefPm },
    { type: "BM", hour: pm.bm, coef: "-" },
  ];
};

const getTides = async (harbor) => {
  const body = await getData(harbor);
  const $ = cheerio.load(body);

  return {
    harbor: {
      name: parseName($),
    },
    tides: parseTides($),
  };
};

export default getTides;

//console.log(await getTides("PERROS-GUIREC_TRESTRAOU/"));
