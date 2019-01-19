const functions = require('firebase-functions');
const nodemailer = require('nodemailer')
const admin = require('firebase-admin')

const serviceAccount = require('./service-account-key.json')

admin.initializeApp({
  databaseURL: 'https://utah-expungements-org.firebaseio.com/',
  credential: admin.credential.cert(serviceAccount),
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.notifyLead = functions.firestore.document('/leads/{uid}').onCreate(snap => {
  const lead = snap.data()
  return sendEmail(lead)
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().emailsending.email,
    pass: functions.config().emailsending.password,
  },
})

function sendEmail(lead) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: functions.config().emailsending.email,
      to: functions.config().emailsending.email,
      subject: 'Someone gave us their email on utahexpungements.org',
      html: `Their email was ${lead.email}`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err)
      } else {
        console.log(info)
        resolve(info)
      }
    })
  })
}
