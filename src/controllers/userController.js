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
