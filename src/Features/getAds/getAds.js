import apiSauce from "../../API/apiSauce";

export default async function getAds(){
    let data = await apiSauce.get("/get_ads")
        return (data.data.ad)
    
}