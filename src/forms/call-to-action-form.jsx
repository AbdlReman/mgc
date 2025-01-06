import React, { useRef } from "react";
import emailjs from "emailjs-com";

const CallToActionForm = ({ style_sv_details }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_t9rw9uh", 
        "template_63g3rca", 
        form.current,
        "k2AXfv5R1Vkt1Si05"  
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Your message has been sent!");
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send your message. Please try again later.");
        }
      );
  };

  return (
    <>
      <form ref={form} onSubmit={sendEmail}>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                required
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="input-item">
              <span>
                <i className="fas fa-envelope-open"></i>
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="input-item">
              <span>
                <i className="fas fa-phone"></i>
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="input-item-textarea">
              <span>
                <i className="fas fa-pen"></i>
              </span>
              <textarea
                name="message"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <button type="submit" className="it-cta-form-submit border-0">
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CallToActionForm;
