export const getUsers = (req, res) => {
  console.log('Llegaste a la ruta de usuarios! Yei!');
  res.status(201).json({
    hola: 'chau',
  });
};
