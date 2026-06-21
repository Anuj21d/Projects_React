import completedIcon from "../../../assets/images/icon-completed.svg";

const ResultImages = () => {
  return (
    <div className="flex justify-center w-auto">
      <div className=" lg:p-5 p-1.5 bg-green-950 rounded-full">
        <div className="lg:p-6 p-0.5 bg-green-800 rounded-full box-border animate-pulse">
          <img className="lg:scale-120 scale-85" src={completedIcon} alt="Completed" />
        </div>
      </div>
    </div>
  );
};

export default ResultImages;
