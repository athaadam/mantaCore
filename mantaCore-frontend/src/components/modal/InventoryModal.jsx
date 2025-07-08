import InventoryForm from "../form/InventoryForm";

export default function InventoryModal({ isOpen, onClose, onSubmit, item, onChange, mode = 'add' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-200 scale-100">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-200 bg-white rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {mode === 'edit' ? 'Edit Item' : 'Add New Item'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {mode === 'edit' ? 'Update item information' : 'Fill in the details to add a new inventory item'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <InventoryForm
            item={item}
            onChange={onChange}
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}
