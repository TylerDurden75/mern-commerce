import React from "react";

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
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
