import { User as UserType } from '../interfaces/User';
import { UserModel } from '../schemas/User';

export class User {

    static async fetchAll(): Promise<UserType[]> {
        try {
            const users = await UserModel.find().exec();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users');
        }
    }

    static async fetchOne(id: string): Promise<UserType> {
        try {
            const user = await UserModel.findById(id).exec();
            return user as UserType;
        } catch (error) {
            console.error(`Error fetching user #${id}:`, error);
            throw new Error(`Error fetching user #${id}`);
        }
    }

    static async add(userData: UserType): Promise<UserType> {
        try {
            const newuser = new UserModel(userData);
            const saveduser = await newuser.save();
            return saveduser as UserType;
        } catch (error) {
            console.error('Error adding new user:', error);
            throw new Error('Error adding new user');
        }
    }

    static async delete(id: string): Promise<UserType> {
        try {
            const deleteduser = await UserModel.findByIdAndDelete(id).exec();
            return deleteduser as UserType;
        } catch (error) {
            console.error(`Error deleting user #${id}:`, error);
            throw new Error(`Error deleting user #${id}`);
        }
    }

    static async update(id: string, userData: Partial<UserType>): Promise<UserType> {
        try {
            const updateduser = await UserModel.findByIdAndUpdate(id, userData, { new: true }).exec();
            return updateduser as UserType;
        } catch (error) {
            console.error(`Error updating user #${id}:`, error);
            throw new Error(`Error updating user #${id}`);
        }
    }

}