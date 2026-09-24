export const formatRupiah = (number: number) => {
    if (number === undefined || number === null) return 'Rp 0';
  
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};