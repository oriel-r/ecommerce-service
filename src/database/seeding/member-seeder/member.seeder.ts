import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Member } from 'src/modules/auth/members/entities/member.entity';
import { Role } from 'src/modules/auth/roles/entities/role.entity';
import { appDataSource } from 'src/database/data-source';
import * as bcrypt from 'bcrypt';
import { Address } from 'src/modules/_support/geography/address/entities/address.entity';

@Injectable()
export class MembersSeeder {
  private readonly logger = new Logger(MembersSeeder.name);
  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = appDataSource;
  }

  async run(storeId: string) {
    this.logger.log('🌱 Iniciando seeder de miembros...');

    const memberRepo = this.dataSource.getRepository(Member);
    const roleRepo = this.dataSource.getRepository(Role);
    const addressRepo = this.dataSource.getRepository(Address);

    let role = await roleRepo.findOneBy({ name: 'customer' });
    if (!role) {
      role = await roleRepo.save(roleRepo.create({name: 'customer'}))
    }

    // Datos de miembros
    const membersData = [
  {
    fullName: 'Juan Pérez',
    email: 'juan.perez@example.com',
    dni: '11111111',
    cuit: '20-11111111-3',
    phoneNumber: '1111111111',
    password: 'Password123',
    birthDate: '1990-05-10',
    taxCondition: 'Responsable Inscripto',
    addresses: [
      {
        street: 'Calle Falsa',
        number: '123',
        postalCode: '1000',
        apartment_floor: 'PB',
        country: 'Argentina',
        cityId: 'uuid-city-1',
      },
    ],
  },
  {
    fullName: 'María Gómez',
    email: 'maria.gomez@example.com',
    dni: '22222222',
    cuit: '27-22222222-5',
    phoneNumber: '2222222222',
    password: 'Password123',
    birthDate: '1988-08-15',
    taxCondition: 'Monotributo',
    addresses: [
      {
        street: 'Av. Siempreviva',
        number: '742',
        postalCode: '1414',
        apartment_floor: '1A',
        country: 'Argentina',
        cityId: 'uuid-city-2',
      },
    ],
  },
  {
    fullName: 'Carlos López',
    email: 'carlos.lopez@example.com',
    dni: '33333333',
    cuit: '20-33333333-7',
    phoneNumber: '3333333333',
    password: 'Password123',
    birthDate: '1995-02-20',
    addresses: [
      {
        street: 'San Martín',
        number: '456',
        postalCode: '2000',
        apartment_floor: '2B',
        country: 'Argentina',
        cityId: 'uuid-city-1',
      },
    ],
  },
  {
    fullName: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    dni: '44444444',
    cuit: '27-44444444-9',
    phoneNumber: '4444444444',
    password: 'Password123',
    birthDate: '1992-11-30',
    taxCondition: 'Responsable Inscripto',
    addresses: [
      {
        street: 'Belgrano',
        number: '890',
        postalCode: '3000',
        apartment_floor: '3C',
        country: 'Argentina',
        cityId: 'uuid-city-2',
      },
    ],
  },
  {
    fullName: 'Pedro Ramírez',
    email: 'pedro.ramirez@example.com',
    dni: '55555555',
    cuit: '20-55555555-1',
    phoneNumber: '5555555555',
    password: 'Password123',
    birthDate: '1985-09-12',
    addresses: [
      {
        street: 'Mitre',
        number: '321',
        postalCode: '4000',
        apartment_floor: '4D',
        country: 'Argentina',
        cityId: 'uuid-city-1',
      },
    ],
  },
  {
    fullName: 'Lucía Fernández',
    email: 'lucia.fernandez@example.com',
    dni: '66666666',
    cuit: '27-66666666-4',
    phoneNumber: '6666666666',
    password: 'Password123',
    birthDate: '1998-01-22',
    taxCondition: 'Exento',
    addresses: [
      {
        street: 'Rivadavia',
        number: '654',
        postalCode: '5000',
        apartment_floor: '5E',
        country: 'Argentina',
        cityId: 'uuid-city-2',
      },
    ],
  },
  {
    fullName: 'Diego Sánchez',
    email: 'diego.sanchez@example.com',
    dni: '77777777',
    cuit: '20-77777777-6',
    phoneNumber: '7777777777',
    password: 'Password123',
    birthDate: '1993-06-18',
    addresses: [
      {
        street: 'Lavalle',
        number: '147',
        postalCode: '6000',
        apartment_floor: '6F',
        country: 'Argentina',
        cityId: 'uuid-city-1',
      },
    ],
  },
  {
    fullName: 'Laura Torres',
    email: 'laura.torres@example.com',
    dni: '88888888',
    cuit: '27-88888888-8',
    phoneNumber: '8888888888',
    password: 'Password123',
    birthDate: '1989-03-25',
    taxCondition: 'Monotributo',
    addresses: [
      {
        street: 'Corrientes',
        number: '963',
        postalCode: '7000',
        apartment_floor: '7G',
        country: 'Argentina',
        cityId: 'uuid-city-2',
      },
    ],
  },
  {
    fullName: 'Martín Castro',
    email: 'martin.castro@example.com',
    dni: '99999999',
    cuit: '20-99999999-2',
    phoneNumber: '9999999999',
    password: 'Password123',
    birthDate: '1991-12-05',
    addresses: [
      {
        street: 'Independencia',
        number: '258',
        postalCode: '8000',
        apartment_floor: '8H',
        country: 'Argentina',
        cityId: 'uuid-city-1',
      },
    ],
  },
  {
    fullName: 'Sofía Morales',
    email: 'sofia.morales@example.com',
    dni: '10101010',
    cuit: '27-10101010-0',
    phoneNumber: '1010101010',
    password: 'Password123',
    birthDate: '1996-07-14',
    taxCondition: 'Responsable Inscripto',
    addresses: [
      {
        street: 'Entre Ríos',
        number: '741',
        postalCode: '9000',
        apartment_floor: '9I',
        country: 'Argentina',
        cityId: 'uuid-city-2',
      },
    ],
  },
  {
    fullName: 'Andrés Domínguez',
    email: 'andres.dominguez@example.com',
    dni: '12121212',
    cuit: '20-12121212-3',
    phoneNumber: '1212121212',
    password: 'Password123',
    birthDate: '1987-04-28',
    addresses: [
      {
        street: 'Urquiza',
        number: '369',
        postalCode: '9100',
        apartment_floor: '10J',
        country: 'Argentina',
        cityId: 'uuid-city-1',
      },
    ],
  },
    ];
    for (const data of membersData) {
      try {
        // Evitar duplicados
        const exists = await memberRepo.findOne({
          where: [
            { email: data.email },
            { dni: data.dni },
            { phoneNumber: data.phoneNumber },
          ],
        });

        if (exists) {
          this.logger.warn(`⚠️ Miembro ${data.email} ya existe. Se omite.`);
          continue;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newMember = memberRepo.create({
          ...data,
          password: hashedPassword,
          storeId,
          role,
        });

        await memberRepo.save(newMember);

        // Crear direcciones asociadas
        for (const addr of data.addresses) {
          const newAddress = addressRepo.create({
            ...addr,
            member: newMember,
          });
          await addressRepo.save(newAddress);
        }

        this.logger.log(`✅ Miembro creado: ${data.email}`);

      } catch (error) {
        this.logger.error(`❌ Error creando miembro ${data.email}: ${error.message}`, error.stack);
      }
    }

    this.logger.log('🌱 Seeder de miembros finalizado.');
  }
}

