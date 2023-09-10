import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./general.css";
import BackgroundImage from "../../assets/images/bg.png";
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const Types = [
    { id: 1, label: "Farm" },
    { id: 2, label: "Academy" },
    { id: 3, label: "Headquarters" },
    { id: 4, label: "LumberMill" },
    { id: 5, label: "Barracks" },
  ];

  const [formData, setFormData] = useState({
    buildingType: Types[0].id,
    buildingCost: "",
    constructiontime: "",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);

    setFormData({
      buildingType: Types[0].id,
      buildingCost: "",
      constructionTime: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "buildingCost") {

      const cost = parseFloat(value);
      if (!isNaN(cost) && cost >= 0) {
        setFormData({ ...formData, [name]: cost });
      }
    } else if (name === "constructionTime") {

      const time = parseInt(value);
      if (!isNaN(time) && time >= 30 && time <= 1800) {
        setFormData({ ...formData, [name]: time });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {

    const cost = parseFloat(formData.buildingCost);
    const time = parseInt(formData.constructiontime);
    debugger
    if (isNaN(cost) || cost < 0 || cost == 0 ) {
      alert("Building Cost: Please enter values ​​greater than 0.");
      return;
    }else if( isNaN(time) || time < 30 || time > 1800){
      alert("Construction Time: Please enter values ​​between 30 and 1800 seconds.");
      return;

    }
    window.location.reload();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch("https://localhost:7255/api/configuration/add", requestOptions)
      .then((res) => {
        if (res.ok && res.status === 200) {
          return res.json();
        } else {
          throw new Error("Response is not OK or status is not 200");
        }
      })
      .then((data) => {
        console.log(data);

        window.location.reload();
      })
      .catch((err) => {
        console.error(err);

      });

    closeModal(); 
  };

  const [configurations, setConfigurations] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7255/api/configuration")
      .then((res) => res.json())
      .then((data) => setConfigurations(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="text-center" style={HeaderStyle}>
      <h2
        className="list-title"
        style={{
          fontWeight: "bold",
          fontSize: "44px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        Configuration List
      </h2>
      <div className="text-right" style={{ margin: "0 150px" }}>
        <Button variant="primary" onClick={openModal} style={{ marginBottom: "10px" }}>
          Add Configuration
        </Button>
      
      </div>

      <div style={{ margin: "0 150px" }}>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Building Type</th>
              <th>Building Cost</th>
              <th>Construction Time</th>
            </tr>
          </thead>
          <tbody>
            {configurations.map((item, index) => (
              <tr key={index}>
                <td>{Types.find((type) => type.id === item.buildingType).label}</td>
                <td>{item.buildingCost}</td>
                <td>{item.constructiontime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/login" >
          <button className="primary-button"  style={{ margin: "-50px" }}>Log Out</button>
        </Link>
      </div>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <Form>
              <Form.Group controlId="buildingType">
                <Form.Label>Building Type</Form.Label>
                <Form.Control
                  as="select"
                  name="buildingType"
                  value={formData.buildingType}
                  onChange={handleInputChange}
                >
                  {Types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="buildingCost">
                <Form.Label>Building Cost</Form.Label>
                <Form.Control
                  type="text"
                  name="buildingCost"
                  value={formData.buildingCost}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="constructionTime">
                <Form.Label>Construction Time</Form.Label>
                <Form.Control
                  type="text"
                  name="constructiontime"
                  value={formData.constructiontime}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
