const fs = require('fs');
const path = require('path');

// Function to create the secret file
const createSecretFile = () => {
  // Get the base64 encoded content from the environment variable
  const secretFileBase64 = process.env.SECRET_FILE_BASE64;

  // Decode the base64 string
  const secretFileContent = Buffer.from(secretFileBase64, 'base64');

  // Define the path where you want to save the secret file
  const secretFilePath = path.join(__dirname, '../config/secret_firebase_base64.json');

  // Write the decoded content to a file
  fs.writeFileSync(secretFilePath, secretFileContent);

  console.log('Secret file has been written successfully.');
};

// Export the function
module.exports = createSecretFile;
