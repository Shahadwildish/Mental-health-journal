const Sequence = require('../models/Sequence');

const getNextSequenceValue = async (sequenceName) => {
  const sequence = await Sequence.findOneAndUpdate(
    { sequenceName },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );
  return sequence.sequenceValue;
};

module.exports = getNextSequenceValue;
