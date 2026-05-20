require('dotenv').config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const TOKEN = process.env.BOT_TOKEN;

const filmes = [
  {
    titulo: "Filme Exemplo",
    capa: "https://picsum.photos/300/450",
    descricao: "Hospedado no Telegram",
    fileId: "COLOQUE_FILE_ID_AQUI"
  }
];

app.get("/", (req, res) => {
  res.send("NimaFlix online");
});

app.get("/api/filmes", (req, res) => {
  res.json(filmes);
});

app.get("/stream/:fileId", async (req, res) => {

  try {

    const fileId = req.params.fileId;

    const response = await axios.get(
      `https://api.telegram.org/bot${TOKEN}/getFile?file_id=${fileId}`
    );

    const filePath = response.data.result.file_path;

    const fileUrl =
      `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;

    res.redirect(fileUrl);

  } catch (err) {

    console.log(err.message);

    res.status(500).send("Erro ao gerar stream");

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
