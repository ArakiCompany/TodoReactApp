'use client';

import { useState } from 'react';
import { ResumeData, ResumeExperience, ResumeEducation, ResumeLanguage } from '../types/resume.types';

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

type Tab = 'personal' | 'profile' | 'experience' | 'education' | 'skills' | 'style';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'personal', label: 'Pessoal', icon: '👤' },
  { id: 'profile', label: 'Perfil', icon: '📝' },
  { id: 'experience', label: 'Experiência', icon: '💼' },
  { id: 'education', label: 'Educação', icon: '🎓' },
  { id: 'skills', label: 'Skills', icon: '⚡' },
  { id: 'style', label: 'Estilo', icon: '🎨' },
];

const SIDEBAR_COLORS = [
  '#1a5c4f', '#1e3a5f', '#3d1a5c', '#5c1a1a',
  '#1a3d5c', '#2d5c1a', '#5c4a1a', '#1a1a5c',
  '#2c2c2c', '#5c1a4a',
];

function InputField({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
      />
    </div>
  );
}

export default function ResumeForm({ data, onChange }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('personal');

  function update(field: keyof ResumeData, value: unknown) {
    onChange({ ...data, [field]: value });
  }

  // Foto
  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Redimensiona para ~100x100 antes de converter para base64
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      const size = 120;
      canvas.width = size;
      canvas.height = size;
      const scale = Math.min(size / img.width, size / img.height);
      const x = (size - img.width * scale) / 2;
      const y = (size - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      update('photoBase64', base64);
    };
    img.src = URL.createObjectURL(file);
  }

  // Experience
  function addExperience() {
    const newExp: ResumeExperience = {
      id: crypto.randomUUID(), company: '', role: '', location: '',
      startDate: '', endDate: '', isCurrent: false, bullets: [''],
    };
    update('experiences', [...data.experiences, newExp]);
  }

  function updateExperience(id: string, field: keyof ResumeExperience, value: unknown) {
    update('experiences', data.experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  }

  function removeExperience(id: string) {
    update('experiences', data.experiences.filter(e => e.id !== id));
  }

  function addBullet(expId: string) {
    update('experiences', data.experiences.map(e =>
      e.id === expId ? { ...e, bullets: [...e.bullets, ''] } : e
    ));
  }

  function updateBullet(expId: string, idx: number, value: string) {
    update('experiences', data.experiences.map(e =>
      e.id === expId ? { ...e, bullets: e.bullets.map((b, i) => i === idx ? value : b) } : e
    ));
  }

  function removeBullet(expId: string, idx: number) {
    update('experiences', data.experiences.map(e =>
      e.id === expId ? { ...e, bullets: e.bullets.filter((_, i) => i !== idx) } : e
    ));
  }

  // Education
  function addEducation() {
    const newEdu: ResumeEducation = {
      id: crypto.randomUUID(), institution: '', degree: '', startDate: '', endDate: '',
    };
    update('education', [...data.education, newEdu]);
  }

  function updateEducation(id: string, field: keyof ResumeEducation, value: string) {
    update('education', data.education.map(e => e.id === id ? { ...e, [field]: value } : e));
  }

  function removeEducation(id: string) {
    update('education', data.education.filter(e => e.id !== id));
  }

  // Skills
  function addSkill() { update('skills', [...data.skills, '']); }
  function updateSkill(idx: number, value: string) {
    update('skills', data.skills.map((s, i) => i === idx ? value : s));
  }
  function removeSkill(idx: number) {
    update('skills', data.skills.filter((_, i) => i !== idx));
  }

  // Languages
  function addLanguage() {
    update('languages', [...data.languages, { name: '', level: '' }]);
  }
  function updateLanguage(idx: number, field: keyof ResumeLanguage, value: string) {
    update('languages', data.languages.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  }
  function removeLanguage(idx: number) {
    update('languages', data.languages.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex gap-1 p-2 bg-zinc-900 border-b border-zinc-800 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {/* Personal */}
        {activeTab === 'personal' && (
          <>
            {/* Foto */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">Foto</label>
              <div className="flex items-center gap-3">
                {data.photoBase64 ? (
                  <img src={data.photoBase64} alt="Foto" className="w-14 h-14 rounded-full object-cover border-2 border-zinc-700" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-700 flex items-center justify-center text-zinc-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}
                <div>
                  <label className="cursor-pointer text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:border-indigo-700 rounded-lg px-3 py-1.5 transition inline-block">
                    {data.photoBase64 ? 'Trocar foto' : 'Adicionar foto'}
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                  {data.photoBase64 && (
                    <button onClick={() => update('photoBase64', '')} className="block text-xs text-red-400 hover:text-red-300 mt-1 transition">
                      Remover
                    </button>
                  )}
                  <p className="text-xs text-zinc-700 mt-1">JPG, PNG — max 2MB</p>
                </div>
              </div>
            </div>

            <InputField label="Nome completo" value={data.fullName} onChange={v => update('fullName', v)} placeholder="Giovanni Sarao Araki" />
            <InputField label="Título / Cargo" value={data.title} onChange={v => update('title', v)} placeholder="Tech Lead" />
            <InputField label="Email" value={data.email} onChange={v => update('email', v)} placeholder="seu@email.com" type="email" />
            <InputField label="Telefone" value={data.phone} onChange={v => update('phone', v)} placeholder="+55 (12) 98200-0125" />
            <InputField label="Cidade" value={data.location} onChange={v => update('location', v)} placeholder="São José dos Campos" />
            <InputField label="País" value={data.country} onChange={v => update('country', v)} placeholder="Brasil" />
            <InputField label="Nacionalidade" value={data.nationality} onChange={v => update('nationality', v)} placeholder="Brasileiro" />
            <InputField label="Data de nascimento" value={data.dateOfBirth} onChange={v => update('dateOfBirth', v)} placeholder="12-17-1997" />
            <InputField label="LinkedIn" value={data.linkedIn} onChange={v => update('linkedIn', v)} placeholder="linkedin.com/in/seu-perfil" />
          </>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Sobre você</label>
            <textarea
              value={data.profile}
              onChange={e => update('profile', e.target.value)}
              rows={8}
              placeholder="Frontend-focused Software Engineer and current Tech Lead..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition resize-none leading-relaxed"
            />
            <p className="text-xs text-zinc-700 mt-1">{data.profile.length} caracteres</p>
          </div>
        )}

        {/* Experience */}
        {activeTab === 'experience' && (
          <>
            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">#{idx + 1}</span>
                  <button onClick={() => removeExperience(exp.id)} className="text-zinc-700 hover:text-red-400 transition">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <InputField label="Cargo" value={exp.role} onChange={v => updateExperience(exp.id, 'role', v)} placeholder="Senior Developer" />
                <InputField label="Empresa" value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} placeholder="Itaú Unibanco" />
                <InputField label="Localização" value={exp.location} onChange={v => updateExperience(exp.id, 'location', v)} placeholder="São Paulo" />
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="Início" value={exp.startDate} onChange={v => updateExperience(exp.id, 'startDate', v)} placeholder="MAY 2020" />
                  {!exp.isCurrent && (
                    <InputField label="Fim" value={exp.endDate} onChange={v => updateExperience(exp.id, 'endDate', v)} placeholder="PRESENT" />
                  )}
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp.isCurrent}
                    onChange={e => updateExperience(exp.id, 'isCurrent', e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-900 text-indigo-500"
                  />
                  <span className="text-xs text-zinc-400">Emprego atual</span>
                </label>

                {/* Bullets */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2">Atividades</label>
                  <div className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2 group">
                        <span className="text-zinc-700 mt-2 text-xs">•</span>
                        <input
                          value={bullet}
                          onChange={e => updateBullet(exp.id, i, e.target.value)}
                          placeholder="Descreva uma atividade..."
                          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
                        />
                        <button
                          onClick={() => removeBullet(exp.id, i)}
                          className="mt-1.5 text-zinc-700 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => addBullet(exp.id)}
                    className="mt-2 text-xs text-zinc-600 hover:text-zinc-400 transition"
                  >
                    + adicionar atividade
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addExperience}
              className="w-full py-2.5 border border-dashed border-zinc-800 hover:border-zinc-600 rounded-xl text-xs text-zinc-600 hover:text-zinc-400 transition flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Adicionar experiência
            </button>
          </>
        )}

        {/* Education */}
        {activeTab === 'education' && (
          <>
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">#{idx + 1}</span>
                  <button onClick={() => removeEducation(edu.id)} className="text-zinc-700 hover:text-red-400 transition">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <InputField label="Curso / Grau" value={edu.degree} onChange={v => updateEducation(edu.id, 'degree', v)} placeholder="Análise e Desenvolvimento de Sistemas" />
                <InputField label="Instituição" value={edu.institution} onChange={v => updateEducation(edu.id, 'institution', v)} placeholder="FATEC" />
                <div className="grid grid-cols-2 gap-2">
                  <InputField label="Início" value={edu.startDate} onChange={v => updateEducation(edu.id, 'startDate', v)} placeholder="2018" />
                  <InputField label="Fim" value={edu.endDate} onChange={v => updateEducation(edu.id, 'endDate', v)} placeholder="2021" />
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="w-full py-2.5 border border-dashed border-zinc-800 hover:border-zinc-600 rounded-xl text-xs text-zinc-600 hover:text-zinc-400 transition flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Adicionar educação
            </button>
          </>
        )}

        {/* Skills */}
        {activeTab === 'skills' && (
          <>
            <div className="mb-4">
              <label className="block text-xs font-medium text-zinc-400 mb-2">Skills técnicas</label>
              <div className="space-y-2">
                {data.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <input
                      value={skill}
                      onChange={e => updateSkill(i, e.target.value)}
                      placeholder="React, TypeScript..."
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
                    />
                    <button
                      onClick={() => removeSkill(i)}
                      className="text-zinc-700 hover:text-red-400 transition opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addSkill} className="mt-2 text-xs text-zinc-600 hover:text-zinc-400 transition">
                + adicionar skill
              </button>
            </div>

            <div className="border-t border-zinc-800 pt-4">
              <label className="block text-xs font-medium text-zinc-400 mb-2">Idiomas</label>
              <div className="space-y-2">
                {data.languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <input
                      value={lang.name}
                      onChange={e => updateLanguage(i, 'name', e.target.value)}
                      placeholder="English"
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
                    />
                    <input
                      value={lang.level}
                      onChange={e => updateLanguage(i, 'level', e.target.value)}
                      placeholder="Fluent"
                      className="w-24 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
                    />
                    <button
                      onClick={() => removeLanguage(i)}
                      className="text-zinc-700 hover:text-red-400 transition opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addLanguage} className="mt-2 text-xs text-zinc-600 hover:text-zinc-400 transition">
                + adicionar idioma
              </button>
            </div>
          </>
        )}

        {/* Style */}
        {activeTab === 'style' && (
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-3">Cor da barra lateral</label>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {SIDEBAR_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => update('sidebarColor', color)}
                  className="w-full aspect-square rounded-xl border-2 transition-all"
                  style={{
                    background: color,
                    borderColor: data.sidebarColor === color ? 'white' : 'transparent',
                    transform: data.sidebarColor === color ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-zinc-500">Cor personalizada:</label>
              <input
                type="color"
                value={data.sidebarColor}
                onChange={e => update('sidebarColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-zinc-700 bg-transparent"
              />
              <span className="text-xs font-mono text-zinc-500">{data.sidebarColor}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}