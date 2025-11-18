import { Inngest } from "inngest";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "zen-store-next" });

// Inngest function to save user data to a database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
    handler: async ({ event }) => {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        _id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        imageUrl: image_url,
      };

      console.log("User data to sync:", userData);

      // Connect ke database
      await dbConnect();

      // Simpan user
      await User.create(userData);

      return userData;
    },
  }
);


// Inngest Function to update user data in database
export const syncUserUpdate = inngest.createFunction(
  {
    id: "sync-update-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
    handler: async ({ event }) => {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const updatedUserData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: first_name + " " + last_name,      
        imageUrl: image_url,
      };

      console.log("User data to update:", updatedUserData);

      // Connect ke database
      await dbConnect();

      // Update user
      await User.findByIdAndUpdate(id, updatedUserData);

      return updatedUserData;
    },
  }
)

// Inngest Function to delete user from database
export const syncUserDelete = inngest.createFunction(
  {
    id: "sync-delete-user-from-clerk",
  },
  {
    event: "clerk/user.deleted",
    handler: async ({ event }) => {
      const { id } = event.data;

      console.log("User ID to delete:", id);

      // Connect ke database
      await dbConnect();

      // Delete user
      await User.findByIdAndDelete(id);

      return { deletedUserId: id };
    },
  }
);