import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from '../models/userSchema.js';

const { JWT_SECRET_KEY } = process.env;

export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  try {
    const userInDB = await UserModel.findOne({ username, isActive: true });

    // El usuario existe? la contraseña es la misma?
    if (!userInDB || !bcrypt.compareSync(password, userInDB.password)) {
      res.status(400).json({
        data: null,
        message: 'Usuario o contraseña incorrecta',
      });
      return;
    }

    // Todo OK, continuar con la creación del token

    const userInfo = {
      user: {
        id: userInDB._doc._id,
        firstname: userInDB._doc.firstname,
        lastname: userInDB._doc.lastname,
        username: userInDB._doc.username,
        isAdmin: userInDB._doc.isAdmin,
      },
    };

    // (payload, secretKey, options)
    const token = jwt.sign(userInfo, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({
      data: token,
      message: 'Usuario logueado exitosamente',
    });
  } catch (e) {
    res.status(500).json({
      data: null,
      message: 'Ocurrió un error en el inicio de sesión',
    });
  }
};
