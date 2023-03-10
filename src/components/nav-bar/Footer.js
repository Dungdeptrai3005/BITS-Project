import React from "react";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="page-footer font-small pt-3 bg-danger text-white">
      <div className="container-fluid text-md-left">
        <div className="row">
          <div className="col-md-5 mt-md-0 mt-3">
            <h5 className="text-uppercase">ENGFY</h5>
            
            <p>Some description of ENGFY application.</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Information</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="nav-link text-light">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link text-light">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/termsofuse" className="nav-link text-light">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Navigation</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home" className="nav-link text-light text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="nav-link text-light">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/discuss" className="nav-link text-light">
                  Discuss
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
