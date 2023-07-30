import Replicate from "replicate"

const Wav2Lip = async ()=>{
    const replicate = new Replicate({
        auth: process.env.REACT_APP_REPLICATE_API_TOKEN,
      });
      
      const output = await replicate.run(
        "devxpy/cog-wav2lip:8d65e3f4f4298520e079198b493c25adfc43c058ffec924f2aefc8010ed25eef",
        {
          input: {
            face: "./amala_paul.jpeg",
            audio:"./my_audio_file.mp3"
          }
        }
      );
    console.log(output);
    return output
}
export default Wav2Lip;
  