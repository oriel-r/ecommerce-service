import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { FormContactDto } from './dto/form-contact.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { MailService } from './mail.service';
import { Roles } from 'src/common/decorators/roles/roles.decorators';

@ApiTags('Mail') // Agrupa estas rutas bajo la etiqueta "Mail" en Swagger
@Controller('Mail') // Prefijo para todas las rutas de este controlador: /Mail
export class MailController {
  constructor(private mailService: MailService) {}

  /**
   * Envía un correo electrónico genérico desde y hacia cualquier dirección válida.
   *
   * @param sendEmailDto - Contiene los campos: from, to, subject, message
   * @returns Resultado del envío del email
   */
  @Post('sendEmail')
  @ApiOperation({ summary: 'Enviar un email general' })
  @ApiResponse({
    status: 200,
    description: 'Correo enviado correctamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al enviar el correo.',
  })
  async sendGeneralEmail(@Body() sendEmailDto: SendEmailDto) {
    try {
      const { from, to, subject, message } = sendEmailDto;
      return await this.mailService.sendEmail({ from, to, subject, message });
    } catch (error) {
      throw new HttpException(
        `Error al enviar el correo: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Procesa el formulario de contacto enviado desde el sitio web.
   * Guarda el mensaje en base de datos.
   *
   * @param formContactDto - Contiene: surname, from, subject, message
   * @returns Confirmación de envío
   */
  @Post('formContact')
  @ApiOperation({ summary: 'Enviar formulario de contacto' })
  @ApiResponse({
    status: 200,
    description: 'Formulario enviado correctamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al enviar el formulario.',
  })
  async formContact(@Body() formContactDto: FormContactDto) {
    try {
      const { surname, from, subject, message } = formContactDto;
      return this.mailService.formContact({ surname, from, subject, message });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error enviando el formulario: ${error.message}`,
      );
    }
  }

  /**
   * Obtiene todos los mensajes de contacto almacenados (uso interno/admin).
   * Podría protegerse con AuthGuard + RolesGuard si se desea.
   *
   * @returns Lista de mensajes de contacto.
   */
  @Get()
  @ApiOperation({ summary: 'Obtener todos los mensajes del formulario de contacto' })
  @ApiResponse({
    status: 200,
    description: 'Listado de mensajes de contacto obtenido correctamente.',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('platform')
  async getAllInfoContact() {
    return await this.mailService.getAllInfoContact();
  }
}

