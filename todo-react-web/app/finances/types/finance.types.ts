export interface Expense {
  id: string;
  name: string;
  value: number;
}

export interface FinanceDto {
  id: string;
  salary: number;
  totalFixed: number;
  totalVariable: number;
  totalExpenses: number;
  balance: number;
  marginPercent: number;
  updatedAt: string;
  fixed: Expense[];
  variable: Expense[];
}

export interface FinanceData {
  salary: number;
  fixed: Expense[];
  variable: Expense[];
}

export interface GetFinanceResponse {
  finance: FinanceDto | null;
}

export interface SaveFinanceResponse {
  saveFinance: FinanceDto;
}