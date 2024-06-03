const colorNames = {
  "0,0,0": "Black",
  "255,255,255": "White",
  // Add more color mappings as needed...
};

document.getElementById('color-picker').addEventListener('input', (event) => {
  const color = event.target.value;
  const colorName = getColorName(color);
  const coloredSquare = createColoredSquare(color);

  const colorElement = document.getElementById('color-name');
  colorElement.innerHTML = ''; // Clear previous content
  colorElement.appendChild(coloredSquare);
  colorElement.appendChild(document.createTextNode(` ${colorName}`));
});

document.getElementById('change-color').addEventListener('click', () => {
  const color = document.getElementById('color-picker').value;
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'changeColor', color: color });
  });
});

function getColorName(color) {
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    return hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));
  };

  const rgb = hexToRgb(color);

  // Find color name based on RGB values
  const key = rgb.join(',');
  return colorNames[key] || generateColorName(rgb);
}

function generateColorName(rgb) {
  // Generate a color name for RGB values not in the predefined list
  return `RGB(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function createColoredSquare(color) {
  // Create a square element with the specified color
  const square = document.createElement('span');
  square.style.display = 'inline-block';
  square.style.width = '20px';
  square.style.height = '20px';
  square.style.backgroundColor = color;
  square.style.marginRight = '5px';
  return square;
}
