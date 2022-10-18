// const cryptoJs = require('crypto-js');
import { AES, enc } from 'crypto-js';
import config from './config.json';

export const encrypt = (string) => {
  return AES.encrypt(string, config.clientSecret).toString();
};

export const decrypt = (string) => {
  return AES.decrypt(string, config.clientSecret).toString(enc.Utf8);
};

export const isDefined = (obj) => {
  if (typeof obj == 'undefined') return false;

  if (!obj) return false;

  return obj != null;
};

export const numberNormalizer = (val, min = 0) => {
  if (!val) return '';
  if (parseFloat(val) === 0) return 0;
  let value = `${parseFloat(val.toString().replace(/,/g, '')).toString()}${
    val.toString().slice(-1) === '.' ? '.' : ''
  }`;

  if (isNaN(value)) return '';

  if (parseFloat(value) < min) return min;

  if (value.length <= 3) return value;

  let res = '';
  let negative = false;
  let i;
  let tempRes;

  if (value.indexOf('.') >= 0) {
    res = value.slice(value.indexOf('.'), value.indexOf('.') + 3);
    value = value.slice(0, value.indexOf('.'));
  }

  if (parseFloat(value) < 0) {
    negative = true;
    value = (parseFloat(value) * -1).toString();
  }

  if (value.length <= 3) return `${negative ? '-' : ''}${value}${res}`;

  if (value.length % 3 > 0) {
    tempRes = value.slice(0, value.length % 3);
    value = value.slice(value.length % 3);
  } else {
    tempRes = value.slice(0, 3);
    value = value.slice(3);
  }

  let forCounter = parseInt(value.length / 3);

  for (i = 0; i < forCounter; i++) {
    tempRes = `${tempRes},${value.slice(0, 3)}`;
    value = value.slice(3);
  }

  return `${negative ? '-' : ''}${tempRes}${res}`;
};

export const generatePassword = () => {
  let length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export const totalCal = (rows) => {
  let total = 0;
  rows.forEach((item) => {
    total = total + item.price * item.count;
  });
  return total;
};
