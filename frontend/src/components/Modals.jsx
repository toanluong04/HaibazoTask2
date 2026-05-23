import React from 'react';

const overlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const box = { background: '#fff', padding: '30px', borderRadius: '16px', width: '420px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' };

export const DeleteModal = ({ isOpen, itemName, onConfirm, onCancel }) => {
    if (!isOpen) return null;
    return (
        <div style={overlay}>
            <div style={box}>
                <h3 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '10px', fontWeight: '700' }}>Confirm Deletion</h3>
                <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.5' }}>Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '30px', justifyContent: 'flex-end' }}>
                    <button onClick={onCancel} style={{ padding: '10px 20px', background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={onConfirm} style={{ padding: '10px 20px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)' }}>Delete Permanently</button>
                </div>
            </div>
        </div>
    );
};

export const EditModal = ({ isOpen, title, onSave, onCancel, children }) => {
    if (!isOpen) return null;
    return (
        <div style={overlay}>
            <div style={box}>
                <h3 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '24px', fontWeight: '700' }}>{title}</h3>
                <div>{children}</div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '30px', justifyContent: 'flex-end' }}>
                    <button onClick={onCancel} style={{ padding: '10px 20px', background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={onSave} style={{ padding: '10px 20px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)' }}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};