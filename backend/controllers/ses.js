const AWS = require("aws-sdk")

const ses = new AWS.SES({ 
    region: "ap-south-1", 
    accessKeyId: "AKIAYLV3HVFSD5APUZOG", 
    secretAccessKey: "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"
});


function sendEmail(emailData, to) {
    // const params = 

    const emailParams = {
        Source: "jaypatel45677@gmail.com",
        Destination: {
            ToAddresses: [`${to}`]
        },
        Message: {
            Subject: {
                Data: emailData.subject
            },
            Body: {
                Text: {
                    Data: emailData.text
                }               
            },
            Subject: {
                Data: "Name"
            }
        }
    }

    return ses.sendEmail(emailParams).promise();
}

exports.sendEmail = sendEmail

// sendEmail()
// .then(data => {
//     console.log("success")
//     console.log(data)
// })
// .catch(err => {
//     console.log(err)
// })