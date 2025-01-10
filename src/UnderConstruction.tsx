import emailjs from "@emailjs/browser";
import { useState } from "react";

const env = import.meta.env;

interface DataType {
  from_email: string;
  message: string;
}

export const useSendEmail = () => {
  return (payload: DataType) =>
    emailjs
      .send(
        env.VITE_EMAILJS_SERVICE_ID,
        env.VITE_EMAILJS_TEMPLATE_ID,
        { ...payload },
        env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          console.log("Email sent successfully!");
        },
        (error) => {
          console.error("Error", error.text);
        }
      );
};

function UnderConstruction() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const sendEmail = useSendEmail();

  const handleNotify = () => {
    if (email) {
      sendEmail({
        from_email: email,
        message: "Please notify me when the website is live.",
      })
        .then(() => {
          setMessage("Thank you! You will be notified once we are live.");
          setEmail("");
        })
        .catch(() => {
          setMessage("An error occurred. Please try again later.");
        });
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Website Under Construction
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          We are working hard to bring you a great experience. Please check back
          soon!
        </p>
        <div className="flex justify-center flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          />
          <button
            onClick={handleNotify}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Notify Me
          </button>
          {message && (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;
