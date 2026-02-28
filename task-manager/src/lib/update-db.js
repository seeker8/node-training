import '../db/mongoose.js';
import { User } from '../models/User.mjs';

const users = await User.find({});

// console.log(users);

for (const user of users) {
  try {
    const timestamp = user._id.getTimestamp();
    user.createdAt = timestamp;
    user.updatedAt = timestamp;
    await user.save();
  }
  catch (error) {
    console.log(error);
  }
}
console.log('done');