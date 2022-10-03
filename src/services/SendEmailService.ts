import nodemailer from "nodemailer";

class SendEmailService {
  execute(receiverEmail: string, subject: string, body: string) {
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
        to: receiverEmail, // list of receivers
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

export { SendEmailService };
