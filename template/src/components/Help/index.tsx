import { api } from "../../services/api";
import { Button, Form, SSRProvider } from "react-bootstrap";
import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Help() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };
  const [content, setContent] = useState("");

  const subject = "Help Genealogika";

  type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  async function handleHelp(event: FormEvent) {
    event.preventDefault();

    let response = await api.post("id-from-token", {});

    response = await api.post<User>("users", response.data);

    const email = response.data.email;
    const body = `Help.\n\nAsk: ${content}\n From:\n ${email} \n`;

    await api.post("email-receiver", {
      subject,
      body,
    });
    navigateHome();
  }

  return (
    <div className={styles.wrapper}>
      <Form>
        <Form.Group className={styles.formInput} controlId="formBasicFavColor">
          <Form.Label>Ask Support</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Content"
            onChange={(event) => setContent(event.target.value)}
            value={content}
            rows={3}
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
          onClick={handleHelp}
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={navigateHome}
          className={styles.formButton}
        >
          Close
        </Button>
      </Form>
    </div>
  );
}
