export class User {
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
    jwttoken: string;

}