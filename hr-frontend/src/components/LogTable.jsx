import { useState } from "react";
import { Clock, History, ChevronLeft, ChevronRight } from "lucide-react";

export default function LogTable({ logs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const paginatedLogs = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <History size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Riwayat Aktivitas</h3>
            <p className="text-xs text-slate-500">Riwayat pemicu sistem</p>
          </div>
        </div>
        <span className="text-sm font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{logs.length} data</span>
      </div>
      
      <div className="flex-1 overflow-auto min-h-[400px]">
        {logs.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            <Clock className="mx-auto mb-3 opacity-20" size={40} />
            <p>Belum ada aktivitas terekam.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {paginatedLogs.map((log) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-sm text-slate-500 font-medium">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} hingga {Math.min(currentPage * itemsPerPage, logs.length)} dari {logs.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              {/* For simplicity in log table, just show a few pages or all if < 5 */}
              {Array.from({ length: totalPages }).slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-7 h-7 rounded-lg text-sm font-bold transition-all ${
                    currentPage === idx + 1 
                      ? 'bg-primary-600 text-white shadow-sm shadow-primary-200' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {totalPages > 5 && <span className="text-slate-400 self-end">...</span>}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
