// import { PrismaClient } from "@prisma/client";
// import { User } from "../../entities/user.entity";

// export class UserRepositoryPrisma {

//     constructor(private primaClient: PrismaClient){}
//     public async create(user: User): Promise<void> {    
//         this.primaClient.user.create({
//             data: {
//                 name: user.name,
//                 email: user.email,
//                 password: user.password,
//                 role: user.role,
//             }
//         });
//     }
// }