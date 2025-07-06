import InventoryForm from "../form/InventoryForm";

export default function InventoryModal({ isOpen, onClose, onSubmit, item, onChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-700">Add New Item</h2>
        </div>
        <InventoryForm
          item={item}
          onChange={onChange}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
