
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
  longitude!: number;
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
