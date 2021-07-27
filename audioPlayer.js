let playBtn = document.getElementById("playBtn");
      let prevBtn = document.getElementById("prevBtn");
      let nextBtn = document.getElementById("nextBtn");
      let audioPlayer = document.getElementById("audioPlayer");
      let image = document.getElementById("image");
      let artistName = document.getElementById("artistName");
      let songName = document.getElementById("songName");
      let ranges = document.getElementById("volume-control");
      const progress = document.querySelector(".progress");
      const progressBar = document.querySelector(".progress__filled");
      const bar = document.querySelectorAll(".dance")
      // const music = document.getElementById("music")
      // const parse = document.getElementById("perse")
      // const btn = document.getElementById("btn")

      // btn.addEventListener("click", ()=>{
      //   console.log(music.value);
      //   // console.log(parse.value);
      //   parse.setAttribute("src", music.value )
      //   console.log(parse.getAttribute("src"));
      // })
      // audioPlayer.play = false

      if (audioPlayer.play === true) {
        for(i = 0; i< bar.length; i++){
          bar[i].style.animationIterationCount= "infinite"
      }
    }
      else{
        for(i = 0; i< bar.length; i++){
          bar[i].style.animationIterationCount= 0
      }
      }
      let allSongs = [
        (Music1 = {
          artist: "Bob Acri",
          musicFile: "SleepAway.mp3",
          musicName: "Sleep Away",
          artistPic: "audioPic/SleepPic.PNG",
        }),
        (Music2 = {
          artist: "Richard",
          musicFile: "MaidwithFlaxen.mp3",
          musicName: "Maid Flaxen",
          artistPic: "audioPic/MaidPic.PNG",
        }),
        (Music2 = {
          artist: "Mr Scruff",
          musicFile: "Kalimba.mp3",
          musicName: "Kalimba",
          artistPic: "audioPic/NinjaPic.PNG",
        }),
      ];

      let counter = 0;

      playBtn.addEventListener("click", playSong);

      function playSong() {
        if (playBtn.innerHTML === '<i class="fa fa-pause"></i>') {
          playBtn.innerHTML = '<i class="fa fa-play"></i>';
          audioPlayer.pause();
          for(i = 0; i< bar.length; i++){
            bar[i].style.animationIterationCount= 0
          }
          
        } else if (playBtn.innerHTML === '<i class="fa fa-play"></i>') {
          playBtn.innerHTML = '<i class="fa fa-pause"></i>';
          audioPlayer.play();
          for(i = 0; i< bar.length; i++){
            bar[i].style.animationIterationCount= "infinite"
          }
        }
      }

      nextBtn.addEventListener("click", nextSong);

      function nextSong() {
        if (playBtn.innerHTML === '<i class="fa fa-play"></i>'){
          playBtn.innerHTML = '<i class="fa fa-pause"></i>'
        }
        for(i = 0; i< bar.length; i++){
          bar[i].style.animationIterationCount= "infinite"
        }
        counter++;
        if (counter > allSongs.length - 1) {
          counter = 0;
        }
        audioPlayer.src = allSongs[counter].musicFile;
        image.src = allSongs[counter].artistPic;
        artistName.innerHTML = allSongs[counter].artist;
        songName.innerHTML = allSongs[counter].musicName;
        
        // playBtn.innerHTML ='<i class="fa fa-pause"></i>'
        audioPlayer.play();
      }

      prevBtn.addEventListener("click", previousSong);
      function previousSong() {
        if (playBtn.innerHTML === '<i class="fa fa-play"></i>'){
          playBtn.innerHTML = '<i class="fa fa-pause"></i>'
        }
        for(i = 0; i< bar.length; i++){
          bar[i].style.animationIterationCount= "infinite"
        }
        counter--;
        if (counter < 0) {
          counter = allSongs.length - 1;
        }
        audioPlayer.src = allSongs[counter].musicFile;
        image.src = allSongs[counter].artistPic;
        artistName.innerHTML = allSongs[counter].artist;
        songName.innerHTML = allSongs[counter].musicName;

        audioPlayer.play();
      }

      ranges.addEventListener("change", handleRangeUpdate);
      function handleRangeUpdate() {
        audioPlayer[this.name] = this.value;
      }

      audioPlayer.addEventListener("timeupdate", handleProgress);
      function handleProgress() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
        
      }

      let mousedown = false;
      progress.addEventListener("click", scrub);

      function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * audioPlayer.duration;
        audioPlayer.currentTime = scrubTime;
        console.log(e.offsetX);
        console.log(progress.offsetWidth);
        console.log(audioPlayer.currentTime);
    }
      progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
      progress.addEventListener("mousedown", () => (mousedown = true));
      progress.addEventListener("mouseup", () => (mousedown = false));