import BlogModel from '../models/blogSchema.js';

// --------------------------------------------------------
// GET
// --------------------------------------------------------

export const getBlogs = async (_, res) => {
  try {
    const data = await BlogModel.find();

    const filteredData = data
      .filter((blog) => blog._doc.isActive === true)
      .map((blog) => ({
        ...blog._doc,
        isActive: undefined,
      }));

    res.json({ data: filteredData, message: 'Blogs encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error al conectarse a la DB',
    });
  }
};

export const getBlogsByUser = async (req, res) => {
  const {
    user: { _id },
  } = req;

  try {
    const data = await BlogModel.find({ user_id: _id });

    const filteredData = data
      .filter((blog) => blog._doc.isActive === true)
      .map((blog) => ({
        ...blog._doc,
        isActive: undefined,
      }));

    res.json({ data: filteredData, message: 'Blogs encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error al conectarse a la DB',
    });
  }
};

// --------------------------------------------------------
// POST
// --------------------------------------------------------

export const postBlog = async (req, res) => {
  const { body, user } = req;

  const newBlog = new BlogModel({
    title: body.title,
    image_url: body['image-url'],
    content: body.content,
    user_id: user._id,
    isActive: true,
  });

  try {
    await newBlog.save();

    res.status(201).json({
      data: null,
      message: 'Blog creado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error guardando el blog',
    });
  }
};
