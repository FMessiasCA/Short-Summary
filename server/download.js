import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => new Promise((resolve, reject) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando download...", videoId);

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000;
      
      if (seconds > 60) {
        throw new Error("Esse vídeo está longo demais para nossa análise... :(")
      }
    })
    .on("end", () => {
      console.log("O Download do vídeo está finalizado...");
      resolve();
    })
    .on("error", (error) => {
      console.log("Houve um erro ao fazer download do vídeo. Detalhes do erro:", error);
      reject(error);
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"));
});