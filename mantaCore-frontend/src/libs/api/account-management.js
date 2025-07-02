export async function fetchAllUsers(token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/getAllUsers`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ Failed to fetch users:', errorText);
        throw new Error('Failed to load user data');
    }

    return res.json();
}

export async function createAccount(form, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/addUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
    });

    const text = await res.text();
    let data;

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error('Invalid server response');
    }

    if (!res.ok) {
        const errors = data?.errors;
        const errorMessage = errors
            ? Object.values(errors).flat().join('\n')
            : data.message || 'Failed to create user';
        throw new Error(errorMessage);
    }

    return data.user;
}


export async function deleteAccountById(id, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/deleteUser/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
        },
    });

    const text = await res.text();
    let data;

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error('Invalid response from server');
    }

    if (!res.ok) throw new Error(data?.message || 'Failed to delete user');

    return data;
}

export async function updateAccount(id, form, token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/updateUser/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
    });

    const text = await res.text();
    let data;

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error('Invalid server response');
    }

    if (!res.ok) {
        const errors = data?.errors;
        const errorMessage = errors
            ? Object.values(errors).flat().join('\n')
            : data.message || 'Failed to update user';
        throw new Error(errorMessage);
    }

    return data.user;
}