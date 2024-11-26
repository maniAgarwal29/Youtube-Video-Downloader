import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function App() {
  const [URL, setURL] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInput = (e) => {
    e.preventDefault()

    setURL(e.target.value)
  }

  const downloadVideo = async (e) => {
    e.preventDefault()
    setLoading(true)

    const options = {
      method: 'GET',
      url: 'https://youtube-data8.p.rapidapi.com/video/streaming-data/',
      params: {id: URL},
      headers: {
        'x-rapidapi-key': '2fd11a857amshf6b5a747cb04647p10da87jsnab1af97b1e37',
        'x-rapidapi-host': 'youtube-data8.p.rapidapi.com',
        'content-type': 'application/json'
      }
    };

    try {
      const rspn = await axios.request(options)
      console.log(rspn.data)
      const formats = rspn?.data?.formats;
      if (formats && formats.length > 0) {
        const videoUrl = formats[Number(0)]?.url;
        if (videoUrl) {
          console.log(videoUrl);
          window.location.href = videoUrl;
        } else {
          console.log("No video URL available.");
        }
      } else {
        console.log("No video formats available.");
      }
    } catch (error) {
      console.log("Error fetching video data:", error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-black text-white">
      <div className="flex items-center justify-center gap-x-2 mb-5">
        <FaYoutube size={60} className="text-red-600"/>
        <p className="text-2xl font-bold text-red-400">
          Video Downloader
        </p>
      </div>

      <div className="flex items-center justify-center gap-x-2">
        <input type="url" className="h-10 w-96 border-none outline-none px-5 rounded-lg shadow-lg text-black" onChange={handleInput} placeholder="Enter YouTube Video URL"/>
        <button className="h-10 bg-red-600 text-white px-4 rounded-lg border-none outline-none flex items-center justify-center" onClick={downloadVideo} disabled={loading}>
          {loading ? <FaSpinner className="animate-spin"/> : "Download"}
        </button>
      </div>
    </div>
  )
}

export default App