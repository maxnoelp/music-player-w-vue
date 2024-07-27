Vue.createApp({
  data() {
    return {
      songs: [
        {
          songname: "Schicksal der Uchiha",
          artist: "Animetrix",
          url: "music/schicksal-derUchiha.mp3",
          image: "image/uchiha.jpg",
        },
        {
          songname: "Konter Total",
          artist: "Animetrix",
          url: "music/konter-total.mp3",
          image: "image/konter.jfif",
        },
        {
          songname: "Blatt vom Kalender",
          artist: "Raportagen",
          url: "music/blatt-kalender.mp3",
          image: "image/raportagen.jpg",
        },
        {
          songname: "Lebewohl, Akira Toriyama",
          artist: "Anbu Monastir & Animetrix",
          url: "music/lebewohl.mp3",
          image: "image/lebewohl-akira.jpg",
        },
      ],
      currentIndex: 0,
      audio: null,
      duration: 0,
      currentTime: "0:00",
      audioCurrentTime: 0,
      isActive: false,
    };
  },
  methods: {
    playMusic() {
      if (this.audio) {
        if (!this.audio.paused) {
          this.audio.pause(); // pausiert
          this.pausedAt = this.audio.currentTime; // speichert die Zeit
          this.isActive = false; // update für die Class Rotate
          return;
        }
      }
      this.audio = new Audio(this.songs[this.currentIndex].url); //song auswahl

      this.audio.currentTime = this.pausedAt || 0; //aktuelle Zeit wird hochgezählt oder an jeweiliger stelle pausiert

      this.audio.addEventListener("loadedmetadata", () => {
        this.duration = this.audio.duration; //länge des song titels wird dann mit hilfe von formatTime ermittelt
      });

      this.audio.addEventListener("timeupdate", () => {
        this.audioCurrentTime = this.audio.currentTime;
        this.currentTime = this.formatTime(this.audioCurrentTime); //hier passiert die magic des hochzählen für die aktuelle zeit
      });

      this.audio.play();
      this.isActive = !this.isActive;
    },
    //aktueller Index wird hochgezählt und dann der jeweilige Titel wiedergegeben
    nextMusic() {
      if (this.audio) {
        this.audio.pause();
        this.currentTime = "0:00"; //timer bei vor und zurück auf 0 setzen
      }
      this.currentIndex = (this.currentIndex + 1) % this.songs.length;
      this.playMusic();
      this.isActive = !this.isActive;
    },
    //aktueller Index wird runtergezählt und dann der jeweilige titel wiedergeben
    backMusic() {
      if (this.audio) {
        this.audio.pause();
        //timer bei vor und zurück auf 0 setzen
      }
      this.currentIndex = (this.currentIndex - 1) % this.songs.length;
      if (this.currentIndex <= 0) {
        return (this.currentIndex = 0);
      }
      this.currentTime = "0:00";
      this.playMusic();
      this.isActive = !this.isActive;
    },
    //aktueller Song wird auf pause gesetzt
    // pauseMusic() {
    //   this.pausedAt = this.audio.currentTime;
    //   this.audio.pause(this.currentIndex);
    //   this.isActive = !this.isActive;
    // },

    //ausrechnen der Länge vom aktuellen titel
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60); //minuten
      const secondsPart = Math.floor(seconds % 60); //sekunden
      return `${minutes}:${secondsPart < 10 ? "0" : ""}${secondsPart}`;
    },
  },
}).mount("#app");
