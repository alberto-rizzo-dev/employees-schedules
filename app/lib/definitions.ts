export type Employee = {
    id: number;
    name: string;
    surname: string;
    role: 'impiegato' | 'operaio' | 'capo reparto' | 'dirigente' | 'amministratore';
  };
  
  export type WorkShift = {
    id: number;
    employee: number;
    start_timestamp: Date;
    end_timestamp: Date;
  };

  export type WorkShiftTable = {
    employee_id: number;
    name: string;
    surname: string;
    role: 'impiegato' | 'operaio' | 'capo reparto' | 'dirigente' | 'amministratore';
    workshift_id: number;
    start_timestamp: Date;
    end_timestamp: Date;
  }