type FromDataType = {
  createdAt: string | null | Date;
  updatedAt: string | null | Date;
  draftedAt: string | null | Date;
  deletedAt: string | null | Date;
};
type Props = {
  formData: FromDataType;
};

const StatusDateDisplay = ({ formData }: Props) => {
  const getRelativeTime = (dateString: string | null | Date) => {
    if (!dateString) return "--/--/----";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) {
      return `${years}y ago`;
    } else if (months > 0) {
      return `${months}mo ago`;
    } else if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-3">
        <h3 className="font-medium mb-1">Created</h3>
        <p>{getRelativeTime(formData.createdAt)}</p>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-medium mb-1">Updated</h3>
        <p>{getRelativeTime(formData.updatedAt)}</p>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-medium mb-1">Drafted</h3>
        <p>{getRelativeTime(formData.draftedAt)}</p>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-medium mb-1">Deleted</h3>
        <p>{getRelativeTime(formData.deletedAt)}</p>
      </div>
    </div>
  );
};

export default StatusDateDisplay;
