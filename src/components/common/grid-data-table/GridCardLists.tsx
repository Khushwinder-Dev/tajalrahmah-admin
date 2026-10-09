// import { Card, CardTitle } from "@/components/ui/card";
// import { toastSuccess } from "@/lib/toast";
// import GridExportComponent from "@/pages/Country/GridExportComponent";
// import GridFilterComponent from "@/pages/Country/GridFilterComponent";
// import { Tooltip } from "@mantine/core"; // Import Tooltip from Mantine
// import { CheckCircle2, Circle, Pencil, RefreshCw, Trash2 } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import type { ListDataType } from "./GridCardDataTable";

// type Props = {
//   dataList: ListDataType[];
//   setDataList: React.Dispatch<React.SetStateAction<ListDataType[]>>;
// };

// const GridCardLists = ({ dataList, setDataList }: Props) => {
//   const navigate = useNavigate();

//   // Infinite scroll states
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [, setPage] = useState(1);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const ITEMS_PER_PAGE = 4;

//   // ... (keep all your existing functions: loadMoreData, handleScroll, etc.)
//   // Simulate API call to load more data
//   const loadMoreData = useCallback(async () => {
//     if (isLoading || !hasMore) return;

//     setIsLoading(true);

//     await new Promise((resolve) => setTimeout(resolve, 800));

//     const continents = [
//       "Europe",
//       "Asia",
//       "Africa",
//       "North America",
//       "South America",
//       "Oceania",
//     ];

//     const newItems = Array.from({ length: ITEMS_PER_PAGE }, (_, index) => ({
//       id: `${Date.now()}-${index}`,
//       name: `Country ${dataList.length + index + 1}`,
//       code: `C${(dataList.length + index + 1).toString().padStart(2, "0")}`,
//       status:
//         Math.random() > 0.3
//           ? "active"
//           : Math.random() > 0.5
//           ? "inactive"
//           : "draft",
//       continent: continents[Math.floor(Math.random() * continents.length)],
//       population: `${Math.floor(Math.random() * 100 + 1)} million`,
//       currency: "USD",
//       isDeleted: false,
//     }));

//     // Stop loading more after reaching 50 items for demo
//     if (dataList.length >= 46) {
//       setHasMore(false);
//     } else {
//       setDataList((prev) => [...prev, ...newItems]);
//       setPage((prev) => prev + 1);
//     }

//     setIsLoading(false);
//   }, [dataList.length, isLoading, hasMore]);

//   // Infinite scroll handler
//   const handleScroll = useCallback(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     const { scrollTop, scrollHeight, clientHeight } = container;
//     const threshold = 100; // Load more when 100px from bottom

//     if (scrollHeight - scrollTop <= clientHeight + threshold) {
//       loadMoreData();
//     }
//   }, [loadMoreData]);

//   // Add scroll event listener
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   //   handle delete
//   const handleDeleteClick = (id: string) => {
//     setDataList((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               isDeleted: item.isDeleted === true ? false : true,
//             }
//           : item
//       )
//     );
//   };

//   //   handle restore
//   const handleRestoreClick = (id: string) => {
//     setDataList((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               isDeleted: item.isDeleted === true ? false : true,
//             }
//           : item
//       )
//     );
//   };

//   const toggleStatus = (id: string) => {
//     setDataList((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               status: item.status === "active" ? "inactive" : "active",
//             }
//           : item
//       )
//     );
//   };

//   // Filter countries based on search query
//   const filteredDataList = dataList.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.continent.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex flex-1 overflow-hidden mt-2">
//       {/* Cards container */}
//       <div
//         ref={scrollContainerRef}
//         className="overflow-y-auto scroll-smooth smooth-scroll pr-4"
//         style={{
//           width: isFilterOpen || isExportOpen ? "calc(100% - 320px)" : "100%",
//         }}
//       >
//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4">
//           {filteredDataList.map((item) => (
//             <Card
//               key={item.id}
//               className="transition-all hover:border-primary hover:shadow-md relative group dark:bg-gray-800 p-4"
//             >
//               {/* Top Row - Grid with 3 columns: Title | Icons | Flag */}
//               <div className="grid grid-cols-3 items-center gap-2 mb-4">
//                 {/* Left - Title */}
//                 <Tooltip label={item.name} position="top" withArrow>
//                   <CardTitle
//                     className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors truncate"
//                     onClick={() => navigate(`/countries/1`)}
//                   >
//                     {item.name}
//                   </CardTitle>
//                 </Tooltip>

//                 {/* Middle - Action Icons */}
//                 <div className="flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   {/* Status Toggle */}
//                   <Tooltip
//                     label={
//                       item.status === "active"
//                         ? "CLick to Inactivate"
//                         : "CLick to Activate"
//                     }
//                     position="top"
//                     withArrow
//                   >
//                     <div
//                       className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                         item.status === "active"
//                           ? "text-green-500"
//                           : "text-gray-400"
//                       }`}
//                       onClick={() => {
//                         toggleStatus(item.id);
//                         toastSuccess(
//                           item.status === "active"
//                             ? "item activated successfully"
//                             : "item inactivated successfully"
//                         );
//                       }}
//                     >
//                       {item.status === "active" ? (
//                         <CheckCircle2 className="h-4 w-4" />
//                       ) : (
//                         <Circle className="h-4 w-4" />
//                       )}
//                     </div>
//                   </Tooltip>

//                   {/* Delete/Restore */}
//                   <Tooltip
//                     label={item.isDeleted ? "Restore" : "Delete"}
//                     position="top"
//                     withArrow
//                   >
//                     <div
//                       className={`cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                         item.isDeleted ? "text-blue-500" : "text-red-500"
//                       }`}
//                       onClick={() => {
//                         if (item.isDeleted) {
//                           handleRestoreClick(item.id);
//                         } else {
//                           handleDeleteClick(item.id);
//                         }
//                         toastSuccess(
//                           item.isDeleted
//                             ? "item restored successfully"
//                             : "item deleted successfully"
//                         );
//                       }}
//                     >
//                       {item.isDeleted ? (
//                         <RefreshCw className="h-4 w-4" />
//                       ) : (
//                         <Trash2 className="h-4 w-4" />
//                       )}
//                     </div>
//                   </Tooltip>

//                   {/* Edit */}
//                   <Tooltip label="Edit" position="top" withArrow>
//                     <div
//                       className="cursor-pointer p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-blue-500"
//                       onClick={() => navigate(`/countries/1/edit`)}
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </div>
//                   </Tooltip>
//                 </div>

//                 {/* Right - Flag */}
//                 <div className="flex justify-end">
//                   <img
//                     src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
//                     alt={`${item.name} flag`}
//                     className="h-12 w-12 object-cover border rounded-md shadow-sm"
//                     onError={(e) => {
//                       (
//                         e.target as HTMLImageElement
//                       ).src = `https://flagcdn.com/us.svg`;
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Bottom Row - Grid with 2 columns: Code | Currency */}
//               <div className="grid grid-cols-2 items-center gap-4 pt-2 dark:border-gray-700">
//                 {/* Code - Left aligned */}
//                 <div>
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     Code
//                   </div>
//                   <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//                     {item.code}
//                   </div>
//                 </div>

//                 {/* Currency - Right aligned */}
//                 <div className="text-right">
//                   <div className="text-xs text-gray-500 dark:text-gray-400">
//                     Currency
//                   </div>
//                   <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//                     {item.currency}
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>

//         {/* Loading indicator */}
//         {isLoading && (
//           <div className="flex justify-center items-center py-8">
//             <div className="flex items-center gap-2 text-blue-600">
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//               <span className="text-sm">Loading more countries...</span>
//             </div>
//           </div>
//         )}

//         {/* End of data indicator */}
//         {!hasMore && filteredDataList.length > 12 && (
//           <div className="flex justify-center items-center py-8">
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               No more countries to load
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Filter component - Right side only */}
//       {isFilterOpen && (
//         <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
//           <div className="h-full flex flex-col">
//             <GridFilterComponent
//               data={data}
//               setFilteredData={setDataList}
//               setShowFilter={setIsFilterOpen}
//             />
//           </div>
//         </div>
//       )}

//       {/* Export component - Right side only */}
//       {isExportOpen && (
//         <div className="w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-700 pl-4">
//           <div className="h-full flex flex-col">
//             <GridExportComponent
//               data={data}
//               setFilteredData={setDataList}
//               setIsExportOpen={setIsExportOpen}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GridCardLists;
