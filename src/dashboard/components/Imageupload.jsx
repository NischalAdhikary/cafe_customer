import { useEffect, useRef, useState } from "react";

export default function ImageUpload({ value, onChange, Edit }) {
  const [preview, setPreview] = useState(null);
  const [isFromBackend, setIsFromBackend] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (Edit && value) {
      setPreview(value);
      setIsFromBackend(true);
    } else {
      setPreview(value || null);
      setIsFromBackend(false);
    }
  }, [value, Edit]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setIsFromBackend(false);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={handleClick}
        className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-400"
      >
        {preview ? (
          <img
            src={
              isFromBackend
                ? `http://localhost:9000/uploads/${preview}`
                : preview
            }
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Click to upload</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
