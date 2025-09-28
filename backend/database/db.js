import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const Connection = async () => {
    // Check if credentials are available
    if (!username || !password) {
        console.log("⚠️  MongoDB credentials not found. Using fallback mode.");
        console.log("💡 For full functionality, add DB_USERNAME and DB_PASSWORD to .env file");
        return false;
    }

    const DB_URL = `mongodb+srv://${username}:${password}@finvest.inqniqa.mongodb.net/?retryWrites=true&w=majority&appName=finvest`

    try{
        // Set connection timeout
        await mongoose.connect(DB_URL, {
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            socketTimeoutMS: 45000, // 45 second socket timeout
        });
        console.log("✅ The Database is successfully connected.")
        return true;
    }
    catch(error){
        console.log("❌ Error while connecting DB:", error.message)
        console.log("💡 Using fallback mode for demo purposes")
        return false;
    }
}

export default Connection