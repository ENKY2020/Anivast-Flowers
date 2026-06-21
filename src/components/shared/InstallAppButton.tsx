"use client";

import { useEffect, useState } from "react";

export default function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = async () => {
    if (!promptEvent) return;

    promptEvent.prompt();

    const result = await promptEvent.userChoice;

    console.log("Install choice:", result);

    setPromptEvent(null);
  };

  if (!promptEvent) return null;

  return (
    <button
      className="install-app-btn"
      onClick={installApp}
    >
      📲 Install Anivast App
    </button>
  );
}