// addressesEqual is just a case-insensitive comparison of two addresses
export default function addressesEqual(addr1, addr2) {
    if(!addr1 || !addr2) return false;
    return addr1.toUpperCase() === addr2.toUpperCase();
}