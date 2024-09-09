import { Link } from "react-router-dom";
import bgImage from "../images/img1.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        margin: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="text-center bg-white  p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Welcome to the Real-Time Chat Application!
        </h1>
        <p className="text-lg text-blue-900">
          Stay connected with friends and colleagues through real-time
          messaging. Our application leverages Socket.io for seamless
          communication, MongoDB for robust data management, and Node.js for
          efficient API handling—all beautifully integrated with React.js for a
          smooth user experience.
        </p>
        <div className="p-5 mt-4">
          <Link
            to="/login"
            className="text-lg mr-4 bg-blue-900 py-4 px-8 rounded text-gray-100"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
