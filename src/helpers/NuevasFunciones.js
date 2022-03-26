import Store from "./Store";
import Config from "./Config";
export const CallPdf  = (path) =>{
  window.open(Config.ConfigApirest+path+Store.get("user").token);
}
