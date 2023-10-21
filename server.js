const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const exceljs = require('exceljs');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de Sequelize y la base de datos MySQL
const sequelize = new Sequelize('diputado', 'luis', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define el modelo de la tabla en la base de datos
const Data = sequelize.define('Data', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'data', // Asegúrate de especificar el nombre correcto de la tabla en tu base de datos
});

// Habilitar CORS para todos los orígenes
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Endpoint para almacenar datos en la base de datos
app.post('/store-data', async (req, res) => {
  try {
    const { data } = req.body;

    // Almacena en la base de datos
    const nuevaData = await Data.create(data);

    res.status(200).json({ message: 'Datos almacenados exitosamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para generar el archivo Excel
app.get('/generate-excel', async (req, res) => {
  try {
    const data = await Data.findAll();

    // Crear un nuevo libro de Excel
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('data');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID Usuario', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Número', key: 'number', width: 15 },
      { header: 'Correo', key: 'email', width: 30 },
      { header: 'Mensaje', key: 'mensaje', width: 40 },
    ];

    // Agregar datos
    data.forEach((row) => {
      worksheet.addRow(row.dataValues);
    });

    // Configurar la respuesta para enviar el archivo Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=usuarios_data.xlsx');

    // Escribir el archivo Excel en la respuesta
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: error.message });
  }
});

// Sincroniza el modelo con la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  // Inicia el servidor después de que la base de datos esté lista
  app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });
});