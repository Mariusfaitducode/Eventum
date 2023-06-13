export class User {
    constructor(
        public id_utilisateur: number, 
        public nom: string,
        public prenom:string, 
        public pseudo:string, 
        public email: string,  
        public password: string, 
        public photo_profil: string, 
        public is_darkmode : boolean, 
        public role: string) {

    }

}