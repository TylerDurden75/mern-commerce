import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <div onClick={() => setModalVisible(true)}>
        <StarOutlined style={{ color: "#f1a545" }} />
        <br /> {user ? "Leave rating" : "login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for you review. It will appear soon.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </React.Fragment>
  );
};

export default RatingModal;
