import { Schema } from "mongoose";
const categorySchema = new Schema({
    language: {
        type: String,
    },
    description: {
        type: String,
    },
});
export default categorySchema;
