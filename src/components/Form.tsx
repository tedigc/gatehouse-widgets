import { Dialog } from "@headlessui/react";
import { ChangeEvent, FormEvent, useState } from "react";

export type FormConfig = {
  name: string;
  downloadLink: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  title: string;
  subheader: string;
  text: string;
  buttonText: string;
};

export type FormProps = {
  config: FormConfig;
};

export const Form = ({ config }: FormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setIsOpen(false);
    setEmail("");
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEmail(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(config.downloadLink, "_blank")?.focus();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="!px-3 !py-1.5 !text-sm !font-semibold !leading-6 !rounded-lg text-white"
        style={{
          backgroundColor: config.buttonColor,
          color: config.buttonTextColor,
        }}
      >
        Get it now
      </button>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-10">
        <div className="!w-screen !h-screen !fixed !top-0 !left-0 !right-0 !bottom-0 !bg-zinc-800 !opacity-80 !-z-10" />
        <Dialog.Panel className="!w-full !max-w-[486px] !mx-auto !my-auto !z-10">
          <form
            onSubmit={handleSubmit}
            className="!flex !w-full !flex-col !items-stretch !rounded-lg !border !border-gray-300 !p-8 bg-white"
            style={{
              backgroundColor: config.backgroundColor,
              color: config.textColor,
            }}
          >
            {/* <h1 className="!text-xl !font-extrabold !mb-2 text-black">
              {config.title}
            </h1>
            <p className="!mb-8 text-black">{config.subheader}</p> */}
            <div className="!mb-4">
              <label
                htmlFor="email"
                className="!mb-2 !block !text-sm !font-regular !leading-[1]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="!block !w-full !rounded-lg !border-0 !text-md !px-3 !py-2 !shadow-sm !ring-1 !ring-inset !ring-gray-300 !placeholder:text-gray-400 !focus:ring-2 !focus:ring-inset"
                value={email}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="!flex !min-h-[36px] !w-full !justify-center !rounded-lg !px-3 !py-2 !text-sm !font-semibold !leading-6 !focus-visible:outline !focus-visible:outline-2 !focus-visible:outline-offset-2 text-white"
              style={{
                backgroundColor: config.buttonColor,
                color: config.buttonTextColor,
              }}
            >
              {config.buttonText}
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
