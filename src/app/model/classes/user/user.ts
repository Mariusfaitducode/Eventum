export class User {
    constructor(public id_utilisateur: number, public nom: string, public prenom:string, public pseudo:string, public email: string,  public password: string, public photo_profil: string, public is_darkmode : boolean, public role: string) {

    }

    // Getters
    get Id_utilisateur(): number {
        return this.id_utilisateur;
    }

    get Nom(): string {
        return this.nom;
    }

    get Prenom(): string {
        return this.prenom;
    }

    get Pseudo(): string {
        return this.pseudo;
    }

    get Picture(): string {
        return this.photo_profil;
    }

}
