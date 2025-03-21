const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = (req,res,next)=>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error:'Token not found'})

    //Extract the jwt tokens from the request header

    const token = req.headers.authorization.split(' ')[1];

    if(!token) return res.status(401).json({error:"Unauthorized"})


        try{
            //verift the jwt token

            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            req.user = decoded
            next()


        }
        catch(err){
            console.log(err)
            res.status(401).json({error:"invalid Token"})

        }
}

//function to genrate the jwt token

const  generateToken = (userData)=>{
    //Genrate a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'1h'}) 

}

module.exports ={jwtAuthMiddleware,generateToken}