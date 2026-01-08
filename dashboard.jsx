import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FaComments } from "react-icons/fa";  // Chatbot Icon

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setUploadedImage(acceptedFiles[0]);
      setPrediction(null);
    },
  });

  const handlePredict = async () => {
    if (!uploadedImage) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedImage);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "250px", backgroundColor: "#1E1E2F", color: "#fff", padding: "20px" }}>
        <h3>Dashboard</h3>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h2>Upload Your Image</h2>

        <div 
          {...getRootProps()} 
          style={{ 
            border: "2px dashed #FF6B6B", 
            padding: "50px", 
            borderRadius: "12px", 
            cursor: "pointer", 
            textAlign: "center", 
            marginBottom: "20px"
          }}
        >
          <input {...getInputProps()} />
          {uploadedImage ? (
            <img 
              src={URL.createObjectURL(uploadedImage)} 
              alt="Preview" 
              style={{ maxWidth: "300px", borderRadius: "10px" }} 
            />
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>

        <button 
          onClick={handlePredict} 
          className="btn btn-success" 
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict Disease"}
        </button>

        {prediction && (
          <div style={{ marginTop: "20px", fontSize: "20px", color: "#FF6B6B" }}>
            <strong>Prediction Result:</strong> {prediction}
          </div>
        )}
      </div>

      {/* Floating Chatbot Button */}
      <button
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          width: "60px",
          height: "60px",
          backgroundColor: "#FF6B6B",
          borderRadius: "50%",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        <FaComments size={28} color="white" />
      </button>

    </div>
  );
}
