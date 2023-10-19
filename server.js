const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS para todos los orígenes
app.use(cors());

// Parsear el cuerpo de la solicitud como JSON
app.use(express.json());

app.post('/google-sheets', async (req, res) => {
  try {
    const { data } = req.body;

    const spreadsheetId = '1n_WQUMuzeep5l_ovIUeGYw8K1gSlZ4Y1ulB2s-zYMjQ';
    const creds = require('./diputado.json');
    const doc = new GoogleSpreadsheet(spreadsheetId);;
    
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

// Verifica que sheet sea una instancia válida de GoogleSpreadsheet
    if (!(sheet instanceof GoogleSpreadsheet)) {
      throw new Error('La hoja de cálculo no es una instancia válida de GoogleSpreadsheet');
    }

// Verifica que addRow esté disponible en la instancia de la hoja de cálculo
    if (typeof sheet.addRow !== 'function') {
      throw new Error('La función addRow no está disponible para esta hoja de cálculo');
    }

  await sheet.addRow(data);

    res.status(200).json({ message: 'Solicitud exitosa a Google Sheets' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});