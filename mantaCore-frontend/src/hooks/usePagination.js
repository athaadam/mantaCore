import { useState, useEffect, useRef } from 'react';

export const usePagination = (items, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const prevItemsRef = useRef([]);
    
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);
    
    useEffect(() => {
        const prevItems = prevItemsRef.current;
        const currentItems = items;
        
        // Create sets of IDs for comparison (works for both invoices and purchase requests)
        const prevIds = new Set(prevItems.map(item => item.invoiceID || item.purchaseID));
        const currentIds = new Set(currentItems.map(item => item.invoiceID || item.purchaseID));
        
        // Check if this is a deletion (current is subset of previous)
        const isDeletion = currentItems.length < prevItems.length && 
                          currentItems.every(item => prevIds.has(item.invoiceID || item.purchaseID));
        
        // Check if this is filtering (completely different set of items)
        const isFiltering = !isDeletion && 
                           (currentItems.length !== prevItems.length || 
                            !currentItems.every(item => prevIds.has(item.invoiceID || item.purchaseID)));
        
        if (isFiltering) {
            // Reset to page 1 for filtering
            setCurrentPage(1);
        } else if (isDeletion) {
            // Smart pagination for deletion
            if (totalPages > 0 && currentPage > totalPages) {
                setCurrentPage(totalPages);
            } else if (visibleItems.length === 0 && currentPage > 1) {
                setCurrentPage(prev => prev - 1);
            }
        }
        
        // Update ref
        prevItemsRef.current = currentItems;
    }, [items, totalPages, currentPage, visibleItems.length]);
    
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    
    return {
        currentPage,
        totalPages,
        visibleItems,
        paginatedData: visibleItems, // Alias for backward compatibility
        handlePrev,
        handleNext,
        onPageChange: setCurrentPage,
        setCurrentPage
    };
};
