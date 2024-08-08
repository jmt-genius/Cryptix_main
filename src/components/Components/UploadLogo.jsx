import React, { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

//Internal imports
import UploadICON from "./SVG/UploadICON";

const UploadLogo = ({
  imageUrl,
  setImageUrl,
  setLoader,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
}) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const url = `https://gateway.pinata.cloud/ipfs${response.data.IpfsHash}`;

        setImageUrl(url);
        setLoader(false);
        notifySuccess("Logo Uploaded Successfully");
      } catch (error) {
        setLoader(false);
        notifyError("Please check your Pinata key!");
        console.log(error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 500000000000,
  });

  return (
    <>
      {imageUrl ? (
        <div>
          <img
            src={imageUrl}
            style={{ width: "200px", height: "auto" }}
            alt=""
          />
        </div>
      ) : (
        <div {...getRootProps()}>
          <label for="file" className="custum-file-upload">
            <div className="icon">
              <UploadICON />
            </div>
            <div className="text">
              <span>Click to upload Logo</span>
            </div>
            <input type="file" id="file" {...getInputProps()} />
          </label>
        </div>
      )}
    </>
  );
};

export default UploadLogo;

// Used Pinata