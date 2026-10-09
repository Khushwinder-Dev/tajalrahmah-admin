// import ImportStepperTemp from "@/components/common/IMportTemp";
// import { Modal } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { useCallback, useEffect, useRef, useState } from "react";

// import GridCardLists from "./GridCardLists";
// import GridTableHeader from "./GridTableHeader";
// import { useState } from "react";

// export type TCity = {
//   id: string;
//   code: string;
//   name: string;
//   country: string[];
//   state: string[];
//   isDefault: boolean;
//   isActive: boolean;
//   isDraft: boolean;
//   createdAt: Date | null;
//   draftedAt: Date | null;
//   updatedAt: Date | null;
//   deletedAt: Date | null;
//   isDeleted: boolean;
//   status: string;
// };

// // Mock data - replace with real data from your API
// export type ListDataType = {
//   id: string;
//   name: string;
//   code: string;
//   status: string;
//   continent: string;
//   population: string;
//   currency: string;
//   isDeleted: boolean;
// };

// type Props = {
//   data: ListDataType[];
//   setViewMode: (viewMode: "grid" | "list") => void;
// };

// const GridCardDataTable = ({ setViewMode, data }: Props) => {
//   console.log("grid data table rendered");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dataList, setDataList] = useState(data);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isExportOpen, setIsExportOpen] = useState(false);
//   const [opened, { open, close }] = useDisclosure(false);
//   const [modalData, setModalData] = useState({
//     title: "Import Country",
//     message: <ImportStepperTemp />,
//   });

//   return (
//     <div className="px-4 py-3 h-full flex flex-col bg-white dark:bg-gray-900 parent">
//       {/* Fixed header controls - keep existing header */}
//       <GridTableHeader
//         searchQuery={searchQuery}
//         setModalData={setModalData}
//         setSearchQuery={setSearchQuery}
//         setViewMode={setViewMode}
//         isExportOpen={isExportOpen}
//         isFilterOpen={isFilterOpen}
//         setIsExportOpen={setIsExportOpen}
//         setIsFilterOpen={setIsFilterOpen}
//       />

//       {/* Main content area */}
//       <GridCardLists dataList={dataList} />

//       {/* Modal */}
//       <Modal
//         opened={opened}
//         onClose={close}
//         title={
//           <div className="">
//             <h3 className="text-lg font-semibold pl-4 ">Import Country</h3>
//           </div>
//         }
//         size="xl"
//         overlayProps={{
//           backgroundOpacity: 0.55,
//           blur: 3,
//         }}
//         style={{ zIndex: 9999 }}
//         className="z-[9999]"
//         centered
//       >
//         <div className="pt-5 pb-14 px-5">{modalData.message}</div>
//       </Modal>
//     </div>
//   );
// };

// export default GridCardDataTable;
