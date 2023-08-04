// HTTP / HTTPS Network calls
// One thread shows loading and the other does network calling

//old style code


// import URL from "../utils/constant.js";
// async function makenetworkcall() {
//     const promise = fetch(URL); //network call
//     console.log("Promise is ",promise);
//     promise.then(response=>{ //has 2 sections- header and body
//         console.log("Response is ",response);
//         const promise2 = response.json();//Deserialization
//         promise2.then(data=>console.log('data is',data)).catch(e=>console.log('JSON Parse Error',e));//nested promise
//     }).catch(err=>console.log("Error is ",err));
// }
// makenetworkcall();


//new style after ES8
import URL from '../utils/constant.js';
async function makenetworkcall(){
   try{
    const response=await fetch(URL); //block
    const object = await response.json(); //block
    return object;
   }
   catch (err){
    console.log('Some Problemm in API Call',err);
    throw err;
   }
}
export default makenetworkcall;