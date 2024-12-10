let index = 0;
export default class MusicAnalyser {
    constructor(Songs){
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.songs = [];
        this.currentSong = 0;

        Songs.forEach(element => {
            let audioElement = document.getElementById(element);
            let source = this.audioContext.createMediaElementSource(audioElement);
            this.songs.push({source: source, audioElement: audioElement});
            this.songs[element] = this.songs[index];
            index++;
        });

        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;

        let currentSong = this.songs[this.currentSong];
        currentSong.source.connect(this.analyser);
        currentSong.source.connect(this.audioContext.destination);
    }

    SetSong(index){
        let currentSong = this.songs[this.currentSong];
        currentSong.source.disconnect(this.analyser);
        currentSong.source.disconnect(this.audioContext.destination);

        this.currentSong = index;
        
        let newSong = this.songs[this.currentSong];
        newSong.source.connect(this.analyser);
        newSong.source.connect(this.audioContext.destination);
    }

    SetRandomSong(Songs){
        if(Songs != undefined) this.SetSong(Songs[Math.floor(Math.random() * Songs.length)]);
        else this.SetSong(Math.floor(Math.random() * this.songs.length));
    }

    GetDataArray()
    {
        let dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }

    Restart()
    {
        this.songs[this.currentSong].audioElement.currentTime = 0;
        this.Play();
    }

    Play()
    {
        this.songs[this.currentSong].audioElement.play();
    }

    Stop()
    {
        this.songs[this.currentSong].audioElement.pause();
    }
}