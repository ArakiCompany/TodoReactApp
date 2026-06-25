import { ResumeData } from '../types/resume.types';

interface Props { data: ResumeData; }

export default function ResumePreview({ data }: Props) {
  const sidebar = data.sidebarColor || '#1a5c4f';

  return (
    <div
      id="resume-preview"
      className="w-full bg-white text-zinc-800 font-sans"
      style={{ minHeight: '297mm', display: 'flex', fontSize: '10px' }}
    >
      {/* Sidebar */}
      <div
        className="flex-shrink-0 flex flex-col"
        style={{ width: '34%', background: sidebar, padding: '24px 18px', color: 'white' }}
      >
        {/* Foto */}
        {data.photoBase64 && (
          <div className="flex justify-center mb-3">
            <img
              src={data.photoBase64}
              alt="Foto"
              className="rounded-full object-cover border-4 border-white/20"
              style={{ width: 80, height: 80 }}
            />
          </div>
        )}

        {/* Nome */}
        <div className="text-center mb-4">
          <h1 className="font-bold leading-tight" style={{ fontSize: 16, letterSpacing: '-0.3px' }}>
            {data.fullName || 'Seu Nome'}
          </h1>
          {data.title && (
            <p className="mt-1 uppercase tracking-widest opacity-80" style={{ fontSize: 8 }}>
              {data.title}
            </p>
          )}
        </div>

        {/* Linha divisória */}
        <div className="mb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }} />

        {/* Detalhes */}
        {(data.location || data.phone || data.email || data.country || data.nationality || data.dateOfBirth) && (
          <div className="mb-4">
            <h3 className="font-bold mb-2 uppercase tracking-wider" style={{ fontSize: 9 }}>
              Details
            </h3>
            {data.location && <p className="opacity-80 mb-1">{data.location}</p>}
            {data.country && <p className="opacity-80 mb-1">{data.country}</p>}
            {data.phone && <p className="opacity-80 mb-1">{data.phone}</p>}
            {data.email && (
              <p className="mb-1" style={{ wordBreak: 'break-all', opacity: 0.8 }}>
                {data.email}
              </p>
            )}
            {data.nationality && (
              <div className="mt-2">
                <p className="uppercase tracking-wider mb-0.5" style={{ fontSize: 8, opacity: 0.6 }}>Nationality</p>
                <p className="opacity-80">{data.nationality}</p>
              </div>
            )}
            {data.dateOfBirth && (
              <div className="mt-2">
                <p className="uppercase tracking-wider mb-0.5" style={{ fontSize: 8, opacity: 0.6 }}>Date of Birth</p>
                <p className="opacity-80">{data.dateOfBirth}</p>
              </div>
            )}
          </div>
        )}

        {/* Links */}
        {data.linkedIn && (
          <div className="mb-4">
            <h3 className="font-bold mb-2 uppercase tracking-wider" style={{ fontSize: 9 }}>Links</h3>
            <p className="opacity-80" style={{ wordBreak: 'break-all', fontSize: 9 }}>{data.linkedIn}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold mb-2 uppercase tracking-wider" style={{ fontSize: 9 }}>Skills</h3>
            <div className="flex flex-col gap-0.5">
              {data.skills.map((skill, i) => (
                <p key={i} className="opacity-80">{skill}</p>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h3 className="font-bold mb-2 uppercase tracking-wider" style={{ fontSize: 9 }}>Languages</h3>
            {data.languages.map((lang, i) => (
              <div key={i} className="mb-1">
                <p className="opacity-80">{lang.name}</p>
                {lang.level && (
                  <p className="opacity-50" style={{ fontSize: 8 }}>{lang.level}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1" style={{ padding: '24px 20px' }}>

        {/* Profile */}
        {data.profile && (
          <div className="mb-5">
            <h2 className="font-bold mb-2" style={{ fontSize: 13, borderBottom: '2px solid #e5e7eb', paddingBottom: 4 }}>
              Profile
            </h2>
            <p className="text-zinc-600 leading-relaxed" style={{ fontSize: 9 }}>
              {data.profile}
            </p>
          </div>
        )}

        {/* Experiences */}
        {data.experiences.length > 0 && (
          <div className="mb-5">
            <h2 className="font-bold mb-3" style={{ fontSize: 13, borderBottom: '2px solid #e5e7eb', paddingBottom: 4 }}>
              Employment History
            </h2>
            {data.experiences.map((exp, i) => (
              <div key={exp.id || i} className="mb-4">
                <h3 className="font-bold text-zinc-800" style={{ fontSize: 10 }}>
                  {exp.role}{exp.company ? `, ${exp.company}` : ''}{exp.location ? `, ${exp.location}` : ''}
                </h3>
                <p className="uppercase tracking-wider text-zinc-500 mb-1" style={{ fontSize: 7 }}>
                  {exp.startDate}{exp.startDate && (exp.isCurrent ? ' — Present' : exp.endDate ? ` — ${exp.endDate}` : '')}
                </p>
                {exp.bullets.filter(b => b.trim()).length > 0 && (
                  <ul className="list-disc pl-3 text-zinc-600 space-y-0.5" style={{ fontSize: 9 }}>
                    {exp.bullets.filter(b => b.trim()).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="font-bold mb-3" style={{ fontSize: 13, borderBottom: '2px solid #e5e7eb', paddingBottom: 4 }}>
              Education
            </h2>
            {data.education.map((edu, i) => (
              <div key={edu.id || i} className="mb-3">
                <h3 className="font-bold text-zinc-800" style={{ fontSize: 10 }}>
                  {edu.degree}{edu.institution ? `, ${edu.institution}` : ''}
                </h3>
                <p className="uppercase tracking-wider text-zinc-500" style={{ fontSize: 7 }}>
                  {edu.startDate}{edu.startDate && edu.endDate ? ` — ${edu.endDate}` : ''}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}