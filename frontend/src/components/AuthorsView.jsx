import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { DeleteModal, EditModal } from './Modals';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function AuthorsView() {
    const [authors, setAuthors] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadData = () => api.getAuthors().then(res => setAuthors(res.data));
    useEffect(() => { loadData(); }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        if (!name.trim()) return setError('* Please enter name');
        api.createAuthor({ name }).then(() => { setName(''); setError(''); loadData(); }).catch(() => setError('Author already exists'));
    };

    return (
        <div>
            <div className="glass-card" style={{ padding: '30px 35px', marginBottom: '35px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '20px', fontWeight: '600' }}>Add New Author</h2>
                <form onSubmit={handleCreate} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ flex: 1, maxWidth: '400px' }}>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. J. K. Rowling" style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', fontSize: '0.95rem' }} />
                        {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '8px', fontWeight: '500' }}>{error}</p>}
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '14px 28px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Create Author</button>
                </form>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>No</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Name</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Books</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((a, i) => (
                            <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                <td style={{ padding: '20px 30px', color: '#cbd5e1', fontSize: '0.95rem' }}>{i + 1}</td>
                                <td style={{ padding: '20px 30px', fontWeight: '600', color: '#f8fafc', fontSize: '0.95rem' }}>{a.name}</td>
                                <td style={{ padding: '20px 30px' }}>
                                    <span style={{ background: 'rgba(79, 70, 229, 0.15)', border: '1px solid rgba(79, 70, 229, 0.3)', color: '#818cf8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>{a.book_count} Books</span>
                                </td>
                                <td style={{ padding: '20px 30px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                    <button onClick={() => setEditTarget(a)} className="icon-btn icon-btn-edit" title="Edit"><FiEdit2 size={16} /></button>
                                    <button onClick={() => setDeleteTarget(a)} className="icon-btn icon-btn-delete" title="Delete"><FiTrash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditModal isOpen={!!editTarget} title="Edit Author" onSave={() => api.updateAuthor(editTarget.id, { name: editTarget.name }).then(() => { setEditTarget(null); loadData(); })} onCancel={() => setEditTarget(null)}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', fontWeight: '600', color: '#cbd5e1' }}>Author Name</label>
                <input value={editTarget?.name || ''} onChange={e => setEditTarget({...editTarget, name: e.target.value})} style={{ width: '100%', padding: '14px 18px', borderRadius: '10px', fontSize: '0.95rem' }} />
            </EditModal>
            
            <DeleteModal isOpen={!!deleteTarget} itemName={deleteTarget?.name} onConfirm={() => api.deleteAuthor(deleteTarget.id).then(() => { setDeleteTarget(null); loadData(); })} onCancel={() => setDeleteTarget(null)} />
        </div>
    );
}