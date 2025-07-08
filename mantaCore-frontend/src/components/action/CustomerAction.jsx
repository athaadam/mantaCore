const CustomerAction = ({ customer, onDelete, onUpdate }) => {
    return (
        <div className="flex items-center gap-2">
            <button
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-100 hover:border-violet-300 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                title="Edit customer"
                onClick={() => onUpdate(customer)}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="hidden sm:inline">Edit</span>
            </button>
            <button
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                title="Delete customer"
                onClick={() => {
                    if (window.confirm('Are you sure you want to delete this customer?')) {
                        onDelete(customer.costumerID);
                    }
                }}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Delete</span>
            </button>
        </div>
    );
};

export default CustomerAction;
