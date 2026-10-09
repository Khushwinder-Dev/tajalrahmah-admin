/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Select } from "@mantine/core";
// import {
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@radix-ui/react-select";

// function StatusEditableCell({
//   info,
//   editingCell,
//   setEditingCell,
//   editValue,
//   setEditValue,
//   handleEdit,
//   selectedCell,
//   setSelectedCell,
// }: {
//   info: any;
//   editingCell: { rowId: string; columnId: string } | null;
//   setEditingCell: React.Dispatch<
//     React.SetStateAction<{ rowId: string; columnId: string } | null>
//   >;
//   editValue: any;
//   setEditValue: React.Dispatch<React.SetStateAction<any>>;
//   handleEdit: (rowId: string, columnId: string, value: any) => void;
//   selectedCell: { rowIndex: number; columnId: string };
//   setSelectedCell: React.Dispatch<
//     React.SetStateAction<{ rowIndex: number; columnId: string }>
//   >;
// }) {
//   const isEditing =
//     editingCell?.rowId === info.row.id &&
//     editingCell?.columnId === info.column.id;

//   const statusOptions = [
//     { value: "active", label: "Active" },
//     { value: "inactive", label: "Inactive" },
//     { value: "pending", label: "Pending" },
//   ];

//   const getStatusBadge = (status: string) => {
//     const statusColors = {
//       active: "bg-green-100 text-green-800",
//       inactive: "bg-red-100 text-red-800",
//       pending: "bg-yellow-100 text-yellow-800",
//     };

//     return (
//       <span
//         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//           statusColors[status as keyof typeof statusColors] ||
//           "bg-gray-100 text-gray-800"
//         }`}
//       >
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   if (isEditing) {
//     return (
//       <Select
//         value={editValue}
//         onValueChange={(value: string) => {
//           setEditValue(value);
//           handleEdit(info.row.id, info.column.id, value);
//         }}
//         onOpenChange={(open: boolean) => {
//           if (!open) {
//             setEditingCell(null);
//             setSelectedCell({
//               rowIndex: info.row.index,
//               columnId: info.column.id,
//             });
//           }
//         }}
//       >
//         <SelectTrigger className="w-full border-0 outline-0 focus:ring-0 focus:border-0 p-0 bg-transparent h-auto">
//           <SelectValue placeholder="Select status" />
//         </SelectTrigger>
//         <SelectContent>
//           {statusOptions.map((option) => (
//             <SelectItem key={option.value} value={option.value}>
//               {option.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     );
//   }

//   return (
//     <div className="cursor-pointer hover:bg-gray-100 p-1 rounded min-h-[32px] flex items-center dark:hover:bg-gray-800">
//       {getStatusBadge(info.getValue())}
//     </div>
//   );
// }
