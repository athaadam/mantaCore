export const formatRupiah = (value) => {
    const number = Number(value);
    if (isNaN(number)) return '-';
    return `Rp ${number.toLocaleString('id-ID')}`;
};