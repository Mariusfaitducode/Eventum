export class Notif {

    constructor(
        public id_notif: number,
        public id_utilisateur: number,
        public date_notif: Date,
        public type_notif: string,
        public vue: boolean,

        public content: any,
        public duration: string,
    ){}
}
