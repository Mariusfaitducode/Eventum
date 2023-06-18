export class Event {
    constructor(
        public id_evenement: number,
        public id_createur: number,
        public titre: string,
        public id_categorie: number,
        public description: string,
        public image: string,
        public date: Date,
        public heure: string,
        public lieu: string,
        public is_public: boolean,
        public max_participants: number,
        public is_disponible: boolean,
      ) {}
}
