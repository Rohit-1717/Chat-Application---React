import React from "react";

function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="containerWrap flex justify-between">
        <a className="btn btn-ghost text-xl">BaatChit</a>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
