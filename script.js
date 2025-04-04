// script.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            let isValid = true;

            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
             const emailError = document.getElementById('login-email-error');
            const passwordError = document.getElementById('login-password-error');

            emailError.textContent = ''; //clear previous errors.
            passwordError.textContent = '';


            if (!isValidEmail(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (passwordInput.value.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters.';
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }

    if (registerForm) {
        const vehicleDetails = document.getElementById('vehicle-details');
       const driverCheckbox = document.getElementById('register-driver');

       function toggleVehicleDetails() {
           vehicleDetails.style.display = driverCheckbox.checked ? 'block' : 'none';
           // Reset and clear errors on toggle
            if (!driverCheckbox.checked) {
               const vehicleInputs = vehicleDetails.querySelectorAll('input');
               vehicleInputs.forEach(input => {
                   input.value = ''; // Clear values
                   const errorSpan = document.getElementById(input.id + '-error');
                   if (errorSpan) errorSpan.textContent = ''; // Clear errors

               });
           }

       }
       driverCheckbox.addEventListener('change', toggleVehicleDetails);
       toggleVehicleDetails(); //call on load to set initial state.


       registerForm.addEventListener('submit', function(event) {
           let isValid = true;
           // ... (your existing validation for name, email, phone, passwords)
            const nameInput = document.getElementById('register-name');
           const emailInput = document.getElementById('register-email');
           const phoneInput = document.getElementById('register-phone');
           const passwordInput = document.getElementById('register-password');
           const confirmPasswordInput = document.getElementById('register-confirm-password');

           const nameError = document.getElementById('register-name-error');
           const emailError = document.getElementById('register-email-error');
           const phoneError = document.getElementById('register-phone-error');
           const passwordError = document.getElementById('register-password-error');
           const confirmPasswordError = document.getElementById('register-confirm-password-error');

             // Clear previous error messages
           nameError.textContent = '';
           emailError.textContent = '';
           phoneError.textContent = '';
           passwordError.textContent = '';
           confirmPasswordError.textContent = '';


           if (nameInput.value.trim() === "") {
                nameError.textContent = 'Name is required.';
               isValid = false;
           }

           if (!isValidEmail(emailInput.value)) {
               emailError.textContent = 'Please enter a valid email address.';
               isValid = false;
           }
            if (!isValidPhoneNumber(phoneInput.value)) {
               phoneError.textContent = "Please enter a valid phone number.";
                isValid = false;
            }

           if (passwordInput.value.length < 6) {
               passwordError.textContent = 'Password must be at least 6 characters.';
               isValid = false;
           }

           if (passwordInput.value !== confirmPasswordInput.value) {
               confirmPasswordError.textContent = 'Passwords do not match.';
               isValid = false;
           }

           //Vehicle details validation (only if driver checkbox is checked)
           if (driverCheckbox.checked) {
               const vehicleMake = document.getElementById('register-vehicle-make');
               const vehicleModel = document.getElementById('register-vehicle-model');
               const vehicleColor = document.getElementById('register-vehicle-color');
               const vehiclePlate = document.getElementById('register-vehicle-plate');
               const vehicleYear = document.getElementById('register-vehicle-year');

                const vehicleMakeError = document.getElementById('register-vehicle-make-error');
               const vehicleModelError = document.getElementById('register-vehicle-model-error');
               const vehicleColorError = document.getElementById('register-vehicle-color-error');
               const vehiclePlateError = document.getElementById('register-vehicle-plate-error');
               const vehicleYearError = document.getElementById('register-vehicle-year-error');

               vehicleMakeError.textContent = '';
               vehicleModelError.textContent = '';
               vehicleColorError.textContent = '';
               vehiclePlateError.textContent = '';
               vehicleYearError.textContent = '';


               if (vehicleMake.value.trim() === "") {
                   vehicleMakeError.textContent = "Make is required";
                   isValid = false;

               }
               if (vehicleModel.value.trim() === "") {
                    vehicleModelError.textContent = "Model is required";
                   isValid = false;

               }
                if (vehicleColor.value.trim() === "") {
                    vehicleColorError.textContent = "Color is required";
                   isValid = false;
               }
               if (vehiclePlate.value.trim() === "") {
                   vehiclePlateError.textContent = "License Plate is required";
                   isValid = false;
               }

                if (vehicleYear.value.trim() === "" || isNaN(parseInt(vehicleYear.value)) || parseInt(vehicleYear.value) < 1900 || parseInt(vehicleYear.value) > 2024) {
                   vehicleYearError.textContent = "Valid year required (1900-2024)";
                   isValid = false;

               }
           }

           if (!isValid) {
               event.preventDefault();
           }
       });
       //Image Preview
       const photoInput = document.getElementById('register-photo');
       const imagePreview = document.getElementById('image-preview');

       photoInput.addEventListener('change', function() {
           const file = this.files[0];
           if (file) {
               const reader = new FileReader();
               reader.onload = function(e) {
                   imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
               }
               reader.readAsDataURL(file);
                imagePreview.style.display = 'flex'; // Show preview container

           } 
           else {
               imagePreview.innerHTML = ''; // Clear if no file selected
                imagePreview.style.display = 'none';
           }
       });
   }

      function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
     function isValidPhoneNumber(phone) {
        // Regular expression for a simple phone number check (adjust as needed)
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
         return re.test(phone);
    }
});