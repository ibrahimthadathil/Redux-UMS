import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const ShowDashboard = async (req, res) => {
  try {
    const users = await User.find({ is_admin: false });
      const sanitizedUser = users.map((user)=>{
        const {password,...rest} = user._doc
        return rest
      })
    res.status(200).json(sanitizedUser);
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { email, userName } = req.body;
    const exist = await User.findOne({ _id: req.params.id });
    if (email != undefined || userName != undefined) {
      const newData = {
        userName: userName ? userName : exist.userName,
        email: email ? email : exist.email,
      };
      const uniqueemail = await User.findOne({ email });
      if (!uniqueemail || uniqueemail._id == req.params.id) {
        const updateduser = await User.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: newData },
          { new: true }
        );
        const { password, ...rest } = updateduser._doc;
        res.status(200).json({ msg: "updated succesfully", res: rest });
      } else {
        res.status(401).json({ msg: "email already exist" });
      }
    } else {
      res.status(200).json({ msg: "Data remains the same" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  const { userName, password, email } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(401).json({ msg: "Email already exist" });
    const user = await User.create({
      userName,
      password: hashPassword,
      email,
    });
    res.status(200).json({ msg: "successfully Created" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  ShowDashboard,
  editUser,
  createUser,
  deleteUser,
};
