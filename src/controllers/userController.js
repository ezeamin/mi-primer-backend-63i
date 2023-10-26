import UserCollection from '../models/userSchema.js';

export const getUsers = async (_, res) => {
  try {
    const data = await UserCollection.find({});

    res.json(data);
  } catch (e) {
    console.error(e);

    res.status(500).json({
      message: 'Ocurrió un error al conectarse a la DB',
    });
  }
};

export const postUser = async (req, res) => {
  const { body } = req;

  const newUser = new UserCollection({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    password: body.password,
  });

  try {
    await newUser.save();

    res.status(201).json({
      message: 'Usuario creado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        message: 'El nombre de usuario ya está en uso',
      });
      return;
    }

    res.status(500).json({
      message: 'Ocurrió un error guardando el usuario',
      error: e.message,
    });
  }
};
