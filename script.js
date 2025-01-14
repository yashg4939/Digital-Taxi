//script.js
document.addEventListener("DOMContentLoaded", () => {
    // Handle Navigation and Section Toggling
    const navButtons = document.querySelectorAll(".nav-button");
    const sections = document.querySelectorAll(".content-section");
  
    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and sections
        navButtons.forEach((btn) => btn.classList.remove("active"));
        sections.forEach((section) => section.classList.remove("active"));
  
        // Add active class to the clicked button and corresponding section
        button.classList.add("active");
        const sectionId = button.id.replace("-btn", "-section");
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) sectionToShow.classList.add("active");
      });
    });
  
    // Login Form Validation
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        let isValid = true;
  
        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-password");
        const emailError = document.getElementById("login-email-error");
        const passwordError = document.getElementById("login-password-error");
  
        // Clear previous errors
        emailError.textContent = "";
        passwordError.textContent = "";
  
        // Validate email
        if (!isValidEmail(emailInput.value)) {
          emailError.textContent = "Please enter a valid email address.";
          isValid = false;
        }
  
        // Validate password
        if (passwordInput.value.length < 6) {
          passwordError.textContent = "Password must be at least 6 characters.";
          isValid = false;
        }
  
        if (!isValid) {
          event.preventDefault(); // Prevent form submission if validation fails
        }
      });
    }



    function toggleDropdown() {
        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdownArrow = document.querySelector('.dropdown-arrow');
      
        // Toggle visibility of the dropdown menu
        if (dropdownMenu.style.display === 'block') {
          dropdownMenu.style.display = 'none';
          dropdownArrow.classList.remove('rotate-up'); // Reset arrow direction
        } else {
          dropdownMenu.style.display = 'block';
          dropdownArrow.classList.add('rotate-up'); // Rotate arrow upward
        }
      }

      
// Function to fetch location suggestions using Nominatim API
function fetchSuggestions(query, suggestionsBoxId) {
    const suggestionsBox = document.getElementById(suggestionsBoxId);
  
    // Clear previous suggestions
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
  
    if (query.length > 2) { // Trigger API call if the input length is > 2
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&countrycodes=in`)
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data); // Log API response
          if (data.length > 0) {
            data.forEach((location) => {
              const suggestionDiv = document.createElement("div");
              suggestionDiv.textContent = location.display_name; // Use display_name
              suggestionDiv.className = "suggestion"; // Styling
              suggestionDiv.onclick = () => {
                const inputElement = document.querySelector(`#${suggestionsBoxId.replace("-suggestions", "")}`);
                inputElement.value = location.display_name;
                suggestionsBox.style.display = "none";
              };
              suggestionsBox.appendChild(suggestionDiv);
            });
  
            suggestionsBox.style.display = "block"; // Show suggestions
          } else {
            console.log("No suggestions found.");
          }
        })
        .catch((error) => console.error("Error fetching suggestions:", error));
    }
  }

// Function to get the current location
function getCurrentLocation(inputId) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Fetch address from Nominatim API using reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error fetching location: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data && data.display_name) {
              const input = document.getElementById(inputId);
              input.value = data.display_name; // Set input field value to the current location
              console.log("Current location:", data.display_name);
            } else {
              console.error("No address found for current location.");
            }
          })
          .catch((error) => console.error("Error fetching current location:", error));
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to fetch current location. Please enable location services.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//function for driving license validation
function validateForm() {
  const frontPhoto = document.getElementById("front-photo").files.length;
  const backPhoto = document.getElementById("back-photo").files.length;

  if (frontPhoto === 0 || backPhoto === 0) {
      alert("Please upload both the front and back photos of your driving license.");
      return false; // Prevent form submission
  }

  return true; // Allow form submission
}


// Hide suggestions when clicking outside
document.addEventListener("click", (event) => {
  const suggestionsBoxes = document.querySelectorAll(".suggestions-box");
  suggestionsBoxes.forEach((box) => {
    if (!box.contains(event.target)) {
      box.style.display = "none";
    }
  });
});






  
    // Registration Form Validation
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      const vehicleDetails = document.getElementById("vehicle-details");
      const driverCheckbox = document.getElementById("register-driver");
  
      // Toggle vehicle details visibility
      function toggleVehicleDetails() {
        vehicleDetails.style.display = driverCheckbox.checked ? "block" : "none";
  
        // Reset and clear errors on toggle
        if (!driverCheckbox.checked) {
          const vehicleInputs = vehicleDetails.querySelectorAll("input");
          vehicleInputs.forEach((input) => {
            input.value = ""; // Clear values
            const errorSpan = document.getElementById(input.id + "-error");
            if (errorSpan) errorSpan.textContent = ""; // Clear errors
          });
        }
      }
  
      driverCheckbox.addEventListener("change", toggleVehicleDetails);
      toggleVehicleDetails(); // Call on load to set initial state
  
      registerForm.addEventListener("submit", (event) => {
        let isValid = true;
  
        // General field validation
        const nameInput = document.getElementById("register-name");
        const emailInput = document.getElementById("register-email");
        const phoneInput = document.getElementById("register-phone");
        const passwordInput = document.getElementById("register-password");
        const confirmPasswordInput = document.getElementById("register-confirm-password");
  
        const nameError = document.getElementById("register-name-error");
        const emailError = document.getElementById("register-email-error");
        const phoneError = document.getElementById("register-phone-error");
        const passwordError = document.getElementById("register-password-error");
        const confirmPasswordError = document.getElementById("register-confirm-password-error");
  
        // Clear previous errors
        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
  
        // Validate name
        if (nameInput.value.trim() === "") {
          nameError.textContent = "Name is required.";
          isValid = false;
        }
  
        // Validate email
        if (!isValidEmail(emailInput.value)) {
          emailError.textContent = "Please enter a valid email address.";
          isValid = false;
        }
  
        // Validate phone
        if (!isValidPhoneNumber(phoneInput.value)) {
          phoneError.textContent = "Please enter a valid phone number.";
          isValid = false;
        }
  
        // Validate password
        if (passwordInput.value.length < 6) {
          passwordError.textContent = "Password must be at least 6 characters.";
          isValid = false;
        }
  
        // Confirm password match
        if (passwordInput.value !== confirmPasswordInput.value) {
          confirmPasswordError.textContent = "Passwords do not match.";
          isValid = false;
        }
  
        // Validate Vehicle Details (if Driver checkbox is checked)
        if (driverCheckbox.checked) {
          const vehicleMake = document.getElementById("register-vehicle-make");
          const vehicleModel = document.getElementById("register-vehicle-model");
          const vehicleColor = document.getElementById("register-vehicle-color");
          const vehiclePlate = document.getElementById("register-vehicle-plate");
          const vehicleYear = document.getElementById("register-vehicle-year");
  
          const vehicleMakeError = document.getElementById("register-vehicle-make-error");
          const vehicleModelError = document.getElementById("register-vehicle-model-error");
          const vehicleColorError = document.getElementById("register-vehicle-color-error");
          const vehiclePlateError = document.getElementById("register-vehicle-plate-error");
          const vehicleYearError = document.getElementById("register-vehicle-year-error");
  
          // Clear vehicle errors
          vehicleMakeError.textContent = "";
          vehicleModelError.textContent = "";
          vehicleColorError.textContent = "";
          vehiclePlateError.textContent = "";
          vehicleYearError.textContent = "";
  
          if (vehicleMake.value.trim() === "") {
            vehicleMakeError.textContent = "Make is required.";
            isValid = false;
          }
  
          if (vehicleModel.value.trim() === "") {
            vehicleModelError.textContent = "Model is required.";
            isValid = false;
          }
  
          if (vehicleColor.value.trim() === "") {
            vehicleColorError.textContent = "Color is required.";
            isValid = false;
          }
  
          if (vehiclePlate.value.trim() === "") {
            vehiclePlateError.textContent = "License Plate is required.";
            isValid = false;
          }
  
          if (
            vehicleYear.value.trim() === "" ||
            isNaN(parseInt(vehicleYear.value)) ||
            parseInt(vehicleYear.value) < 1900 ||
            parseInt(vehicleYear.value) > 2024
          ) {
            vehicleYearError.textContent = "Valid year required (1900-2024).";
            isValid = false;
          }
        }
  
        if (!isValid) {
          event.preventDefault();
        }
      });
  
      // Image Preview
      const photoInput = document.getElementById("register-photo");
      const imagePreview = document.getElementById("image-preview");
  
      photoInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
          };
          reader.readAsDataURL(file);
          imagePreview.style.display = "flex"; // Show preview container
        } else {
          imagePreview.innerHTML = ""; // Clear if no file selected
          imagePreview.style.display = "none";
        }
      });
    }
  
    // Helper Functions
    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  
    function isValidPhoneNumber(phone) {
      const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
      return re.test(phone);
    }
  });

  // mobileotpstyle.html page js is written here

  document.getElementById('openPopupBtn').addEventListener('click', function() {
    document.getElementById('phonePopup').style.display = 'block';
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('phonePopup').style.display = 'none';
});

document.getElementById('getOTPBtn').addEventListener('click', function() {
    // Simulate OTP generation
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber && phoneNumber.length >= 10) {
        // alert('OTP sent to ' + phoneNumber);
        document.getElementById('otpSection').style.display = 'block';
    } else {
        alert('Please enter a valid phone number.');
    }
});

document.getElementById('resendOTPBtn').addEventListener('click', function() {
    // Simulate OTP resend
    const phoneNumber = document.getElementById('phoneNumber').value;
    // alert('OTP resent to ' + phoneNumber);
});

document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const otp = document.getElementById('otp').value;
    if (otp) {
        alert('Logged in successfully!');
        document.getElementById('phonePopup').style.display = 'none';
    } else {
        // alert('Please enter the OTP.');
    }
});