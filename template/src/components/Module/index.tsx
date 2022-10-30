import { api } from "../../services/api";
import { Button, Form, SSRProvider } from "react-bootstrap";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export function Module() {
  const navigate = useNavigate();

  const navigateTemas = () => {
    navigate("/temas");
  };
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [user,setUser] = useState<User>();
  

  // response = await api.post<User>("users", response.data);

      /*const email = response.data.email;
      const body = `Help.\n\nAsk: ${content}\n From:\n ${email} \n`;*/

  async function handleNewCourse(event: FormEvent) {
    event.preventDefault();

    
    let response = await api.post("id-from-token", {});
    var id = response.data;
    response = await api.post<User>("users",{id});
    setUser(response.data);
    
    await api.post("create-course",{title, subject, user} ).catch((response) => console.log(response));
    navigateTemas();
  }

  return (
    <div className={styles.wrapper}>
      <Form>
        <Form.Group className={styles.formInput} controlId="formBasicFavColor">
          <Form.Label>Criar curso</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <Form.Control
            as="textarea"
            placeholder="Subject"
            onChange={(event) => setSubject(event.target.value)}
            value={subject}
          />
          {
            //<Form.Text className="text-muted">
            //We'll never share your email with anyone else.
            //</Form.Text>
          }
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className={styles.formButton}
          onClick={handleNewCourse}
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={navigateTemas}
          className={styles.formButton}
        >
          Close
        </Button>
      </Form>
    </div>
  );
}
