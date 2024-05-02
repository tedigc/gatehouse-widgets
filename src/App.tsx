import { useEffect, useState } from "react";
import { Form, FormConfig } from "./components/Form";

const App = ({ id }: { id: string }) => {
  const configUrl = `https://www.gatehouse.app/api/gates/${id}/config`;
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConfig = async () => {
    try {
      const response = await fetch(configUrl);
      const json = (await response.json()) as unknown as { config: FormConfig };
      setConfig(json.config);
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
