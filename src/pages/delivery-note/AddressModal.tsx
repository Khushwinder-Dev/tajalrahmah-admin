/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@mantine/core";
import { X, Save, MapPin, Building2, Globe } from "lucide-react";
import EditableInput, {
  type EditableInputRef,
} from "@/components/common/EditableInput";
import { Autocomplete } from "@mantine/core";
import { toastError } from "@/lib/toast";

// Define Address interface
interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Mock data for dropdowns
const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "South Africa",
];

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onSave: (address: string) => void;
}

export default function AddressModal({
  isOpen,
  onClose,
  currentAddress,
  onSave,
}: AddressModalProps) {
  // Form refs for focus management
  const streetRef = useRef<EditableInputRef>(null);
  const cityRef = useRef<EditableInputRef>(null);
  const postalCodeRef = useRef<EditableInputRef>(null);

  // Parse current address or use empty values
  const parseAddress = (addressString: string): Address => {
    if (!addressString) {
      return {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      };
    }

    // Simple parsing - you can make this more sophisticated
    const parts = addressString.split(", ");
    return {
      street: parts[0] || "",
      city: parts[1] || "",
      state: parts[2] || "",
      postalCode: parts[3] || "",
      country: parts[4] || "",
    };
  };

  // Form state
  const [addressData, setAddressData] = useState<Address>(
    parseAddress(currentAddress)
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Focus management
  const focusNextInput = (currentField: string) => {
    switch (currentField) {
      case "street":
        cityRef.current?.focus();
        break;
      case "city": {
        const stateInput = document.querySelector(
          'input[placeholder="Select state..."]'
        ) as HTMLInputElement;
        stateInput?.focus();
        break;
      }
      case "state":
        postalCodeRef.current?.focus();
        break;
      case "postalCode": {
        const countryInput = document.querySelector(
          'input[placeholder="Select country..."]'
        ) as HTMLInputElement;
        countryInput?.focus();
        break;
      }
      default:
        break;
    }
  };

  // Format address as string
  const formatAddress = (address: Address): string => {
    const parts = [
      address.street,
      address.city,
      address.state,
      address.postalCode,
      address.country,
    ].filter((part) => part.trim() !== "");

    return parts.join(", ");
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!addressData.street.trim()) {
      toastError("Street address is required");
      return;
    }

    if (!addressData.city.trim()) {
      toastError("City is required");
      return;
    }

    // Format and save address
    const formattedAddress = formatAddress(addressData);
    onSave(formattedAddress);
    onClose();
  };

  // Handle modal close
  const handleClose = () => {
    setAddressData(parseAddress(currentAddress));
    onClose();
  };

  // Reset to current address
  const handleReset = () => {
    setAddressData(parseAddress(currentAddress));
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Edit Address
          </span>
        </div>
      }
      size="lg"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      styles={{
        body: { padding: 0 },
        header: {
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "16px",
          marginBottom: 0,
        },
      }}
      centered
    >
      <form onSubmit={handleSubmit} className="p-6">
        {/* Street Address */}
        <div className="space-y-2 mb-4">
          <h3 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Building2 size={14} />
            Street Address <span className="text-red-500">*</span>
          </h3>
          <EditableInput
            ref={streetRef}
            id="street"
            name="street"
            className="w-full h-10"
            value={addressData.street}
            onChange={handleChange}
            onNext={() => focusNextInput("street")}
            onCancel={() => {}}
            placeholder="Enter street address..."
            tooltipText="Enter the street address"
            required
          />
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">
              City <span className="text-red-500">*</span>
            </h3>
            <EditableInput
              ref={cityRef}
              id="city"
              name="city"
              className="w-full h-10"
              value={addressData.city}
              onChange={handleChange}
              onNext={() => focusNextInput("city")}
              onCancel={() => {}}
              placeholder="Enter city..."
              tooltipText="Enter the city name"
              required
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">
              State/Province
            </h3>
            <Autocomplete
              data={US_STATES}
              value={addressData.state}
              onChange={(value) => {
                setAddressData((prev) => ({ ...prev, state: value || "" }));
              }}
              placeholder="Select state..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") focusNextInput("state");
              }}
              clearable
            />
          </div>
        </div>

        {/* Postal Code and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">
              Postal/ZIP Code
            </h3>
            <EditableInput
              ref={postalCodeRef}
              id="postalCode"
              name="postalCode"
              className="w-full h-10"
              value={addressData.postalCode}
              onChange={handleChange}
              onNext={() => focusNextInput("postalCode")}
              onCancel={() => {}}
              placeholder="Enter postal code..."
              tooltipText="Enter postal or ZIP code"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Globe size={14} />
              Country
            </h3>
            <Autocomplete
              data={COUNTRIES}
              value={addressData.country}
              onChange={(value) => {
                setAddressData((prev) => ({ ...prev, country: value || "" }));
              }}
              placeholder="Select country..."
              className="w-full"
              styles={{
                input: {
                  height: "40px",
                  "&:focus": { borderColor: "var(--primary)" },
                },
              }}
              clearable
            />
          </div>
        </div>

        {/* Address Preview */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">
            Address Preview:
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatAddress(addressData) || "Address will appear here..."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            Reset
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save size={16} />
              Save Address
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
