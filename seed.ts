import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { RoomModel } from './src/schemas/Room';
import { BookingModel } from './src/schemas/Booking';
import { ContactModel } from './src/schemas/Contact';
import { UserModel } from './src/schemas/User';

// VARIABLES

const rooms: { _id: any; }[] = []

const start = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/hotel-miranda");
        console.log('Database connection open');

        await RoomModel.deleteMany({})
        await BookingModel.deleteMany({})
        await ContactModel.deleteMany({})
        await UserModel.deleteMany({})

        // ROOM
        const randomRoomImages = (): string => {
            const pictures = [
                "https://unsplash.com/es/fotos/estructura-de-cama-de-madera-marron-con-funda-blanca-junto-a-mesita-de-noche-de-madera-marron-FqqiAvJejto",
                "https://unsplash.com/es/fotos/cama-tapizada-blanca-capitone-HD7QBx2Yfa4",
                "https://unsplash.com/es/fotos/estructura-de-cama-de-madera-marron-con-funda-blanca-junto-a-mesita-de-noche-de-madera-marron-FqqiAvJejto",
                "https://unsplash.com/es/fotos/camas-grisesprea-w72a24brINI",
                "https://unsplash.com/es/fotos/vista-del-dormitorio-con-lampara-colgante-esferica-f1Rd2HsoKnk"
            ]   

            return pictures[Math.floor( Math.random() * pictures.length )]
        }

        const createRandomRoom = () => {
            const price = faker.number.int({min: 200, max: 400})
            return new RoomModel({
                name: `Room ${faker.number.int({ max: 999 })}`,
                images: [randomRoomImages()],
                type: faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
                price: price,
                offer: faker.number.int({min: 100, max: price}),
                amenities: faker.helpers.arrayElements(['AC','Shower','Double Bed','Towel','Bathup','Cofee Set','LED TV','Wifi'])
            })
        }

        for(let i = 0; i < 10; i++){
            const newRoom = createRandomRoom();
            await newRoom.save();
            rooms.push(newRoom)
        }
        console.log('Rooms created');

        // BOOKING 

        const randomProfilePicture = (): string => {
            const pictures = [
                "https://unsplash.com/es/fotos/una-mujer-con-un-afro-mira-a-la-camara-_cvwXhGqG-o",
                "https://unsplash.com/es/fotos/mujer-mirando-directamente-a-la-camara-cerca-de-la-pared-rosa-bqe0J0b26RQ",
                "https://unsplash.com/es/fotos/foto-en-escala-de-grises-de-un-hombre-XHVpWcr5grQ",
                "https://unsplash.com/es/fotos/foto-en-escala-de-grises-de-mujer-con-abrigo-y-anteojos-hpZ6NCRLe1A",
                "https://unsplash.com/es/fotos/derek-fisher-d0peGya6R5Y"
            ] 
            return pictures[Math.floor( Math.random() * pictures.length )]
        }

        const bookingNote = (): null | string => {
            return Math.random() > 0.6 ? faker.lorem.paragraph({ min: 1, max: 3 }) : null
        }

        const getRoomId = () => {
            return rooms[Math.floor(Math.random() * rooms.length )]._id.toString()
        }

        const createRandomBooking = () => {
            const reference = faker.date.recent();
            faker.setDefaultRefDate(reference);
            const later = new Date(reference.getTime() + faker.number.int({min: 86400000, max: 2160000000}))
            return new BookingModel({
                guest: faker.person.fullName(),
                picture: randomProfilePicture(),
                orderdate: faker.date.past({ years: 1 }).toISOString().slice(0, 10),
                checkin: faker.defaultRefDate().toISOString().slice(0, 10),
                checkout: later.toISOString().slice(0, 10),
                note: bookingNote(),
                roomtype: faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
                roomid: getRoomId(),
                status: faker.helpers.arrayElement(['check in', 'check out', 'in progress'])
            })
        }

        for(let i = 0; i < 10; i++){
            const newBooking = createRandomBooking();
            await newBooking.save();
        }
        console.log('Bookings created');

        // CONTACT

        const createRandomContact = () => {
            const firstname = faker.person.firstName();
            const lastname = faker.person.lastName();
            return new ContactModel({
                date: faker.date.past({years: 10}).toISOString().slice(0, 10),
                customer: `${firstname} ${lastname}`,
                email: faker.internet.email({ firstName: firstname, lastName: lastname }),
                phone: faker.phone.number(),
                comment: faker.lorem.paragraph({ min: 1, max: 5 }),
                archived: faker.datatype.boolean(0.2)
            })
        }

        for(let i = 0; i < 10; i++){
            const newContact = createRandomContact();
            await newContact.save();
        }
        console.log('Contacts created');

        // USER

        const createRandomUser = () => {
            const firstname = faker.person.firstName();
            const lastname = faker.person.lastName();
            const password = faker.internet.password();    
            return new UserModel({
                startdate: faker.date.past({years: 10}).toISOString().slice(0, 10),
                name: `${firstname} ${lastname}`,
                email: faker.internet.email({ firstName: firstname, lastName: lastname }),
                phone: faker.phone.number(),
                picture: randomProfilePicture(),
                post: faker.helpers.arrayElement(['Manager', 'Room Service', 'Reception']),
                postdescription: faker.lorem.paragraph({ min: 1, max: 3 }),
                state: faker.datatype.boolean(0.9),
                password: password
            })
        }

        for(let i = 0; i < 10; i++){
            const user = createRandomUser();
            await user.save();
        }

        const createMe = () => {
            const password = '1234'
            return new UserModel({
                startdate: "2024-06-24",
                name: `Kevin Agudo Montil`,
                email: `Kevinagudomontil@gmail.com`,
                phone: `616422058`,
                picture: randomProfilePicture(),
                post: `Manager`,
                postdescription: `full stack developer, is in charge of the operation of the website, its database and its visualization as well as its maintenance`,
                state: true,
                password: password
            })
        }

        const me = createMe();
        await me.save();

        console.log('Users created');

    } catch (error) {

        console.error(error);
        process.exit(1);

    } finally {

        await mongoose.connection.close();
        console.log('Database connection closed');

    }
};

start();