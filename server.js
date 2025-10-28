import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Serveur Integra+ opérationnel ");
});

app.post("/analyser", (req, res) => {
  const userInput = req.body.user_input || "";
  let feedback;

  if (userInput.toLowerCase().includes("bonjour")) {
    feedback = "Excellent ! Tu as bien utilisé 'Bonjour' 👏";
  } else if (userInput.trim() === "") {
    feedback = "Essaie d'écrire quelque chose 😉";
  } else {
    feedback = `Très bien ! "${userInput}" est une phrase correcte ! 👏`;
  }

  const audio_url = "https://integra-plus-demo.s3.eu-central-1.amazonaws.com/bonjour.mp3";

  res.json({ feedback, audio_url });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur Integra+ en ligne sur le port ${PORT}`));
