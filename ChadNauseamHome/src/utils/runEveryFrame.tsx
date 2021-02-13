const currentTime = () => new Date().getTime() / 1000;

const runEveryFrame = (func) => {
  const startTime = currentTime();

  var intervalID = setInterval(() => {
    const timePassed = currentTime() - startTime;
    if (func(timePassed) === false) {
      clearInterval(intervalID);
    }
  }, 1000 / 60);
  return intervalID;
};

export default runEveryFrame;
