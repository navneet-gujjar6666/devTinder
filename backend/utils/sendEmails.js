//This email logic is working properly, but for current we have disabled it  by comment, as if it is enabeled
//then our mail-(navneetgujjar) will be filled full then no space at each requests(interested, ignored)




/* This comment came from AWS web not ours, our main code is bellow
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/*
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html.

Purpose:
ses_sendemail.js demonstrates how to send an email using Amazon SES.

Running the code:
node ses_sendemail.js

*/
// snippet-start:[ses.JavaScript.email.sendEmailV3]






// This is the main code:

const { SendEmailCommand }= require("@aws-sdk/client-ses");
const { sesClient }= require("./sesClient.js");

const createSyntax = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      //required
      CcAddresses: [
        //more items
      ],
      ToAddresses: [
        toAddress,
        //more To-email addresses
      ],
    },
    Message: {
      //required
      Body: {
        //required
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      //more items
    ],
  });
};

const run = async (subject, body) => {
  const sendCommand = createSyntax(
    "navneet.gujjar6666@gmail.com",
    "navneetsourath220083@acropolis.in",
    subject,
    body
  );

  try {
    return await sesClient.send(sendCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports= { run };