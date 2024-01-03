// Get references to HTML elements
const form = document.getElementById("generate-form");
const qrCode = document.getElementById("qrcode");

// Function to handle form submission
const onGenerateSubmit = (e) => {
  // Clear previous UI elements
  clearUI();
  e.preventDefault();

  // Retrieve URL and size values from the form
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Check if URL is provided
  if (url === "") {
    alert("Digite um URL");
  } else {
    // Show spinner while generating QR Code
    showSpinner();

    // Simulate asynchronous generation process
    setTimeout(() => {
      // Hide spinner after 1 second
      hideSpinner();

      // Generate QR Code
      generateQRCode(url, size);

      // Delay to ensure QR Code is generated before creating save button
      setTimeout(() => {
        // Get QR Code image URL and create download button
        const saveUrl = qrCode.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Function to generate QR Code using QRCode.js library
const generateQRCode = (url, size) => {
  const qr = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Function to show the loading spinner
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

// Function to hide the loading spinner
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

// Function to clear UI elements
const clearUI = () => {
  qrCode.innerHTML = "";
  // Remove existing save button if present
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Function to create and append a save button with the generated QR Code URL
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 transition-all duration-200 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qr";
  link.innerHTML = "Download";
  document.getElementById("generated").appendChild(link);
};

// Hide spinner initially
hideSpinner();

// Add event listener for form submission
form.addEventListener("submit", onGenerateSubmit);
