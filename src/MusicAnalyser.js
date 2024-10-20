export default class MusicAnalyser {
    constructor(Song){
        this.audioElement = document.getElementById(Song);
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.source = this.audioContext.createMediaElementSource(this.audioElement);

        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;

        this.source.connect(this.analyser);
        this.source.connect(this.audioContext.destination);
    }

    GetDataArray()
    {
        let dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        return dataArray;
    }

    SetAudioElement(Song)
    {
        this.audioElement = document.getElementById(Song);
        this.source = this.audioContext.createMediaElementSource(this.audioElement);
    }

    Play()
    {
        this.audioElement.play();
    }

    Stop()
    {
        this.audioElement.pause();
    }
}