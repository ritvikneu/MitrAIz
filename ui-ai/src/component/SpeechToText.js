import React, { useState,useRef } from "react";
import axios from 'axios'
import Wav2Lip from "./Wav2lip";

const SpeechToText = () =>{
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
// const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.maxAlternatives = 1;
const [speechText, setSpeechText] = useState();
const [isMicOn, setIsMicOn] = useState();
const [audioResponse, setAudioResponse] = useState();
//
const [videoResponse, setVideoResponse] = useState();

const videoRef = useRef(null);

    const speechConverter = (e)=>{
        e.preventDefault()
        if(!isMicOn){
            setIsMicOn(true)
            recognition.start();
        }
        else{
            setIsMicOn(false);
            recognition.stop();
            sendToServerHandler();
            //sendDataToServer
        }
           
    }
    recognition.onresult = (event)=>{
        console.log("working on result")
        const transcript = Array.from(event.results).map(r=> r[0]).map(r=>r.transcript)
        console.log(transcript);
        setSpeechText(transcript);
    }
    recognition.addEventListener('end', () => 
    {   if(isMicOn){
            recognition.start()
        }
        else{
         console.log(speechText);   
        }
    })

    const sendToServerHandler = async() =>{
        const params = {
            question:speechText.join(' '),
            promptType:'chatGPT'
        }
       // Wav2Lip();

            const url  = "http://127.0.0.1:8000/aiResponse/chatgpt/prompt"
            console.log(params);
            const res = await axios.post(url,params,{responseType:'arraybuffer'});
            await lipSync(res.data);
            console.log(res.data);
            // const data = await textToSpeech(res.data.reply)
            // const blob = new Blob([data], { type: 'audio/mpeg' });
            // const audioURL = URL.createObjectURL(blob);
            // const downloadLink = document.createElement('a');
            // downloadLink.href = audioURL;

            // downloadLink.download = 'audio.mp3'; // Replace 'my_audio_file.mp3' with your desired file name and extension

            // document.body.appendChild(downloadLink);

            // downloadLink.click();

            // document.body.removeChild(downloadLink);
            // setAudioResponse(audioURL); 
            
      }
  
      const textToSpeech = async (inputText) => {
        // Set the API key for ElevenLabs API. 
        // Do not use directly. Use environment variables.
        console.log(process.env.REACT_APP_ELEVEN_LABS_KEY )
        const API_KEY = process.env.REACT_APP_ELEVEN_LABS_KEY;
        // Set the ID of the voice to be used.
        const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
       
        // Set options for the API request.
        const options = {
          method: 'POST',
          url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
          headers: {
            accept: 'audio/mpeg', // Set the expected response type to audio/mpeg.
            'content-type': 'application/json', // Set the content type to application/json.
            'xi-api-key': `${API_KEY}`, // Set the API key in the headers.
          },
          data: {
            text: inputText, // Pass in the inputText as the text to be converted to speech.
          },
          responseType: 'arraybuffer', // Set the responseType to arraybuffer to receive binary data as response.
        };
      
        // Send the API request using Axios and wait for the response.
        const speechDetails = await axios.request(options);
      
        // Return the binary audio data received from the API response.
        return speechDetails.data;
      };

      let lipSync = async(data)=>{
        const videoBlob = new Blob([data], { type: 'video/mp4' });

        // Create an object URL from the blob
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoResponse(videoUrl);
        // Set the video source URL
        // videoRef.current.src = videoUrl;

        // // Play the video on mount
        // videoRef.current.play();
      } 


    return(
        <>
        <button onClick={speechConverter}>Speech to text converter</button>
        <div style={{color:'black'}}>
            {speechText}
        </div>
        

        {/* <div style={{color:'black'}}>
           <strong>{response}</strong> 
        </div> */}
        <div>

        {audioResponse ? (<div className="audio-container">
                <audio autoPlay controls>
                    <source src={audioResponse} type="audio/mpeg" />
                </audio>

            </div>):null}
        {videoResponse ? (
            <div>
                <video width="320" height="240" autoPlay controls>
                    <source src={videoResponse} type="video/mp4"></source>
                </video>
            </div>
        ):null}
            
        </div>
        </>
    )
}

export default SpeechToText;