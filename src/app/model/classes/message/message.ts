export class Message {

  constructor(
    public id_message: number,
    public id_utilisateur_envoyeur: number,
    public id_utilisateur_destinataire: number,
    public date_envoi: string,
    public contenu: string,
    public image_mp: string,
    public vue: number,
    public id_evenement: number) {
  }
}
