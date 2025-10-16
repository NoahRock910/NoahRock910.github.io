// === INTRO MUSIC ===
document.getElementById("begin-btn").addEventListener("click", () => {
  const introAudio = document.getElementById("intro-audio");
  const beginStage = document.getElementById("begin-stage");
  const coverContent = document.getElementById("cover-content");

  beginStage.style.display = "none"; 
  coverContent.style.display = "block"; 

  introAudio.play().then(() => {
    introAudio.onended = () => {
      alert("I hope you enjoyed that");
      enterSite();
    };
  }).catch(() => {
    // fallback if autoplay blocked
    coverContent.style.display = "block";
  });
});

function showVideo() {
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("cover-video");

  // Make visible
  videoContainer.style.display = "block";

  // Let CSS transition run
  setTimeout(() => {
    videoContainer.classList.add("show");
  }, 50);

  // Play video
  video.play().catch(err => {
    console.log("Autoplay blocked:", err);
  });
}

// === PLAYLIST SYSTEM ===
const playlist = [
  { title: "Answer (Instrumental)", artist: "Tyler, the creator", src: "Mp3&4/Answermental.mp3" },
  { title: "PartyIsntOver (Instrumental)", artist: "Tyler, the creator", src: "Mp3&4/Partyistrumental.mp3" },
  { title: "Smoke Coming From A Cabin In The Distance", artist: "Macabre Plaza", src: "Mp3&4/SCFACITD.mp3" },
  { title: "A Chimp's Smile", artist: "Macabre Plaza", src: "Mp3&4/AChimpsSmile.mp3" },
  { title: "The Days When My Mother Was There", artist: "ATLUS Sound Team", src: "Mp3&4/TDWMMWT.mp3" },
  { title: "Jazzy NYC 99", artist: "Capcom Sound Team", src: "Mp3&4/JazzyNyc99.mp3" },
  { title: "Lone (Instrumental)", artist: "Tyler, the creator", src: "Mp3&4/Lone.mp3" }
];

let currentTrack = 0;
let errorZoneActive = false;

const bgAudio = document.getElementById("bg-audio");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const muteBtn = document.getElementById("mute-btn");

const normalPlaylist = [...playlist]; // backup of original

// === ERRORZONE SYSTEM ===
const errorPlaylist = [
  { title: "Virus://Vibrance", artist: "Vein", src: "Mp3&4/Vein.FM - Virus___Vibrance.mp3" },
  { title: "Old Data In A Dead Machine", artist: "Vein", src: "Mp3&4/Vein.FM - Old Data In A Dead Machine.mp3" },
  { title: "Rebirth Protocol", artist: "Vein", src: "Mp3&4/Vein.FM - Rebirth Protocol.mp3" },
  { title: "Broken Glass Complexion", artist: "Vein", src: "Mp3&4/Vein.FM - Broken Glass Complexion.mp3" },
  { title: "Anesthesia", artist: "Vein", src: "Mp3&4/Vein - Anesthesia.mp3" },
  { title: "Demise Automation", artist: "Vein", src: "Mp3&4/Vein.FM - Demise Automation (Official Music Video).mp3" },
  { title: "Doomtech", artist: "Vein", src: "Mp3&4/Vein.FM - Doomtech.mp3" },
  { title: "untitled", artist: "Vein", src: "Mp3&4/Vein.FM - untitled.mp3" },
  { title: "End Eternal", artist: "Vein", src: "Mp3&4/Vein.FM - End Eternal.mp3" },
  { title: "Errorzone", artist: "Vein", src: "Mp3&4/Vein.FM - Errorzone.mp3" },
  { title: "quitting infinity", artist: "Vein", src: "Mp3&4/Vein.FM - quitting infinity.mp3" }
];

// Load and play a track
function loadTrack(index) {
  const track = playlist[index];
  if (!track) return;
  bgAudio.src = track.src;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  bgAudio.play();
}

// Toggle Errorzone
const spotifyLink = document.getElementById("spotify-link");

function toggleErrorZone() {
  const btn = document.getElementById("errorzone-btn");

  if (!errorZoneActive) {
    // Enter
    errorZoneActive = true;
    document.body.classList.add("errorzone");
    btn.textContent = "Exit the Errorzone";

    // Change Spotify link to Errorzone album
    spotifyLink.textContent = "Spotify Album";
    spotifyLink.href = "https://open.spotify.com/album/5KSIgVF5lx4JURkS50jRS9?si=55ay1_8wQ0iu9fK9d3Vr4Q";

    playlist.length = 0;
    errorPlaylist.forEach(track => playlist.push(track));
    currentTrack = 0;
    loadTrack(currentTrack);

  } else {
    // Exit
    exitErrorZone();
  }
}

function exitErrorZone() {
  const btn = document.getElementById("errorzone-btn");

  errorZoneActive = false;
  document.body.classList.remove("errorzone");
  btn.textContent = "Enter the Errorzone";

  // Change Spotify link back to normal playlist
  spotifyLink.textContent = "Spotify Playlist";
  spotifyLink.href = "https://open.spotify.com/playlist/4ZV6n3ggzEVqGvPcCwdbcp?si=H17A5wdqT2ao1lN0nf3PEg";

  playlist.length = 0;
  normalPlaylist.forEach(track => playlist.push(track));
  currentTrack = 0;
  loadTrack(currentTrack);
}

// Track ends → move to next
bgAudio.onended = () => {
  if (errorZoneActive) {
    if (currentTrack < playlist.length - 1) {
      currentTrack++;
      loadTrack(currentTrack);
    } else {
      exitErrorZone(); // finished all errorzone tracks
    }
  } else {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
  }
};

// Mute/unmute
muteBtn.addEventListener("click", () => {
  bgAudio.muted = !bgAudio.muted;
  muteBtn.textContent = bgAudio.muted ? "Unmute" : "Mute";
});

// === TRANSITION INTO SITE ===

function setLastUpdated() {
  const lastUpdated = document.getElementById("last-updated");
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  lastUpdated.textContent = formattedDate;
}

function enterSite() {
  const cover = document.getElementById("cover");
  const mainContent = document.getElementById("main-content");
  const musicPlayer = document.getElementById("music-player");
  const noticeBanner = document.getElementById("notice-banner");

  cover.style.opacity = "0";
  cover.style.visibility = "hidden";

  setTimeout(() => {
    cover.style.display = "none";
    mainContent.style.display = "block";

    // Reveal music player
    musicPlayer.style.display = "flex";
    setTimeout(() => {
      musicPlayer.classList.add("show");
    }, 50);

    // Show notice
    setLastUpdated();
    noticeBanner.style.display = "flex";
  }, 1000);

  // Start playlist
  loadTrack(currentTrack);
}

//Last Update Notice
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("acknowledge-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      document.getElementById("notice-banner").style.display = "none";
    });
  }
});

// === OTHER FEATURES ===
function skipToEnd() {
  const introAudio = document.getElementById("intro-audio");
  introAudio.pause();
  enterSite();
}

//Music Minimize
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-player");
  const musicPlayer = document.getElementById("music-player");

  toggleBtn.addEventListener("click", () => {
    musicPlayer.classList.toggle("minimized");

    // Change arrow direction
    if (musicPlayer.classList.contains("minimized")) {
      toggleBtn.textContent = "▲";
    } else {
      toggleBtn.textContent = "▼";
    }
  });
});

// Tabs
function openTab(evt, tabId) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tablink');

  contents.forEach(c => c.classList.remove('active'));
  buttons.forEach(b => b.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
}

// Age Calculator
function calcDate() {
  const birthDate = new Date(2005, 9, 10);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  document.getElementById("age").textContent = age + " years old";
}

// === GAME CAROUSEL ===
const games = [
  {
    title: "Red Dead Redemption 2",
    image: "Images/Red Dead Redemption 2.png",
    desc: "What a world. The story, the characters, the atmosphere, the graphics, the music, the gameplay; the game is not perfect but the impact it had one me is unmatched by any other game. Red Dead Redemption 2 is my favourite game of all time. I've played it three times and even 100% precented it (Never again)."
  },
  {
    title: "Cyberpunk 2077",
    image: "images/Cyberpunk.png",
    desc: "Despite the horrible state it launched in, Cyberpunk 2077 has the best worldbuilding and atmosphere I have ever seen in a game. I've always loved cyberpunk affiliated media (Ghost in the Shell, Blade Runner, Akira etc.) but Cyberpunk 2077 is on another level. The atmosphere is so dense and immersive, I could really get into the world of Night City. The story and characters have always been Cyberpunk 2077s strongest points, unfortunately the gameplay (even after 2.0) is still just fine. I really hope CD Projekt Red can make a Cyberpunk Sequel or Prequel."
  },
  {
    title: "Black Ops 1",
    image: "Images/BO1.jpg",
    desc: "I grew up with THIS. My vibe. What an aesthetic. Campaign so damn cool with its mind-bending plot and ice cold characters. Zombies is iconic, I still play it to this day. Multiplayer is so damn fun, I grew up on maps like nuketown and firing range running around with my baby girl the olympia on search and destroy. The multiplayer was in an abysmal state when I was playing it (2014). The devs had moved on and hackers had run rampant with invisbilty and invincability. I was such a dumb kid I just thought you gained god like powers if you had bought the golden gun skin XD. I always think back to the time I beat my 18 year old spanish student at gun game at 7 years old. Or when I was playing a friendly 1v1 vs a random online and the final killcam was me hitting a cross-map tomhawk. They added me after and I had to tell them i coudlbt be there friend becasue my dad told me not to make friends with strangers online! Black Ops 1 will always have a special place in my heart <3."
  },
  {
    title: "The Witcher 3",
    image: "Images/Witcher3.png",
    desc: "Thank you for introducing me to the Witcher universe CD Projekt Red. I love the franchise so much now. The world is so dense and immersive, the characters are so well written and the story is so engaging. I love Geralt, Yennefer and Ciri. The side quests are some of the best I've ever seen in a game. The combat is fun and satisfying. The DLCs are also amazing, especially Blood and Wine. I love the new area of Toussaint, it's so beautiful and vibrant. The music is also fantastic, especially the main theme. Even video essays about the game live with me. During quarantine I watched a video essay about Witcher 1 and 2 almost every day. Joeseph Anderson better finish the last part of his Witcher 3 essay."
  },
  {
    title: "Left 4 Dead 2",
    image: "Images/L4d2.jpg",
    desc: "Timeless classic. The best co-op game ever made. The gameplay is so fun and satisfying, the infected are so diverse and the maps are so well designed. The community is also amazing, there are so many custom maps and mods to play with. Valve should be the gold standard for devolpment teams around the world. This is how you make a game."
  },
  {
    title: "Signalis",
    image: "Images/Signalis.png",
    desc: "Best survival horror game I've played in years. The sci-fi horror elements are so gripping. The soundtrack is haunting and beautiful. The pixel art style is so unique and charming even with so many other survival horror games with that art style. Some of the puzzles were too hard, I admit."
  },
  {
    title: "Spec Ops: The Line",
    image: "Images/Spec Ops The Line.jpg",
    desc: "Brutally honest and raw depiction of war. Grimey and dark. The greatest story ever in a shooter game. Fantasic world building. Dubai is oppressive and barren. Such a shame about its delisting from digital stores. All the more reason to buy a physical copy."
  },
  {
    title: "Cuphead",
    image: "Images/Cuphead.png",
    desc: "Cuphead you beautiful bastard. The art is styleeeeeee. The jazz soundtrack is bliss. I loved the bosses fights, even when I hated them. Delicious last course, banger dlc. Cuphead is a game I could not put down for long."
  }
];

let currentGame = 0;

const gameImage = document.getElementById("game-image");
const gameTitle = document.getElementById("game-title");
const gameDesc = document.getElementById("game-desc");

function updateCarousel(index) {
  gameImage.style.opacity = 0;
  setTimeout(() => {
    gameTitle.textContent = games[index].title;
    gameDesc.textContent = games[index].desc;
    gameImage.src = games[index].image;
    gameImage.style.opacity = 1;
  }, 300);
}

document.getElementById("next").addEventListener("click", () => {
  currentGame = (currentGame + 1) % games.length;
  updateCarousel(currentGame);
});

document.getElementById("prev").addEventListener("click", () => {
  currentGame = (currentGame - 1 + games.length) % games.length;
  updateCarousel(currentGame);
});