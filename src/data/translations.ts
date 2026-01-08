
import { TIERS, SERVICES, SALON_MENU, TIME_SLOTS, TESTIMONIALS, MEMBERSHIPS, EXPERIENCE_STEPS, NOT_FOR_SERVICES, MANIFESTO, TRANSFORMATIONS, SANCTUARY_SPACES, HYGIENE_PROTOCOLS, CONCERNS, ARTISTS, SEASONAL_ADVICE } from './mockData';

export const translations = {
    en: {
        nav: {
            rituals: "Rituals",
            journey: "Journey",
            circle: "Circle",
            requestAccess: "Request Access",
            menu: "MENU"
        },
        hero: {
            intakeCap: "Daily Intake Capped at 8",
            titleLine1: "We Engineer The Face",
            titleLine2: "You Show The World",
            subtitle: "The only clinical-grade aesthetic suite operating on a strict invitation basis.",
            meta: "Medical-Grade Hygiene • Absolute Privacy • Biometric Framing",
            auditBtn: "Start Biometric Audit",
            loginBtn: "Member Login",
            waitlist: "Waitlist: Currently 3 Weeks for non-members",
            scroll: "SCROLL TO AUDIT STANDARDS"
        },
        auth: {
            title: "Sovereign Access",
            subtitle: "Enter Your Private Key",
            placeholder: "ACCESS KEY",
            button: "AUTHENTICATE",
            warning: "Attempting unauthorized access triggers a biological ban."
        },
        dashboard: {
            welcome: "Welcome back, Partner",
            status: "Level Member",
            valet: "VALET SUITE OCCUPANCY",
            nextRitual: "Next Ritual",
            timeToArrival: "TIME TO ARRIVAL",
            prescribed: "PRESCRIBED FOR YOU",
            suggestion: "Intelligence Suggestion",
            basedOn: "Based on your clinical concerns",
            scheduleBtn: "Schedule Prescribed Ritual",
            passport: "Digital Health Passport",
            recordsBtn: "View Clinical Records",
            pdfBtn: "Download PDF",
            archive: "ARCHIVE",
            result: "Result:",
            compatibility: "CURATED COMPATIBILITY",
            circlePrivilege: "The Circle Privilege",
            level: "LEVEL:",
            locked: "LOCKED",
            upgradeTitle: "Isolation Suite Upgrade",
            upgradeDesc: "Unlock the glass-morph sensory isolation unit for your next ritual. Sovereign tier required.",
            requestUpgrade: "Request Tier Elevation",
            conciergeTitle: "Concierge Personal Chat",
            chatPlaceholder: "Direct request to your concierge...",
            send: "SEND"
        },
        magicMirror: {
            title: "Magic Mirror",
            subtitle: "4K Spectral Beauty Audit Active",
            alignment: "ALIGNMENT REQUIRED",
            startBtn: "Capture My Radiance",
            simulateBtn: "Simulate Biometric Scan",
            calculating: "Calculating...",
            complete: "Diagnosis Complete",
            deepScan: "Deep Scan Analytics",
            scanning: "Scanning epidermal topology for micro-deficits...",
            issueFound: "Primary biological inefficiency identified.",
            hydration: "LUMINOUS HYDRATION",
            radiance: "RADIANCE INDEX",
            elasticity: "ELASTICITY CORE",
            critical: "CRITICAL DEFICIT",
            formulating: "Formulating protocol...",
            recommended: "Recommended Protocol",
            designTransform: "Design Your Transformation",
            customizing: "Customizing your unique beauty architecture",
            initiate: "INITIATE PROTOCOL GENERATION"
        },
        landing: {
            exclusionTitle: "The Exclusion Criteria",
            exclusionDesc: "To maintain surgical-grade standards and privacy for our members, we strictly refuse service to 64% of applicants.",
            philosophy: "The Philosophy",
            philosophyQuote: "\"We do not sell 'pampering'. We execute a <span style=\"color: var(--color-brand); font-style: italic\">biological strategy</span> for your presence.\"",
            act1: "Act I: Sensory Architecture",
            protocol: "The Protocol",
            act2: "Act II: Clinical Proof",
            verification: "The Verification",
            act3: "Act III: The Transformation",
            gallery: "The Gallery",
            act4: "Act IV: The Bridal Command",
            bridal: "The Bridal Command"
        },
        serviceMenu: {
            label: "Clinical Protocols",
            title: "The Treatment Menu",
            contextDesc: "All protocols in this category require a preliminary biometric scan. Executed exclusively by Senior Directors.",
            tag1: "MEDICALLY CLEARED",
            tag2: "ISO 9001",
            noteLabel: "Note:",
            noteText: "Basic maintenance services (Standard Waxing, Threading) are not listed publicly as they do not meet our Ritual threshold. These are available exclusively to Members within their private suites."
        },
        sensoryJourney: {
            label: "Sensory Architecture",
            steps: [
                {
                    id: 'disconnect',
                    title: "1. The Isolation",
                    description: "Begin in our acoustic-dampened suites. Neuro-aesthetic frequencies lower heart-rate variability, forcing a biological disconnect from external chaos."
                },
                {
                    id: 'elixir',
                    title: "2. The Activation",
                    description: "Epidermal priming via our 24k Gold Serum. We infuse bio-available saffron peptides to trigger immediate cellular luminosity before any pigment is applied."
                },
                {
                    id: 'touch',
                    title: "3. The Calibration",
                    description: "Precision application. Our master artists do not 'paint'; they sculpt facial geometry using calculated light and shadow ratios."
                },
                {
                    id: 'reveal',
                    title: "4. The Verification",
                    description: "The moment of cognitive recognition. Use the mirror to verify the biometric shift in your radiance and structural presence."
                }
            ]
        },
        bridal: {
            zeroFailure: "Zero-Failure Protocol",
            sovereignEvent: "Sovereign Event Protocol",
            visibilityRisk: "Public visibility introduces uncontrolled variables. We eliminate them.",
            riskMitigation: "This is not beauty preparation. This is risk mitigation for your most documented lifecycle event.",
            requestClearance: "REQUEST OPERATIONAL CLEARANCE",
            timeline: [
                {
                    id: 'audit',
                    phase: 'Mission Phase I',
                    time: 'T-Minus 6 Months',
                    title: 'Structural Risk Audit',
                    desc: 'Comprehensive biometric analysis to identify failure points. We map cortisol impact on pore size and test follicular tensile strength against styling stress.',
                    tags: ['Failure Analysis', 'Cortisol Mapping', 'Base Stabilization']
                },
                {
                    id: 'correction',
                    phase: 'Mission Phase II',
                    time: 'T-Minus 3 Months',
                    title: 'Deficit Rectification',
                    desc: 'Aggressive intervention window. We deploy laser surfacing and bond-building infusions to reverse structural liabilities before the high-stress period.',
                    tags: ['Lipid Barrier Seal', 'Texture Smoothing', 'Clinical Resurfacing']
                },
                {
                    id: 'simulation',
                    phase: 'Mission Phase III',
                    time: 'T-Minus 1 Month',
                    title: 'Environmental Stress Test',
                    desc: 'Full-variable simulation. We subject the design to 90% humidity and 4K flash strobing to verify pigment durability against thermal shifts.',
                    tags: ['Flash Simulation', 'Thermal Lock', 'Water-Resistance Audit']
                },
                {
                    id: 'execution',
                    phase: 'Mission Phase IV',
                    time: 'T-Minus 0 Hours',
                    title: 'Sovereign Execution',
                    desc: 'Zero-failure operational command. A sterile, biologically controlled environment ensuring your visual asset remains impermeable for 12+ hours.',
                    tags: ['Sterile Field', 'Zero-G Draping', 'Hourly Preservation']
                }
            ]
        },
        gallery: {
            initial: "INITIAL AUDIT",
            post: "POST-PROTOCOL",
            resultLabel: "Quantifiable Result",
            protocol: "Protocol"
        },
        virtualMakeover: {
            badge: "BETA SIMULATION",
            subtitle: "Act III: Predictive Engine",
            title: "Biometric Simulation",
            quote: "\"Visualize the architecture of your enhancement before the first touch.\"",
            step1: "01. Select Canvas",
            step2: "02. Select Ritual",
            generating: "Generating",
            livePreview: "LIVE PREVIEW",
            panelTitle: "Projected Enhancement",
            metric1: "Luminosity Index",
            metric2: "Structural Symmetry",
            noteLabel: "CLINICAL NOTE:",
            ctaTitle: "Claim This Ritual",
            ctaDesc: "Apply this exact protocol to your next appointment.",
            bookBtn: "BOOK",
            looks: {
                natural: { name: "Look: Radiance", desc: "Enhances natural luminosity; focuses on hydration markers and skin barrier reinforcement." },
                bridal: { name: "Look: Royal", desc: "Structured contouring for high-definition capture; optimizes symmetry and feature definition." },
                party: { name: "Look: High-Impact", desc: "Maximizes contrast for low-light environments; emphasizes ocular and labial focal points." },
                engagement: { name: "Look: Soft Focus", desc: "Diffused peach tones for daylight balance; creates a soft-focus epidermal effect." }
            },
            models: {
                fair: "Reference: Fair",
                wheatish: "Reference: Medium",
                deep: "Reference: Deep"
            }
        },
        booking: {
            title: "Access Petition",
            legalName: "LEGAL NAME",
            contact: "SECURE CONTACT",
            concern: "PRIMARY BIOLOGICAL CONCERN",
            referral: "REFERRAL SOURCE",
            selectObjective: "Select Objective...",
            disclaimer: "By petitioning, you agree to a biometric identity verification and adhere to our uncompromised sanitation protocols. Access is not guaranteed.",
            submitButton: "LODGE ACCESS PETITION",
            successTitle: "Petition Received",
            successMsg: "Your request has been securely lodged. Our Artist-in-Chief will review your diagnostic profile and contact you within 4 hours to confirm your sanctuary window.",
            returnButton: "Return to Collection"
        },
        finalCta: {
            title: "Begin The Audit",
            desc: "Your biometrics will be analyzed to determine if you qualify for a Sovereign Membership.",
            button: "Start Application"
        },
        data: {
            TIERS,
            SERVICES,
            SALON_MENU,
            TIME_SLOTS,
            TESTIMONIALS,
            MEMBERSHIPS,
            EXPERIENCE_STEPS,
            NOT_FOR_SERVICES,
            MANIFESTO,
            TRANSFORMATIONS,
            SANCTUARY_SPACES,
            HYGIENE_PROTOCOLS,
            CONCERNS,
            ARTISTS,
            SEASONAL_ADVICE
        }
    },
    hi: {
        nav: {
            rituals: "संस्कार (Rituals)",
            journey: "यात्रा (Journey)",
            circle: "विशेषाधिकार (Circle)",
            requestAccess: "प्रवेश अनुरोध",
            menu: "मेनू"
        },
        hero: {
            intakeCap: "दैनिक प्रवेश केवल 8 तक सीमित",
            titleLine1: "हम आपके चेहरे को",
            titleLine2: "नया रूप देते हैं",
            subtitle: "एकमात्र क्लिनिकल-ग्रेड एस्थेटिक सुइट जो सख्त निमंत्रण आधार पर संचालित होता है।",
            meta: "चिकित्सा-ग्रेड स्वच्छता • पूर्ण गोपनीयता • बायोमेट्रिक फ्रेमिंग",
            auditBtn: "बायोमेट्रिक ऑडिट शुरू करें",
            loginBtn: "सदस्य लॉगिन",
            waitlist: "प्रतीक्षा सूची: वर्तमान में गैर-सदस्यों के लिए 3 सप्ताह",
            scroll: "ऑडिट मानकों के लिए स्क्रॉल करें"
        },
        auth: {
            title: "विशेष अधिकार प्रवेश",
            subtitle: "अपनी निजी कुंजी दर्ज करें",
            placeholder: "प्रवेश कुंजी",
            button: "प्रमाणित करें",
            warning: "अनधिकृत पहुंच का प्रयास जैविक प्रतिबंध को ट्रिगर करता है।"
        },
        dashboard: {
            welcome: "वापसी पर स्वागत है, पार्टनर",
            status: "स्तरीय सदस्य",
            valet: "वैलेट सुइट अधिभोग",
            nextRitual: "अगला संस्कार",
            timeToArrival: "आगमन का समय",
            prescribed: "आपके लिए निर्धारित",
            suggestion: "बुद्धिमत्ता सुझाव",
            basedOn: "आपकी नैदानिक चिंताओं के आधार पर",
            scheduleBtn: "निर्धारित संस्कार बुक करें",
            passport: "डिजिटल स्वास्थ्य पासपोर्ट",
            recordsBtn: "नैदानिक रिकॉर्ड देखें",
            pdfBtn: "पीडीएफ डाउनलोड करें",
            archive: "पुरालेख",
            result: "परिणाम:",
            compatibility: "क्यूरेटेड संगतता",
            circlePrivilege: "सर्कल विशेषाधिकार",
            level: "स्तर:",
            locked: "लॉक किया गया",
            upgradeTitle: "आइसोलेशन सुइट अपग्रेड",
            upgradeDesc: "अपने अगले संस्कार के लिए ग्लास-मॉर्फ सेंसरी आइसोलेशन यूनिट अनलॉक करें। सॉवरेन स्तर आवश्यक है।",
            requestUpgrade: "स्तर उन्नयन का अनुरोध करें",
            conciergeTitle: "कन्सीयर्ज व्यक्तिगत चैट",
            chatPlaceholder: "अपने कन्सीयर्ज से सीधा अनुरोध करें...",
            send: "भेजें"
        },
        magicMirror: {
            title: "मैजिक मिरर",
            subtitle: "4K स्पेक्ट्रल ब्यूटी ऑडिट सक्रिय",
            alignment: "संरेखण आवश्यक",
            startBtn: "मेरी चमक कैप्चर करें",
            simulateBtn: "बायोमेट्रिक स्कैन अनुकरण करें",
            calculating: "गणना कर रहा है...",
            complete: "निदान पूर्ण",
            deepScan: "गहरा स्कैन एनालिटिक्स",
            scanning: "सूक्ष्म कमियों के लिए एपिडर्मल टोपोलॉजी स्कैनिंग...",
            issueFound: "प्राथमिक जैविक अक्षमता की पहचान की गई।",
            hydration: "चमकदार जलयोजन",
            radiance: "चमक सूचकांक",
            elasticity: "लोच कोर",
            critical: "गंभीर कमी",
            formulating: "प्रोटोकॉल तैयार कर रहा है...",
            recommended: "अनुशंसित प्रोटोकॉल",
            designTransform: "अपना परिवर्तन डिज़ाइन करें",
            customizing: "अपनी अनूठी सुंदरता वास्तुकला को अनुकूलित करना",
            initiate: "प्रोटोकॉल निर्माण शुरू करें"
        },
        landing: {
            exclusionTitle: "बहिष्करण मानदंड",
            exclusionDesc: "हमारे सदस्यों के लिए सर्जिकल-ग्रेड मानकों और गोपनीयता को बनाए रखने के लिए, हम 64% आवेदकों को सेवा देने से सख्ती से इनकार करते हैं।",
            philosophy: "दर्शन",
            philosophyQuote: "\"हम 'लाड़-प्यार' नहीं बेचते। हम आपकी उपस्थिति के लिए एक <span style=\"color: var(--color-brand); font-style: italic\">जैविक रणनीति</span> निष्पादित करते हैं।\"",
            act1: "अंक I: संवेदी वास्तुकला",
            protocol: "प्रोटोकॉल",
            act2: "अंक II: नैदानिक प्रमाण",
            verification: "सत्यापन",
            act3: "अंक III: परिवर्तन",
            gallery: "गैलरी",
            act4: "अंक IV: वैवाहिक आदेश",
            bridal: "वैवाहिक आदेश"
        },
        serviceMenu: {
            label: "नेदानिक प्रोटोकॉल",
            title: "उपचार मेनू",
            contextDesc: "इस श्रेणी के सभी प्रोटोकॉल के लिए प्रारंभिक बायोमेट्रिक स्कैन की आवश्यकता होती है। विशेष रूप से वरिष्ठ निदेशकों द्वारा निष्पादित।",
            tag1: "चिकित्सकीय रूप से स्पष्ट",
            tag2: "आईएसओ 9001",
            noteLabel: "नोट:",
            noteText: "बुनियादी रखरखाव सेवाएं (मानक वैक्सिंग, थ्रेडिंग) सार्वजनिक रूप से सूचीबद्ध नहीं हैं क्योंकि वे हमारे संस्कार सीमा को पूरा नहीं करती हैं। ये विशेष रूप से सदस्यों के लिए उनके निजी सुइट के भीतर उपलब्ध हैं।"
        },
        sensoryJourney: {
            label: "संवेदी वास्तुकला",
            steps: [
                {
                    id: 'disconnect',
                    title: "1. अलगाव (The Isolation)",
                    description: "हमारे ध्वनिक-नम सुइट्स में शुरुआत करें। न्यूरो-सौंदर्य आवृत्तियाँ हृदय गति परिवर्तनशीलता को कम करती हैं, बाहरी अराजकता से जैविक वियोग को मजबूर करती हैं।"
                },
                {
                    id: 'elixir',
                    title: "2. सक्रियण (The Activation)",
                    description: "हमारे 24k गोल्ड सीरम के माध्यम से एपिडर्मल प्राइमिंग। हम किसी भी वर्णक को लागू करने से पहले तत्काल सेलुलर चमक को ट्रिगर करने के लिए जैव-उपलब्ध केसर पेप्टाइड्स को संक्रमित करते हैं।"
                },
                {
                    id: 'touch',
                    title: "3. अंशांकन (The Calibration)",
                    description: "सटीक अनुप्रयोग। हमारे मास्टर कलाकार 'पेंट' नहीं करते हैं; वे गणना किए गए प्रकाश और छाया अनुपात का उपयोग करके चेहरे की ज्यामिति को तराशते हैं।"
                },
                {
                    id: 'reveal',
                    title: "4. सत्यापन (The Verification)",
                    description: "संज्ञानात्मक मान्यता का क्षण। अपनी चमक और संरचनात्मक उपस्थिति में बायोमेट्रिक बदलाव को सत्यापित करने के लिए दर्पण का उपयोग करें।"
                }
            ]
        },
        bridal: {
            zeroFailure: "शून्य-विफलता प्रोटोकॉल",
            sovereignEvent: "संप्रभु घटना प्रोटोकॉल",
            visibilityRisk: "सार्वजनिक दृश्यता अनियंत्रित चर पेश करती है। हम उन्हें समाप्त करते हैं।",
            riskMitigation: "यह सौंदर्य की तैयारी नहीं है। यह आपके सबसे प्रलेखित जीवनचक्र घटना के लिए जोखिम शमन है।",
            requestClearance: "परिचालन निकासी का अनुरोध करें",
            timeline: [
                {
                    id: 'audit',
                    phase: 'मिशन चरण I',
                    time: 'टी-माइनस 6 महीने',
                    title: 'संरचनात्मक जोखिम ऑडिट',
                    desc: 'विफलता बिंदुओं की पहचान करने के लिए व्यापक बायोमेट्रिक विश्लेषण। हम रोम छिद्रों के आकार पर कोर्टिसोल प्रभाव का नक्शा बनाते हैं और स्टाइलिंग तनाव के खिलाफ कूपिक तन्यता ताकत का परीक्षण करते हैं।',
                    tags: ['विफलता विश्लेषण', 'कोर्टिसोल मैपिंग', 'आधार स्थिरीकरण']
                },
                {
                    id: 'correction',
                    phase: 'मिशन चरण II',
                    time: 'टी-माइनस 3 महीने',
                    title: 'कमी सुधार',
                    desc: 'आक्रामक हस्तक्षेप विंडो। हम उच्च तनाव की अवधि से पहले संरचनात्मक देनदारियों को उलटने के लिए लेजर रीफ्रेसिंग और बॉन्ड-बिल्डिंग इन्फ्यूजन तैनात करते हैं।',
                    tags: ['लिपिड बैरियर सील', 'बनावट चौरसाई', 'नैदानिक ​​पुनरुत्थान']
                },
                {
                    id: 'simulation',
                    phase: 'मिशन चरण III',
                    time: 'टी-माइनस 1 महीना',
                    title: 'पर्यावरण तनाव परीक्षण',
                    desc: 'पूर्ण-चर सिमुलेशन। हम थर्मल बदलावों के खिलाफ वर्णक स्थायित्व को सत्यापित करने के लिए डिज़ाइन को 90% आर्द्रता और 4K फ्लैश स्ट्रोबिंग के अधीन करते हैं।',
                    tags: ['फ्लैश सिमुलेशन', 'थर्मल लॉक', 'जल-प्रतिरोध ऑडिट']
                },
                {
                    id: 'execution',
                    phase: 'मिशन चरण IV',
                    time: 'टी-माइनस 0 घंटे',
                    title: 'संप्रभु निष्पादन',
                    desc: 'शून्य-विफलता परिचालन कमांड। एक बाँझ, जैविक रूप से नियंत्रित वातावरण यह सुनिश्चित करता है कि आपकी दृश्य संपत्ति 12+ घंटों के लिए अभेद्य बनी रहे।',
                    tags: ['बाँझ क्षेत्र', 'जीरो-जी ड्रेपिंग', 'प्रति घंटा संरक्षण']
                }
            ]
        },
        gallery: {
            initial: "प्रारंभिक ऑडिट",
            post: "प्रोटोकॉल के बाद",
            resultLabel: "परिमाणवाचक परिणाम",
            protocol: "प्रोटोकॉल"
        },
        virtualMakeover: {
            badge: "बीटा सिमुलेशन",
            subtitle: "अंक III: भविष्य कहनेवाला इंजन",
            title: "बायोमेट्रिक सिमुलेशन",
            quote: "\"पहले स्पर्श से पहले अपने सुधार की वास्तुकला की कल्पना करें।\"",
            step1: "01. कैनवास चुनें",
            step2: "02. संस्कार चुनें",
            generating: "उत्पन्न हो रहा है",
            livePreview: "लाइव पूर्वावलोकन",
            panelTitle: "प्रक्षेपित वृद्धि",
            metric1: "चमक सूचकांक",
            metric2: "संरचनात्मक समरूपता",
            noteLabel: "नैदानिक नोट:",
            ctaTitle: "इस संस्कार का दावा करें",
            ctaDesc: "इस सटीक प्रोटोकॉल को अपनी अगली नियुक्ति पर लागू करें।",
            bookBtn: "बुक",
            looks: {
                natural: { name: "लुक: रेडियंस", desc: "प्राकृतिक चमक को बढ़ाता है; जलयोजन मार्कर और त्वचा बाधा सुदृढीकरण पर केंद्रित है।" },
                bridal: { name: "लुक: रॉयल", desc: "उच्च-परिभाषा कैप्चर के लिए संरचित समोच्च; समरूपता और सुविधा परिभाषा का अनुकूलन करता है।" },
                party: { name: "लुक: हाई-इम्पैक्ट", desc: "कम रोशनी वाले वातावरण के लिए कंट्रास्ट को अधिकतम करता है; ओकुलर और लेबियल फोकल बिंदुओं पर जोर देता है।" },
                engagement: { name: "लुक: सॉफ्ट फोकस", desc: "दिन के उजाले संतुलन के लिए विसरित आड़ू टोन; एक सॉफ्ट-फोकस एपिडर्मल प्रभाव बनाता है।" }
            },
            models: {
                fair: "संदर्भ: गोरा",
                wheatish: "संदर्भ: मध्यम",
                deep: "संदर्भ: गहरा"
            }
        },
        booking: {
            title: "प्रवेश याचिका",
            legalName: "कानूनी नाम",
            contact: "सुरक्षित संपर्क",
            concern: "प्राथमिक जैविक चिंता",
            referral: "संदर्भ स्रोत",
            selectObjective: "उद्देश्य चुनें...",
            disclaimer: "याचिका दायर करके, आप एक बायोमेट्रिक पहचान सत्यापन के लिए सहमत होते हैं और हमारे असम्बद्ध स्वच्छता प्रोटोकॉल का पालन करते हैं। प्रवेश की गारंटी नहीं है।",
            submitButton: "प्रवेश याचिका दर्ज करें",
            successTitle: "याचिका प्राप्त हुई",
            successMsg: "आपका अनुरोध सुरक्षित रूप से दर्ज कर लिया गया है। हमारे आर्टिस्ट-इन-चीफ आपके डायग्नोस्टिक प्रोफाइल की समीक्षा करेंगे और आपकी सैंक्चुअरी विंडो की पुष्टि करने के लिए 4 घंटे के भीतर आपसे संपर्क करेंगे।",
            returnButton: "संग्रह पर वापस जाएँ"
        },
        finalCta: {
            title: "ऑडिट शुरू करें",
            desc: "यह निर्धारित करने के लिए कि क्या आप सॉवरेन सदस्यता के लिए अर्हता प्राप्त करते हैं, आपके बायोमेट्रिक्स का विश्लेषण किया जाएगा।",
            button: "आवेदन शुरू करें"
        },
        data: {
            TIERS,
            SERVICES,
            SALON_MENU,
            TIME_SLOTS,
            TESTIMONIALS,
            MEMBERSHIPS,
            EXPERIENCE_STEPS,
            NOT_FOR_SERVICES,
            MANIFESTO,
            TRANSFORMATIONS,
            SANCTUARY_SPACES,
            HYGIENE_PROTOCOLS,
            CONCERNS,
            ARTISTS,
            SEASONAL_ADVICE
        }
    }
};
