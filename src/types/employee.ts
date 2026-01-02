export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  salary: number;
  created_at?: string;
}

export type EmployeeFormData = Omit<Employee, 'id' | 'created_at'>;
