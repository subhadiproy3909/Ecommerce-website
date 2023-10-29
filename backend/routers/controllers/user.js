const User = require('../../database/models/userModel');


const fetchUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.status(200).json({ id: user.id, addresses: user.addresses, email: user.email, role: user.role });
    } catch (err) {
        res.status(400).json(err);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user, req.body, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = {fetchUserById, updateUser};