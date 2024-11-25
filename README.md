Pending Work:

4 pending calculator pages: Affordability, Rent vs. Buy, Refinance Analysis, and Consolidation.
Apply Now page is pending.
Mobile views are pending.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

<!--

// /******************************************************************************
//  * This tutorial is based on the work of Martin Hawksey twitter.com/mhawksey  *
//  * But has been simplified and cleaned up to make it more beginner friendly   *
//  * All credit still goes to Martin and any issues/complaints/questions to me. *
//  ******************************************************************************/

// // If you want to store your email server-side (hidden), uncomment the next line
// var TO_ADDRESS = "rajanaresh.p@gmail.com";

// // Spit out all the keys/values from the form in HTML for email
// // Uses an array of keys if provided or the object to determine field order
// function formatMailBody(obj, order) {
//   if (!obj || typeof obj !== "object") {
//     return "<p>No form data available.</p>";
//   }

//   var result = "";
//   if (!order) {
//     order = Object.keys(obj);
//   }

//   // Loop over all keys in the ordered form data
//   for (var idx in order) {
//     var key = order[idx];
//     if (obj[key] !== undefined) { // Check if the key exists in the object
//       result += "<h4 style='text-transform: capitalize; margin-bottom: 0'>" + key + "</h4><div>" + sanitizeInput(obj[key]) + "</div>";
//     }
//   }
//   return result; // Return the formatted string
// }

// // Sanitize content from the user - trust no one
// function sanitizeInput(rawInput) {
//   var placeholder = HtmlService.createHtmlOutput(" ");
//   placeholder.appendUntrusted(rawInput);
//   return placeholder.getContent();
// }

// // Main function to handle form submission
// function doPost(e) {
//   try {
//     Logger.log(e); // Log the form data
//     record_data(e);

//     // Shorter name for form data
//     var mailData = e.parameters || {};

//     // Names and order of form elements (if set)
//     var orderParameter = mailData.formDataNameOrder;
//     var dataOrder;
//     if (orderParameter) {
//       dataOrder = JSON.parse(orderParameter);
//     }

//     // Determine recipient of the email
//     var sendEmailTo = (typeof TO_ADDRESS !== "undefined") ? TO_ADDRESS : mailData.formGoogleSendEmail;

//     // Send email if a recipient address is set
//     if (sendEmailTo) {
//       MailApp.sendEmail({
//         to: String(sendEmailTo),
//         subject: "Contact form submitted",
//         htmlBody: formatMailBody(mailData, dataOrder)
//       });
//     }

//     // Return success response
//     return ContentService
//       .createTextOutput(
//         JSON.stringify({"result": "success", "data": JSON.stringify(e.parameters)})
//       )
//       .setMimeType(ContentService.MimeType.JSON);
//   } catch (error) {
//     Logger.log(error);
//     return ContentService
//       .createTextOutput(JSON.stringify({"result": "error", "error": error.message}))
//       .setMimeType(ContentService.MimeType.JSON);
//   }
// }

// // Record data into Google Sheets
// function record_data(e) {
//   var lock = LockService.getDocumentLock();
//   lock.waitLock(30000); // Hold off up to 30 sec to avoid concurrent writing

//   try {
//     Logger.log(JSON.stringify(e)); // Log the POST data

//     var doc = SpreadsheetApp.getActiveSpreadsheet();
//     var sheetName = e.parameters.formGoogleSheetName || "responses";
//     var sheet = doc.getSheetByName(sheetName);

//     var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//     var newHeader = oldHeader.slice();
//     var fieldsFromForm = getDataColumns(e.parameters);
//     var row = [new Date()]; // First element in the row should always be a timestamp

//     // Loop through the header columns
//     for (var i = 1; i < oldHeader.length; i++) { // Start at 1 to avoid the Timestamp column
//       var field = oldHeader[i];
//       var output = getFieldFromData(field, e.parameters);
//       row.push(output);

//       // Mark as stored by removing from form fields
//       var formIndex = fieldsFromForm.indexOf(field);
//       if (formIndex > -1) {
//         fieldsFromForm.splice(formIndex, 1);
//       }
//     }

//     // Set any new fields in our form
//     for (var i = 0; i < fieldsFromForm.length; i++) {
//       var field = fieldsFromForm[i];
//       var output = getFieldFromData(field, e.parameters);
//       row.push(output);
//       newHeader.push(field);
//     }

//     // More efficient to set values as [][] array than individually
//     var nextRow = sheet.getLastRow() + 1; // Get next row
//     sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

//     // Update header row with any new data
//     if (newHeader.length > oldHeader.length) {
//       sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
//     }
//   } catch (error) {
//     Logger.log(error);
//   } finally {
//     lock.releaseLock();
//     return;
//   }
// }

// // Helper functions to extract data columns and fields
// function getDataColumns(data) {
//   return Object.keys(data).filter(function(column) {
//     return !(column === 'formDataNameOrder' || column === 'formGoogleSheetName' || column === 'formGoogleSendEmail' || column === 'honeypot');
//   });
// }

// function getFieldFromData(field, data) {
//   var values = data[field] || '';
//   var output = values.join ? values.join(', ') : values;
//   return output;
// }































// const sheetName = 'quick quote data';
// const scriptProp = PropertiesService.getScriptProperties();

// function initialSetup() {
//   const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//   scriptProp.setProperty('key', activeSpreadsheet.getId());
// }

// function doPost(e) {
//   const lock = LockService.getScriptLock();
//   lock.tryLock(1000);

//   try {
//     const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
//     const sheet = doc.getSheetByName(sheetName);

//     const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//     const nextRow = sheet.getLastRow() + 1;

//     const newRow = headers.map(header => e.parameter[header] || ''); // Match field names

//     sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

//     return ContentService.createTextOutput(
//       JSON.stringify({ result: 'success', row: nextRow })
//     ).setMimeType(ContentService.MimeType.JSON);
//   } catch (error) {
//     return ContentService.createTextOutput(
//       JSON.stringify({ result: 'error', error: error.toString() })
//     ).setMimeType(ContentService.MimeType.JSON);
//   } finally {
//     lock.releaseLock();
//   }
// }

































function doPost(e) {
    try {
        const sheet = SpreadsheetApp.openById('1wPXTYjkWJWSjdPMDcisl_kJf5NfV4j6l4R-8IKeQVs8').getSheetByName('quick quote data');
        const data = JSON.parse(e.postData.contents);

        // Append data to the Google Sheet
        sheet.appendRow([
            data.firstName,
            data.lastName,
            data.email,
            data.loanOfficer,
            data.coBorrower,
            data.eveningPhone,
            data.workPhone,
            data.contactPreference,
            data.creditRating,
            data.propertyAddress,
            data.City,
            data.state,
            data.zipCode,
            data.loanPurpose,
            data.propertyWillBe,
            data.estimatedValue,
            new Date() // Timestamp
        ]);

        // Prepare the email content
        const subject = "Successfully Received Your Application!";
        const userBody = `
            Dear ${data.firstName},

            Thank you for submitting your application. Here are the details we received:

            First Name: ${data.firstName}
            Last Name: ${data.lastName}
            Email: ${data.email}
            Loan Officer: ${data.loanOfficer}
            Co-Borrower: ${data.coBorrower}
            Evening Phone: ${data.eveningPhone}
            Work Phone: ${data.workPhone}
            Contact Preference: ${data.contactPreference}
            Credit Rating: ${data.creditRating}
            Property Address: ${data.propertyAddress}
            City: ${data.City}
            State: ${data.state}
            ZIP Code: ${data.zipCode}
            Loan Purpose: ${data.loanPurpose}
            Property Will Be: ${data.propertyWillBe}
            Estimated Value: ${data.estimatedValue}

            We will review your submission and contact you shortly.

            Best regards,
            Your Team
        `;

        const teamBody = `
            A new application has been received:

            First Name: ${data.firstName}
            Last Name: ${data.lastName}
            Email: ${data.email}
            Loan Officer: ${data.loanOfficer}
            Co-Borrower: ${data.coBorrower}
            Evening Phone: ${data.eveningPhone}
            Work Phone: ${data.workPhone}
            Contact Preference: ${data.contactPreference}
            Credit Rating: ${data.creditRating}
            Property Address: ${data.propertyAddress}
            City: ${data.City}
            State: ${data.state}
            ZIP Code: ${data.zipCode}
            Loan Purpose: ${data.loanPurpose}
            Property Will Be: ${data.propertyWillBe}
            Estimated Value: ${data.estimatedValue}
            Timestamp: ${new Date()}
        `;

        // Send email to the user
        GmailApp.sendEmail(data.email, subject, userBody);

        // Send email to the team
        const teamEmail = "team@example.com"; // Replace with your team's email address
        GmailApp.sendEmail(teamEmail, "New Application Submitted", teamBody);

        return ContentService.createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON)
            .setHeader('Access-Control-Allow-Origin', '*');
    } catch (error) {
        Logger.log(error.message);
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}



 -->
