import { Schema, model, Date, type Document } from "mongoose";
import bcrypt from "bcrypt";

// import resourceSchema from "./Resource.js";
import type { ResourceDocument } from "./Resource.js";

export interface UserDocument extends Document {
  userId: string;
  username: string;
  //   firstName: string;
  //   lastName: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
  savedResource: ResourceDocument[];
  createdOn: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // firstName: {
    //   type: String,
    //   required: true,
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    savedResource: [
      {
        type: Schema.Types.ObjectId,
        ref: "resources",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>("User", userSchema);

export default User;
