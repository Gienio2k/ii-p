/* eslint-disable no-console */

import { register } from "register-service-worker";
const webpush = require("web-push");
const publicVapidKey =
  "BMg_znobAkM0cS5zgjA0XP1SLkgRVV1NJowHg1VgImg1uQEpqJwbAWz3YgI-XbcP5lY5n395g-l3sPilLJm6ki4";
const privateVapidKey = "HkIcMIXmPjguydbEidqXBmyLMN1BNvt8RjG4sSYAQkU";
webpush.setVapidDetails(
  "mailto:president@ii-p.com",
  publicVapidKey,
  privateVapidKey
);

if (process.env.NODE_ENV === "development") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready(reg) {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
      reg.pushManager.subscribe().then((sub) => {
        let endpoint = sub.endpoint;
        let auth = sub.toJSON().keys.auth;
        let p256dh = sub.toJSON().keys.p256dh;
        const pushSubscription = {
          endpoint: endpoint,
          keys: {
            auth: auth,
            p256dh: p256dh,
          },
        };
        webpush.sendNotification(pushSubscription, "Your Push Payload Text");
      });
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
