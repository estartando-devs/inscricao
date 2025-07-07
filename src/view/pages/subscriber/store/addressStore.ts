import { create } from 'zustand';

export interface AddressData {
  cep: string;
  address: string;
  district: string;
  city: string;
}

interface AddressStore extends AddressData {
  setCep: (cep: string) => void;
  setAddress: (address: string) => void;
  setDistrict: (district: string) => void;
  setCity: (city: string) => void;
  setAll: (data: Partial<AddressData>) => void;
}

export const useAddressStore = create<AddressStore>((set) => ({
  cep: '',
  address: '',
  district: '',
  city: '',
  setCep: (cep) => set({ cep }),
  setAddress: (address) => set({ address }),
  setDistrict: (district) => set({ district }),
  setCity: (city) => set({ city }),
  setAll: (data) => set((state) => ({ ...state, ...data })),
}));
