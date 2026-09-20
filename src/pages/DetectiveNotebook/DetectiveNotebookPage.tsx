import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvestigation } from '../../state/InvestigationContext';
import type { NotebookNote } from '../../state/types';
import { sfx } from '../../utils/audio';
import {
  BookOpen,
  Plus,
  FileText,
  User,
  Trash2,
  Edit3,
  Info
} from 'lucide-react';
import './DetectiveNotebookPage.css';

export const DetectiveNotebookPage: React.FC = () => {
  const { state, dispatch, suspectsList, evidenceList } = useInvestigation();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<'all' | 'evidence' | 'suspect' | 'timeline' | 'theory'>('all');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<NotebookNote | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState<string>('');
  const [formType, setFormType] = useState<NotebookNote['type']>('free');
  const [formAnnotation, setFormAnnotation] = useState<NotebookNote['annotation']>('IMPORTANT');
  const [formContent, setFormContent] = useState<string>('');
  const [formEvidenceId, setFormEvidenceId] = useState<string>('');
  const [formSuspectId, setFormSuspectId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFilterChange = (filter: 'all' | 'evidence' | 'suspect' | 'timeline' | 'theory') => {
    sfx.playPaper();
    setActiveFilter(filter);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenCreateModal = () => {
    sfx.playClick();
    setEditingNote(null);
    setFormTitle('');
    setFormType('free');
    setFormAnnotation('IMPORTANT');
    setFormContent('');
    setFormEvidenceId('');
    setFormSuspectId('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (note: NotebookNote) => {
    setEditingNote(note);
    setFormTitle(note.title);
    setFormType(note.type);
    setFormAnnotation(note.annotation);
    setFormContent(note.content);
    setFormEvidenceId(note.relatedEvidenceId || '');
    setFormSuspectId(note.relatedSuspectId || '');
    setModalOpen(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) return;

    const timeStr = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} GMT`;

    if (editingNote) {
      const updated: NotebookNote = {
        ...editingNote,
        title: formTitle,
        type: formType,
        annotation: formAnnotation,
        content: formContent,
        relatedEvidenceId: formEvidenceId || undefined,
        relatedSuspectId: formSuspectId || undefined
      };
      dispatch({ type: 'UPDATE_NOTE', payload: updated });
      showToast('Note updated successfully.');
    } else {
      const newNote: NotebookNote = {
        id: `note-${Date.now()}`,
        type: formType,
        title: formTitle,
        content: formContent,
        annotation: formAnnotation,
        createdAt: timeStr,
        relatedEvidenceId: formEvidenceId || undefined,
        relatedSuspectId: formSuspectId || undefined
      };
      dispatch({ type: 'ADD_NOTE', payload: newNote });
      showToast('New note recorded in Detective Notebook.');
    }

    setModalOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
    showToast('Note removed from notebook.');
  };

  const filteredNotes = state.notes.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  return (
    <div className="notebook-page-container font-body animate-fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="notebook-toast font-mono">
          <Info size={16} className="text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Strip */}
      <header className="notebook-header-bar font-mono">
        <div className="header-left">
          <div className="notebook-sub-tag text-gold">INSPECTOR VANCE'S FIELD NOTEBOOK</div>
          <h1 className="notebook-main-title font-headline">Detective Memos & Working Theories</h1>
          <p className="notebook-subtitle">Personal case notations, cross-references, and crime sequence theories.</p>
        </div>

        <div className="header-right">
          <div className="notes-counter">
            RECORDED ENTRIES: <strong>{state.notes.length}</strong>
          </div>
          <button className="btn-create-note font-mono" onClick={handleOpenCreateModal}>
            <Plus size={16} /> RECORD NEW NOTE
          </button>
        </div>
      </header>

      {/* Filter Toolbar */}
      <div className="notebook-filter-bar font-mono">
        <span className="filter-title">FILTER MEMOS:</span>
        <div className="filter-pills">
          <button
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            ALL ENTRIES ({state.notes.length})
          </button>
          <button
            className={`filter-pill ${activeFilter === 'theory' ? 'active' : ''}`}
            onClick={() => handleFilterChange('theory')}
          >
            THEORIES
          </button>
          <button
            className={`filter-pill ${activeFilter === 'evidence' ? 'active' : ''}`}
            onClick={() => handleFilterChange('evidence')}
          >
            EVIDENCE NOTES
          </button>
          <button
            className={`filter-pill ${activeFilter === 'suspect' ? 'active' : ''}`}
            onClick={() => handleFilterChange('suspect')}
          >
            SUSPECT NOTES
          </button>
          <button
            className={`filter-pill ${activeFilter === 'timeline' ? 'active' : ''}`}
            onClick={() => handleFilterChange('timeline')}
          >
            TIMELINE NOTES
          </button>
        </div>
      </div>

      {/* Main Aged Paper Workspace */}
      <main className="notebook-paper-workspace">
        <div className="parchment-sheet-container">
          {/* Coffee Ring / Ink Accent Graphics */}
          <div className="coffee-ring-graphic"></div>
          <div className="paperclip-corner"></div>

          <div className="notes-grid">
            {filteredNotes.length === 0 ? (
              <div className="empty-notebook-state font-mono">
                <BookOpen size={36} className="text-tertiary mb-2" />
                <span>NO MEMOS RECORDED FOR THIS CATEGORY.</span>
                <button className="btn-create-note mt-4" onClick={handleOpenCreateModal}>
                  + RECORD FIRST MEMO
                </button>
              </div>
            ) : (
              filteredNotes.map(note => (
                <div key={note.id} className={`note-card annotation-${note.annotation.toLowerCase()}`}>
                  {/* Pin Accent */}
                  <div className="note-pin-head"></div>

                  <div className="note-card-top font-mono">
                    <span className="note-type-tag">{note.type.toUpperCase()}</span>
                    <span className={`annotation-badge badge-${note.annotation.toLowerCase()}`}>
                      {note.annotation}
                    </span>
                  </div>

                  <h3 className="note-title font-headline">{note.title}</h3>
                  <p className="note-content font-headline">{note.content}</p>

                  {/* Reference Badges */}
                  <div className="note-references-row font-mono">
                    {note.relatedEvidenceId && (
                      <span
                        className="ref-badge ref-evidence"
                        onClick={() => {
                          dispatch({ type: 'SELECT_EVIDENCE', payload: note.relatedEvidenceId! });
                          navigate('/inspection');
                        }}
                      >
                        <FileText size={12} className="inline mr-1" />
                        CLUE: {note.relatedEvidenceId}
                      </span>
                    )}

                    {note.relatedSuspectId && (
                      <span
                        className="ref-badge ref-suspect"
                        onClick={() => {
                          dispatch({ type: 'SELECT_SUSPECT', payload: note.relatedSuspectId! });
                          navigate('/suspects');
                        }}
                      >
                        <User size={12} className="inline mr-1" />
                        {note.relatedSuspectId.replace('-', ' ').toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="note-footer font-mono">
                    <span className="note-timestamp">{note.createdAt}</span>
                    <div className="note-actions">
                      <button
                        className="btn-note-icon"
                        title="Edit Note"
                        onClick={() => handleOpenEditModal(note)}
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        className="btn-note-icon text-red"
                        title="Delete Note"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Note Creation / Editing Modal */}
      {modalOpen && (
        <div className="modal-backdrop animate-fade-in font-mono" onClick={() => setModalOpen(false)}>
          <div className="note-modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>{editingNote ? 'EDIT DETECTIVE MEMO' : 'RECORD NEW FIELD MEMO'}</span>
              <button className="btn-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveNote} className="note-form">
              <div className="form-group">
                <label>MEMO TITLE:</label>
                <input
                  type="text"
                  placeholder="e.g. Staged Window Break-In Theory"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>NOTE CATEGORY:</label>
                  <select value={formType} onChange={e => setFormType(e.target.value as any)}>
                    <option value="free">Free Investigator Note</option>
                    <option value="theory">Working Theory</option>
                    <option value="evidence">Evidence Note</option>
                    <option value="suspect">Suspect Note</option>
                    <option value="timeline">Timeline Note</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>ANNOTATION TAG:</label>
                  <select value={formAnnotation} onChange={e => setFormAnnotation(e.target.value as any)}>
                    <option value="IMPORTANT">IMPORTANT</option>
                    <option value="QUESTION">QUESTION</option>
                    <option value="FOLLOW UP">FOLLOW UP</option>
                    <option value="CONTRADICTION">CONTRADICTION</option>
                    <option value="THEORY">THEORY</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>LINK EVIDENCE CLUE (OPTIONAL):</label>
                  <select value={formEvidenceId} onChange={e => setFormEvidenceId(e.target.value)}>
                    <option value="">None / General</option>
                    {evidenceList.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.id} — {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>LINK SUSPECT (OPTIONAL):</label>
                  <select value={formSuspectId} onChange={e => setFormSuspectId(e.target.value)}>
                    <option value="">None / General</option>
                    {suspectsList.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>MEMO CONTENT / OBSERVATIONS:</label>
                <textarea
                  rows={4}
                  placeholder="Type investigator field observations or working theory..."
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn-modal-save font-headline">
                  [ SAVE MEMO TO NOTEBOOK ]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
