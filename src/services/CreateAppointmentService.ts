import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * Services fica responsavel pelas regras de negocio
 *
 */
interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  // unico metodo dentro de service
  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    // verificando se tem agendamento na mesma data;
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // se conter um agendamento nessa data, retorna um erro;
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
