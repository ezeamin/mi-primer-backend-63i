import UserModel from '../models/userSchema.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (_, res) => {
  try {
    const data = await UserModel.find({});

    const filteredData = data.map((user) => ({
      ...user._doc,
      password: undefined,
    }));

    res.json({ data: filteredData, message: 'Usuarios encontrados' });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error al conectarse a la DB',
    });
  }
};

export const postUser = async (req, res) => {
  const { body } = req;

  const hashedPassword = bcrypt.hashSync(body.password, 10);

  const newUser = new UserModel({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    password: hashedPassword,
    isActive: true,
    isAdmin: false,
  });

  try {
    await newUser.save();

    res.status(201).json({
      data: null,
      message: 'Usuario creado exitosamente',
    });
  } catch (e) {
    if (e.message.includes('duplicate')) {
      res.status(400).json({
        data: null,
        message: 'El nombre de usuario ya está en uso',
      });
      return;
    }

    res.status(500).json({
      data: null,
      message: 'Ocurrió un error guardando el usuario',
    });
  }
};
