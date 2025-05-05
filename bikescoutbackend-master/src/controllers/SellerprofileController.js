const sellerProfileModel = require('../models/SellerProfileModel');

const addProfile = async (req, res) => {
    try {
        const savedProfile = await sellerProfileModel.create(req.body);
        res.status(201).json({
            message: 'Profile added successfully',
            data: savedProfile,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await sellerProfileModel.findOne({userId:req.params.userId});
        if (!profile) {
            return res.status(404).json({
                message: 'Profile not found',
            });
        }
        res.status(200).json({
            message: 'Profile fetched successfully',
            data: profile,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const updatedProfile = await sellerProfileModel.findOneAndUpdate({userId:req.params.userId}, req.body, { new: true, upsert: true });
        res.status(200).json({
            message: 'Profile updated successfully',
            data: updatedProfile,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    addProfile,
    getProfile,
    updateProfile
};