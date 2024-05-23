import { Link } from "react-router-dom";

const GoBackBtn = () => {
  return (
    <Link className="btn btn-light mb-3 bg-info text-light" to="/">
      Go Back
    </Link>
  );
};

export default GoBackBtn;
