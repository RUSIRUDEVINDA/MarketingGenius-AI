import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {
    Copy, Check, ArrowLeft, Facebook, Instagram, Target,
    Search, Hash, FileText, MessageSquare, Sparkles,
    Building, Users, Briefcase, Megaphone
} from 'lucide-react';
import './ResultsPage.css';

export default function ResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [copiedItems, setCopiedItems] = useState({});
    const [activeTab, setActiveTab] = useState('social');

    const { data, businessName } = location.state || {};

    // Redirect if no data
    if (!data) {
        return (
            <div className="no-data-container">
                <div className="no-data-card">
                    <h2>No Results Found</h2>
                    <p>Please generate a marketing kit first.</p>
                    <Link to="/" className="back-btn">
                        <ArrowLeft size={20} />
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopiedItems({ ...copiedItems, [key]: true });
        setTimeout(() => setCopiedItems({ ...copiedItems, [key]: false }), 2000);
    };

    const copyAllInSection = (items, sectionKey) => {
        const text = Array.isArray(items) ? items.join('\n\n') : items;
        copyToClipboard(text, sectionKey);
    };

    const tabs = [
        { id: 'social', label: 'Social Media', icon: <MessageSquare size={18} /> },
        { id: 'ads', label: 'Google Ads', icon: <Target size={18} /> },
        { id: 'seo', label: 'SEO & Keywords', icon: <Search size={18} /> },
        { id: 'brand', label: 'Brand Info', icon: <Building size={18} /> },
    ];

    return (
        <div className="results-page">
            {/* Navigation */}
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    <div className="brand-icon">🚀</div>
                    <span className="brand-text">Marketing<span>Genius</span></span>
                </Link>
                <button onClick={() => navigate('/')} className="new-kit-btn">
                    <Sparkles size={18} />
                    New Kit
                </button>
            </nav>

            {/* Header */}
            <header className="results-header">
                <div className="results-header-content">
                    <div className="success-badge">
                        <Check size={16} />
                        Marketing Kit Ready!
                    </div>
                    <h1>Marketing Kit for <span className="highlight">{businessName}</span></h1>
                    <p>Your complete marketing content is organized and ready to use.</p>
                </div>
            </header>

            {/* Business Overview */}
            <section className="overview-section">
                <div className="overview-grid">
                    <div className="overview-card">
                        <div className="overview-icon">
                            <Briefcase size={24} />
                        </div>
                        <div className="overview-content">
                            <span className="overview-label">Business Type</span>
                            <span className="overview-value">{data.business_type || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="overview-card">
                        <div className="overview-icon">
                            <Building size={24} />
                        </div>
                        <div className="overview-content">
                            <span className="overview-label">Industry</span>
                            <span className="overview-value">{data.industry || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="overview-card">
                        <div className="overview-icon">
                            <Users size={24} />
                        </div>
                        <div className="overview-content">
                            <span className="overview-label">Target Audience</span>
                            <span className="overview-value">{data.target_audience || 'N/A'}</span>
                        </div>
                    </div>
                    <div className="overview-card">
                        <div className="overview-icon">
                            <Megaphone size={24} />
                        </div>
                        <div className="overview-content">
                            <span className="overview-label">Brand Tone</span>
                            <span className="overview-value">{data.brand_tone || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <div className="tabs-container">
                <div className="tabs-nav">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <main className="results-content">

                {/* Social Media Tab */}
                {activeTab === 'social' && (
                    <div className="tab-content">
                        {/* Facebook Posts */}
                        <div className="content-section">
                            <div className="section-header">
                                <div className="section-title">
                                    <Facebook size={24} className="facebook-icon" />
                                    <h2>Facebook Posts</h2>
                                </div>
                                <button
                                    className="copy-all-btn"
                                    onClick={() => copyAllInSection(data.facebook_posts, 'fb-all')}
                                >
                                    {copiedItems['fb-all'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['fb-all'] ? 'Copied!' : 'Copy All'}
                                </button>
                            </div>
                            <div className="cards-grid">
                                {data.facebook_posts?.map((post, index) => (
                                    <div key={index} className="content-card facebook-card">
                                        <span className="card-number">#{index + 1}</span>
                                        <p className="card-text">{post}</p>
                                        <button
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(post, `fb-${index}`)}
                                        >
                                            {copiedItems[`fb-${index}`] ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instagram Captions */}
                        <div className="content-section">
                            <div className="section-header">
                                <div className="section-title">
                                    <Instagram size={24} className="instagram-icon" />
                                    <h2>Instagram Captions</h2>
                                </div>
                                <button
                                    className="copy-all-btn"
                                    onClick={() => copyAllInSection(data.instagram_captions, 'ig-all')}
                                >
                                    {copiedItems['ig-all'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['ig-all'] ? 'Copied!' : 'Copy All'}
                                </button>
                            </div>
                            <div className="cards-grid">
                                {data.instagram_captions?.map((caption, index) => (
                                    <div key={index} className="content-card instagram-card">
                                        <span className="card-number">#{index + 1}</span>
                                        <p className="card-text">{caption}</p>
                                        <button
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(caption, `ig-${index}`)}
                                        >
                                            {copiedItems[`ig-${index}`] ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hashtags */}
                        <div className="content-section">
                            <div className="section-header">
                                <div className="section-title">
                                    <Hash size={24} className="hashtag-icon" />
                                    <h2>Recommended Hashtags</h2>
                                </div>
                                <button
                                    className="copy-all-btn"
                                    onClick={() => copyAllInSection(data.hashtags?.join(' '), 'hashtags-all')}
                                >
                                    {copiedItems['hashtags-all'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['hashtags-all'] ? 'Copied!' : 'Copy All'}
                                </button>
                            </div>
                            <div className="hashtags-container">
                                {data.hashtags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="hashtag-tag"
                                        onClick={() => copyToClipboard(tag, `hash-${index}`)}
                                    >
                                        {tag}
                                        {copiedItems[`hash-${index}`] && <Check size={12} />}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Google Ads Tab */}
                {activeTab === 'ads' && (
                    <div className="tab-content">
                        <div className="content-section">
                            <div className="section-header">
                                <div className="section-title">
                                    <Target size={24} className="google-icon" />
                                    <h2>Google Ads Headlines</h2>
                                </div>
                            </div>
                            <div className="ads-grid">
                                {data.google_ads?.headlines?.map((headline, index) => (
                                    <div key={index} className="ad-card headline-card">
                                        <span className="ad-label">Headline {index + 1}</span>
                                        <p className="ad-text">{headline}</p>
                                        <button
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(headline, `headline-${index}`)}
                                        >
                                            {copiedItems[`headline-${index}`] ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="content-section">
                            <div className="section-header">
                                <div className="section-title">
                                    <FileText size={24} className="google-icon" />
                                    <h2>Google Ads Descriptions</h2>
                                </div>
                            </div>
                            <div className="descriptions-list">
                                {data.google_ads?.descriptions?.map((desc, index) => (
                                    <div key={index} className="description-card">
                                        <span className="desc-number">{index + 1}</span>
                                        <p className="desc-text">{desc}</p>
                                        <button
                                            className="copy-btn"
                                            onClick={() => copyToClipboard(desc, `desc-${index}`)}
                                        >
                                            {copiedItems[`desc-${index}`] ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                    <div className="tab-content">
                        <div className="content-section">
                            <div className="section-header">
                                <div className="section-title">
                                    <Search size={24} className="seo-icon" />
                                    <h2>SEO Keywords</h2>
                                </div>
                                <button
                                    className="copy-all-btn"
                                    onClick={() => copyAllInSection(data.seo_keywords?.join(', '), 'seo-all')}
                                >
                                    {copiedItems['seo-all'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['seo-all'] ? 'Copied!' : 'Copy All'}
                                </button>
                            </div>
                            <div className="keywords-container">
                                {data.seo_keywords?.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="keyword-tag"
                                        onClick={() => copyToClipboard(keyword, `kw-${index}`)}
                                    >
                                        {keyword}
                                        {copiedItems[`kw-${index}`] && <Check size={12} />}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="content-section">
                            <div className="section-header">
                                <div className="section-title">
                                    <FileText size={24} className="seo-icon" />
                                    <h2>Product/Service Description</h2>
                                </div>
                                <button
                                    className="copy-all-btn"
                                    onClick={() => copyToClipboard(data.product_or_service_description, 'prod-desc')}
                                >
                                    {copiedItems['prod-desc'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['prod-desc'] ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <div className="description-box">
                                <p>{data.product_or_service_description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Brand Info Tab */}
                {activeTab === 'brand' && (
                    <div className="tab-content">
                        <div className="brand-grid">
                            <div className="brand-card">
                                <div className="brand-card-header">
                                    <Briefcase size={20} />
                                    <h3>Services & Products</h3>
                                </div>
                                <p>{data.services_or_products}</p>
                                <button
                                    className="copy-btn-inline"
                                    onClick={() => copyToClipboard(data.services_or_products, 'services')}
                                >
                                    {copiedItems['services'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['services'] ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            <div className="brand-card">
                                <div className="brand-card-header">
                                    <Users size={20} />
                                    <h3>Target Audience</h3>
                                </div>
                                <p>{data.target_audience}</p>
                                <button
                                    className="copy-btn-inline"
                                    onClick={() => copyToClipboard(data.target_audience, 'audience')}
                                >
                                    {copiedItems['audience'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['audience'] ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            <div className="brand-card">
                                <div className="brand-card-header">
                                    <Megaphone size={20} />
                                    <h3>Brand Tone</h3>
                                </div>
                                <p>{data.brand_tone}</p>
                                <button
                                    className="copy-btn-inline"
                                    onClick={() => copyToClipboard(data.brand_tone, 'tone')}
                                >
                                    {copiedItems['tone'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['tone'] ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            <div className="brand-card full-width">
                                <div className="brand-card-header">
                                    <FileText size={20} />
                                    <h3>Tone Guidelines</h3>
                                </div>
                                <p>{data.tone_guidelines}</p>
                                <button
                                    className="copy-btn-inline"
                                    onClick={() => copyToClipboard(data.tone_guidelines, 'guidelines')}
                                >
                                    {copiedItems['guidelines'] ? <Check size={16} /> : <Copy size={16} />}
                                    {copiedItems['guidelines'] ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="footer">
                Powered by <span>Gemini AI</span> • Built with ❤️
            </footer>
        </div>
    );
}
