import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

// responsavel pelos metodos de criar, ler, editar e deletar os appointments
class AppointmentsRepository {
  // usando o private para a variavel nao ser acessivel por fora da classe;
  private appointments: Appointment[];

  constructor() {
    // inicializando a variavel appointments como um array vazio;
    this.appointments = [];
  }

  // listar todos os appointments;
  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    // verificando se tem agendamento na mesma data;
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    // retornando o findAppointment e se nao encontrar ele retorna null;
    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    // criando um agendamento
    const appointment = new Appointment({ provider, date });
    // adicionando o appointment criado, no array de appointments;
    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
