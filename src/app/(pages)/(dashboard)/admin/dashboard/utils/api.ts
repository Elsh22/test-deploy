// src/app/(pages)/(dashboard)/admin/dashboard/utils/api.ts
import Cookies from 'js-cookie';
import { FilterState, ApiResponse, DashboardStats } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

class Api {
  async checkAuth(): Promise<boolean> {
    try {
      const token = Cookies.get('jwt');
      if (!token) return false;

      const response = await fetch(`${STRAPI_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove('jwt');
        }
        return false;
      }

      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      return false;
    }
  }

  async fetchDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const token = Cookies.get('jwt');
      if (!token) throw new Error('UNAUTHORIZED');

      const isAuthed = await this.checkAuth();
      if (!isAuthed) {
        throw new Error('UNAUTHORIZED');
      }

      const response = await fetch('/api/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      return {
        success: true,
        data: data.stats
      };
    } catch (error) {
      if (error instanceof Error && error.message === 'UNAUTHORIZED') {
        Cookies.remove('jwt');
      }
      throw error;
    }
  }

  async fetchSubmissions(
    type: string,
    filters: FilterState
  ): Promise<ApiResponse<any>> {
    try {
      const token = Cookies.get('jwt');
      if (!token) throw new Error('UNAUTHORIZED');

      const isAuthed = await this.checkAuth();
      if (!isAuthed) {
        throw new Error('UNAUTHORIZED');
      }

      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        ...(filters.seen !== null && { seen: filters.seen.toString() }),
        sortBy: filters.sortBy,
        order: filters.sortOrder,
        ...(filters.search && { search: filters.search }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo }),
      });

      const response = await fetch(`/api/dashboard/${type}?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error && error.message === 'UNAUTHORIZED') {
        Cookies.remove('jwt');
      }
      throw error;
    }
  }

  async markAsSeen(type: string, id: string): Promise<ApiResponse<void>> {
    try {
      const token = Cookies.get('jwt');
      if (!token) throw new Error('UNAUTHORIZED');

      const isAuthed = await this.checkAuth();
      if (!isAuthed) {
        throw new Error('UNAUTHORIZED');
      }

      const response = await fetch(`/api/dashboard/${type}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, seen: true }),
      });

      if (!response.ok) {
        throw new Error(`Failed to mark ${type} as seen`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error && error.message === 'UNAUTHORIZED') {
        Cookies.remove('jwt');
      }
      throw error;
    }
  }

  async downloadResume(fileId: string): Promise<Blob> {
    try {
      const token = Cookies.get('jwt');
      if (!token) throw new Error('UNAUTHORIZED');

      const isAuthed = await this.checkAuth();
      if (!isAuthed) {
        throw new Error('UNAUTHORIZED');
      }

      const response = await fetch(`/api/upload?id=${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      return response.blob();
    } catch (error) {
      if (error instanceof Error && error.message === 'UNAUTHORIZED') {
        Cookies.remove('jwt');
      }
      throw new Error('Failed to download resume');
    }
  }

  exportEmailsToCSV(emails: string[]): void {
    if (!emails || emails.length === 0) return;
    
    const csvContent = emails.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emails_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  handleLogout(): void {
    Cookies.remove('jwt');
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
  }
}

export const api = new Api();

export const {
  checkAuth,
  fetchDashboardStats,
  fetchSubmissions,
  markAsSeen,
  downloadResume,
  exportEmailsToCSV,
  handleLogout
} = api;