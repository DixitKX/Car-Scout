const roleModel = require("../models/RoleModel");

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.find();  // Fetch all roles from the database
    
    // Check if roles are found
    if (!roles || roles.length === 0) {
      return res.status(404).json({ message: "No roles found in the database." });
    }
    
    // Send the roles as a response
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({
      message: "Internal Server Error: Unable to fetch roles.",
      error: error.message,
    });
  }
};

const addRole = async (req, res) => {
  const savedRole = await roleModel.create(req.body);

  res.json({
    message: "role created sucessfully...",
    data: savedRole,
  });
};

const deleteRole = async (req, res) => {
  const deletedRole = await roleModel.findByIdAndDelete(req.params.id);

  res.json({
    message: "role deleted...",
    data: deletedRole,
  });
};

const getRoleById = async (req, res) => {
  const foundRole = await roleModel.findById(req.params.id);

  res.json({
    message: "role fetched...",
    data: foundRole,
  });
};

module.exports = {
  getAllRoles,
  addRole,
  deleteRole,
  getRoleById,
};
