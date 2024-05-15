export default function sortDate(date){

    let newDate = date.split('/')
   return `${newDate[1]}-${newDate[0]}-${newDate[2]}`
}
export function reverseSortDate(date){
    let newDate = date.split("-")
    console.log(date)
    console.log(newDate)
   return `${newDate[2]}-${newDate[1]}-${newDate[0]}`
}