export type Employee = {
    id: string;
    name: string;
    surname: string;
    role: 'impiegato' | 'operaio' | 'capo reparto' | 'dirigente' | 'amministratore';
  };
  
  export type WorkShift = {
    id: string;
    employee: Employee;
    start_date: Date;
    end_date: Date;
  };

  export type WorkShiftTable = {
    employee_id: string;
    name: string;
    surname: string;
    role: 'impiegato' | 'operaio' | 'capo reparto' | 'dirigente' | 'amministratore';
    workshift_id: string;
    start_date: Date;
    end_date: Date;
  }