export interface Expense {
  id: string;
  name: string;
  value: number;
}

export interface FinanceDto {
  id: string;
  month: number;
  year: number;
  monthLabel: string;
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

export interface MonthSummaryDto {
  month: number;
  year: number;
  monthLabel: string;
  salary: number;
  totalExpenses: number;
  balance: number;
}

export interface FinanceData {
  salary: number;
  fixed: Expense[];
  variable: Expense[];
}

export interface GetFinanceResponse {
  finance: FinanceDto | null;
}

export interface GetFinanceSummariesResponse {
  financeSummaries: MonthSummaryDto[];
}

export interface SaveFinanceResponse {
  saveFinance: FinanceDto;
}