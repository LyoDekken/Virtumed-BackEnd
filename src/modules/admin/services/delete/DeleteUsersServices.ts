import { injectable, inject } from 'tsyringe';

import IAdiminRepository from '@modules/admin/repositories/IAdminRepository';

interface IRequestDelete {
    id: string;
}

@injectable()
class DeleteUsersService {
    constructor(
        @inject('AdminsRepository')
        private usersRepository: IAdiminRepository,
    ) {}

    public async delete({
        id,
    }: IRequestDelete): Promise<void> {
        await this.usersRepository.delete(id);
    }
}

export default DeleteUsersService;
