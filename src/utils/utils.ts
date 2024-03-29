import * as crypto from 'crypto';

// captcha
export const generateSixDigitCode = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// string to md5
export const md5Hash = (input: string) => {
  const hash = crypto.createHash('md5');
  hash.update(input);
  return hash.digest('hex');
}

