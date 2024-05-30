import { Dialog } from '@headlessui/react';
import { ChangeEvent, FormEvent, useState } from 'react';

import { GatehouseText } from './GatehouseText';
import { Input } from './Input';
import { Label } from './Label';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    setFirstName('');
    setLastName('');
    setEmail('');
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
      const host = import.meta.env.VITE_GATEHOUSE_HOST;
      await fetch(`${host}/api/leads`, {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, gateId }),
      });

      window.open(config.downloadLink, '_blank')?.focus();
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
        className="gh-rounded-lg gh-px-3 gh-py-1.5 gh-text-sm gh-font-semibold gh-leading-6 gh-text-white"
        style={{
          backgroundColor: config.buttonColor,
          color: config.buttonTextColor,
        }}
      >
        Get it now
      </button>
      <Dialog open={isOpen} onClose={handleClose} className="gh-fixed gh-left-0 gh-right-0 gh-top-0 gh-z-10">
        <div className="gh-fixed gh-bottom-0 gh-left-0 gh-right-0 gh-top-0 -gh-z-10 gh-h-screen gh-w-screen gh-bg-zinc-800 gh-opacity-80" />
        <Dialog.Panel className="gh-z-10 gh-mx-auto gh-my-auto gh-mt-20 gh-w-full gh-max-w-[486px]">
          <form
            onSubmit={handleSubmit}
            className="gh-flex gh-w-full gh-flex-col gh-items-stretch gh-rounded-lg gh-border gh-border-gray-300 gh-bg-white gh-p-8"
            style={{
              backgroundColor: config.backgroundColor,
              color: config.textColor,
            }}
          >
            <h1 className="gh-mb-2 gh-text-xl gh-font-extrabold gh-tracking-wide gh-text-black">{config.title}</h1>
            <p className="gh-mb-8 gh-text-black">{config.subheader}</p>

            <div className="gh-mb-4 gh-flex gh-justify-between gh-gap-4">
              <div>
                <Label htmlFor="firstName" className="gh-mb-2">
                  First name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  autoComplete="firstName"
                  required
                  value={firstName}
                  onChange={handleChangeFirstName}
                />
              </div>
              <div>
                <Label htmlFor="email" className="gh-mb-2">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  autoComplete="lastName"
                  required
                  value={lastName}
                  onChange={handleChangeLastName}
                />
              </div>
            </div>

            <div className="gh-mb-4">
              <Label htmlFor="email" className="gh-mb-2">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleChangeEmail}
              />
            </div>

            <button
              type="submit"
              className="gh-mb-8 gh-flex gh-min-h-[36px] gh-w-full gh-justify-center gh-rounded-lg gh-px-3 gh-py-2 gh-text-sm gh-font-semibold gh-leading-6 gh-text-white focus-visible:gh-outline focus-visible:gh-outline-2 focus-visible:gh-outline-offset-2"
              style={{
                backgroundColor: config.buttonColor,
                color: config.buttonTextColor,
              }}
            >
              {config.buttonText}
            </button>
            <p className="gh-flex gh-items-center gh-justify-center gh-text-sm gh-text-gray-500">
              Made with
              <GatehouseText className="gh-ml-2 gh-h-3 gh-translate-y-px gh-fill-gray-800" />
            </p>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
