import User from "../../../../models/Users";
import { connect } from "../../../../../dbConfig/dbConfig";

export const POST = async (req, { params }) => {
  try {
    await connect();

    const { userId } = params;

    const body = await req.json();

    const { username, profileImage } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        profileImage,
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update user", { status: 500 })
  }
};