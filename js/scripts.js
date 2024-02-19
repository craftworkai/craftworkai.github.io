/*!
* Start Bootstrap - Business Frontpage v5.0.9 (https://startbootstrap.com/template/business-frontpage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-frontpage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function formFieldsToHSJSON(form) {
    let fieldArray = [];
    let formData = new FormData(form);
    for (let field of formData) {
        let values = {
            "name": field[0],
            "value": field[1]
        }
        fieldArray.push(values)
    }
    return fieldArray;
};

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
        if (parts.length == 2){
            return parts.pop().split(";").shift();
        }     
};

function buildHSContext() {
    let hsContext = new Object()
    hsContext.hutk = getCookie('hubspotutk');
    hsContext.pageUri = window.location.href;
    hsContext.pageName = document.title;
    return hsContext
};

function prepareHSFormSubmission(form) {
    var submissionData = new Object()
    submissionData.submittedAt = Date.now()
    submissionData.fields = formFieldsToHSJSON(form)
    submissionData.context = buildHSContext()
    return submissionData
};

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
             // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    return response.json() // parses JSON response into native JS objects
};

function submitHSForm(hsFormURL, data) {
    postData(hsFormURL, data).then(data => {
        document.querySelector("#contact").innerHTML = 
            "<div class=\"container px-5 my-5 px-5 text-center\">" +
            "<h2 class=\"fw-bolder\">Thank you for contacting us!</h2>" +
            "<p class=\"lead mb-0\">We will be in touch with you shortly.</p>" +
            "</div>"
        ; 
    });
}

var form = document.querySelector('#contact-form') //alter for your forms ID or CSS selector
form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('HERE');
    var baseSubmitURL = 'https://api.hsforms.com/submissions/v3/integration/submit'
    // // Add the HubSpot portalID where the form should submit
    var portalId = '45092899'
    // // Add the HubSpot form GUID from your HubSpot portal
    var formGuid = 'd5472f4d-6f57-4fc5-8af7-aec75e830a5f' //replace with the formGUID copied from the form created inside HubSpot Forms
    var submitURL = `${baseSubmitURL}/${portalId}/${formGuid}`
    var formData = prepareHSFormSubmission(form);

    submitHSForm(submitURL, formData)
});