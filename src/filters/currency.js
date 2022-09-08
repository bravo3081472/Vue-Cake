export default function (num) {
  const n = Number(num);
  // $ 字號
  return `$ ${n.toFixed(0).replace(/./g, (c, i, a) => {
    // 千分位
    const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
    return currency;
  })}`;
}

