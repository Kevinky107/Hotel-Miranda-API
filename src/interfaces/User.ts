export interface User {
    id: number
    password: string
    email: string
    name: string
    picture: string
    post: 'Manager' | 'Room Service' | 'Reception'
    phone: string
    postdescription : string
    startdate : string
    state: boolean
}