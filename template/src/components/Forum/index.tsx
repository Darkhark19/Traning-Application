import styles from "./styles.module.scss";
import logo from "../../assets/Genealogika_logo.png";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/button";

import { api } from "../../services/api";
import { useState, FormEvent, useEffect } from "react";

//import io from "socket.io-client";

type Ticket = {
  id: string;
  subject: string;
  content: string;
  user: {
    name: string;
  };
};

//const socket = io("http://localhost:4000");

//socket.on("new_ticket", (newTicket) => {
// console.log(newTicket);
//});

export function Forum() {
  const navigate = useNavigate();

  const navigateTicketForm = () => {
    navigate("/");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newTicket, setNewTicket] = useState("");
  const [content, setNewContent] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [subject, setSubject] = useState("");
  const [user, setUser] = useState("");
  const [firstRun, setFirstRun] = useState(true);

  function getTickets() {
    //getId();
    api
      .get<Ticket[]>("tickets")
      .then((response) => {
        setTickets(response.data);
        //});
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
  }
  if (firstRun) {
    getTickets();
    setFirstRun(false);
  }

  async function getId() {
    await api.post("id-from-token", {}).then((response) => {
      setUser(response.data);
    });
  }

  async function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (!subject.trim()) getTickets();
    else {
      await api.post("tickets-by-subject", { subject }).then((response) => {
        setTickets(response.data);
      });
    }
  }

  async function handleAddTicket(event: FormEvent) {
    if (!newTicket.trim() || !content.trim()) return;
    getId();
    console.log("AQUI");
    console.log(user);
    await api.post("create-ticket", {
      subject: newTicket,
      content,
      user_id: user,
    });
    getTickets();
    handleClose();
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a new Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                autoFocus
                onChange={(event) => setNewTicket(event.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Content"
                autoFocus
                onChange={(event) => setNewContent(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTicket}>
            Add Ticket
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onSubmit={handleSearch}
              onChange={(event) => setSubject(event.target.value)}
              value={subject}
            />
            <Button
              type="button"
              variant="success"
              className={styles.btn}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
          <Button
            type="button"
            onClick={handleShow}
            variant="outline-success"
            className={styles.btn}
          >
            Help?
          </Button>
        </Container>
      </Navbar>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.user.name}</td>
                  <td>{val.subject}</td>
                  <td>{val.content}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
