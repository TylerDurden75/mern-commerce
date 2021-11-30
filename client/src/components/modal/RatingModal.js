import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import { useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  let { slug } = useParams();
  let navigate = useNavigate();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      navigate("/login", { state: { from: `/product/${slug}` } });
    }
  };

  return (
    <React.Fragment>
      <div onClick={handleModal}>
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
