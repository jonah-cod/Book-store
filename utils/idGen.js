const { v4 } = require("uuid")

function idGenerator(){
    let id = v4()
    return id
}


module.exports = {idGenerator}