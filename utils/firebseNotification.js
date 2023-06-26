const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");

const serviceAccount = require("../firebase/pets-b05f2-firebase-adminsdk-d3npo-0d18bcd53d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "pets-b05f2", // Replace with your Firebase project ID
});

const sendFirebase = (title, body, token) => {
  const message = {
    token: token, // Replace with the device token of the recipient
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    getMessaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendFirebase };
