import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { DeleteModal } from './Modals';
import { FiTrash2 } from 'react-icons/fi';

export default function BooksView() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadData = async () => {
        const booksRes = await api.getBooks(); setBooks(booksRes.data);
        const authorsRes = await api.getAuthors(); setAuthors(authorsRes.data);
    };
    useEffect(() => { loadData(); }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        api.createBook({ title, author_id: parseInt(authorId) }).then(() => { setTitle(''); setAuthorId(''); loadData(); });
    };

    return (
        <div>
            <div className="glass-card" style={{ padding: '30px 35px', marginBottom: '35px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '20px', fontWeight: '600' }}>Register New Book</h2>
                <form onSubmit={handleCreate} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Book Title" required style={{ flex: 2, minWidth: '200px', padding: '14px 18px', borderRadius: '10px', fontSize: '0.95rem' }} />
                    <select value={authorId} onChange={e => setAuthorId(e.target.value)} required style={{ flex: 1, minWidth: '150px', padding: '14px 18px', borderRadius: '10px', fontSize: '0.95rem' }}>
                        <option value="">Select Author...</option>
                        {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                    <button type="submit" className="btn-primary" style={{ padding: '14px 28px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Add Book</button>
                </form>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>No</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Title</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Author</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((b, i) => (
                            <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                <td style={{ padding: '20px 30px', color: '#cbd5e1', fontSize: '0.95rem' }}>{i + 1}</td>
                                <td style={{ padding: '20px 30px', fontWeight: '600', color: '#f8fafc', fontSize: '0.95rem' }}>{b.title}</td>
                                <td style={{ padding: '20px 30px', color: '#94a3b8', fontSize: '0.95rem' }}>{b.author_name}</td>
                                <td style={{ padding: '20px 30px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={() => setDeleteTarget(b)} className="icon-btn icon-btn-delete" title="Delete"><FiTrash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DeleteModal isOpen={!!deleteTarget} itemName={deleteTarget?.title} onConfirm={() => api.deleteBook(deleteTarget.id).then(() => { setDeleteTarget(null); loadData(); })} onCancel={() => setDeleteTarget(null)} />
        </div>
    );
}