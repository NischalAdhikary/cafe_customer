import React, { useRef, useState } from "react";
import { Scan, X } from "lucide-react";

export default function CameraAccess() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleCameraClick = () => {
    if (isCameraOpen) {
      stopCamera();
    } else {
      startCamera();
    }
    setIsCameraOpen(!isCameraOpen);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCameraClick}
        className={`${
          isCameraOpen ? "bg-red-500" : "bg-blue-500"
        } text-white w-full flex items-center justify-center gap-3 px-4 py-2 rounded`}
      >
        {isCameraOpen ? <X /> : <Scan />}
        {isCameraOpen ? "Close" : "Scan Table"}
      </button>

      {isCameraOpen && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="mt-4 w-full max-w-md rounded shadow"
        />
      )}
    </div>
  );
}
