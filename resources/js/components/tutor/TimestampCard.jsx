import { Play, Cpu, FileText } from 'lucide-react';

function formatTime(seconds) {
  const mm = Math.floor(seconds / 60).toString().padStart(2, '0');
  const ss = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function TimestampCard({ ts, onJump, onExplain, onProblem, isActive }) {
  return (
    <div
      id={`timestamp-${ts.id}`}
      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-purple-50 border border-purple-100' : 'hover:bg-gray-50'}`}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => { if (e.key === 'Enter') onJump(ts.time); }}
    >
      <div className="flex-shrink-0 w-14">
        <button onClick={() => onJump(ts.time)} className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span className="inline-block bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">{formatTime(ts.time)}</span>
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900">{ts.title}</h4>
        </div>
        {ts.description && <p className="text-xs text-gray-500 mt-1">{ts.description}</p>}

        <div className="mt-3 flex gap-2">
          <button onClick={() => onExplain(ts)} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-white border hover:shadow-sm">
            <Cpu className="w-4 h-4 text-purple-600" />
            <span>🤖 AI Explanation</span>
          </button>
          <button onClick={() => onProblem(ts)} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-md bg-white border hover:shadow-sm">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>📝 Real-World Problem</span>
          </button>
        </div>
      </div>
    </div>
  );
}
