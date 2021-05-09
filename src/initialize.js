exports.mobile = function() {
  const clickBody = document.getElementById('body');
  clickBody.addEventListener("click", playSilence);

  function playSilence() {
      var audio = new Audio('/half-second-silence.mp3');
      audio.play();
      clickBody.removeEventListener('click', playSilence);
  }
};
