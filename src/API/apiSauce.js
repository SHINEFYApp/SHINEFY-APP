import { create } from "apisauce";
import { config } from "../Provider/configProvider";

 const apiSauce = create({
  baseURL: config.baseURL,
  headers: { Accept: 'application/vnd.github.v3+json' },
})

export default apiSauce