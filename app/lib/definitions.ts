export type Employee = {
    id: number;
    name: string;
    surname: string;
    role: 'worker' |'manager' | 'office worker' | 'manager';
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
    role: 'worker' |'manager' | 'office worker' | 'manager';
    workshift_id: number;
    start_timestamp: Date;
    end_timestamp: Date;
  }