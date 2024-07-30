export interface Booking {
    guest: string
    picture: string
    orderdate: string
    checkin: string
    checkout: string
    note: string | null
    roomtype: 'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior'
    roomid: string,
    status: 'check in' | 'check out' | 'in progress'
}