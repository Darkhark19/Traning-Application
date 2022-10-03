import { api } from "../../services/api";
import { useState, useEffect, FormEvent } from "react";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Navbar from "react-bootstrap/Navbar";
import { OrgDiagram, FamDiagram } from "basicprimitivesreact";
import Container from "react-bootstrap/Container";
import { PageFitMode, Enabled, GroupByType } from "basicprimitives";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserPlus,faUserSlash,faEnvelopeOpen,faPlus} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/person-icon.png";
import { NavDropdown, Modal } from "react-bootstrap";

import styles from "./styles.module.scss";

var photos = {
  a:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn" +
    "QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC" +
    "RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh" +
    "ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e" +
    "ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+" +
    "0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6" +
    "5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt" +
    "iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII=",
};
/*<button
            key="3"
            className="StyledButton"
            onClick={(event) => {
              event.stopPropagation();
              setIdP(itemConfig.id);
              handleShowC();
            }}
          ></button>*/

type NodeDB = {
  id: string;
  name: string;
  parents: NodeDB[];
  children: NodeDB[];
};
let tree : NodeDB[] =[];

export function TreeHome() {
 
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseP = () => setShowP(false);
  const handleShowP = () => setShowP(true);
  const [idP, setIdP] = useState("");
  const [newNode, setNewNode] = useState("");
  const [firstRun, setFirstRun] = useState(true);
  const [content, setContent] = useState(""); 
  const [nodes, setNodes] = useState([]);
  const [showC, setShowC] = useState(false);
  const handleCloseC = () => setShowC(false);
  const handleShowC = () => setShowC(true);
  const [parent, setParent] = useState("");

  if (firstRun) {
    SelectNodes();
    setFirstRun(false);
  }

  async function CreateNewNodeP(event: FormEvent) {
    event.preventDefault();

    if (!newNode.trim()) {
      return;
    }
    var id = idP;

    await api.post("create-node-parent", {
      name: newNode,
      parent: id,
      content,
    });
    processNodes();
    handleCloseP();
  }

  async function onRemoveButtonClick(id: string ) {
    await api.post("delete-node", { id });
    processNodes();
  }
  async function CreateNewNode(event: FormEvent) {
    event.preventDefault();
    if (!newNode.trim()) {
      return;
    }
    await api.post("create-node", { name: newNode, content });
    processNodes();
    handleClose();
  }
  function CreateNewParent(){
    api.put("link-parent",{id:idP, parent});
    processNodes();
  }
  function processNodes() {
    api
      .get<NodeDB[]>("nodes")
      .then((response) => {
        tree = response.data;
        let nodes = [];
        for (var i = 0; i < tree.length; i++) {
          var p = tree[i].parents;
          var parentsResult = [];
          if (p)
            for (var j = 0; j < p.length; j++) {
              parentsResult.push(p[j].id);
            }
          if (parentsResult.length == 0) {
            parentsResult = null;
          }
          nodes.push({
            id: tree[i].id,
            parents: parentsResult,
            title: tree[i].name,
            image: logo,
          });
        }
        setNodes(nodes);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          alert("Sem cookie");
        }
      });
  }

  function AddParents(node: NodeDB) {
    var parents = node.parents;
    var result = [];
    if (parents)
      for (var i = 0; i < parents.length; i++) {
        result.push({
          id: parents[i].id,
          parents: [],
          title: parents[i].name,
          image: logo,
        });
      }
    return result;
  }

  function AddChilds(nodes: NodeDB[], name: String) {
    var result = [];
    for (var i = 0; i < nodes.length; i++) {
      var parChild = nodes[i].parents;
      for (var k = 0; k < parChild.length; k++) {
        if (name == parChild[k].name) {
          result.push({
            id: nodes[k].id,
            parents: name,
            title: nodes[k].name,
            image: logo,
          });
        }
      }
    }
    return result;
  }

 
  function SelectNodes() {
    if (search == "") {
      processNodes();
    } else {
      api.get<NodeDB[]>("nodes").then((response) => {
        let tree = response.data;
        var newNodes = [];
        for (var i = 0; i < tree.length; i++) {
          var node = tree[i];
          if (node.name == search) {

            let par = node.parents;
            let parents = [];
            for (var j = 0; j < par.length; j++) parents.push(par[j].id);

            newNodes.push({
              id: node.id,
              parents: parents,
              title: node.name,
              image: logo,
            });
            newNodes.push(AddParents(node));
            newNodes.push(AddChilds(tree, search));
          }
        }
        setNodes(newNodes);
      });
    }
  }
  const config = {
    pageFitMode: PageFitMode.AutoSize,
    autoSizeMinimum: { width: 100, height: 100 },
    cursorItem: 2,
    highlightItem: 0,
    hasSelectorCheckbox: Enabled.False,
    items: nodes,
    linesWidth: 1,
    linesColor: "black",
    normalLevelShift: 20,
    dotLevelShift: 20,
    lineLevelShift: 20,
    normalItemsInterval: 10,
    dotItemsInterval: 30,
    lineItemsInterval: 30,
    arrowsDirection: GroupByType.Children,
    showExtraArrows: false,
    onButtonsRender: ({ context: itemConfig }) => {
      return (
        <>
          <button
            key="1"
            className="StyledButton"
            onClick={(event) => {
              event.stopPropagation();
              setIdP(itemConfig.id);
              handleShowP();
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <button
            key="2"
            className="StyledButton"
            onClick={(event) => {
              event.stopPropagation();
              onRemoveButtonClick(itemConfig.id);
            }}
          >
            <FontAwesomeIcon icon={faUserSlash} />
          </button>
          <button
            key="4"
            className="StyledButton"
            onClick={(event) => {
              event.stopPropagation();
              console.log(tree);
              setIdP(itemConfig.id);
              handleShowC();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          
        </>
      );
    },
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(event) => setSearch(event.target.value)}
            />
            <Button
              type="button"
              onClick={SelectNodes}
              variant="outline-success"
              className={styles.botao}
            >
              Search
            </Button>
          </Form>
          <Button
            type="button"
            onClick={handleShow}
            variant="success"
            className={styles.botao}
          >
            Add
          </Button>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a new Person to the Tree</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                onChange={(event) => setNewNode(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="content"
                rows={3}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateNewNode}>
            Add New Person
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showP} onHide={handleCloseP}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a new Person to the Tree with Parent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                autoFocus
                onChange={(event) => setNewNode(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="content"
                rows={3}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseP}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateNewNodeP}>
            Add New Person
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showC} onHide={handleCloseC}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a new child to the parent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control as="select" onChange={(event) => setParent(event.target.value)}>
            {tree.map(opt => (
              <option key = {opt.id} value={opt.id}>{opt.name}</option>
            ))}
        </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseC}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateNewParent}>
            Add Parent
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="App">
        <FamDiagram centerOnCursor={true} config={config} />
      </div>
    </div>
  );
}
