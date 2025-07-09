/**
 * Extract unique authors (users who made the transactions) from data
 * @param {Array} data - Array of transaction/purchase data
 * @param {boolean} includeSystemUsers - Whether to include system users (for purchase context)
 * @returns {Array} - Array of unique author usernames
 */
export function extractAuthors(data = [], includeSystemUsers = true) {
    const authors = new Set();
    
    // Only exclude these very obvious system patterns when includeSystemUsers is false
    const strictSystemUserPatterns = [
        'system', 'bot', 'api', 'service'
    ];
    
    // Function to check if a username is a strict system user
    const isStrictSystemUser = (username) => {
        if (!username) return true;
        const lowerUsername = username.toLowerCase();
        return strictSystemUserPatterns.some(pattern => 
            lowerUsername.includes(pattern) || lowerUsername === pattern
        );
    };
    
    data.forEach(item => {
        const username = item.user?.username;
        
        // Add to set if it exists and passes filtering
        if (username) {
            if (includeSystemUsers) {
                // Only exclude very obvious system users
                if (!isStrictSystemUser(username)) {
                    authors.add(username);
                }
            } else {
                // Use stricter filtering (for sales context)
                if (!isStrictSystemUser(username)) {
                    authors.add(username);
                }
            }
        }
    });
    
    const result = Array.from(authors).sort();
    console.log(`Extracted ${result.length} authors (includeSystemUsers: ${includeSystemUsers}):`, result);
    return result;
}

/**
 * Extract unique suitors (customers) from transaction data
 * @param {Array} data - Array of transaction data
 * @returns {Array} - Array of unique suitor usernames
 */
export function extractSuitors(data = []) {
    const suitors = new Set();
    
    // Patterns for users that should be excluded from suitor list
    const excludePatterns = [
        'admin', 'adminuser', 'administrator',
        'cashier', 'cashieruser', 'cashierstaff',
        'management', 'managementuser', 'managementusers',
        'manager', 'manageruser',
        'staff', 'employee', 'system', 'bot'
    ];
    
    // Function to check if a username should be excluded
    const shouldExclude = (username) => {
        if (!username) return true;
        const lowerUsername = username.toLowerCase();
        return excludePatterns.some(pattern => 
            lowerUsername.includes(pattern) || lowerUsername === pattern
        );
    };
    
    data.forEach(item => {
        const username = item.costumer?.username;
        
        // Add to set if not empty and not a system user
        if (username && !shouldExclude(username)) {
            suitors.add(username);
        }
    });
    
    const result = Array.from(suitors).sort();
    console.log(`Extracted ${result.length} suitors:`, result);
    return result;
}

/**
 * Extract unique customers from transaction data
 * @param {Array} data - Array of transaction/purchase data
 * @param {string} context - Context: 'sales' for sales reports, 'purchase' for purchase reports
 * @returns {Array} - Array of unique customer names
 */
export function extractCustomers(data = [], context = 'sales') {
    const customers = new Set();
    
    // Common patterns for system users that should be excluded
    const systemUserPatterns = [
        'admin', 'adminuser', 'administrator',
        'cashier', 'cashieruser', 'cashierstaff',
        'management', 'managementuser', 'managementusers',
        'manager', 'manageruser',
        'staff', 'employee', 'system', 'bot'
    ];
    
    // Function to check if a username is likely a system user
    const isSystemUser = (username) => {
        if (!username) return true;
        const lowerUsername = username.toLowerCase();
        return systemUserPatterns.some(pattern => 
            lowerUsername.includes(pattern) || lowerUsername === pattern
        );
    };
    
    data.forEach(item => {
        let username = null;
        
        if (context === 'sales') {
            // For sales reports, only use customer data
            username = item.costumer?.username;
        } else if (context === 'purchase') {
            // For purchase reports, use user data but exclude system users
            username = item.user?.username;
        } else {
            // Default: try both but prefer costumer for sales-like data
            username = item.costumer?.username || item.user?.username;
        }
        
        // Add to set if it's not a system user and not empty
        if (username && !isSystemUser(username)) {
            customers.add(username);
        }
    });
    
    const result = Array.from(customers).sort();
    console.log(`Extracted ${result.length} customers for context '${context}':`, result);
    return result;
}

/**
 * Extract unique categories from transaction/purchase data
 * @param {Array} data - Array of transaction/purchase data
 * @returns {Array} - Array of unique categories
 */
export function extractCategories(data = []) {
    const categories = new Set();
    
    data.forEach(item => {
        if (item.items && Array.isArray(item.items)) {
            item.items.forEach(itemDetail => {
                if (itemDetail.item?.category) {
                    categories.add(itemDetail.item.category);
                }
            });
        }
    });
    
    return Array.from(categories).sort();
}

/**
 * Extract unique statuses from data
 * @param {Array} data - Array of transaction/purchase data
 * @returns {Array} - Array of unique statuses
 */
export function extractStatuses(data = []) {
    const statuses = new Set();
    
    data.forEach(item => {
        if (item.status) {
            statuses.add(item.status);
        }
    });
    
    return Array.from(statuses).sort();
}

/**
 * Filter data based on filter criteria
 * @param {Array} data - Array of data to filter
 * @param {Object} filter - Filter criteria
 * @returns {Array} - Filtered data
 */
export function applyFilters(data = [], filter = {}) {
    // If no filters applied, return original data
    if (!filter || Object.keys(filter).length === 0) {
        return data;
    }
    
    console.log('Applying filters:', filter);
    console.log('Original data count:', data.length);
    
    const filtered = data.filter(item => {
        // Date range filter
        if (filter.from && item.date < filter.from) return false;
        if (filter.to && item.date > filter.to) return false;
        
        // Suitor filter (customer being served)
        if (filter.suitor) {
            const suitorName = item.costumer?.username;
            if (suitorName !== filter.suitor) return false;
        }
        
        // Author filter (user who made the transaction)
        if (filter.author) {
            const authorName = item.user?.username;
            if (authorName !== filter.author) return false;
        }
        
        // Category filter
        if (filter.category) {
            const hasCategory = item.items?.some(itemDetail => 
                itemDetail.item?.category === filter.category
            );
            if (!hasCategory) return false;
        }
        
        // Status filter
        if (filter.status && item.status !== filter.status) return false;
        
        return true;
    });
    
    console.log('Filtered data count:', filtered.length);
    return filtered;
}
