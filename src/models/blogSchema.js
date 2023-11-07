import mongoose from 'mongoose';

const Blog = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Blogs', Blog);
