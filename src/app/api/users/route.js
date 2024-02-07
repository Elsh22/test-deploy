import User from "../../models/Users";
import { connect } from "../../../dbConfig/dbConfig";

export const GET = async (_req, _res) => {
  try {
    await connect()

    const allUsers = await User.find()

    return new Response(JSON.stringify(allUsers), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to get all users", { status: 500 })
  }
}