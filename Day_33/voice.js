document.addEventListener("DOMContentLoaded", function () {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "vi-VN";

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase();
    handleVoiceCommand(transcript);
  };

  document.querySelector(".btn").addEventListener("click", function () {
    recognition.start();
  });
});

function handleVoiceCommand(command) {
  const actionContainer = document.querySelector(".action");

  switch (true) {
    case command.includes("google"):
      openWebsite("https://www.google.com");
      break;
    case command.includes("youtube"):
      openWebsite("https://www.youtube.com");
      break;
    case command.includes("google drive"):
      openWebsite("https://drive.google.com");
      break;
    case command.includes("google maps") || command.includes("bản đồ"):
      openWebsite("https://maps.google.com");
      break;
    case command.includes("chỉ đường"):
      openGoogleMapsDirections(command);
      break;
    case command.includes("video"):
      openYoutubeVideo(command);
      break;
    default:
      displayMessage("Không thực hiện được yêu cầu");
  }
}

function openWebsite(url) {
  window.location.href = url;
}

function displayMessage(message) {
  const actionContainer = document.querySelector(".action");
  actionContainer.textContent = message;
}