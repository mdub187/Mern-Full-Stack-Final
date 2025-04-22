import { signToken } from "../services/auth.js";
import { AuthenticationError } from "../services/auth.js";
// import User from "../models/User.js";
// import Resource from "../models/Resource.js";
import { User, Resource } from "../models/index.js";
const resolvers = {
    Query: {
        getSingleUser: async (_parent, _args, context) => {
            const foundUser = await User.findOne({
                username: context.user.username,
            });
            if (!foundUser) {
                throw new AuthenticationError("Authentication Error");
            }
            return foundUser;
        },
        // getResource: {},
    },
    Mutation: {
        createUser: async (_parent, args, _context) => {
            const user = await User.create(args);
            if (!user) {
                return null;
            }
            const token = signToken(user.username, user.password, user._id);
            return { token, user };
        },
        login: async (_parent, args, _context) => {
            const user = await User.findOne({
                $or: [{ username: args.username }, { email: args.email }],
            });
            if (!user) {
                throw new AuthenticationError("Authentication Error");
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new AuthenticationError("Authentication Error");
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        createResource: async (_parent, { title, description, url }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            try {
                const newResource = new Resource({
                    title,
                    description,
                    url,
                });
                const savedResource = await newResource.save();
                console.log(`Successfully added resource with ID: ${savedResource._id}`);
                return savedResource;
            }
            catch (error) {
                // console.error("Error adding resource:", error);
                throw new Error("Error adding resource");
            }
        },
        deleteResource: async (_parent, { _id }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in!");
            }
            console.log(`Attempting to delete resource with ID: ${_id}`);
            try {
                const resource = await Resource.findByIdAndDelete(_id);
                if (!resource) {
                    console.log(`Resource with ID: ${_id} not found`);
                    throw new Error("Resource not found");
                }
                console.log(`Successfully deleted resource with ID: ${_id}`);
                return resource;
            }
            catch (error) {
                console.error(`Error deleting resource with ID: ${_id}`, error);
                throw new Error("Error deleting resource");
            }
        },
        // updateResource: {},
        deleteUser: async (_parent, _args, context) => {
            console.log(context.user);
            if (context.user) {
                // throw new AuthenticationError("Must login to delete user");
                const user = await User.findByIdAndDelete(context.user._id);
                console.log(user);
                return;
            }
            throw new AuthenticationError("Must be logged in to delete account");
            //   User.findById(context.user._id);
            //   if (!user) {
            //     throw new AuthenticationError("User not found");
            //   }
            //   const correctPw = await user.isCorrectPassword(args.password);
            //   if (!correctPw) {
            //     throw new AuthenticationError("Authentication Error");
            //   }
            //   await User.findByIdAndDelete(context.user._id);
            //   return "User deleted successfully";
        },
        // updateUser: async (_parent: any, args: any, context: any) => {
        //   if (!context.user) {
        //     throw new AuthenticationError("Authentication Error");
        //   }
        //   const foundUser = await User.findOne({
        //     username: context.user.username,
        //   });
        //   if (!foundUser) {
        //     throw new AuthenticationError("Authentication Error");
        //   }
        //   const updatedUser = await User.findByIdAndUpdate(
        //     foundUser._id,
        //     {
        //       $set: {
        //         username: args.username || foundUser?.username,
        //         email: args.email || foundUser?.email,
        //         password: args.password || foundUser?.password,
        //       },
        //     },
        //     {
        //       new: true,
        //     }
        //   );
        //   return updatedUser;
        // },
    },
};
export default resolvers;
