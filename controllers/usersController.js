const { encryptPass, decryptPass } = require("../utils/auth");

 
const savedUsers = [
    {
        id: 1,
        name: "Jane",
        password: "$2b$08$J9xVkoA8ZGGRNT4FR2I6euFdt6AIfd67SCHJdBsPlOSrk7lUfJwRy"
    }
]

async function loginUser(req, res){
    const {password, id} = req.body;
    try {
        const userDetails = savedUsers.find(user=>user.id === id);
        if (!userDetails) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        let truePassword = await decryptPass(password, userDetails.password)
        if (truePassword) {
            res.json({
                success: true,
                message: "Logged in successfully"
            })
        }else{
            res.json({
                success: false,
                message: "Wrong credentials"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json("Internal server error")
    }
    

}


// 
    // let encryptedPassword = await encryptPass(password)
    // console.log(encryptedPassword)
    // res.json(encryptedPassword)


module.exports = {loginUser}