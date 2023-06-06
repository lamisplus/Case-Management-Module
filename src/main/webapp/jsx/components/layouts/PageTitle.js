import { Link } from "react-router-dom";

const PageTitle = ({ motherMenu, activeMenu, pageContent }) => {
  let path = window.location.pathname.split("/");
  return (
    <div className="row page-titles mx-0">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">
          <Link to={`/`}>{motherMenu}</Link>
        </li>
        <li className="breadcrumb-item  ">
          <Link to={`/`}>{activeMenu}</Link>
        </li>
      </ol>
    </div>
  );
};

export default PageTitle;
