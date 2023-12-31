const {User} = require('../models/user');
const {
    HttpError, 
    ctrlWrapper,
    currentCount,
    totalCount, 
    levelSupport
} = require('../helpers');

const getIndicators = async (req, res) => {
    const user = req.user;
    const bonusAccount = user.bonusAccount;
    const current = currentCount(user);
    const total = totalCount(user);
    const level = levelSupport(user);

    res.json({
        bonusAccount,
        current,
        total,
        level,
    });
};

const getFirstLinePartners = async (req, res) => {
    const {_id} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await User.find({inviter: _id}, "_id name email", {skip, limit});
    res.json(result);
};

const getByIdPartner = async (req, res) => {
    const {partnerId} = req.params;
    const result = await User.findOne({_id: partnerId}, "_id name email avatarURL verify");

    if(!result) {
      throw HttpError (404, 'Not found')
    }
    res.json(result);
};

const getPartnerStructure = async (req, res) => {
    const {partnerId} = req.params;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await User.find({inviter: partnerId}, "_id name email", {skip, limit});
    res.json(result);
};

module.exports = {
    getIndicators: ctrlWrapper(getIndicators),
    getFirstLinePartners: ctrlWrapper(getFirstLinePartners),
    getByIdPartner: ctrlWrapper(getByIdPartner),
    getPartnerStructure: ctrlWrapper(getPartnerStructure),
};