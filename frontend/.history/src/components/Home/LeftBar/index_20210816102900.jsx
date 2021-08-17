import {
  faBan,
  faChevronLeft,
  faChevronRight,
  faPause,
  faPlay,
  faSearch,
  faShare,
  faStepBackward,
  faStepForward,
  faStore,
  faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "../../../customComponents/progressBar";
import { getId, progressYoutubeInfo } from "../../../function/getYtbInfo";
import "./leftbar.css";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useEffect } from "react";

LeftBar.propTypes = {};

function LeftBar(props) {
  const [player, setPlayer] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [collapse, setCollapse] = useState(false);
  const { register, handleSubmit } = useForm();
  const [repeat, setRepeat] = useState(false);
  const [playing, setPlaying] = useState(window.localStorage.getItem("current-song") ? window.localStorage.getItem("current-song") : "");
  const [status, setStatus] = useState(false);
  const { onSubmit } = props;
  const [info, setInfo] = useState("");
  const {listFriend, listRoom} = props;
  const handleResize = () => {
    const music = document.getElementById("left-bar-music");
    const friend = document.getElementById("left-bar-friend0");
    if (!collapse) {
      music.classList.remove("w-3/5");
      music.classList.add("w-1/5");
      friend.classList.remove("w-2/5");
      friend.classList.add("w-4/5");
      setCollapse(true);
    } else {
      music.classList.add("w-3/5");
      music.classList.remove("w-1/5");
      friend.classList.add("w-2/5");
      friend.classList.remove("w-4/5");
      setCollapse(false);
    }


  }
  const listMusicInfo = useSelector(state => state.listInfor);
  const listLink = useSelector(state => state.listLink);
  const { id, username } = useSelector(state => state.userInfor);
  const [duration, setDuration] = useState();
  const { deleteMusic } = props;
  const onSelected = (e) => {
    e.preventDefault();
    if (document.querySelector(".selected")) { document.querySelector(".selected").classList.remove("selected") };
    e.target.classList.add('selected');
    if (e.target.href !== undefined) {
      setPlaying(e.target.href);
      window.localStorage.setItem("current-song", e.target.href);
    }


  }
  const handleSetStatus = () => {
    if (status) setStatus(false);
    else setStatus(true);
  }
  const setLoop = () => {
    if (repeat) setRepeat(false);
    else setRepeat(true);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelectorAll("a").forEach(value => {
        if (value.href === playing) {
          if (document.querySelector(".selected")) { document.querySelector(".selected").classList.remove("selected") };
          value.classList.add("selected");

        }
      })
    }, 0)
    return () => {
      clearInterval(interval);
    }
  }, [playing])
  useEffect(() => {
    const getInfo = async () => {
      const response = await progressYoutubeInfo(playing);
      setInfo(response);
    }
    getInfo()

  }, [playing])
  const ref = (pl) => {
    setPlayer(pl);
  }
  const handleProgress = (progress) => {
    setDuration(player.getCurrentTime());
  };
  const handleForward = () => {
    let position = listLink.indexOf(playing);
    if (position < listLink.length - 1) {
      position += 1;
    } else {
      position = 0;
    }
    const nextSong = listLink[position];
    if (nextSong) {
      window.localStorage.setItem("current-song", nextSong);
      setPlaying(nextSong);
    }
  };
  const handleBackward = () => {
    let position = listLink.indexOf(playing);
    if (position <= 1) {
      position = listLink.length - 1;
    } else {
      position -= 1;
    }
    const previousSong = listLink[position];
    if (previousSong) {
      window.localStorage.setItem("current-song", previousSong);
      setPlaying(previousSong);
    }
  };
  const handleEnded = () => {
    handleForward();
  };
  console.log(listFriend, listRoom);
  return (
    <div className="flex flex-col mr-2 left-bar w-1/3 ">
      <ReactPlayer style={{ display: 'none' }}
        url={playing}
        playing={status}
        loop={repeat}
        ref={ref}
        onProgress={handleProgress}
        onDuration={(duration) => {
          setTimeEnd(duration);
        }}
        onEnded={handleEnded}
      >

      </ReactPlayer>
      <div className="h-3/4 w-full flex ">
        <div className="w-3/5 h-full bg-white p-1 relative rounded-xl mr-2 shadow-2xl" id="left-bar-music">
          <button id="resize-leftBar" onClick={handleResize}>
            {!collapse ? <FontAwesomeIcon icon={faChevronLeft} size="2x" /> : <FontAwesomeIcon icon={faChevronRight} size="2x" />}
          </button>
          <div className="flex items-center user w-full bg-gray-200 h-12 border border-color-green-900 ring-2 ring-offset-gray-300 rounded-2xl p-1">
            <img
              src="https://picsum.photos/35"
              className="user-avatar rounded-full"
              alt=""
            />
            <p className="user-name mx-3 text-lg font-medium truncate">
              {username}
            </p>
          </div>
          <div className="list-and-sear w-full h-auto bg-gray-200 my-3 rounded-full">
            <form onSubmit={handleSubmit(onSubmit)} className="p-1 flex flex-nowrap align-center ">
              <input
                type="text"
                placeholder="Tim bai hat"
                className="h-9 w-full bg-transparent outline-none px-3 text-lg text-honeydew placeholder-gray-900::placeholder"
                {...register("inp_search_text")}
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
          <ul className="listMusics h-3/5 py-2 overflow-hidden rounded-xl bg-transparent">
            {
              listMusicInfo.map((value, pos) => (
                <li className="relative flex items-center" >
                  <a href={value.url} className="music flex hover:bg-gray-300 w-full p-4 rounded-full" onClick={onSelected}>
                    <img
                      src={value.thumbnail}
                      alt=""
                      className="rounded-2xl img-music w-16"
                    />
                    <p className="text-xs mx-2 leading-6 h-12 overflow-hidden overflow-ellipsis	">{value.title}</p>
                  </a>
                  <FontAwesomeIcon onClick={deleteMusic} id={getId(value.url)} icon={faBan} size="1x" className="absolute text-red-400 right-3 opacity-0  hover:opacity-100 cursor-pointer" />

                </li>
              ))

            }
          </ul>
        </div>
        <div className="w-2/5 h-full bg-gray-300 rounded-xl p-2 flex flex-col"
          id="left-bar-friend0">
            <form className="search-user flex items-center  bg-gray-200 rounded-full mb-4">
              <input type="text" className="h-8 pl-4 outline-none bg-transparent text-2xl w-10/12" placeholder="Tim kiem nguoi dung"  />
              <button className=" bg-transparent mx-4 my-2">
              <FontAwesomeIcon icon={faSearch} className=" text-xl" />
              </button>
            </form>
          <div className="friend max-1/3">
          <div className="friend h-auto text-center mb-1 w-5/6 mx-auto bg-white rounded-full">Ban be</div>
            <ul className=" friend w-full max-h-40 bg-gray-300 rounded-xl overflow-hidden hover:overflow-y-scroll mb-2 px-4" >
              {
                listFriend.map((value,pos)=>(
                  <li className="friend flex w-full my-3">
                <img src="https://picsum.photos/50" className="rounded-full" alt="" />
                <div className="self-center mx-2 w-full">
                  <p className="truncate w-9/12 font-medium">{value.username}</p>
                </div>
              </li>
                ))
              }            </ul>
          </div>
          <div className="group max-h-1/3">
          <div className="friend h-auto text-center mb-1 w-5/6 mx-auto bg-white rounded-full">Nhom</div>
            <ul className=" friend w-full max-h-40 bg-gray-300 rounded-xl overflow-hidden hover:overflow-y-scroll px-4" >
            {
                listRoom.map((value,pos)=>(
                  <li className="friend flex w-full my-3">
                <img src="https://picsum.photos/50" className="rounded-full" alt="" />
                <div className="self-center mx-2 w-full">
                  <p className="truncate w-9/12 font-medium">{value.name}</p>
                  <p className="truncate w-9/12 font-medium">Xin chao anh yeu</p>
                </div>
              </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="h-1/4 w-full bg-gray-800 flex flex-col my-1 rounded-xl">
        <div className="p-3 flex flex-nowrap">
          {status ? <img
            src={info.thumbnail}
            className="thumbnail rounded-full w-16 h-16 spin "
            alt=""
          /> : <img
            src={info.thumbnail}
            className="thumbnail rounded-full w-16 h-16 "
            alt=""
          />}
          <p className="text-white self-center mx-2 text-xl truncate">{info.title}</p>
        </div>
        <div className="px-2">
          <ProgressBar progressPercentage={(duration / timeEnd) * 100} />
          <div class="text-gray-500 dark:text-gray-400 flex justify-between text-sm font-medium tabular-nums">
            <div>{`${Math.floor(duration / 60) < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)}:${duration - 60 * Math.floor(duration / 60) > 10 ? Math.floor(duration - 60 * Math.floor(duration / 60)) : '0' + Math.floor(duration - 60 * Math.floor(duration / 60))}`}</div>
            <div>{`${Math.floor(timeEnd / 60) < 10 ? '0' + Math.floor(timeEnd / 60) : Math.floor(timeEnd / 60)}:${timeEnd - 60 * Math.floor(timeEnd / 60) > 10 ? Math.floor(timeEnd - 60 * Math.floor(timeEnd / 60)) : '0' + Math.floor(timeEnd - 60 * Math.floor(timeEnd / 60))}`}</div>
          </div>
        </div>
        <div className="function-button grid grid-cols-auto">
          <button onClick={setLoop}>
            {!repeat ? <FontAwesomeIcon icon={faSyncAlt} size="2x" className="text-white" /> : <span className="text-white text-3xl">1</span>}
          </button>
          <button>
            <FontAwesomeIcon className="text-white" icon={faStepBackward} size="2x" onClick={handleBackward} />
          </button>

          <button>
            {status ? (
              <FontAwesomeIcon className="text-white" icon={faPause} onClick={handleSetStatus} size="2x" />
            ) : (
              <FontAwesomeIcon className="text-white" icon={faPlay} onClick={handleSetStatus} size="2x" />
            )}
          </button>
          <button>
            <FontAwesomeIcon className="text-white" icon={faStepForward} onClick={handleForward} size="2x" />
          </button>
          <button>
            <FontAwesomeIcon className="text-white" icon={faShare} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
