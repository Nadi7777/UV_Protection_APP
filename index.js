import express from "express";
import axios from "axios";
const app = express();
const port = 3000;
const base_Url = "https://api.openuv.io/api/v1/uv?";
const yourAPIKey = "openuv-xw9rlkwdgu76-io";
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.post("/",async (req,res)=>{
    const lat = req.body.latitude;
    const lon = req.body.Longitude;
   
    try{

    
    const result= await axios.get(base_Url + `lat=${lat}&lng=${lon}`,{
        headers :{
            "x-access-token":yourAPIKey
        }
    });
    
   
    const uv = result.data.result.uv
     res.render("index.ejs",{
        data : uv
     })
   
    }catch(err){
       console.error(err.message);
       res.send("Sorry We can't " + err.message)
    }  

})
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})