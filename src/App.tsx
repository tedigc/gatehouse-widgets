import { useEffect, useState } from "react";
import { Form, FormConfig } from "./Form";

const configUrl = "https://api.npoint.io/e795e27ff17f36631f3f";

const App = () => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConfig = async () => {
    try {
      const response = await fetch(configUrl);
      const json = (await response.json()) as unknown as FormConfig;
      setConfig(json);
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
      {config && <Form config={config} />}
      {error && <p>{error}</p>}
    </>
  );
};

export default App;
