import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Route principale pour tester
app.get("/", (req, res) => {
  res.send("Integra+ API is running ✅");
});

// ✅ Route /analyser : celle que Landbot appelle
app.post("/analyser", (req, res) => {
  const userInput = req.body.user_input || "";

  let feedback = "";
  let audioUrl = "https://integra-plus-demo.s3.eu-central-1.amazonaws.com/bonjour.mp3";

  if (userInput.toLowerCase().includes("je m’appelle") || userInput.toLowerCase().includes("je m'appelle")) {
    feedback = "Excellent ! Tu t’es bien présenté 👏";
  } else if (userInput.trim().length > 0) {
    feedback = "Presque ! Essaie de dire : 'Je m’appelle ...'";
  } else {
    feedback = "Peux-tu répéter ton prénom ? 😊";
  }

  // Réponse JSON attendue par Landbot
  res.json({
    feedback,
    audio_url: audioUrl
  });
});

// ✅ Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
