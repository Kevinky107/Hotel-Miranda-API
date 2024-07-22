export interface Booking {
    guest: string
    picture: string
    id: number
    orderdate: string
    checkin: string
    checkout: string
    note: string | null
    roomtype: 'Suite' | 'Single Bed' | 'Double Bed' | 'Double Superior'
    roomid: number,
    status: 'check in' | 'check out' | 'in progress'
}