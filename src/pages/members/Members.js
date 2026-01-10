import { useState, useEffect } from 'react';
import FlipCard from '../../components/FlipCard';
import GlobalEffects from '../../components/effects/GlobalEffects';
import DualRealityTransition from '../../components/effects/DualRealityTransition';
import PixelSnow from '../../components/reactbits/PixelSnow';
import "./members.css";
import "./portal-button.css";

export default function Members() {
    const [isUpsideDown, setIsUpsideDown] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);

    // Manage body class for persistent theme state
    useEffect(() => {
        if (isUpsideDown) {
            document.body.classList.add('upside-down-active');
        } else {
            document.body.classList.remove('upside-down-active');
        }
    }, [isUpsideDown]);

    const toggleUpsideDown = () => {
        if (isFlipping) return;
        setIsFlipping(true);
    };

    const handlePhaseChange = (phase) => {
        if (phase === 'FLIP_POINT') {
            // Commit the state change exactly when world is inverted (hidden/90deg)
            setIsUpsideDown(prev => !prev);
        }
        if (phase === 'idle') {
            setIsFlipping(false);
        }
    };

    // HOD
    const hod = {
        name: "DR. VALLIAPPARAMAN",
        role: "HEAD OF DEPARTMENT",
        description: "Visionary leader with over 20 years of experience in AI and academic excellence.",
        linkedin: "https://linkedin.com"
    };

    // Staff Advisors
    const staffAdvisors = [
        {
            name: "SUDHA",
            role: "STAFF ADVISOR",
            description: "Dedicated mentor guiding students towards technical innovation and research.",
            linkedin: "https://linkedin.com"
        },
        {
            name: "AKSHAYA",
            role: "STAFF ADVISOR",
            description: "Expert in machine learning, fostering a culture of continuous learning.",
            linkedin: "https://linkedin.com"
        }
    ];

    // INTELLINA Coordinators
    const coordinators = [
        {
            name: "BALAMURALI",
            role: "INTELLINA COORDINATOR",
            description: "Driving force behind Intellina's events, ensuring seamless execution.",
            linkedin: "https://linkedin.com"
        },
        {
            name: "DIVYA BHARATHI",
            role: "INTELLINA COORDINATOR",
            description: "Creative strategist ensuring high engagement and impactful events.",
            linkedin: "https://linkedin.com"
        }
    ];

    // Committee Members
    const committeeMembers = [
        { name: "AAKASH KANNAH R V", role: "SECRETARY", description: "Leading the team with strategic vision.", linkedin: "#" },
        { name: "RANJITH D", role: "CHIEF STUDENT COORDINATOR", description: "Orchestrating student activities effectively.", linkedin: "#" },
        { name: "AATHITHYA G", role: "TREASURER", description: "Managing finances with precision.", linkedin: "#" },
        { name: "KAVIYAA N", role: "CAREER DIRECTOR", description: "Guiding career development initiatives.", linkedin: "#" },
        { name: "ARYA NAKSHATRA", role: "SOCIAL MEDIA LEAD", description: "Amplifying our digital presence.", linkedin: "#" },
        { name: "SACHIN J", role: "BOARD MEMBER", description: "Contributing to strategic planning.", linkedin: "#" },
        { name: "SARAN R", role: "BOARD MEMBER", description: "Supporting event logistics.", linkedin: "#" },
        { name: "MUKESH KUMAR", role: "BOARD MEMBER", description: "Ensuring operational efficiency.", linkedin: "#" },
        { name: "HARISH RAGAVENDHAR", role: "BOARD MEMBER", description: "Fostering community engagement.", linkedin: "#" },
        { name: "SAKTHIVEL M", role: "JOINT SECRETARY", description: "Assisting in administrative duties.", linkedin: "#" },
        { name: "SHARVESH ADITYA JI M B", role: "INNOVATION LEAD", description: "Spearheading new tech initiatives.", linkedin: "#" },
        { name: "NAVEENYA M", role: "JOINT TREASURER", description: "Helping manage club funds.", linkedin: "#" },
        { name: "YAATHAV A G", role: "DESIGN LEAD", description: "Crafting visual identity.", linkedin: "#" },
        { name: "PRIYA G", role: "PUBLIC RELATIONS OFFICER", description: "Building external relationships.", linkedin: "#" },
        { name: "RAJIVARTHINI R J", role: "BOARD MEMBER", description: "Active contributor to team goals.", linkedin: "#" },
        { name: "LALANTHIKA S", role: "BOARD MEMBER", description: "Supporting various club activities.", linkedin: "#" },
        { name: "ABINAYA S", role: "BOARD MEMBER", description: "Ensuring event success.", linkedin: "#" },
        { name: "HEMKUMAR R", role: "BOARD MEMBER", description: "Dedicated team player.", linkedin: "#" },
        { name: "ARIVU SELVAN S", role: "BOARD MEMBER", description: "Bringing fresh ideas to the table.", linkedin: "#" }
    ];

    // Scroll Animation Hook - Re-runs to ensure elements are caught
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-visible');
                    observer.unobserve(entry.target); // Run once per element
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: '0px 0px -50px 0px' // Offset to trigger slightly before bottom
        });

        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.scroll-hidden');
            elements.forEach(el => observer.observe(el));
        }, 100); // Small delay to ensure DOM is ready

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []); // Run once on mount

    return (
        <>
            <GlobalEffects />

            <DualRealityTransition
                isFlipping={isFlipping}
                isUpsideDown={isUpsideDown}
                onPhaseChange={handlePhaseChange}
            />

            {/* PixelSnow - Only in Upside Down mode on Members page */}
            {/* PixelSnow - Always mounted for smooth transition, visibility controlled via CSS */}
            <PixelSnow
                color="#ffffff"
                flakeSize={0.02}
                minFlakeSize={0.2}
                pixelResolution={2000}
                speed={0.3}
                density={0.2}
                brightness={1.0}
                variant="round"
                direction={180} // Reverse gravity logic
                className={`upside-down-snow ${isUpsideDown ? 'visible' : ''}`}
            />

            {/* Portal Button - Fixed on right side */}
            <button
                className={`portal-btn-fixed ${isFlipping ? 'locked' : ''}`}
                onClick={toggleUpsideDown}
                disabled={isFlipping}
                aria-label={isUpsideDown ? "Enter Reality" : "Enter Upside Down"}
            >
                {isUpsideDown ? "REALITY" : "VECNA"}
            </button>

            <div className={`members-container ${isFlipping ? 'flipping' : ''}`}>
                <div className="noise-overlay"></div>

                <header className="page-header scroll-hidden">
                    <h1 className="main-title">INTELLINA – EVENT TEAM</h1>
                    <p className="subtitle">DEPARTMENT OF AI & DATA SCIENCE</p>
                    <div className="title-divider"></div>
                </header>

                {/* HOD */}
                <section className="members-section">
                    <h2 className="section-title scroll-hidden">HEAD OF DEPARTMENT</h2>
                    <div className="members-grid single">
                        <div className="scroll-hidden">
                            <FlipCard
                                name={hod.name}
                                role={hod.role}
                                description={hod.description}
                                linkedin={hod.linkedin}
                                isUpsideDown={isUpsideDown}
                            />
                        </div>
                    </div>
                </section>

                {/* Staff Advisors */}
                <section className="members-section">
                    <h2 className="section-title scroll-hidden">STAFF ADVISORS</h2>
                    <div className="members-grid two-col">
                        {staffAdvisors.map((member, index) => (
                            <div key={index} className="scroll-hidden">
                                <FlipCard
                                    name={member.name}
                                    role={member.role}
                                    description={member.description}
                                    linkedin={member.linkedin}
                                    isUpsideDown={isUpsideDown}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* INTELLINA Coordinators */}
                <section className="members-section">
                    <h2 className="section-title scroll-hidden">INTELLINA COORDINATORS</h2>
                    <div className="members-grid two-col">
                        {coordinators.map((member, index) => (
                            <div key={index} className="scroll-hidden">
                                <FlipCard
                                    name={member.name}
                                    role={member.role}
                                    description={member.description}
                                    linkedin={member.linkedin}
                                    isUpsideDown={isUpsideDown}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Committee Members */}
                <section className="members-section">
                    <h2 className="section-title scroll-hidden">COMMITTEE MEMBERS</h2>
                    <div className="members-grid">
                        {committeeMembers.map((member, index) => (
                            <div key={index} className="scroll-hidden">
                                <FlipCard
                                    name={member.name}
                                    role={member.role}
                                    description={member.description}
                                    linkedin={member.linkedin}
                                    isUpsideDown={isUpsideDown}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
