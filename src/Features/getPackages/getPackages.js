import apiSauce from "../../API/apiSauce";
export default async function getPackages() {
  try {
    let res = await apiSauce.get(`/packages/`);
    return res.data;
  } catch (err) {
  }
}