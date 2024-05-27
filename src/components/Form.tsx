import { Dialog } from "@headlessui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { GatehouseText } from "./GatehouseText";

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
  gateId: string;
  config: FormConfig;
};

export const Form = ({ gateId, config }: FormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setIsOpen(false);
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setFirstName(value);
  };

  const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setLastName(value);
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setEmail(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await fetch("https://www.gatehouse.app/api/leads", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, gateId }),
      });

      window.open(config.downloadLink, "_blank")?.focus();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="gh-px-3 gh-py-1.5 gh-text-sm gh-font-semibold gh-leading-6 gh-rounded-lg gh-text-white"
        style={{
          backgroundColor: config.buttonColor,
          color: config.buttonTextColor,
        }}
      >
        Get it now
      </button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="gh-fixed gh-top-0 gh-left-0 gh-right-0 gh-z-10"
      >
        <div className="gh-w-screen gh-h-screen gh-fixed gh-top-0 gh-left-0 gh-right-0 gh-bottom-0 gh-bg-zinc-800 gh-opacity-80 -gh-z-10" />
        <Dialog.Panel className="gh-w-full gh-max-w-[486px] gh-mx-auto gh-my-auto gh-z-10 gh-mt-20">
          <form
            onSubmit={handleSubmit}
            className="gh-flex gh-w-full gh-flex-col gh-items-stretch gh-rounded-lg gh-border gh-border-gray-300 gh-p-8 gh-bg-white"
            style={{
              backgroundColor: config.backgroundColor,
              color: config.textColor,
            }}
          >
            <h1 className="gh-text-xl gh-font-extrabold gh-mb-2 gh-text-black gh-tracking-wide">
              {config.title}
            </h1>
            <p className="gh-mb-8 gh-text-black">{config.subheader}</p>

            <div className="gh-flex gh-justify-between gh-mb-4 gh-gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="gh-mb-2 gh-block gh-text-sm gh-font-regular gh-leading-[1]"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  autoComplete="firstName"
                  required
                  className="gh-block gh-w-full gh-rounded-lg gh-border-0 gh-text-sm gh-px-3 gh-py-2 gh-shadow-sm gh-ring-1 gh-ring-inset gh-ring-gray-300 placeholder:gh-text-gray-400 focus:gh-ring-2 focus:gh-ring-inset"
                  value={firstName}
                  onChange={handleChangeFirstName}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="gh-mb-2 gh-block gh-text-sm gh-font-regular gh-leading-[1]"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  autoComplete="lastName"
                  required
                  className="gh-block gh-w-full gh-rounded-lg gh-border-0 gh-text-sm gh-px-3 gh-py-2 gh-shadow-sm gh-ring-1 gh-ring-inset gh-ring-gray-300 placeholder:gh-text-gray-400 focus:gh-ring-2 focus:gh-ring-inset"
                  value={lastName}
                  onChange={handleChangeLastName}
                />
              </div>
            </div>

            <div className="gh-mb-4">
              <label
                htmlFor="email"
                className="gh-mb-2 gh-block gh-text-sm gh-font-regular gh-leading-[1]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="gh-block gh-w-full gh-rounded-lg gh-border-0 gh-text-sm gh-px-3 gh-py-2 gh-shadow-sm gh-ring-1 gh-ring-inset gh-ring-gray-300 placeholder:gh-text-gray-400 focus:gh-ring-2 focus:gh-ring-inset"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>

            <button
              type="submit"
              className="gh-flex gh-min-h-[36px] gh-w-full gh-justify-center gh-rounded-lg gh-px-3 gh-py-2 gh-text-sm gh-font-semibold gh-leading-6 focus-visible:gh-outline focus-visible:gh-outline-2 focus-visible:gh-outline-offset-2 gh-text-white gh-mb-8"
              style={{
                backgroundColor: config.buttonColor,
                color: config.buttonTextColor,
              }}
            >
              {config.buttonText}
            </button>
            <p className="gh-flex gh-items-center gh-justify-center gh-text-sm gh-text-gray-500">
              Made with
              <GatehouseText className="gh-h-3 gh-ml-2 gh-fill-gray-800 gh-translate-y-px" />
            </p>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
