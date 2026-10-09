import * as Toast from "@radix-ui/react-toast";
import { Cross } from "lucide-react";
import { useState } from "react";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toastMessage] = useState("");

  return (
    <Toast.Provider>
      {children}
      <Toast.Root
        className="bg-white rounded-md shadow-lg p-4 grid grid-cols-[auto_max-content] gap-x-4 items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Description className="text-gray-800">
          {toastMessage}
        </Toast.Description>
        <Toast.Action asChild altText="Close">
          <button className="text-gray-500 hover:text-gray-700">
            <Cross className="h-4 w-4" />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
}
