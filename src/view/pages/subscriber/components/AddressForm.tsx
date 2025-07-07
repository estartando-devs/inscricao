import { useAddressStore } from '../store/addressStore';
import { addressSchema } from '../schemas/addressSchema';
import { useState } from 'react';

export const AddressForm = () => {
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const { cep, address, district, city, setCep, setAddress, setDistrict, setCity } = useAddressStore();

  const validateField = (field: keyof typeof errors, value: string) => {
    const partialData = { cep, address, district, city, [field]: value };
    const result = addressSchema.safeParse(partialData);
    if (!result.success) {
      const fieldError = result.error.errors.find(err => err.path[0] === field);
      setErrors(prev => ({ ...prev, [field]: fieldError ? fieldError.message : '' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-6">
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text text-gray-200 font-semibold">Seu cep (é opcional)</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-transparent focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={cep}
          onChange={e => setCep(e.target.value)}
          onBlur={e => validateField('cep', e.target.value)}
          placeholder="00000-000"
        />
        {errors.cep && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.cep}</span>}
      </div>
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text text-white font-semibold">Seu endereço</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-transparent focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={address}
          onChange={e => setAddress(e.target.value)}
          onBlur={e => validateField('address', e.target.value)}
        />
        {errors.address && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.address}</span>}
      </div>
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text text-white font-semibold">Seu bairro</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-transparent focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={district}
          onChange={e => setDistrict(e.target.value)}
          onBlur={e => validateField('district', e.target.value)}
        />
        {errors.district && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.district}</span>}
      </div>
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text text-white font-semibold">Sua cidade</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-transparent focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={city}
          onChange={e => setCity(e.target.value)}
          onBlur={e => validateField('city', e.target.value)}
        />
        {errors.city && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.city}</span>}
      </div>
    </div>
  );
};
