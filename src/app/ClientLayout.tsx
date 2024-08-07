// ClientLayout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { ToastContainer } from "react-toastify";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ready, setReady] = useState<boolean>(false);
  const [useTestAadhaar, setUseTestAadhaar] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <AnonAadhaarProvider
          _useTestAadhaar={useTestAadhaar}
          _appName="Anon Aadhaar"
        >
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { setUseTestAadhaar, useTestAadhaar });
            }
            return child;
          })}
          <ToastContainer />
        </AnonAadhaarProvider>
      ) : null}
    </>
  );
}