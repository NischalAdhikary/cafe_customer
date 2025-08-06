import React, { useRef, useState } from "react";

import { Scan } from "lucide-react";
export default function CameraAccess() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);

  const handleCameraClick = async () => {
    setIsCameraOpen(!isCameraOpen);

    try {
      const stream = isCameraOpen
        ? await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          })
        : null;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCameraClick}
        className="bg-blue-500 text-white w-full flex items-center justify-center gap-3 px-4 py-2 rounded"
      >
        <Scan />
        Scan Table
      </button>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="mt-4 w-full max-w-md"
      />
    </div>
  );
}
