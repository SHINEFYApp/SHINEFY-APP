import { Platform } from "react-native";

export default function sortDate(date) {
  console.log(date)
  let newDate = date.split('/');
  return Platform.OS == 'ios' ? `${newDate[2]}-${newDate[1]}-${newDate[0]} ` : `${newDate[2]}-${newDate[0]}-${newDate[1]} `;
}
export function reverseSortDate(date) {
  let newDate = date.split('-');
  return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
}
