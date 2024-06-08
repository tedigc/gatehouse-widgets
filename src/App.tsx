import { useEffect, useState } from "react";

import { Form, FormConfig } from "./components/Form";

const App = () => {
  const [gateId, setGateId] = useState<string>("");
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConfig = async () => {
    try {
      const host = import.meta.env.VITE_GATEHOUSE_HOST;
      console.log(host);
      const gateId = document.getElementById("gatehouse-widget")?.getAttribute("gate-id");
      const configUrl = `${host}/api/gates/${gateId}/config`;
      const response = await fetch(configUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = (await response.json()) as unknown as { config: FormConfig };
      setConfig(json.config);
      setGateId(gateId ?? "");
    } catch (e) {
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {config && <Form gateId={gateId} config={config} />}
      {error && <p>{error}</p>}
    </>
  );
};

export default App;
