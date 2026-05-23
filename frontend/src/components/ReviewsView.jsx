import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { DeleteModal } from './Modals';
import { FiTrash2 } from 'react-icons/fi';

export default function ReviewsView() {
    const [reviews, setReviews] = useState([]);
    const [books, setBooks] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [bookId, setBookId] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadData = async () => {
        const reviewsRes = await api.getReviews(); setReviews(reviewsRes.data);
        const booksRes = await api.getBooks(); setBooks(booksRes.data);
    };
    useEffect(() => { loadData(); }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        api.createReview({ review_text: reviewText, book_id: parseInt(bookId) }).then(() => { setReviewText(''); setBookId(''); loadData(); });
    };

    return (
        <div>
            <div className="glass-card" style={{ padding: '30px 35px', marginBottom: '35px' }}>
                <h2 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '20px', fontWeight: '600' }}>Submit a Review</h2>
                <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                    <select value={bookId} onChange={e => setBookId(e.target.value)} required style={{ padding: '14px 18px', borderRadius: '10px', fontSize: '0.95rem' }}>
                        <option value="">Select a Book...</option>
                        {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
                    </select>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Write your thoughts..." required rows="4" style={{ padding: '14px 18px', borderRadius: '10px', fontSize: '0.95rem', resize: 'vertical' }} />
                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '14px 28px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Publish Review</button>
                </form>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', width: '5%' }}>No</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', width: '25%' }}>Book</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', width: '15%' }}>Author</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase' }}>Review</th>
                            <th style={{ padding: '20px 30px', color: '#94a3b8', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((r, i) => (
                            <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                <td style={{ padding: '20px 30px', color: '#cbd5e1', fontSize: '0.95rem' }}>{i + 1}</td>
                                <td style={{ padding: '20px 30px', fontWeight: '600', color: '#f8fafc', fontSize: '0.95rem' }}>{r.book_title}</td>
                                <td style={{ padding: '20px 30px', color: '#94a3b8', fontSize: '0.95rem' }}>{r.author_name}</td>
                                <td style={{ padding: '20px 30px', color: '#cbd5e1', lineHeight: '1.6', fontSize: '0.95rem' }}>{r.review_text}</td>
                                <td style={{ padding: '20px 30px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={() => setDeleteTarget(r)} className="icon-btn icon-btn-delete" title="Delete"><FiTrash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <DeleteModal isOpen={!!deleteTarget} itemName="this review" onConfirm={() => api.deleteReview(deleteTarget.id).then(() => { setDeleteTarget(null); loadData(); })} onCancel={() => setDeleteTarget(null)} />
        </div>
    );
}