import { Schema, Date, type Document } from "mongoose";

export interface CategoryDocument extends Document {
  categoryID: string;
  language: string;
  description: string;
  createdOn: Date;
}

const categorySchema = new Schema<CategoryDocument>({
  language: {
    type: String,
  },

  description: {
    type: String,
  },
});

export default categorySchema;
