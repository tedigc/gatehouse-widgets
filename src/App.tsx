import { useEffect, useState } from "react";
import { Form, FormConfig } from "./Form";

const defaultConfig = {
  buttonBackgroundColor: "#77DB89",
  buttonForegroundColor: "#000",
  submitButtonText: "Submit",
  fileUrl: `https://media.wizards.com/2014/downloads/dnd/DMBasicRulesv.0.3_PrinterFriendly.pdf`,
};

const App = () => {
  const [config, setConfig] = useState<FormConfig | null>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchConfig = async () => {
    try {
      // const response = fetch("");
      // const json = (await response).json() as unknown as FormConfig;
      // setConfig(json);

      setConfig(defaultConfig);
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
