import { cn } from "@/lib/utils";
import { useState } from "react";
import SignatureModal from "./SignatureModal";

type CheckCardProps = {
  vendorName?: string;
  date?: string;
  bankAccount?: string;
  amount?: number;
  checkNumber?: string;
  memo?: string;
  className?: string;
  onSignatureChange?: (signatureData: string) => void;
};

export default function CheckCard({
  vendorName = "",
  date = "",
  bankAccount = "",
  amount = 0,
  checkNumber = "0000",
  memo = "",
  className,
  onSignatureChange,
}: CheckCardProps) {
  const [signatureData, setSignatureData] = useState<string>("");
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  // Format amount to currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Convert number to words (basic implementation)
  const numberToWords = (amount: number): string => {
    if (amount === 0) return "Zero";

    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Million", "Billion"];

    const convertHundreds = (num: number): string => {
      let result = "";

      if (num >= 100) {
        result += ones[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }

      if (num >= 20) {
        result += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      } else if (num >= 10) {
        result += teens[num - 10] + " ";
        return result;
      }

      if (num > 0) {
        result += ones[num] + " ";
      }

      return result;
    };

    const convertCents = (cents: number): string => {
      if (cents === 0) return "Zero";
      if (cents < 10) return ones[cents];
      if (cents < 20) return teens[cents - 10];
      if (cents < 100) {
        const tensDigit = Math.floor(cents / 10);
        const onesDigit = cents % 10;
        let result = tens[tensDigit];
        if (onesDigit > 0) {
          result += "-" + ones[onesDigit];
        }
        return result;
      }
      return String(cents);
    };

    let wholePart = Math.floor(amount);
    const centsPart = Math.round((amount - wholePart) * 100);

    if (wholePart === 0) {
      return centsPart > 0
        ? `${convertCents(centsPart)} Cents`
        : "Zero Dollars";
    }

    let result = "";
    let thousandIndex = 0;

    while (wholePart > 0) {
      const chunk = wholePart % 1000;
      if (chunk !== 0) {
        result =
          convertHundreds(chunk) + thousands[thousandIndex] + " " + result;
      }
      wholePart = Math.floor(wholePart / 1000);
      thousandIndex++;
    }

    if (centsPart === 0) {
      result = result.trim() + " Dollars";
    } else {
      result = result.trim() + " and " + convertCents(centsPart) + " Cents";
    }

    return result;
  };

  const handleSignatureSave = (signature: string) => {
    setSignatureData(signature);
    onSignatureChange?.(signature);
  };

  const openSignatureModal = () => {
    setIsSignatureModalOpen(true);
  };

  return (
    <div
      className={cn(
        "relative bg-blue-50 border-2 border-sky-200 rounded-lg p-6 font-mono text-sm overflow-hidden",
        className
      )}
      style={{
        backgroundImage:
          "url('https://perfexmodules.gtssolution.site/modules/accounting/assets/images/check_card.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-white/30 rounded-lg"></div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-sky-500">XPERTNEXT</h2>
            <p className="text-xs text-sky-500 font-semibold">
              KARACHI, PAKISTAN
            </p>
            <p className="text-xs text-sky-500 font-semibold">KARACHI</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-900">{checkNumber}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs">Date</span>
              <div className="border-b border-gray-400 px-2 py-1 min-w-[100px] text-center">
                {date || new Date().toLocaleDateString("en-GB")}
              </div>
            </div>
          </div>
        </div>

        {/* Pay to the order of */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Pay to the order of</span>
            <div className="flex-1 border-b border-gray-400 px-2 py-1">
              {vendorName || "ABC Office Supplies"}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">$</span>
              <div className="border border-gray-400 px-2 py-1 min-w-[80px] text-right rounded-md">
                {amount > 0 ? formatAmount(amount).replace("$", "") : "0.00"}
              </div>
            </div>
          </div>
        </div>

        {/* Written amount */}
        <div className="mb-4 mt-8">
          <div className="border-b border-gray-400 px-2 py-2 min-h-[40px]">
            <span className="text-sm">
              {amount > 0 ? numberToWords(amount) : ""}
            </span>
          </div>
        </div>

        {/* Bank and account info */}
        <div className="mb-4 text-center">
          <p className="font-semibold">
            {bankAccount || "Chase Bank - Account #1234567890"}
          </p>
        </div>

        {/* Account number */}
        <div className="mb-4 text-center">
          <p className="text-sm">({memo || "Office Supplies Payment"})</p>
        </div>

        {/* Memo */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm">Memo</span>
            <div className="flex-1 border-b border-gray-400 px-2 py-1 min-h-[30px]">
              <span className="text-sm">
                {memo || "Office Supplies Payment"}
              </span>
            </div>
          </div>
        </div>

        {/* Signature area */}
        <div className="flex justify-end">
          <div className="text-center">
            {signatureData ? (
              <div className="space-y-2">
                <img
                  src={signatureData}
                  alt="Signature"
                  className="w-32 h-16 object-contain border border-gray-300 rounded"
                />
                <button
                  onClick={openSignatureModal}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Change Signature
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-32 border-b border-gray-400 mb-1"></div>
                <button
                  onClick={openSignatureModal}
                  className="bg-green-500 hover:bg-green-400 text-white px-4 py-1 cursor-pointer text-sm font-semibold rounded-full shadow"
                >
                  Sign
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom MICR line */}
        <div className="mt-4 pt-4">
          <div
            className="flex justify-between items-center text-lg font-bold tracking-wider"
            style={{ fontFamily: "MICR, monospace" }}
          >
            <span className="text-gray-400">⫸0000⫸</span>
            <span className="text-gray-400">⫸0000000000⫸</span>
            <span className="text-gray-400">⫸000000000⫸</span>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      <SignatureModal
        opened={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        onSignatureSave={handleSignatureSave}
      />
    </div>
  );
}
