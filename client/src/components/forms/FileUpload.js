import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

const FileUpload = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    //resize
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
          },
          "base64"
        );
      }
    }
  };

  return (
    <div className="row">
      <label className="btn btn-primary btn-raised">
        Choose File
        <input
          onChange={fileUploadAndResize}
          type="file"
          multiple
          hidden
          accept="images/*"
        />
      </label>
    </div>
  );
};

export default FileUpload;
