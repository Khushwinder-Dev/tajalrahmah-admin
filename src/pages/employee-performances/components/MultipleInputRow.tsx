import EditableInput from "@/components/common/EditableInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";

type Props = {
  setRef: (name: string) => (el: HTMLElement | null) => void;
  focusNextInput: (nextField: string) => void;
};

const MultipleInputRow = ({ setRef, focusNextInput }: Props) => {
  const [formData, setFormData] = useState([
    {
      areaOfImprovement: "",
      expactedOutCome: "",
      responsiblePersion: "",
      startDate: "",
      endDate: "",
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
        E. Development Plan
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_50px] gap-4 mb-4 relative">
        {formData.map((item, index) => (
          <>
            <div className="space-y-2">
              <EditableInput
                key={index}
                setRef={setRef(`areaOfImprovement${index}`)}
                type="text"
                id={`areaOfImprovement${index}`}
                name={`areaOfImprovement${index}`}
                value={item.areaOfImprovement}
                onChange={(e) =>
                  handleFormChange(index, "areaOfImprovement", e.target.value)
                }
                onNext={() => focusNextInput(`expactedOutCome${index}`)}
                onCancel={() => handleCancel(index, "areaOfImprovement")}
                labelText="Area of Improvement"
                tooltipText="Enter area of improvement"
                required
              />
            </div>
            <div className="space-y-2">
              <EditableInput
                key={index}
                setRef={setRef(`expactedOutCome${index}`)}
                type="text"
                id={`expactedOutCome${index}`}
                name={`expactedOutCome${index}`}
                value={item.expactedOutCome}
                onChange={(e) =>
                  handleFormChange(index, "expactedOutCome", e.target.value)
                }
                onNext={() => focusNextInput(`responsiblePersion${index}`)}
                onCancel={() => handleCancel(index, "expactedOutCome")}
                labelText="Expected Outcome"
                tooltipText="Enter expected outcome"
                required
              />
            </div>

            <div className="space-y-2">
              <EditableInput
                key={index}
                setRef={setRef(`responsiblePersion${index}`)}
                type="text"
                id={`responsiblePersion${index}`}
                name={`responsiblePersion${index}`}
                value={item.responsiblePersion}
                onChange={(e) =>
                  handleFormChange(index, "responsiblePersion", e.target.value)
                }
                onNext={() => focusNextInput(`startDate${index}`)}
                onCancel={() => handleCancel(index, "responsiblePersion")}
                labelText="Responsible Person"
                tooltipText="Enter responsible person"
                required
              />
            </div>

            <div className="space-y-2">
              <EditableInput
                key={index}
                setRef={setRef(`startDate${index}`)}
                type="date"
                id={`startDate${index}`}
                name={`startDate${index}`}
                value={item.startDate}
                onChange={(e) =>
                  handleFormChange(index, "startDate", e.target.value)
                }
                onNext={() => focusNextInput(`endDate${index}`)}
                onCancel={() => handleCancel(index, "startDate")}
                labelText="Start Date"
                tooltipText="Enter start date"
                required
              />
            </div>

            <div className="space-y-2">
              <EditableInput
                key={index}
                setRef={setRef(`endDate${index}`)}
                type="date"
                id={`endDate${index}`}
                name={`endDate${index}`}
                value={item.endDate}
                onChange={(e) =>
                  handleFormChange(index, "endDate", e.target.value)
                }
                onNext={() => {
                  if (index < formData.length - 1) {
                    focusNextInput(`areaOfImprovement${index + 1}`);
                  } else {
                    const newRow = {
                      areaOfImprovement: "",
                      expactedOutCome: "",
                      responsiblePersion: "",
                      startDate: "",
                      endDate: "",
                    };
                    setFormData((prev) => {
                      const updated = [...prev, newRow];
                      setTimeout(() => {
                        focusNextInput(
                          `areaOfImprovement${updated.length - 1}`
                        );
                      }, 0);
                      return updated;
                    });
                  }
                }}
                onCancel={() => handleCancel(index, "endDate")}
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
              areaOfImprovement: "",
              expactedOutCome: "",
              responsiblePersion: "",
              startDate: "",
              endDate: "",
            },
          ])
        }
      >
        <MdAdd className="size-4" />
        Add Development
      </Button>
    </>
  );
};

export default MultipleInputRow;
