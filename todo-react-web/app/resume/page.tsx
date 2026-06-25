'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ResumePdfButton from './components/ResumePdfButton';
import { ResumeData, DEFAULT_RESUME } from './types/resume.types';

const GET_RESUME = gql`
  query GetResume {
    resume {
      id fullName title email phone location country nationality
      dateOfBirth linkedIn photoBase64 profile sidebarColor updatedAt
      experiences { id company role location startDate endDate isCurrent bullets }
      education { id institution degree startDate endDate }
      skills
      languages { name level }
    }
  }
`;

interface GetResumeQueryData {
  resume: ResumeData & { id: string; updatedAt: string };
}

const SAVE_RESUME = gql`
  mutation SaveResume($input: SaveResumeInput!) {
    saveResume(input: $input) {
      id updatedAt
    }
  }
`;

export default function ResumePage() {
  const router = useRouter();
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME);
  const [saved, setSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(0.6);

  const { data: queryData, loading } = useQuery<GetResumeQueryData>(GET_RESUME, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const resume = queryData?.resume;
    if (!resume) return;
    setTimeout(() => {
      setData({
        fullName: resume.fullName || '',
        title: resume.title || '',
        email: resume.email || '',
        phone: resume.phone || '',
        location: resume.location || '',
        country: resume.country || '',
        nationality: resume.nationality || '',
        dateOfBirth: resume.dateOfBirth || '',
        linkedIn: resume.linkedIn || '',
        photoBase64: resume.photoBase64 || '',
        profile: resume.profile || '',
        experiences: resume.experiences || [],
        education: resume.education || [],
        skills: resume.skills || [],
        languages: resume.languages || [],
        sidebarColor: resume.sidebarColor || '#1a5c4f',
      });
      setLastSaved(resume.updatedAt);
    }, 0);
  }, [queryData]);

  const [saveResume, { loading: saving }] = useMutation(SAVE_RESUME);

  async function handleSave() {
    await saveResume({
      variables: {
        input: {
          ...data,
          experiences: data.experiences.map(({ id, company, role, location, startDate, endDate, isCurrent, bullets }) => ({
            id, company, role, location, startDate, endDate, isCurrent, bullets
          })),
          education: data.education.map(({ id, institution, degree, startDate, endDate }) => ({
            id, institution, degree, startDate, endDate
          })),
          languages: data.languages.map(({ name, level }) => ({ name, level })),
        }
      }
    });
    setSaved(true);
    setLastSaved(new Date().toISOString());
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-950 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/todos')} className="text-zinc-600 hover:text-zinc-400 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <h1 className="text-sm font-medium text-zinc-100">Resume Builder</h1>
            {lastSaved && (
              <span className="text-xs text-zinc-600 font-mono hidden sm:block">
                salvo {new Date(lastSaved).toLocaleTimeString('pt-BR')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ResumePdfButton data={data} />
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-xl px-4 py-2.5 transition"
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Salvando...
                </>
              ) : saved ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                  Salvo!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Salvar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Split layout */}
        <div className="flex-1 flex overflow-hidden">

          {/* Form — esquerda */}
          <div className="w-full lg:w-2/5 xl:w-1/3 flex flex-col border-r border-zinc-800 overflow-hidden">
            {loading ? (
              <div className="flex-1 p-4 space-y-3 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="h-10 bg-zinc-800 rounded-xl" />)}
              </div>
            ) : (
              <ResumeForm data={data} onChange={setData} />
            )}
          </div>

          {/* Preview — direita */}
          <div className="hidden lg:flex flex-1 flex-col bg-zinc-900 overflow-auto">
            {/* Controle de zoom */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
              <span className="text-xs text-zinc-600 font-mono">preview em tempo real</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setPreviewScale(s => Math.max(0.4, s - 0.1))} className="text-zinc-600 hover:text-zinc-400 transition text-xs">−</button>
                <span className="text-xs font-mono text-zinc-500">{Math.round(previewScale * 100)}%</span>
                <button onClick={() => setPreviewScale(s => Math.min(1, s + 0.1))} className="text-zinc-600 hover:text-zinc-400 transition text-xs">+</button>
              </div>
            </div>

            {/* Preview escalado */}
            <div className="flex-1 overflow-auto flex justify-center p-8">
              <div
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top center',
                  width: '210mm',
                  flexShrink: 0,
                }}
              >
                <div className="shadow-2xl">
                  <ResumePreview data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}