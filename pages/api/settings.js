let settingsStore={}
export default async function handler(req,res){
    const {method}=req;
    if(method==="POST"){
        const {storeName}=req.body;
        if(!storeName)
            return res.status(400).json({message:"Store name is required"});
        settingsStore.storeName=storeName;
        return res.status(200).json({message:"Store name saved",data:storeName});
    }
    else if(method==="GET")
        return res.status(200).json(settingsStore);

    res.setHeader("Allow",["GET","POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
}