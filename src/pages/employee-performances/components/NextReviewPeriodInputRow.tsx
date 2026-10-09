import EditableInput from "@/components/common/EditableInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";

type Props = {
  setRef: (name: string) => (el: HTMLElement | null) => void;
  focusNextInput: (nextField: string) => void;
};

const NextReviewPeriodInputRow = ({ setRef, focusNextInput }: Props) => {
  const [formData, setFormData] = useState([
    {
      goal: "",
      date: "",
    },
  ]);

  // handle Form value change
  const handleFormChange = (index: number, field: string, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [field]: value,
    };
    setFormData(newFormData);
  };

  //   handle delete
  const handleDelete = (index: number) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  // handle cancel (clear specific input value)
  const handleCancel = (index: number, field: string) => {
    handleFormChange(index, field, "");
  };

  return (
    <>
      {/* E. Development Plan */}
      <h3 className="text-lg font-semibold border-b pb-2">
        F. Key Goals for Next Review Period
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_50px] gap-4 mb-4 relative">
        {formData.map((item, index) => (
          <>
            <div className="space-y-2">
              <EditableInput
                key={index}
                setRef={setRef(`goal${index}`)}
                type="text"
                id={`goal${index}`}
                name={`goal${index}`}
                value={item.goal}
                onChange={(e) =>
                  handleFormChange(index, "goal", e.target.value)
                }
                onNext={() => focusNextInput(`date${index}`)}
                onCancel={() => handleCancel(index, "goal")}
                labelText="Goal"
                tooltipText="Enter goal"
                required
              />
            </div>

            <div className="space-y-2">
              <EditableInput
                key={index}
                setRef={setRef(`date${index}`)}
                type="date"
                id={`date${index}`}
                name={`date${index}`}
                value={item.date}
                onChange={(e) =>
                  handleFormChange(index, "date", e.target.value)
                }
                onNext={() => {
                  if (index < formData.length - 1) {
                    focusNextInput(`goal${index + 1}`);
                  } else {
                    const newRow = {
                      goal: "",
                      date: "",
                    };
                    setFormData((prev) => {
                      const updated = [...prev, newRow];
                      setTimeout(() => {
                        focusNextInput(`goal${updated.length - 1}`);
                      }, 0);
                      return updated;
                    });
                  }
                }}
                onCancel={() => handleCancel(index, "date")}
                labelText="End Date"
                tooltipText="Enter end date"
                required
              />
            </div>

            <div className="h-[50px]">
              <Button
                type="button"
                variant="destructive"
                size="lg"
                className="bg-red-500 hover:bg-red-700 h-full w-full"
                onClick={() => handleDelete(index)}
              >
                <MdDelete />
              </Button>
            </div>
          </>
        ))}
      </div>
      <Button
        variant="default"
        type="button"
        size="sm"
        onClick={() =>
          setFormData([
            ...formData,
            {
              goal: "",
              date: "",
            },
          ])
        }
      >
        <MdAdd className="size-4" />
        Add Goal
      </Button>
    </>
  );
};

export default NextReviewPeriodInputRow;
