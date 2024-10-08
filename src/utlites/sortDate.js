import { Platform } from "react-native";

export default function sortDate(date) {

  let newDate = date.split('/');
  return `${newDate[2]}-${newDate[0]}-${newDate[1]} `;
}
export function reverseSortDate(date) {
  let newDate = date.split(' ').join("");
  return newDate;
}
