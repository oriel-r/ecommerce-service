import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { hasSameValues } from 'src/common/utils/has-same-values.util';
import { NothingToUpdateException } from 'src/common/exeptions/nothing-to-update.exception';
import { Store } from 'src/modules/_platform/stores/entities/store.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CategoryService {

    private readonly logger = new Logger('CategoryService')

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    async create(store: Store, data: CreateCategoryDto) {

        let parent: Category | null = null
        const { name, parentId } = data;

        const namePromise = this.categoryRepository.findOneByName(store.id, name);
        const parentPromise = parentId
            ? this.categoryRepository.findById(store.id, parentId)
            : Promise.resolve(null);

        const [nameResult, parentResult] = await Promise.allSettled([namePromise, parentPromise]);

        if (nameResult.status === 'fulfilled' && nameResult.value) {
            throw new UnprocessableEntityException(`La categoría ${name} ya existe`);
        } else if (nameResult.status === 'rejected') {
            throw new InternalServerErrorException('Error al validar nombre de la categoría');
        }

        if (parentId) {
            if (parentResult.status === 'rejected') {
            throw new InternalServerErrorException('Error al verificar categoría padre');
            }
            if (!parentResult.value) {
            throw new NotFoundException('La categoría padre no existe');
            }
            parent = parentResult.value;
        }

        const newCategory = await this.categoryRepository.create({
            name,
            parent,
            store
        });

        if (!newCategory) {
            throw new InternalServerErrorException('Hubo un fallo al crear la categoría');
        }

        return newCategory;
                                                                        
    }

    async get(storeId: string) {
        const categories = await this.categoryRepository.findByStore(storeId)
        return categories
    }

    async getById(storeId: string, id: string) {
        const store = storeId
        
        const category = await this.categoryRepository.findById(store, id)
        
        if(!category) throw new NotFoundException('No se encontro la tienda')
        return category
    }

    async getByName(storeId: string, categoryName: string) {
        const category = await this.categoryRepository.findOneByName(storeId, categoryName)
        if(!category) throw new NotFoundException(`No se encontro la categoria ${categoryName}`)
            return category
    }

    async update(storeId: string, id: string, data: UpdateCategoryDto) {
        const store = storeId
        const {name, childrenIds, parentId} = data
        const category = await this.categoryRepository.findById(store, id)
        if(!category) throw new NotFoundException('Categoria inexistente o ID erroneo')
    
        if(hasSameValues(data, category)) throw new NothingToUpdateException

        const namePromise = name
        ? this.categoryRepository.findOneByName(storeId, name)
        : Promise.resolve(null);

        const parentPromise = parentId
        ? this.categoryRepository.findById(storeId, parentId)
        : Promise.resolve(null);

        const childrenPromise = childrenIds
        ? Promise.all(childrenIds.map(id => this.categoryRepository.findById(storeId, id)))
        : Promise.resolve([]);

        const [nameResult, parentResult, childrenResult] = await Promise.allSettled([
            namePromise,
            parentPromise,
            childrenPromise,
        ]);

        const updateData: Partial<Category> = {}

        if (name && nameResult.status === 'fulfilled' && nameResult.value && nameResult.value.id !== id) {
            throw new ConflictException(`La categoría ${name} ya existe`);
        }

        if (parentId) {
            if (parentResult.status !== 'fulfilled') {
            throw new InternalServerErrorException('Error al buscar la categoría padre');
            }
            if (!parentResult.value) {
            throw new NotFoundException('Categoría padre no encontrada');
            }
            if (parentId === id) {
            throw new BadRequestException('Una categoría no puede ser su propia padre');
            }
            category.parent = parentResult.value;
        }

        if (childrenIds) {
            if (childrenResult.status !== 'fulfilled') {
            throw new InternalServerErrorException('Error al validar subategorias');
            }
          
            const filtredCatgories = childrenResult.value.filter(item => item !== null);
            
            if(!filtredCatgories.length) throw new NotFoundException('No se encontraron las subcategorias a asignar')

            category.children.push(...filtredCatgories)
        }
        
        if (name && name !== category.name) category.name = name;
        
        const updateResul = await this.categoryRepository.save(category)

        if(!updateResul) throw new InternalServerErrorException('Hubo un error desconocido al modificar la categoria')

        return this.getById(store, id)
    }

    async softDelte(storeId: string, id: string) {
        const store = storeId
        await this.getById(storeId, id)
        const softDeleteResult = await this.categoryRepository.softDelete(store, id)
        
        return softDeleteResult
    }

    async delete(storeId: string, id: string) {
        const store = storeId

        await this.getById(store, id)

        const deletResult = await this.categoryRepository.delete(store, id)
        return deletResult
    }

    async validateIdsExist(categoriesIds: string[], storeId: string) {
        return await this.categoryRepository.validateIdsExist(categoriesIds, storeId)
    }

}
