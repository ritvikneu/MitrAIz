import React,{useState,useRef}  from "react";
import axios from 'axios'
const Recorder = (props)=>{
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [audioBlob,setAudioBlob] = useState(null)
    const [response, setResponse] = useState("")
    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };
    const mimeType = "audio/webm";
    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
      };
      const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
          //creates a blob file from the audiochunks data
           const audioBlob = new Blob(audioChunks, { type: mimeType });
          //creates a playable URL from the blob file.
           const audioUrl = URL.createObjectURL(audioBlob);
           setAudio(audioUrl);
           setAudioBlob(audioBlob)
           setAudioChunks([]);
        };
      };

      const sendToServerHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        if(audio){
            const url  = "http://127.0.0.1:8000/aiResponse/uploadRecord"
            axios.post(url,formData).then(res=>{
                setResponse(res.data.message);
            }).catch(error=>{
                console.log(error)
            })
        }
      }
    return (
        <div>
            <div className="audio-controls">
                {!permission ? (
                <button onClick={getMicrophonePermission} type="button">
                    Get Microphone
                </button>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                <button onClick={startRecording} type="button">
                    Start Recording
                </button>
                ) : null}
                {recordingStatus === "recording" ? (
                <button onClick={stopRecording} type="button">
                    Stop Recording
                </button>
                ) : null}
            </div>
            <div>
            {audio ? (
                <div className="audio-container">
                    <audio src={audio} controls></audio>
                    <a download href={audio}>
                        Download Recording
                    </a>
                </div>
                ) : null}
            </div>
            <div>
             <button onClick={sendToServerHandler}>SendToServer</button>   
            </div>
            <div style={{color:"white"}}>
                {response}
            </div>
        </div>
    )
}

export default Recorder;