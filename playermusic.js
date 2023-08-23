//const music,progressbar,
const music = document.querySelector("audio");
const progressBar = document.getElementById("progresses");
const currentimetime = document.querySelector(".currenttime");
const durationtime = document.querySelector(".durectiontime");
const playbtn = document.getElementById("playbtn");
const pausebtn = document.getElementById("pausebtn");

//constante das informacoes da musica

const imgdisplay = document.querySelector("img");
const namemusic = document.querySelector(".music-descr h1");
const artistname = document.querySelector(".music-descr h2");
let indexMusic = 0;

//playlist
const playlistBtn = document.getElementById("playlistBtn");
const playlistContainer = document.getElementById("playlistContainer");
const playlist = document.getElementById("playlist");

// Array de objetos contendo informações das músicas

const musics = [
  {
    titulo: "Mulato só",
    artista: "Bander",
    src: "musicas/Bander - Mulato Só (feat. Dj SupaMan) [Prod. Dj Tarico].mp3",
    img: "imagem/bander.jpg",
  },
  {
    titulo: "Minha vida",
    artista: "Gerilson-Insrael",
    src: "musicas/Gerilson_Insrael_-_Yê_Yê_(Audio)(256k).mp3",
    img: "imagem/1Gerilson_Insrael_-_Minha_Vida_(Audio)(256k).jpg",
  },

  {
    titulo: "Uthando",
    artista: "Shaun",
    src: "musicas/Shaun_101_-_Uthando_Ft_Soamattrix_RealsoulfulG.mp3",
    img: "imagem/3Shaun_101_-_Uthando_Ft_Soamattrix_RealsoulfulG.jpg",
  },
];

// Função para mostrar a playlist
playlistBtn.addEventListener("click", () => {
  playlistContainer.style.display = "block";

  updatePlaylist();
});

// Função para atualizar a lista de reprodução
function updatePlaylist() {
  playlist.innerHTML = ""; // Limpa a lista atual

  // Preenche a lista com itens da playlist
  for (let i = 0; i < musics.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = musics[i].titulo;

    listItem.addEventListener("click", () => {
      changeMusic(i);
      playlistContainer.style.display = "none"; // Esconde a lista após escolher uma música
    });
    playlist.appendChild(listItem);
  }
}

// Função para trocar a música
function changeMusic(index) {
  const statusmusic = !music.paused;
  indexMusic = index;
  loadMusic(indexMusic);
  if (statusmusic) music.play();
}

// Esconde a lista de reprodução inicialmente
playlistContainer.style.display = "none";

// Chama a função para preencher a lista de reprodução inicialmente
updatePlaylist();

/*criacao da function dos botoes playmusic e  pausemusic */

function playmusic() {
  music.play();
  document.getElementById("pausebtn").style.display = "inline";
  document.getElementById("playbtn").style.display = "none";
}

function pausemusic() {
  music.pause();
  document.getElementById("playbtn").style.display = "inline";
  document.getElementById("pausebtn").style.display = "none";
}

function loadMusic(index) {
  music.setAttribute("src", musics[index].src);
  music.addEventListener("loadeddata", () => {
    namemusic.textContent = musics[index].titulo;
    artistname.textContent = musics[index].artista;
    imgdisplay.src = musics[index].img;
    durationtime.textContent = secondforminut(Math.floor(music.duration));
  });
}

function updateProgressBar() {
  progressBar.style.width =
    Math.floor((music.currentTime / music.duration) * 100) + "%";
  currentimetime.textContent = secondforminut(Math.floor(music.currentTime));
  durationtime.textContent = secondforminut(Math.floor(music.duration));
}

//function change sencond for minut
function secondforminut(second) {
  let fieldminutes = Math.floor(second / 60);
  let fieldseconds = second % 60;

  if (fieldseconds < 10) {
    fieldseconds = "0 " + fieldseconds;
  }
  return fieldminutes + ":" + fieldseconds;
}

// Adicione um event listener para o elemento da barra de progresso
//Isso define um event listener para o elemento pai da barra de progresso
// progressBar.parentElement.addEventListener("click", (event) => {
//   const click =
//     event.clientX - progressBar.parentElement.getBoundingClientRect().left;
//   const progressBarWidth = progressBar.parentElement.clientWidth;
//   const newTime = (click / progressBarWidth) * music.duration;
//   music.currentTime = newTime;

// console.log(event.clientX)

// });

progressBar.parentElement.addEventListener("click", (e) => {
  // music duration

  // witdth
  const progressBarWidth = progressBar.parentElement.clientWidth;

  // Clientx
  const click =
    e.clientX - progressBar.parentElement.getBoundingClientRect().left;
  //

  // click/width * duracao
  const newTime = (click / progressBarWidth) * music.duration;

  music.currentTime = newTime;
});

// Call this On Document Load
loadMusic(indexMusic);

//  // Evento para voltar à música anterior
document.getElementById("backbtn").addEventListener("click", () => {
  const musicVerifcation = !music.paused; // Verifica se a música estava tocando antes
  indexMusic--;
  if (indexMusic < 0) {
    indexMusic = musics.length - 1;
  }
  loadMusic(indexMusic);

  if (musicVerifcation) music.play();
});

// Evento para avançar para a próxima música
document.getElementById("nextbtn").addEventListener("click", () => {
  const wasPlaying = !music.paused; 
  indexMusic++;
  if (indexMusic >= musics.length) {
    indexMusic = 0;
  }
  loadMusic(indexMusic);
  if (wasPlaying) {
    music.play();
  }
});

// menubtn.addEventListener("click", ()=>{
//   p
// })

/* criacao dos addventlistener dos  botoes */
playbtn.addEventListener("click", playmusic);
pausebtn.addEventListener("click", pausemusic);
music.addEventListener("timeupdate", updateProgressBar);
