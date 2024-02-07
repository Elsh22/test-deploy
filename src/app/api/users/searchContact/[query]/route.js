import User from "../../../../models/Users";
import { connect } from "../../../../../dbConfig/dbConfig";

export const GET = async (__req, { params }) => {
  try {
    await connect()

    const { query } = params

    const searchedContacts = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    })

    return new Response(JSON.stringify(searchedContacts), { status: 200 })
  } catch (err) {
    return new Response("Failed to search contact", { status: 500 })
  }
}