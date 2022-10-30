import nodemailer from "nodemailer";

class ReceiveEmailService {
  execute(subject: string, body: string, email: string) {
    const transporter = nodemailer.createTransport({
      host: "smtp.sapo.pt",
      port: "465",
      secure: true,
      auth: {
        user: "msp.genealogika@sapo.pt",
        pass: "12##MSPGenealogika",
      },
    });

    transporter
      .sendMail({
        from: '"Genealogika" <msp.genealogika@sapo.pt>', // sender address
        to: "msp.genealogika@sapo.pt", // list of receivers
        subject: subject, // Subject line
        text: body, // plain text body
        //html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
      })
      .then((info) => {
        console.log({ info });
      })
      .catch(console.error);
  }
}

export { ReceiveEmailService };
