import React, { useState } from 'react';
import AuthorsView from './components/AuthorsView';
import BooksView from './components/BooksView';
import ReviewsView from './components/ReviewsView';
import Background3D from './components/Background3D'; 


const IconUsers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconBook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>;
const IconReview = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

function App() {
    const [view, setView] = useState('authors');

    const navItems = [
        { id: 'authors', label: 'Authors', icon: <IconUsers /> },
        { id: 'books', label: 'Books', icon: <IconBook /> },
        { id: 'reviews', label: 'Reviews', icon: <IconReview /> }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            
            {/* The Custom 3D Background */}
            <Background3D />

            {/* Sidebar with Bottom Footer */}
            <div style={{ width: '260px', padding: '40px 0', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 1, background: 'rgba(11, 17, 32, 0.5)', backdropFilter: 'blur(10px)' }}>
                
                {/* Generic Custom Branding */}
                <div style={{ marginBottom: '40px', padding: '0 30px' }}>
                    <h2 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-0.5px', margin: 0 }}>
                        HAIBAZO<span style={{ color: '#88ccff' }}>.</span>
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px', marginTop: '2px', textTransform: 'uppercase' }}>
                        LIBARARY
                    </p>
                </div>
                
                {/* Navigation */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 20px 0 0', flex: 1 }}>
                    {navItems.map(item => (
                        <li 
                            key={item.id} 
                            onClick={() => setView(item.id)} 
                            className={`menu-item ${view === item.id ? 'active' : ''}`}
                            style={{ 
                                padding: '12px 16px 12px 30px', 
                                cursor: 'pointer', 
                                fontWeight: '600', 
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                            {item.icon}
                            {item.label}
                        </li>
                    ))}
                </ul>

                {/* Developer Footer */}
                <div style={{ padding: '0 30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: 'auto' }}>
                    <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '500' }}>Developed by</p>
                    <p style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: '700', letterSpacing: '0.5px' }}>Trung Toan</p>
                </div>
            </div>

            {/* Main Workspace */}
            <div style={{ flex: 1, padding: '50px 60px', height: '100vh', overflowY: 'auto', zIndex: 1 }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#f8fafc', letterSpacing: '-0.5px' }}>
                            {navItems.find(i => i.id === view)?.label} Management
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '8px' }}></p>
                    </div>
                    {view === 'authors' && <AuthorsView />}
                    {view === 'books' && <BooksView />}
                    {view === 'reviews' && <ReviewsView />}
                </div>
            </div>
        </div>
    );
}

export default App;