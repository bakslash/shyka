
exports.successfullReturns = async (req, res, data) => {
    try {
        return res.status(200).json({ 
            data
        });
        
    } catch(err) {
        console.log(err)
    }
}
//this function will return all validation errors responses
exports.EmailvalidationErrors = async function(req, res, message) {
    try{
        return res.status(400).json({
            status: "failed",
            message:'email already registered  please login'
            
        })
    }catch(err){
        console.log(err)
    }
}
