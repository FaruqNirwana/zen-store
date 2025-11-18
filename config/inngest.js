import { Inngest } from "inngest";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const inngest = new Inngest({ id: "zen-store-next" });

/* ------------------------------------------
   User Created
------------------------------------------- */
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };

    console.log("User data to sync:", userData);

    await dbConnect();
    await User.create(userData);

    return userData;
  }
);

/* ------------------------------------------
   User Updated
------------------------------------------- */
export const syncUserUpdate = inngest.createFunction(
  { id: "sync-update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUserData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    console.log("User data to update:", updatedUserData);

    await dbConnect();
    await User.findByIdAndUpdate(id, updatedUserData);

    return updatedUserData;
  }
);

/* ------------------------------------------
   User Deleted
------------------------------------------- */
export const syncUserDelete = inngest.createFunction(
  { id: "sync-delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    console.log("User ID to delete:", id);

    await dbConnect();
    await User.findByIdAndDelete(id);

    return { deletedUserId: id };
  }
);
