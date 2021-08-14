import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSearch } from "@fortawesome/free-solid-svg-icons";

Main.propTypes = {};

function Main(props) {
  return (
    <div className="w-3/5 mr-2 flex flex-wrap">
      <div className="chat-area h-5/6 w-full  pb-2">
        <div className="w-full h-full bg-white rounded-xl shadow-2xl text-chat flex justify-between">
          <div className="p-2 flex">
            <div className="img relative w-15">
              <img src="https://picsum.photos/60" className="w-12 h-12 rounded-full " alt="" />
              <div className="status-shape w-2 h-2 rounded-full bg-red-900 absolute bottom-0 right-0"></div>
            </div>
            <div className="info ml-2">
              <div className="name text-xl">Tran cao phuoc Long</div>
              <div className="status-text text-xs">Vua moi truy cap</div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
      <form className="inp-area w-full  bg-transparent rounded-xl h-1/6 flex flex-cols items-center px-2 mb-2">
        <input
          type="text"
          className="h-1/3 w-11/12 mr-2 outline-none px-3 text-xl font-bold color-inherit border rounded-full border-transparent focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Gui tin nhan"
        />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} size="2x" />
        </button>
      </form>
    </div>
  );
}

export default Main;
