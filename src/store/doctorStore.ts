import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Doctor {
  id: string;
  email: string;
  license: string;
}

interface DoctorAuthState {
  isAuthenticated: boolean;
  doctor: Doctor | null;
  login: (doctor: Doctor) => void;
  logout: () => void;
  updateDoctor: (doctor: Partial<Doctor>) => void;
}

export const useDoctorAuthStore = create<DoctorAuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            doctor: null,
            login: (doctor: Doctor) => set({ isAuthenticated: true, doctor }),
            logout: () => set({ isAuthenticated: false, doctor: null }),
            updateDoctor: (doctor: Partial<Doctor>) =>
                set((state) => ({ doctor: { ...state.doctor!, ...doctor } })),
        }),
        {
            name: 'auth-storage',
        }
    )
);