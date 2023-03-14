export default interface ICreateMedicalRecordDTO {
    id: string;
    pacientId: string;
    diagnosis: string;
    observations: string;
    date: Date;
}
