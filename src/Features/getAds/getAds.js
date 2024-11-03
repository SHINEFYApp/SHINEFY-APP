import apiSauce from "../../API/apiSauce";

export default async function getAds(){
    let data = await apiSauce.get("/get_ads")
     if (data.status === 423) {
                alert('Must update app version first');
                return false
              } 
        return (data.data.ad)
    
}