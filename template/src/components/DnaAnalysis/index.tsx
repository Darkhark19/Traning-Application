import { FormEvent } from "react";
import { Button } from "react-bootstrap";
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import logo from "../../assets/dnaanalysis.png";
import { useNavigate } from "react-router-dom";

export function DnaAnalysis() {
  type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  const navigate = useNavigate();

  const subject = "DNA Analysis";

  function goHome() {
    navigate("/");
  }

  async function handleDnaAnalysis(event: FormEvent) {
    event.preventDefault();

    let response = await api.post("id-from-token", {});

    response = await api.post<User>("users", { user: response.data });
    console.log(response.data);
    const email = response.data.email;
    const body = `Hello ${response.data.name},\n We have received your order!In a few days you will receive a package in your home with everything you need to find yourself\n Hope you enjoy it!\n\n\n Best Regards,\n Genealogika`;

    await api.post("email", {
      receiverEmail: email,
      subject,
      body,
    });
  }

  return (
    <div>
      <Button
        variant="secondary"
        type="button"
        className={styles.btnHome}
        onClick={goHome}
      >
        Home
      </Button>
      <h1>Get to know where you came from</h1>
      <h2>Unravel your origins</h2>
      <img src={logo} alt="DNA kit" className={styles.logo}></img>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          The DNA analysis is not real, we just send you an email saying that we
          will send you a package. Since this is just a prototype.
        </div>

        <Button
          variant="success"
          type="submit"
          className={styles.btn}
          onClick={handleDnaAnalysis}
        >
          Ask for DNA analysis!
        </Button>
      </div>
    </div>
  );
}
