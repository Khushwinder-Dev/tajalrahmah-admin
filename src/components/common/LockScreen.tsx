import { PinInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

type Props = {
  onUnlock: () => void;
  correctPin: string;
};

export const LockScreen: React.FC<Props> = ({ onUnlock, correctPin }) => {
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === correctPin) {
        localStorage.removeItem("isLocked");
        localStorage.setItem("lastActivity", Date.now().toString());
        onUnlock();
        setPin("");
        setIsError(false);
      } else {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  }, [pin, correctPin, onUnlock]);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 w-80 text-center flex flex-col justify-center">
        <h2 className="text-xl mb-2 font-semibold text-gray-900">
          Screen Locked
        </h2>
        <p className="text-sm text-gray-600 mb-4">Enter your PIN to unlock</p>
        <div className="flex justify-center">
          <PinInput size="lg" type="number" onChange={setPin} value={pin} />
        </div>
        {isError && <p className="text-red-500 mt-2">Incorrect PIN</p>}
      </div>
    </div>
  );
};
