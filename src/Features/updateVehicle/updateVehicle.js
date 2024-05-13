import apiSauce from "../../API/apiSauce";
import { localStorage } from "../../Provider/localStorageProvider";

export default async function updateVehicle(currentCar) {
    let user_arr = await localStorage.getItemObject('user_arr');
    let user_id = user_arr.user_id;
    const fd = new FormData()
    let data = {
        car_category_id:currentCar.car_category.car_category_id,
model_id:currentCar.modal.model_id,
make_id:currentCar.car_make.make_id,
color_id:currentCar.car_color.color_id,
plate_number:currentCar.plate_number,
user_id:user_id,
    }
    fd.append("car_category_id" , currentCar.car_category.car_category_id)
    fd.append("model_id" , currentCar.modal.model_id)
    fd.append("make_id" , currentCar.car_make.make_id)
    fd.append("color_id" , currentCar.car_color.color_id)
    fd.append("plate_number" ,currentCar.plate_number )
    fd.append("user_id" , user_id)


    var add_car_arr = await localStorage.getItemObject('add_car_arr');
    try {
        let res = await apiSauce.post(`/update_vehicle`,{"_parts" : fd._parts}) 
    
        return(res.data)
}catch(err) {
}
}