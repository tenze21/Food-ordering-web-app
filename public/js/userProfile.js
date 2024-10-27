document.addEventListener("DOMContentLoaded", function () {
  const profilePictureInput = document.getElementById("profilePicture");
  const profileImage = document.getElementById("profile-image");

  if (profilePictureInput) {
      profilePictureInput.addEventListener("change", function (event) {
          const file = event.target.files[0];
          if (file && file.type.startsWith("image/")) {
              const reader = new FileReader();
              reader.onload = function (e) {
                  profileImage.src = e.target.result; // Update the profile image preview
              };
              reader.readAsDataURL(file); // Read the file as a Data URL
          } else {
              profileImage.src = "<%= user.profilePicture || '/' %>"; // Reset to default or existing profile picture
          }
      });
  }
});