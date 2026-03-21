import {
  ArrowLeft,
  Download,
  FileText,
  Film,
  Plus,
  Presentation,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Page, Role } from "../App";

type MaterialType = "PDF" | "PPT" | "Video" | "Notes";

type Material = {
  id: number;
  title: string;
  subject: string;
  type: MaterialType;
  uploadedBy: string;
  date: string;
  description: string;
};

const TYPE_ICON: Record<MaterialType, React.ReactNode> = {
  PDF: <FileText size={20} className="text-red-500" />,
  PPT: <Presentation size={20} className="text-orange-500" />,
  Video: <Film size={20} className="text-blue-500" />,
  Notes: <FileText size={20} className="text-green-500" />,
};

const TYPE_BADGE: Record<MaterialType, string> = {
  PDF: "bg-red-100 text-red-600",
  PPT: "bg-orange-100 text-orange-600",
  Video: "bg-blue-100 text-blue-600",
  Notes: "bg-green-100 text-green-600",
};

const initialMaterials: Material[] = [
  {
    id: 1,
    title: "DSA Notes – Trees & Graphs",
    subject: "DSA",
    type: "PDF",
    uploadedBy: "Dr. Ramesh Kumar",
    date: "Dec 10, 2025",
    description:
      "Comprehensive notes covering tree traversals, graph algorithms, BFS, DFS.",
  },
  {
    id: 2,
    title: "Computer Networks Lab Manual",
    subject: "Computer Networks",
    type: "PDF",
    uploadedBy: "Prof. Anita Sharma",
    date: "Dec 5, 2025",
    description:
      "Lab experiments for CN including socket programming and network configuration.",
  },
  {
    id: 3,
    title: "Digital Electronics PPT – Logic Gates",
    subject: "Digital Electronics",
    type: "PPT",
    uploadedBy: "Prof. Suresh Nair",
    date: "Nov 28, 2025",
    description:
      "Slides covering combinational circuits, K-Maps, and logic gate design.",
  },
  {
    id: 4,
    title: "Thermodynamics Formula Sheet",
    subject: "Thermodynamics",
    type: "PDF",
    uploadedBy: "Dr. Priya Singh",
    date: "Nov 22, 2025",
    description:
      "Quick-reference formula sheet for all thermodynamics laws and equations.",
  },
  {
    id: 5,
    title: "OS Lab Manual",
    subject: "Operating Systems",
    type: "PDF",
    uploadedBy: "Prof. Meena Iyer",
    date: "Nov 15, 2025",
    description:
      "Practical lab manual covering process scheduling, memory management, file systems.",
  },
  {
    id: 6,
    title: "DSA Practice Problems Set",
    subject: "DSA",
    type: "Notes",
    uploadedBy: "Dr. Ramesh Kumar",
    date: "Nov 10, 2025",
    description:
      "Curated problem set for exam preparation covering arrays, linked lists, and DP.",
  },
  {
    id: 7,
    title: "Engineering Mathematics III – Video Lecture 1",
    subject: "Eng Math III",
    type: "Video",
    uploadedBy: "Dr. Vijay Patel",
    date: "Oct 30, 2025",
    description:
      "Video lecture on Laplace transforms and their engineering applications.",
  },
];

const SUBJECTS = [
  "DSA",
  "Computer Networks",
  "Digital Electronics",
  "Thermodynamics",
  "Operating Systems",
  "Eng Math III",
  "DBMS",
];

export default function StudyMaterials({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [showModal, setShowModal] = useState(false);
  const [filterSubject, setFilterSubject] = useState<string>("All");
  const [form, setForm] = useState({
    title: "",
    subject: "DSA",
    type: "PDF" as MaterialType,
    description: "",
  });

  const grouped = [...new Set(materials.map((m) => m.subject))].filter(
    (s) => filterSubject === "All" || s === filterSubject,
  );

  const handleUpload = () => {
    if (!form.title) return;
    setMaterials((prev) => [
      {
        id: Date.now(),
        ...form,
        uploadedBy: role === "teacher" ? "Prof. You" : "Admin",
        date: "Dec 21, 2025",
      },
      ...prev,
    ]);
    setForm({ title: "", subject: "DSA", type: "PDF", description: "" });
    setShowModal(false);
    toast.success("Material uploaded successfully!");
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="study-materials.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Study Materials</h1>
          <p className="text-slate-500 mt-1">
            {materials.length} resources available
          </p>
        </div>
        {(role === "admin" || role === "teacher") && (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            data-ocid="study-materials.open_modal_button"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus size={16} /> Upload Material
          </button>
        )}
      </div>

      {/* Subject Filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...SUBJECTS].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilterSubject(s)}
            data-ocid="study-materials.tab"
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterSubject === s
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grouped by Subject */}
      {grouped.length === 0 ? (
        <div
          className="text-center py-16 text-slate-400"
          data-ocid="study-materials.empty_state"
        >
          No materials found for this subject.
        </div>
      ) : (
        grouped.map((subject) => (
          <div key={subject}>
            <h2 className="text-sm font-semibold text-slate-500 uppercase mb-3">
              {subject}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {materials
                .filter((m) => m.subject === subject)
                .map((m, i) => (
                  <div
                    key={m.id}
                    data-ocid={`study-materials.item.${i + 1}`}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                        {TYPE_ICON[m.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm leading-tight">
                          {m.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {m.uploadedBy} &bull; {m.date}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${TYPE_BADGE[m.type]}`}
                      >
                        {m.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {m.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        toast.success(`Download started: ${m.title}`)
                      }
                      data-ocid={`study-materials.download_button.${i + 1}`}
                      className="w-full flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <Download size={13} /> Download
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            data-ocid="study-materials.dialog"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Upload Study Material
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                data-ocid="study-materials.close_button"
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="sm-title"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Title
                </label>
                <input
                  id="sm-title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  data-ocid="study-materials.input"
                  placeholder="e.g. DSA Notes Chapter 5"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="sm-subject"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Subject
                </label>
                <select
                  id="sm-subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  data-ocid="study-materials.select"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="sm-type"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Type
                </label>
                <select
                  id="sm-type"
                  value={form.type}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      type: e.target.value as MaterialType,
                    }))
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  {["PDF", "PPT", "Video", "Notes"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="sm-desc"
                  className="text-sm font-medium text-slate-700 block mb-1"
                >
                  Description
                </label>
                <textarea
                  id="sm-desc"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  data-ocid="study-materials.textarea"
                  rows={3}
                  placeholder="Brief description of the material..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                data-ocid="study-materials.cancel_button"
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                data-ocid="study-materials.submit_button"
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
