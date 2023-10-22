export class CreateDailyMovementDto {
  sales: Sale[];
}

class Sale {
  id: number;
  totalPrice: number;
  Payments: Payment[];
}

class Payment {
  id: number;
  method: number;
  installment: string | null;
  createdAt: Date;
  salesId: number;
}
