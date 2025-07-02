export async function changePassword(token, form) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/changePassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
    });

    const text = await response.text();
    let data;

    try {
        data = JSON.parse(text);
    } catch {
        throw new Error('Invalid server response');
    }

    if (!response.ok) {
        const errors = data?.errors;
        if (errors) {
            // Ambil semua pesan error validasi
            const errorList = Object.values(errors).flat().join('\n');
            throw new Error(errorList);
        } else if (data?.message) {
            // Ambil pesan umum seperti "Current password is incorrect"
            throw new Error(data.message);
        } else {
            throw new Error('Failed to change password');
        }
    }

    return data;
}
