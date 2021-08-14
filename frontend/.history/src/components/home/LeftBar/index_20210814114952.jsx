import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faSearch,
  faShare,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import "./leftbar.css";
import ProgressBar from "../../../customComponents/progressBar";
import { faSave } from "@fortawesome/free-regular-svg-icons";

LeftBar.propTypes = {};

function LeftBar(props) {
  return (
    <div className="flex flex-col mx-2 left-bar w-1/3 border border-yellow-900">
      <div className="h-3/4 w-full flex">
        <div className="w-2/3 h-full bg-yellow-900 p-1">
          <div className="flex items-center user w-full bg-red-900 h-12 border border-color-green-900 ring-2 ring-offset-red-600 rounded-2xl p-1">
            <img
              src="https://picsum.photos/35"
              className="user-avatar rounded-full"
              alt=""
            />
            <p className="user-name mx-3 text-lg font-medium truncate">
              Tran Cao Phuoc Long
            </p>
          </div>
          <div className="list-and-sear w-full h-auto bg-yellow-300 my-3 rounded-full">
            <form action="" className="p-1 flex flex-nowrap align-center ">
              <input
                type="text"
                placeholder="Tim bai hat"
                className="h-9 w-full bg-transparent outline-none px-3 text-lg text-honeydew placeholder-gray-900::placeholder"
              />
              <button>
                <FontAwesomeIcon
                  icon={faSearch}
                  size="1x"
                  className="text-xl mx-1"
                />
              </button>
            </form>
          </div>
          <ul className="listMusics h-3/4 my-2 overflow-hidden">
            <li className="music flex">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl img-music"
              />
              <p>Xin chao banj Xin chao banj Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
            <li className="music flex align-center ">
              <img
                src="https://picsum.photos/60"
                alt=""
                className="rounded-2xl"
              />
              <p>Xin chao banj</p>
            </li>
          </ul>
        </div>
        <div className="w-1/3 h-full bg-black"></div>
      </div>
      <div className="h-1/4 w-full bg-red-300 flex flex-col">
        <div className="p-3 flex flex-nowrap">
          <img
            src="https://picsum.photos/60"
            className="img-music rounded-2xl"
            alt=""
          />
          <p className="self-center mx-2 text-xl">Xin chao phuoc long</p>
        </div>
        <div className="px-2">
          <ProgressBar progressPercentage="50" />
          <div class="text-gray-500 dark:text-gray-400 flex justify-between text-sm font-medium tabular-nums">
            <div>24:16</div>
            <div>75:50</div>
          </div>
        </div>
        <div className="function-button grid grid-cols-4">
            <button>
            <FontAwesomeIcon icon={faSave} size="2x" />
            </button>
          <button>
            <FontAwesomeIcon icon={faStepBackward} size="2x" />
          </button>

          <button>
            {1 ? (
              <FontAwesomeIcon icon={faPause} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faPlay} size="2x" />
            )}
          </button>
          <button>
            <FontAwesomeIcon icon={faStepForward} size="2x" />
          </button>
          <button>
              <FontAwesomeIcon icon={faShare} size="2x"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
