export class UserModel {
    userId: number;
    userName: string;
    password: string;
    shortName: string;
    fullName: string;
    phone: string;
    email: string;
    role: {
        roleId: number;
        roleName: string;
    };
    business: {
        unitId: number,
        unitName: string,
        leaderId: number
    };
    token?: string;
}