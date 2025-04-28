import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () => {
    try {
        const password = getEnvVar("MONGODB_PASSWORD");
        await mongoose.connect(`mongodb+srv://Dmytro:${password}@cluster0.emgyqun.mongodb.net/my-movies?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Succesfully connection to database");

} catch (error) {
    console.log(error.message);
    throw error;


}
};