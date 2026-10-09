/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Stepper, Button } from "@mantine/core";
import Papa from "papaparse";
import { FiUploadCloud } from "react-icons/fi";
import { Dropzone } from "@mantine/dropzone";
import { CircleX, FileCheck, CheckCircle, AlertTriangle } from "lucide-react";

const ImportStepper = () => {
  const [active, setActive] = useState(0);
  const [missingField, setMissingField] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const resetStepper = () => {
    setActive(0);
    setMissingField(false);
    setImportStatus(null);
    setCsvData(null);
    setErrMsg("");
  };

  const additionalData = {
    name_in_bangla: null,
    name_in_arabic: null,
    is_default: 0,
    draft: 0,
    drafted_at: null,
    flag: null,
  };

  const handleFileUpload = (files: any) => {
    setMissingField(false);
    const file = files?.[0];
    if (!file) return;
    nextStep();

    Papa.parse(file, {
      complete: (result: any) => {
        if (
          !result?.data ||
          result.data.length === 0 ||
          !result.data[0].id ||
          !result.data[0].code ||
          !result.data[0].name
        ) {
          setMissingField(true);
          return;
        }

        const updatedData = result.data.map((row: any) => ({
          id: row?.id,
          code: row?.code,
          name: row?.name,
          is_active: parseInt(row?.is_active),
          ...additionalData,
          created_at: row?.created_at || null,
          updated_at: row?.updated_at || null,
          deleted_at: row?.deleted_at || null,
        }));

        setCsvData(updatedData);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleImport = async () => {
    setErrMsg("");
    if (!csvData) return;
    console.log(csvData);
    nextStep();
    // try {
    //   const res = await importCountry({ countries: csvData }).unwrap();
    //   if (res.success) {
    //     setImportStatus("success");
    //   } else {
    //     console.log("Gen", res);
    //     setImportStatus("error");
    //   }
    // } catch (err) {
    //   setImportStatus("error");
    //   setErrMsg(err?.data?.message);
    // }
  };

  return (
    <>
      <Stepper mih={220} active={active} onStepClick={setActive}>
        <Stepper.Step label="Upload File">
          <div className="h-[17rem]">
            <Dropzone
              onDrop={handleFileUpload}
              radius={10}
              loading={false}
              className="h-full"
            >
              <div className="h-[15rem] p-4 border-2   bg-gray-100 rounded-md flex flex-col ">
                <div className="flex  flex-col items-center justify-center h-full text-center text-gray-600">
                  <FiUploadCloud className="text-2xl" />
                  <p className="mt-2">Drag and drop a file or click</p>
                  <p className="text-xs text-primary-500">
                    Note: Only .CSV format.
                  </p>
                </div>
              </div>
            </Dropzone>
            <div>
              <Button className="mt-3 w-full">Download Sample CSV</Button>
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Match Fields">
          <div className="h-[17rem] flex items-center justify-center">
            {missingField ? (
              <div className="flex flex-col items-center justify-center py-5">
                <CircleX size={80} className="text-red-400 mb-3" />
                <h3 className="text-2xl font-semibold text-red-400">
                  Failed to Import!
                </h3>
                <p className="text-lg font-semibold">Fields are not matched!</p>
                <div className="mt-5">
                  <Button variant="default" onClick={resetStepper}>
                    Back
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-5">
                <FileCheck size={80} className="text-green-500 mb-3" />
                <h3 className="text-2xl font-semibold text-green-500">
                  Fields are OK!
                </h3>
                <div className="mt-5">
                  <Button onClick={handleImport}>Continue</Button>
                </div>
              </div>
            )}
          </div>
        </Stepper.Step>

        <Stepper.Step label="Import Products">
          <div className="h-[17rem] flex items-center justify-center">
            {importStatus === "success" ? (
              <div className="flex flex-col items-center justify-center space-y-5 py-5">
                <CheckCircle size={80} className="text-green-500 mb-3" />
                <h3 className="text-2xl font-semibold text-green-500">
                  Imported Successfully!
                </h3>
              </div>
            ) : importStatus === "error" ? (
              <div className="flex flex-col items-center justify-center space-y-5 py-5">
                <AlertTriangle size={80} className="text-red-500 mb-3" />
                <h3 className="text-2xl font-semibold text-red-500">
                  Import Failed!
                </h3>
                <p className="font-bold text-lg">{errMsg}</p>
                <Button variant="default" onClick={resetStepper}>
                  Try Again
                </Button>
              </div>
            ) : (
              <p className="text-center py-5">Processing Import...</p>
            )}
          </div>
        </Stepper.Step>
      </Stepper>
    </>
  );
};

export default ImportStepper;
