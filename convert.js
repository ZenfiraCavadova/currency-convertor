const select = document.querySelectorAll(".currency");
const input_currency = document.getElementById("amount");
const output_currency = document.getElementById("exchange-rate");
const exchangeValue = document.getElementById("exchange-value");

fetch(`https:api.frankfurter.app/currencies`)
  .then((data) => data.json())
  .then((data) => {
    const entries = Object.entries(data);
    console.log(data);
    for (var i = 0; i < entries.length; i++) {
      select[0].innerHTML += `<option value="${entries[i][0]}" ${
        entries[i][0] === "USD" ? "selected" : ""
      }>${entries[i][0]}</option>`;
      select[1].innerHTML += `<option value="${entries[i][0]}" ${
        entries[i][0] === "TRY" ? "selected" : ""
      }>${entries[i][0]}</option>`;
    }
  });

const flagMapping = {
  AED: "ae",
  AFN: "af",
  ALL: "al",
  AMD: "am",
  ANG: "an",
  AOA: "ao",
  ARS: "ar",
  AUD: "au",
  AWG: "aw",
  AZN: "az",
  BAM: "ba",
  BBD: "bb",
  BDT: "bd",
  BGN: "bg",
  BHD: "bh",
  BIF: "bi",
  BMD: "bm",
  BND: "bn",
  BOB: "bo",
  BRL: "br",
  BSD: "bs",
  BTN: "bt",
  BWP: "bw",
  BYN: "by",
  BZD: "bz",
  CAD: "ca",
  CDF: "cd",
  CHF: "ch",
  CLP: "cl",
  CNY: "cn",
  COP: "co",
  CRC: "cr",
  CUP: "cu",
  CVE: "cv",
  CZK: "cz",
  DJF: "dj",
  DKK: "dk",
  DOP: "do",
  DZD: "dz",
  EGP: "eg",
  ERN: "er",
  ETB: "et",
  EUR: "eu",
  FJD: "fj",
  FKP: "fk",
  FOK: "fo",
  GEL: "ge",
  GBP: "gb",
  GGP: "gg",
  GHS: "gh",
  GIP: "gi",
  GMD: "gm",
  GNF: "gn",
  GTQ: "gt",
  GYD: "gy",
  HKD: "hk",
  HNL: "hn",
  HRK: "hr",
  HTG: "ht",
  HUF: "hu",
  IDR: "id",
  ILS: "il",
  IMP: "im",
  INR: "in",
  IQD: "iq",
  IRR: "ir",
  ISK: "is",
  JEP: "je",
  JMD: "jm",
  JOD: "jo",
  JPY: "jp",
  KES: "ke",
  KGS: "kg",
  KHR: "kh",
  KID: "ki",
  KRW: "kr",
  KWD: "kw",
  KYD: "ky",
  KZT: "kz",
  LAK: "la",
  LBP: "lb",
  LKR: "lk",
  LRD: "lr",
  LSL: "ls",
  LYD: "ly",
  MAD: "ma",
  MDL: "md",
  MGA: "mg",
  MKD: "mk",
  MMK: "mm",
  MNT: "mn",
  MOP: "mo",
  MRU: "mr",
  MUR: "mu",
  MVR: "mv",
  MWK: "mw",
  MXN: "mx",
  MYR: "my",
  MZN: "mz",
  NAD: "na",
  NGN: "ng",
  NIO: "ni",
  NOK: "no",
  NPR: "np",
  NZD: "nz",
  OMR: "om",
  PAB: "pa",
  PEN: "pe",
  PGK: "pg",
  PHP: "ph",
  PKR: "pk",
  PLN: "pl",
  PYG: "py",
  QAR: "qa",
  RON: "ro",
  RSD: "rs",
  RUB: "ru",
  RWF: "rw",
  SAR: "sa",
  SBD: "sb",
  SCR: "sc",
  SDG: "sd",
  SEK: "se",
  SGD: "sg",
  SHP: "sh",
  SLL: "sl",
  SOS: "so",
  SRD: "sr",
  SSP: "ss",
  STN: "st",
  SYP: "sy",
  SZL: "sz",
  THB: "th",
  TJS: "tj",
  TMT: "tm",
  TND: "tn",
  TOP: "to",
  TRY: "tr",
  TTD: "tt",
  TUV: "tv",
  TZS: "tz",
  UAH: "ua",
  UGX: "ug",
  USD: "us",
  UYU: "uy",
  UZS: "uz",
  VES: "ve",
  VND: "vn",
  VUV: "vu",
  WST: "ws",
  XAF: "cf",
  XCD: "ag",
  XDR: "n/a",
  XOF: "bj",
  XPF: "pf",
  YER: "ye",
  ZAR: "za",
  ZMW: "zm",
  ZWL: "zw",
};

const loadFlag = function (element) {
  const currencyCode = element.value;
  const flagCode = flagMapping[currencyCode];

  if (flagCode) {
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagcdn.com/w80/${flagCode}.png`;
  }
};

for (let i = 0; i < select.length; i++) {
  select[i].addEventListener("change", function () {
    loadFlag(this);
    console.log("Changed flag for", this.value);
    console.log(loadFlag(select[0]));
  });
}

function convert() {
  input_currency_val = input_currency.value;
  if (select[0].value != select[1].value) {
    const host = "api.frankfurter.app";
    fetch(
      `https:${host}/latest?amount=${input_currency_val}&from=${select[0].value}&to=${select[1].value}`
    )
      .then((val) => val.json())
      .then((val) => {
        output_currency.value = Object.values(val.rates)[0].toFixed(2);
        console.log(Object.values(val.rates)[0]);
        const unitValue = output_currency.value / +input_currency.value;
        exchangeValue.innerHTML = `1 ${select[0].value} = ${unitValue.toFixed(
          2
        )} ${select[1].value}`;
      });
  } else {
    alert("Please select two different currencies");
  }
}

input_currency.addEventListener("keyup", (e) => e.key === "Enter" && convert());
