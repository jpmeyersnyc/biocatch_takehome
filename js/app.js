console.log("App loaded");
// As it turns out we need a UUID as is mentioned in Pt. 2
let csid = sessionStorage.getItem("customerSessionId");

if (!csid) {
  csid = crypto.randomUUID().toLowerCase();
  sessionStorage.setItem("customerSessionId", csid);
}

console.log('csid', csid);

// This will confirm the SDK has loaded.
// Replace `DummySDK` with the actual global object name from the SDK documentation.
// console.log('cdApi', cdApi);
// cdApi.getConfigurations(function (configurations) {
//     console.log('configs:', configurations);
// });


// const getScore = document.getElementById("getScore")
// toLogin.addEventListener("click", () => { 
//   console.log('toLogin clicked!');
// })


// const toLoginPage = document.getElementById('toLoginPage');
// if (toLoginPage) {
//   toLoginPage.addEventListener('click', (e) => {
//     e.preventDefault();
//     // Doesnt work
//     // cdApi.setCustomerSessionId(
//     //   "jPizzle"
//     // );
//     // Works!
//     // cdApi.setCustomerSessionId(
//     // "550e8400-e29b-41d4-a716-446655440000"
//     // );
//     // Works!
//     // cdApi.setCustomerSessionId(
//     //   "00000000-0000-0000-0000-000000000000"
//     // );
//     // Debugger Error!
//     // cdApi.setCustomerSessionId(
//     //   "550E8400-E29B-41D4-A716-446655440000"
//     // );
//     // Debugger Error!
//     // cdApi.setCustomerSessionId(
//     //   "550e8400e29b41d4a716446655440000"
//     // );
    

//   })
// }

function sendZapierWebhookInit() {
  const payload = {
    customerId: "dummy",
    action: "init",
    customerSessionId: csid,
    activityType: "LOGIN",
    uuid: crypto.randomUUID(), // generates a random UUID
    brand: "SE",
    solution: "ATO",
    iam: "JP Meyers"
  };

  fetch("https://hooks.zapier.com/hooks/catch/1888053/bgwofce/", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Webhook successful:", data);
  })
  .catch(error => {
    console.error("Webhook error:", error);
  });
}

function sendZapierWebhookPayment() {
  const payload = {
    customerId: "dummy",
    action: "getScore",
    customerSessionId: csid,
    activityType: "Make Payment",
    uuid: crypto.randomUUID(), // generates a random UUID
    brand: "SE",
    solution: "ATO",
    iam: "JP Meyers"
  };

  fetch("https://hooks.zapier.com/hooks/catch/1888053/bgwofce/", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Webhook successful:", data);
  })
  .catch(error => {
    console.error("Webhook error:", error);
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // 🚨 THIS IS REQUIRED

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

    console.log("Login attempted:", email, password);
    
      window.location.href = "account_overview.html";
      console.log('cdApi', cdApi);
      sendZapierWebhookInit();
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
    if (path.includes("/") || path.includes("/index.html")) {
      console.log("On the homepage!");
      cdApi.setCustomerSessionId(csid);
      cdApi.changeContext('homepage');
    }

    if (path.includes("/login.html")) {
      console.log("On the login page!");
      cdApi.setCustomerSessionId(csid);
      cdApi.changeContext('login');
    }
  
    if (path.includes("/account_overview.html")) {
      console.log("Account Overview page loaded!");
      cdApi.setCustomerSessionId(csid);
      cdApi.changeContext('account_overview');
    }
  
    if (path.includes("/make_payment.html")) {
      console.log("On the make payment page!");
      cdApi.setCustomerSessionId(csid);
      cdApi.changeContext('make_payment');
    }
  
    if (path.includes("/logout.html")) {
      console.log("On the logout page!");
      //setCustomerSessionID not included here, because user logged out
      cdApi.changeContext('logout');
    }
});

const makePayment = document.getElementById('makePayment');
if (makePayment) {
  console.log('makePayment loaded');
  makePayment.addEventListener("click", () => {
    window.location.href = "make_payment.html";
  })
}

const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
  console.log('payment form loaded');
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // 🚨 THIS IS REQUIRED

      // fake login redirect
      sendZapierWebhookPayment();
      window.location.href = "account_overview.html";
    });
}


const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {
  console.log('logout link loaded');
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();

        const confirmLogout = confirm("Are you sure you want to log out?");

        if (confirmLogout) {
          window.location.href = "logout.html";
        }
    });
}