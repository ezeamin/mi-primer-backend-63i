import BlogModel from '../models/blogSchema.js';

export const getBlogs = async (_, res) => {
  try {
    const data = await BlogModel.find({ isActive: true });

    const filteredData = data.map((blog) => ({
      id: blog._doc._id,
      'image-url': blog._doc.imageUrl,
      title: blog._doc.title,
      content: blog._doc.content,
    }));

    res.json({ data: filteredData, message: 'Blogs encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error al conectarse a la DB',
    });
  }
};

export const getBlog = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const data = await BlogModel.findOne({ isActive: true, _id: id });

    // No encontró el blog
    if (!data) {
      res.status(400).json({
        data: null,
        message: 'No se encontró el blog solicitado',
      });
      return;
    }

    const result = {
      id: data._doc._id,
      'image-url': data._doc.imageUrl,
      title: data._doc.title,
      content: data._doc.content,
    };

    res.json({ data: result, message: 'Blog encontrado' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error al conectarse a la DB',
    });
  }
};

export const postBlog = async (req, res) => {
  const { body } = req;

  /** BODY
   * title: String,
   * image-url: String,
   * content: String
   */

  const newBlog = new BlogModel({
    title: body.title,
    imageUrl: body['image-url'],
    content: body.content,
    isActive: true,
  });

  try {
    await newBlog.save();

    res.status(201).json({
      data: null,
      message: 'Blog creado exitosamente',
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error guardando el blog',
    });
  }
};

export const putBlog = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const action = await BlogModel.updateOne({ _id: id }, body);

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró un blog con ese id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'El blog ha sido actualizado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error actualizando el blog',
    });
  }
};

export const deleteBlog = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const action = await BlogModel.updateOne(
      { _id: id, isActive: true },
      { isActive: false },
    );

    if (action.matchedCount === 0) {
      res.status(400).json({
        data: null,
        message: 'No se encontró un blog con ese id',
      });
      return;
    }

    res.json({
      data: null,
      message: 'El blog ha sido eliminado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error eliminando el blog',
    });
  }
};
