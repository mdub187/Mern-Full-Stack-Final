import { Schema, model, type Document } from "mongoose";
import categorySchema from "./Category.js";
import type { CategoryDocument } from "./Category.js";

export interface ResourceDocument extends Document {
  title: string;
  description: string;
  category: CategoryDocument[];
  url: string;
  createdOn: Date;
}

const resourceSchema = new Schema<ResourceDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  category: categorySchema,
});

const Resource = model<ResourceDocument>("Resource", resourceSchema);

export default Resource;
