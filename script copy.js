console.log("welcome to spotify");
let songindex=0;
let audioelement= new Audio('songs/1.mp3');
let masterplay= document.getElementById("masterplay");
let myprogressbar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let songitem= Array.from(document.getElementsByClassName('songitem'));
let songs=[
    { songname: "Let me love you - justin bieber", filepath: "songs/1.mp3", coverpath: "cover/1.jpg" },
    { songname: "Bhool Jaa Arijit Singh", filepath: "songs/2.mp3", coverpath: "cover/2.jpg" },
    { songname: "Jalsa2 Mission Raniganj", filepath: "songs/3.mp3", coverpath: "cover/3.jpg" },
    { songname: "Nasha Sukhee ", filepath: "songs/4.mp3", coverpath: "cover/4.jpg" },
    { songname: "Raabta Jubin Nautiyal ", filepath: "songs/5.mp3", coverpath: "cover/5.jpg" },
    { songname: "Title Track Shiddat", filepath: "songs/6.mp3", coverpath: "cover/6.jpg" },
    { songname: "Ghar Nahi Jaanagumraah ", filepath: "songs/7.mp3", coverpath: "cover/7.jpg" },
    { songname: "Dil Laaleya Kay Vee Singh", filepath: "songs/8.mp3", coverpath: "cover/8.jpg" },
] 

songitem.forEach((element, i)=>{
  console.log(element,i);
  element.getElementsByTagName("img")[0].src =songs[i].coverpath;
  element.getElementsByClassName("songname")[0].innerText =songs[i].songname;
}) 

 
// audioelement.play();

// listen to events
masterplay.addEventListener("click",()=>{
  if(audioelement.paused|| audioelement.currentTime<=0 ) {
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    gif.style.opacity=1;

  } else{
    audioelement.pause();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
    gif.style.opacity=0;

  }
})
audioelement.addEventListener("timeupdate",()=>{
    
    progress= parseInt((audioelement.currentTime/audioelement.duration)*100);
    myprogressbar.value= progress;
    
});
myprogressbar.addEventListener("change", ()=>{
    audioelement.currentTime= myprogressbar.value* audioelement.duration/100;
});

const makeallplays= ()=>{
  Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.classList.remove('fa-pause-circle'); 
    element.classList.add('fa-play-circle');
    
  })
}

const playSong = () => {
  myprogressbar.value = 0;
  document.getElementById('songinfo_songname').innerHTML = songs[songindex - 1].songname;
  Array.from(document.getElementsByClassName('songitemplay')).forEach((elem) => {
    elem.classList.remove('fa-pause-circle');
    elem.classList.add('fa-play-circle');
  });
  document.getElementById(songindex).classList.remove('fa-play-circle');
  document.getElementById(songindex).classList.add('fa-pause-circle');
  audioelement.src= `songs/${songindex}.mp3`;
  audioelement.currentTime=0.1
  audioelement.play();
  masterplay.classList.remove('fa-play-circle');
  masterplay.classList.add('fa-pause-circle');
}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
element.addEventListener('click',(e)=>{
 makeallplays();
 songindex= parseInt(e.target.id);
  playSong();
});


});
document.getElementById('previous').addEventListener('click', ()=>{
  if(songindex<=1){
    songindex=8;
  }else{
    songindex -=1;
    audioelement.currentTime=0
  }
  playSong();
  audioelement.play();
  
  
})
document.getElementById('next').addEventListener('click', ()=>{
  if(songindex>=8){
    songindex = 1;
  }else{
    songindex +=1;
    audioelement.currentTime=0
  }
  
  playSong();
  
})

 