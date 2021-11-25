import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    //resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("Image Upload res data", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, image: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("Cloudinary upload err", err);
              });
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
