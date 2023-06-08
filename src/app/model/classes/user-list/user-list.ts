import { UserService } from "../../services/user/user.service";
import { User } from "../user/user";

export class UserList {
    UserList: User[] = [];
    constructor(private service : UserService){
        this.service.getData().subscribe((data) => {
            this.UserList = data;
        });
    }
}
