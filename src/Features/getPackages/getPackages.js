import apiSauce from "../../API/apiSauce";
export default async function getPackages() {
  try {
    let res = await apiSauce.get(`/packages/`);
    if (res.status === 423) {
                alert('Must update app version first');
                return false
              } 
    return res.data;
  } catch (err) {
  }
}