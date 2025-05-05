const User = require("../models/UserModel");
const Role = require("../models/RoleModel");

exports.getAllUsers = async (req, res) => {
    try {
      const { role, search, page = 1, limit = 5 } = req.query;
      let query = {};
  
      // If 'search' is provided, use it to filter by username or email
      if (search) {
        query.$or = [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ];
      }
  
      // If 'role' is provided, filter users based on the role ID
      if (role) {
        // Find the role by name and get the role ID
        const roleData = await Role.findOne({ name: role });
        if (roleData) {
          query.roleId = roleData._id; // Use roleId to match in the User model
        } else {
          return res.status(400).json({ error: "Invalid role provided" });
        }
      }
  
      // Pagination calculations
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      // Fetch users with the specified query, skipping, and limiting the number of results
      const [users, total] = await Promise.all([
        User.find(query)
          .select("-password -createdAt") // Exclude password and createdAt fields
          .populate("roleId", "name") // Populate the 'roleId' reference with the 'name' field from the 'Role' model
          .skip(skip)
          .limit(parseInt(limit)),
  
        User.countDocuments(query),
      ]);
  
      // Return the users and total count
      res.json({ users, total });
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };


exports.toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user status" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user details" });
  }
};
