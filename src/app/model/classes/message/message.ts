export class Message {

  constructor(
    public id_message: number,
    public id_utilisateur_envoyeur: number,
    public id_utilisateur_destinataire: number,
    public date_envoi: string,
    public contenu: string,
    public image_mp: string,
    public vue: number,
    public id_evenement: number,
    public id_createur: number,
    public titre: string,
    public id_categorie: number,
    public description: string,
    public image_ev: string,
    public date: string,
    public heure: string,
    public lieu: string,
    public is_public: number) {
  }
}
