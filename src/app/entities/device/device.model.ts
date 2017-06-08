export class Device {
    constructor(
        public id?: string,
        public sn?: string,
        public type?: string,
        public appId?: string,
        public memo?: string,
        public custom?: string,
        public conf?: string,
        public version?: string,
        public metaId?: string,
        public metaData?: string,
        public status?: number,
    ) {
    }
}
