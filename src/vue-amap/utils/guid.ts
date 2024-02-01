export default function guid () {
  const s: string[] = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.charAt(Math.floor(Math.random() * 0x10));
  }
  s[8] = s[13] = s[18] = s[23] = '-';

  return s.join('');
}
