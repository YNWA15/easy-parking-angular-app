
export class User {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
  parkCredits?: number;
  vehicles?: Vehicle[];
  reservations?: Reservation[];
}

export class Vehicle {
  id!: number;
  registrationNumber!: string;
}

// export class Employee extends User {
//   parkingId!: number;
//   parking?: Parking;
//   employeeId!: number;
//   dateOnSign!: Date;
//   salaryPerHour!: number;
//   hoursPerMonth!: number;
// }
export class Reservation {
  id!: number;
  startReservationPeriod!: Date;
  endReservationPeriod!: Date;
  createdResrvationTime!: Date;
  parkingId!: number;
  spotId!: number;
  spot!: ParkingSpot;
  parking!: Parking;
  user!: User;
  userId!: number;
  price!: number;
  isPaid!: boolean;
  isStarted!: boolean;
  canStartEarly!: boolean;
  isBlocked!: boolean;
  minOver!: boolean;
  is15MinOver!: boolean;
  isFailed!: boolean;
  carRegNumber!: string;
}
export class Parking {
  id!: number;
  name!: string;
  address!: string;
  parkingSpots!: ParkingSpot[];
  capacity!: number;
  reservations!: Reservation[];
  isAvailable!: boolean;
  hasFreeSpot!: boolean;
  rating!: number;
  isSecured!: boolean;
  costPerHour?: number;
  costPer4h?: number;
  costPer8h?: number;
  costPerDay?: number;
  costPerWeek?: number;
  latitude!: number;
  longtitude!: number;
 // employees!: Employee[];
 // employeesCount!: number;
}
export class ParkingInfo {
  freeSpots!: number;
  freeSpotsWithoutFutureReservationsYet!: number;
  avaliableSpotForNext2Hours!: number;
  avaliableSpotForNext4Hours!: number;
  avaliableSpotForNext8Hours!: number;
  avaliableSpotForNext12Hours!: number;
  avaliableSpotForNext24Hours!: number;
  avaliableSpotForNextWeek!: number;
}
export class ParkingSpot {
  id!: number;
  numberInParking!: number;
  parkingId!: number;
  parking!: Parking;
  isFree?: boolean;
  isPaidTill?: Date;
  isReserved?: boolean;
  reservedFrom?: Date;
  reservedTo?: Date;

  reservations?: Reservation[];
}
// export class CreateUser {
//   name!: string;
//   email!: string;
//   password!: string;
//   phoneNumber!: string;
// }
// export class CreateEmployee {
//   name!: string;
//   email!: string;
//   password!: string;
//   phoneNumber!: string;
//   parkingId!: number;
//   employeeId!: number;
//   salaryPerHour!: number;
//   hoursPerMonth!: number;
// }
// export class CreateParking {
//   name!: string;
//   address!: string;
//   parkingSpots?: CreateParkingSpots[];
//   isSecured?: boolean;
//   isNonStopWorking?: boolean;
// }
// export class CreateParkingSpots {
//   id!: number;
//   parkingId!: number;
//   hasRoof?: boolean;
//   isGarage?: boolean;
//   costPerHour?: number;
//   costPer4h?: number;
//   costPer8h?: number;
//   costPerDay?: number;
//   costPerWeek?: number;
// }
// export class UpdateParking {
//   name!: string;
//   address!: string;
//   parkingSpots?: CreateParkingSpots[];
//   isAvailable!: boolean;
//   rating!: number;
//   isSecured!: boolean;
//   isNonStopWorking!: boolean;
//   openingAt!: Date;
//   closingAt!: Date;
//   offDay!: number;
//   employees?: CreateEmployee[];
// }
