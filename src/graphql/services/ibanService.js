export const ibanMatchesPattern = (country, iban) => {
  const countryCode = iban.substring(0, 2);
  if (countryCode !== country.code) return false;

  if (!/\d/.test(iban[2]) || !/\d/.test(iban[3])) return false;

  let truncatedIban = iban.substring(4);
  if (truncatedIban.length !== country.ibanPattern.length) return false;

  for (let index = 0; index < truncatedIban.length; index++) {
    const char = truncatedIban[index];
    const patternChar = country.ibanPattern[index];

    if (patternChar === "a" && !/[A-Z]/.test(char)) return false;
    if (patternChar === "n" && !/\d/.test(char)) return false;
    if (patternChar === "c" && !/[A-Za-z0-9]/.test(char)) return false;
  }

  return true;
};

const mod97 = (iban) => {
  let numStr = "";
  for (const char of iban.toUpperCase()) {
    if (/\d/.test(char)) {
      numStr += char;
    } else if (/[A-Z]/.test(char)) {
      numStr += (char.charCodeAt(0) - 55).toString();
    }
  }

  let remainder = 0n;
  let i = 0;
  while (i < numStr.length) {
    let blockLen = i === 0 ? 9 : 7; // Fixed: Always 9 first, then 7 - independent of remaining length
    blockLen = Math.min(blockLen, numStr.length - i);
    const block = numStr.substring(i, i + blockLen);
    remainder = (remainder * 10n ** BigInt(blockLen) + BigInt(block)) % 97n;
    i += blockLen;
  }
  return Number(remainder);
};

const getChecksum = (country, truncatedIban) => mod97(truncatedIban);

export const isIbanValid = (country, iban) => {
  if (!ibanMatchesPattern(country, iban)) return false;

  let rearrangedIban = iban.substring(4) + iban.substring(0, 4);
  const checksum = getChecksum(country, rearrangedIban);
  return checksum === 1;
};

export const generateIban = (country) => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const number = "0123456789";
  const alphanumeric = number + "abcdefghijklmnopqrstuvwxyz" + uppercase;

  const partialIban = [];
  for (const patternChar of country.ibanPattern) {
    switch (patternChar) {
      case "a":
        partialIban.push(
          uppercase[Math.floor(Math.random() * uppercase.length)]
        );
        break;
      case "n":
        partialIban.push(number[Math.floor(Math.random() * number.length)]);
        break;
      case "c":
        partialIban.push(
          alphanumeric[Math.floor(Math.random() * alphanumeric.length)]
        );
        break;
    }
  }

  const partialIbanStr = partialIban.join("");
  const prefixAddedIban = partialIbanStr + country.code + "00";
  const rearranged =
    prefixAddedIban.substring(4) + prefixAddedIban.substring(0, 4);

  const remainder = mod97(rearranged);
  const checkDigitsValue = 98 - remainder;
  const checkDigits = checkDigitsValue.toString().padStart(2, "0");

  return country.code + checkDigits + partialIbanStr;
};
