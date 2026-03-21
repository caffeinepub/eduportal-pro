import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Paperclip,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Page, Role } from "../App";

const initialAssignments = [
  {
    id: 1,
    title: "DSA Lab Assignment #3",
    course: "Data Structures & Algorithms",
    due: "Mar 20, 2026",
    status: "overdue",
    submissions: 48,
    total: 60,
  },
  {
    id: 2,
    title: "Network Topology Design",
    course: "Computer Networks",
    due: "Mar 25, 2026",
    status: "pending",
    submissions: 30,
    total: 58,
  },
  {
    id: 3,
    title: "Logic Gate Circuit Report",
    course: "Digital Electronics",
    due: "Mar 28, 2026",
    status: "submitted",
    submissions: 50,
    total: 55,
  },
  {
    id: 4,
    title: "Engineering Maths Problem Set 5",
    course: "Engineering Mathematics III",
    due: "Mar 30, 2026",
    status: "pending",
    submissions: 0,
    total: 120,
  },
  {
    id: 5,
    title: "Thermodynamics Cycle Analysis",
    course: "Thermodynamics",
    due: "Apr 2, 2026",
    status: "graded",
    submissions: 63,
    total: 65,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-orange-100 text-orange-600",
  submitted: "bg-blue-100 text-blue-600",
  overdue: "bg-red-100 text-red-600",
  graded: "bg-green-100 text-green-600",
};

export default function Assignments({
  role,
  navigate,
}: { role: Role; navigate: (p: Page) => void }) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitTarget, setSubmitTarget] = useState<
    (typeof initialAssignments)[0] | null
  >(null);
  const [submitText, setSubmitText] = useState("");
  const [submitFile, setSubmitFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ title: "", course: "", due: "" });

  const handleAdd = () => {
    if (!form.title) return;
    setAssignments((prev) => [
      ...prev,
      { id: Date.now(), ...form, status: "pending", submissions: 0, total: 30 },
    ]);
    setForm({ title: "", course: "", due: "" });
    setShowCreateModal(false);
  };

  const openSubmitModal = (a: (typeof initialAssignments)[0]) => {
    setSubmitTarget(a);
    setSubmitText("");
    setSubmitFile(null);
  };

  const handleSubmitAssignment = () => {
    if (!submitTarget) return;
    if (!submitText.trim() && !submitFile) {
      toast.error(
        "Please add a text answer or attach a file before submitting.",
      );
      return;
    }
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === submitTarget.id
          ? { ...a, status: "submitted", submissions: a.submissions + 1 }
          : a,
      ),
    );
    toast.success("Assignment submitted successfully!");
    setSubmitTarget(null);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSubmitFile(file);
  };

  const pendingCount = assignments.filter(
    (a) => a.status === "pending" || a.status === "overdue",
  ).length;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="nav.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Assignments</h1>
          <p className="text-slate-500 mt-1">
            {assignments.length} total assignments
          </p>
        </div>
        {(role === "admin" || role === "teacher") && (
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            data-ocid="assignments.open_modal_button"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus size={16} /> Create Assignment
          </button>
        )}
      </div>

      {role === "student" && pendingCount > 0 && (
        <div
          className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl px-5 py-4"
          data-ocid="assignments.error_state"
        >
          <AlertCircle size={20} className="text-orange-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-orange-700">
              Assignment should be submitted!
            </p>
            <p className="text-xs text-orange-600 mt-0.5">
              You have {pendingCount} assignment{pendingCount > 1 ? "s" : ""}{" "}
              pending submission. Please submit before the due date to avoid
              penalties.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Title
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Course
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Due Date
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                Status
              </th>
              {(role === "teacher" || role === "admin") && (
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Submissions
                </th>
              )}
              {role === "student" && (
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignments.map((a, idx) => (
              <tr
                key={a.id}
                className="hover:bg-slate-50 transition-colors"
                data-ocid={`assignments.row.${idx + 1}`}
              >
                <td className="px-5 py-4 text-sm font-medium text-slate-900">
                  {a.title}
                  {role === "student" &&
                    (a.status === "pending" || a.status === "overdue") && (
                      <span className="ml-2 text-xs text-orange-500 font-normal">
                        • Should be submitted
                      </span>
                    )}
                  {role === "student" && a.status === "submitted" && (
                    <span className="ml-2 text-xs text-green-600 font-normal">
                      <CheckCircle2 size={11} className="inline mr-0.5" />
                      Submitted
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-slate-500">{a.course}</td>
                <td className="px-5 py-4 text-sm text-slate-500">{a.due}</td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      statusColors[a.status] || "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                {(role === "teacher" || role === "admin") && (
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {a.submissions}/{a.total}
                  </td>
                )}
                {role === "student" && (
                  <td className="px-5 py-4">
                    {a.status === "pending" || a.status === "overdue" ? (
                      <button
                        type="button"
                        onClick={() => openSubmitModal(a)}
                        data-ocid={`assignments.primary_button.${idx + 1}`}
                        className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Submit Now
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Assignment Modal */}
      {submitTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg"
            data-ocid="assignments.dialog"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Submit Assignment
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {submitTarget.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitTarget(null)}
                data-ocid="assignments.close_button"
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label
                  htmlFor="submit_text"
                  className="text-sm font-medium text-slate-700 block mb-1.5"
                >
                  Your Answer / Notes
                </label>
                <textarea
                  id="submit_text"
                  rows={4}
                  value={submitText}
                  onChange={(e) => setSubmitText(e.target.value)}
                  placeholder="Type your answer or additional notes here..."
                  data-ocid="assignments.textarea"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-1.5">
                  Attach File{" "}
                  <span className="text-slate-400 font-normal">
                    (PDF, DOC, ZIP)
                  </span>
                </p>
                <label
                  htmlFor="file_upload"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  data-ocid="assignments.dropzone"
                  className={`block border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <Upload size={22} className="text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">
                    <span className="text-blue-600 font-medium">
                      Click to attach file
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF, DOC, DOCX, ZIP supported
                  </p>
                  <input
                    id="file_upload"
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.zip"
                    className="hidden"
                    onChange={(e) => setSubmitFile(e.target.files?.[0] || null)}
                    data-ocid="assignments.upload_button"
                  />
                </label>
                {submitFile && (
                  <div className="flex items-center gap-2 mt-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                    <Paperclip size={13} className="text-green-500" />
                    <span className="text-xs text-green-700 font-medium truncate">
                      {submitFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSubmitFile(null)}
                      className="ml-auto text-slate-400 hover:text-slate-600"
                    >
                      <X size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 pb-5 flex gap-3">
              <button
                type="button"
                onClick={() => setSubmitTarget(null)}
                data-ocid="assignments.cancel_button"
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitAssignment}
                data-ocid="assignments.submit_button"
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            data-ocid="assignments.modal"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Create Assignment
              </h2>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "Title",
                  key: "title",
                  type: "text",
                  placeholder: "Assignment title",
                },
                {
                  label: "Course",
                  key: "course",
                  type: "text",
                  placeholder: "Course name",
                },
                {
                  label: "Due Date",
                  key: "due",
                  type: "date",
                  placeholder: "",
                },
              ].map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={f.key}
                    className="text-sm font-medium text-slate-700 block mb-1"
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
