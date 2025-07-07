import { usePersonalDataStore } from '../store/personalDataStore';
import { personalDataSchema } from '../schemas/personalDataSchema';
import { useState } from 'react';

export const PersonalDataForm = () => {
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const { name, email, birth, phone, setName, setEmail, setBirth, setPhone } = usePersonalDataStore();

  const validateField = (field: keyof typeof errors, value: string) => {
    const partialData = { name, email, birth, phone, [field]: value };
    const result = personalDataSchema.safeParse(partialData);

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
          <span className="label-text text-white font-semibold">Seu nome completo</span>
        </label>
        <input
          type="text"
          placeholder="Nome completo"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-gray-700 focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={e => validateField('name', e.target.value)}
        />
        {errors.name && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.name}</span>}
      </div>
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text text-white font-semibold">Seu email</span>
        </label>
        <input
          type="email"
          placeholder="email@exemplo.com"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-transparent focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={e => validateField('email', e.target.value)}
        />
        {errors.email && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.email}</span>}
      </div>
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text text-white font-semibold">Quando você nasceu?</span>
        </label>
        <input
          type="date"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-transparent focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={birth}
          onChange={e => setBirth(e.target.value)}
          onBlur={e => validateField('birth', e.target.value)}
        />
        {errors.birth && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.birth}</span>}
      </div>
      <div className="form-control">
        <label className="label mb-1">
          <span className="label-text text-white font-semibold">Seu telefone</span>
        </label>
        <input
          type="tel"
          className="input input-bordered w-full bg-background-paper text-white placeholder-gray-400 rounded-xl px-4 py-3 font-medium border border-transparent focus:border-primary-light focus:ring-2 focus:ring-primary-light transition"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          onBlur={e => validateField('phone', e.target.value)}
        />
        {errors.phone && <span className="text-red-400 text-xs mt-1 font-semibold">{errors.phone}</span>}
      </div>
    </div>
  );
};
