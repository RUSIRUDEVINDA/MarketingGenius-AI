import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap, AlertCircle } from 'lucide-react';

export default function HomePage() {
    const navigate = useNavigate();
    const [businessName, setBusinessName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    business_name: businessName,
                    description: description,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate marketing content. Please try again.');
            }

            const data = await response.json();

            // Navigate to results page with the data
            navigate('/results', { state: { data, businessName } });
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            {/* Navigation */}
            <nav className="navbar">
                <a href="/" className="navbar-brand">
                    <div className="brand-icon">🚀</div>
                    <span className="brand-text">Marketing<span>Genius</span></span>
                </a>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Zap size={16} />
                        AI-Powered Marketing
                    </div>
                    <h1 className="hero-title">
                        Generate Your Complete <span className="highlight">Marketing Kit</span> in Seconds
                    </h1>
                    <p className="hero-subtitle">
                        Get professional Facebook posts, Instagram captions, Google Ads, SEO keywords, and more - all tailored to your business.
                    </p>
                </div>
            </section>

            {/* Main Form */}
            <main className="main-content">
                <div className="form-card">
                    <div className="form-header">
                        <h2>Tell Us About Your Business</h2>
                        <p>We'll create a complete marketing kit customized just for you.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">
                                Business Name <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="e.g., Sam's Coffee Shop"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Business Description <span style={{ color: 'var(--light-gray)', fontWeight: 400 }}>(Optional but recommended)</span>
                            </label>
                            <textarea
                                className="form-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your business, products/services, target audience, what makes you unique..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading || !businessName.trim()}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Generating Your Marketing Kit...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="icon" />
                                    Generate Marketing Kit
                                </>
                            )}
                        </button>
                    </form>

                    {error && (
                        <div className="error-card">
                            <AlertCircle size={20} />
                            {error}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                © 2025 <span> MarketingGenius AI </span> • Crafted by Rusiru Devinda
            </footer>
        </div>
    );
}
