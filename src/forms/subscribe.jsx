import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Subscribe = () => {
  const form = useRef();

  const sendSubscriptionEmail = (e) => {
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
          console.log("Subscription email sent successfully:", result.text);
          alert("Thank you for subscribing!");
        },
        (error) => {
          console.error("Error sending subscription email:", error.text);
          alert("Failed to subscribe. Please try again later.");
        }
      );

    // Clear the input field after sending the email
    form.current.reset();
  };

  return (
    <div className="col-xl-4 col-md-6">
      <div className="tp-footer__widget bs-pl-60 mb-40">
        <h3 className="tp-footer__widget-title mb-35">Subscribe Now</h3>
        <p>Subscribe to get the latest news from us</p>

        <div className="tp-footer-from p-relative">
          <form ref={form} onSubmit={sendSubscriptionEmail}>
            <span>
              <i className="fas fa-envelope-open"></i>
            </span>
            <input
             type="email"
                name="email"
              placeholder="Enter your mail"
              required
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i> <b></b>
            </button>
          </form>
        </div>
        <p className="tp-form-note p-0 mt-5 mb-30">
          <span>**</span>We are not going to save your data
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
