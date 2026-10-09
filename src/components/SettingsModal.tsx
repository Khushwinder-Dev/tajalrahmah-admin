import { Button } from "./ui/button";

const SettingsModal = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg w-full p-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* Notifications */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Notifications</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div
              className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-sky-400 
                          after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                          after:bg-white after:border after:border-gray-300 after:rounded-full 
                          after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
            ></div>
          </label>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Enable or disable notifications for updates and promotions.
        </p>
      </div>

      {/* Theme */}
      <div className="flex flex-col mb-4">
        <span className="font-medium text-gray-700 mb-1">Theme</span>
        <select className="border border-gray-300 rounded px-3 py-2 w-full">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Select your preferred interface theme.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button className="px-4 py-2 text-white rounded">Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsModal;
