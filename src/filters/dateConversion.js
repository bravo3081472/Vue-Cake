export default function (date = 0) {
  const dateComplement = (date.toString().length <= 10 ? Number(`${date}000`) : Number(`${date}`));
  const YYYY = new Date(dateComplement).getFullYear();
  const MM = new Date(dateComplement).getMonth();
  const DD = new Date(dateComplement).getDate();
  const str = `${YYYY}/${MM}/${DD}`;
  return str;
}
