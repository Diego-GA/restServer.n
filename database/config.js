import mongoose from "mongoose"

const dbConnection = async() => {
    
    try {

        await mongoose.connect( process.env.MONDGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Base de datos online')
        
    } catch ( error ) {
        console.log( error )
        throw new Error('Error base de datos')
    }

}


export {
    dbConnection
}
