import { Clock, History } from "lucide-react";

export default function LogTable({ logs }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <History size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Activity Logs</h3>
            <p className="text-xs text-slate-500">System trigger history</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {logs.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            <Clock className="mx-auto mb-3 opacity-20" size={40} />
            <p>No activities recorded yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {logs.map((log) => (
              <div key={log.Id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    log.Keterangan.includes('INSERT') ? 'bg-emerald-50 text-emerald-600' :
                    log.Keterangan.includes('UPDATE') ? 'bg-blue-50 text-blue-600' :
                    'bg-red-50 text-red-600'
                  }`}>
                    {log.Keterangan.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {log.Tanggal} • {log.Jam}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-snug">
                  {log.Keterangan}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
