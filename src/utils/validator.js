export function validerNumero(numero) {
    const regex = /^\+(221\d{9}|33\d{9}|1\d{10})$/;
    return regex.test(numero);
}