import { useRef, useState } from "react";
import EditableInput from "./common/EditableInput";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const UserProfileModal = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    profileImage: "",
  });
  // focus next input field
  const inputRefs = useRef<Record<string, HTMLElement | null>>({});
  const setRef = (name: string) => (el: HTMLElement | null) => {
    inputRefs.current[name] = el;
  };
  const focusNextInput = (nextField: string) => {
    inputRefs.current[nextField]?.focus();
  };

  return (
    <form className="border border-gray-200 p-6 rounded-2xl">
      <div className="space-y-4 grid grid-cols-2 gap-4">
        <div className="space-y-2 relative">
          <EditableInput
            setRef={setRef("firstName")}
            type={"text"}
            id={"firstName"}
            name={"firstName"}
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            onNext={() => focusNextInput("lastName")}
            onCancel={() => setFormData({ ...formData, firstName: "" })}
            labelText={"First Name"}
            tooltipText={"Enter your first name"}
            required={true}
          />
        </div>

        <div className="space-y-2 relative">
          <EditableInput
            setRef={setRef("lastName")}
            type={"text"}
            id={"lastName"}
            name={"lastName"}
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            onNext={() => focusNextInput("email")}
            onCancel={() => setFormData({ ...formData, lastName: "" })}
            labelText={"Last Name"}
            tooltipText={"Enter your last name"}
            required={true}
          />
        </div>

        <div className="space-y-2 relative">
          <EditableInput
            setRef={setRef("email")}
            type={"email"}
            id={"email"}
            name={"email"}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onNext={() => focusNextInput("phone")}
            onCancel={() => setFormData({ ...formData, email: "" })}
            labelText={"Email"}
            tooltipText={"Enter your email"}
            required={true}
          />
        </div>

        <div className="space-y-2 relative">
          <EditableInput
            setRef={setRef("phone")}
            type={"phone"}
            id={"phone"}
            name={"phone"}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            onNext={() => focusNextInput("facebook")}
            onCancel={() => setFormData({ ...formData, phone: "" })}
            labelText={"Phone"}
            tooltipText={"Enter your phone number"}
            required={true}
          />
        </div>

        <div className="space-y-2 relative">
          <EditableInput
            setRef={setRef("facebook")}
            type={"text"}
            id={"facebook"}
            name={"facebook"}
            value={formData.facebook}
            onChange={(e) =>
              setFormData({ ...formData, facebook: e.target.value })
            }
            onNext={() => focusNextInput("linkedin")}
            onCancel={() => setFormData({ ...formData, facebook: "" })}
            labelText={"Facebook"}
            tooltipText={"Enter your facebook link"}
            required={true}
          />
        </div>
        <div className="space-y-2 relative">
          <EditableInput
            setRef={setRef("linkedin")}
            type={"text"}
            id={"linkedin"}
            name={"linkedin"}
            value={formData.linkedin}
            onChange={(e) =>
              setFormData({ ...formData, linkedin: e.target.value })
            }
            onNext={() => focusNextInput("instagram")}
            onCancel={() => setFormData({ ...formData, linkedin: "" })}
            labelText={"Linkedin"}
            tooltipText={"Enter your linkedin link"}
            required={true}
          />
        </div>
        <div className="space-y-2 relative">
          <EditableInput
            setRef={setRef("instagram")}
            type={"text"}
            id={"instagram"}
            name={"instagram"}
            value={formData.instagram}
            onChange={(e) =>
              setFormData({ ...formData, instagram: e.target.value })
            }
            onNext={() => focusNextInput("instagram")}
            onCancel={() => setFormData({ ...formData, instagram: "" })}
            labelText={"Instagram"}
            tooltipText={"Enter your instagram link"}
            required={true}
          />
        </div>
        {/* Profile image showing and upload*/}
        <div className="flex items-start flex-col gap-4">
          <Input
            className="h-[50px] pt-[.7rem] rounded-[12px]"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData({
                  ...formData,
                  profileImage: URL.createObjectURL(file), // blob URL for preview
                });
              }
            }}
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile Image"
              className="w-24 h-24 object-cover rounded-full"
            />
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          onClick={() => {
            console.log(formData);
          }}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default UserProfileModal;
