"use client";

import { useEffect } from "react";

const ServiceWorkerRegister = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((registration) => {
          console.log(
            "ServiceWorker successfully registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("ServiceWorker registeration failed:", error);
        });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegister;
