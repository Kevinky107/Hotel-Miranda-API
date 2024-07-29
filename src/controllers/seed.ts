import { faker } from '@faker-js/faker';
import { Booking } from '../interfaces/Booking';


const randomProfilePicture = (): string => {
    const pictures = [
        "https://unsplash.com/es/fotos/una-mujer-con-un-afro-mira-a-la-camara-_cvwXhGqG-o",
        "https://unsplash.com/es/fotos/mujer-mirando-directamente-a-la-camara-cerca-de-la-pared-rosa-bqe0J0b26RQ",
        "https://unsplash.com/es/fotos/foto-en-escala-de-grises-de-un-hombre-XHVpWcr5grQ",
        "https://unsplash.com/es/fotos/foto-en-escala-de-grises-de-mujer-con-abrigo-y-anteojos-hpZ6NCRLe1A",
        "https://unsplash.com/es/fotos/derek-fisher-d0peGya6R5Y"
    ]   

    return pictures[Math.floor( Number(Math.random) * pictures.length )]
}

const bookingNote = (): null | string => {
    return Math.floor(Number(Math.random)) > 0.6 ? faker.word.words({ count: { min: 5, max: 20 } }) : null
}

const createRandomBooking = ():Booking => {
    faker.setDefaultRefDate(faker.date.anytime());
    return {
        guest: faker.person.fullName(),
        picture: randomProfilePicture(),
        orderdate: faker.date.past({ years: 10 }),
        checkin: string,
        checkout: string,
        note: bookingNote(),
        roomtype: faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
        roomid: ,
        status: faker.helpers.arrayElement(['check in', 'check out', 'in progress'])
    }
}
