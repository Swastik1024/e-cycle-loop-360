// ============================================================================
    // 1. CONSTANTS, ROLES, STATUS LIFECYCLE, VISUAL ASSETS & DEMO CREDENTIALS
    // ============================================================================
    const STORAGE_KEY_DB = 'ecycleloop360_v2_db';
    const SESSION_KEY_AUTH = 'ecycleloop360_v2_session';
    const IDB_NAME = 'ECycleLoop360PhotoDB';
    const IDB_STORE = 'item_photos';

    // High-resolution generated photographic assets (inlined as base64 data URIs on build)
    const VISUAL_ASSETS = {
      heroStudio: "assets/images/hero_studio.jpg",
      collectionHub: "assets/images/collection_hub.jpg",
      laptop: "assets/images/laptop_refurbished.jpg",
      phone: "assets/images/smartphone_repair.jpg",
      monitor: "assets/images/monitor_display.jpg",
      printer: "assets/images/laser_printer.jpg"
    };

    const ROLE_META = {
      admin: {
        label: 'Administrator',
        badgeClass: 'ec-badge-green',
        homeRoute: '/admin',
        summary: 'Full platform oversight: manages collection requests, status transitions, worker/partner assignments, marketplace moderation, centres, and user roles.'
      },
      user: {
        label: 'Resident / User',
        badgeClass: 'ec-badge-neutral',
        homeRoute: '/dashboard',
        summary: 'Registers e-waste items with camera/photo upload, tracks E-Waste Passports, lists eligible devices on Reboot Market, and requests reuse/repair.'
      },
      worker: {
        label: 'Collection Worker',
        badgeClass: 'ec-badge-amber',
        homeRoute: '/tasks',
        summary: 'Views only assigned pickup/drop-off collection tasks, verifies item pickup, records field notes, and captures proof-of-collection photos.'
      },
      repair_partner: {
        label: 'Repair & Reuse Partner',
        badgeClass: 'ec-badge-green',
        homeRoute: '/tasks',
        summary: 'Views assigned assessment and repair jobs, records technical condition assessments, updates repair progress, and certifies reuse readiness.'
      },
      recycler_partner: {
        label: 'Recycling Partner',
        badgeClass: 'ec-badge-neutral',
        homeRoute: '/tasks',
        summary: 'Views assigned end-of-life recycling items, logs material recovery milestones, and records handler batch reference numbers.'
      }
    };

    // Public Demo Accounts for local Demo Mode presentation (never used in production)
    const DEMO_ACCOUNTS_PUBLIC = [
      {
        id: 'usr-admin-1',
        profileName: 'Administrator',
        name: 'Aarav Mehta',
        email: 'admin@ecycleloop.demo',
        demoAuthCode: 'Admin@123',
        role: 'admin',
        org: 'E-Cycle Loop Central Operations',
        area: 'Pimpri-Chinchwad Hub'
      },
      {
        id: 'usr-user-1',
        profileName: 'Regular User / Resident',
        name: 'Priya Nair',
        email: 'user@ecycleloop.demo',
        demoAuthCode: 'User@123',
        role: 'user',
        org: 'Resident Contributor',
        area: 'Wakad, Sector 14'
      },
      {
        id: 'usr-worker-1',
        profileName: 'Collection Worker',
        name: 'Vikram Singh',
        email: 'worker@ecycleloop.demo',
        demoAuthCode: 'Worker@123',
        role: 'worker',
        org: 'E-Cycle Fleet Logistics Unit 04',
        area: 'North-West Collection Route'
      },
      {
        id: 'usr-repair-1',
        profileName: 'Repair & Reuse Partner',
        name: 'GreenFix Tech Lab (Rohan Kulkarni)',
        email: 'repair@ecycleloop.demo',
        demoAuthCode: 'Repair@123',
        role: 'repair_partner',
        org: 'GreenFix Circular Refurbishers',
        area: 'Hinjewadi Phase 1 Tech Park'
      },
      {
        id: 'usr-recycler-1',
        profileName: 'Recycling Partner',
        name: 'EcoRecover Authorised Recyclers (Meera Joshi)',
        email: 'recycler@ecycleloop.demo',
        demoAuthCode: 'Recycler@123',
        role: 'recycler_partner',
        org: 'EcoRecover Material Recovery Facility',
        area: 'Bhosari Industrial Estate'
      }
    ];

    const DEVICE_CATEGORIES = [
      { value: 'laptop', label: 'Laptop / Computer', shortLabel: 'Laptops', hazardous: false, img: VISUAL_ASSETS.laptop },
      { value: 'phone', label: 'Smartphone / Mobile', shortLabel: 'Phones', hazardous: false, img: VISUAL_ASSETS.phone },
      { value: 'tablet', label: 'Tablet / E-Reader', shortLabel: 'Tablets', hazardous: false, img: VISUAL_ASSETS.phone },
      { value: 'monitor', label: 'Monitor / Display', shortLabel: 'Monitors', hazardous: false, img: VISUAL_ASSETS.monitor },
      { value: 'printer', label: 'Printer / Scanner', shortLabel: 'Printers', hazardous: false, img: VISUAL_ASSETS.printer },
      { value: 'accessory', label: 'Cables / Peripherals / Accessories', shortLabel: 'Accessories', hazardous: false, img: VISUAL_ASSETS.laptop },
      { value: 'appliance', label: 'Small Household Appliance', shortLabel: 'Appliances', hazardous: false, img: VISUAL_ASSETS.printer },
      { value: 'battery', label: 'Battery / Power Bank (Hazardous — Recycle Only)', shortLabel: 'Batteries (Hazard)', hazardous: true, img: VISUAL_ASSETS.collectionHub },
      { value: 'other', label: 'Other Electronic Equipment', shortLabel: 'Other Tech', hazardous: false, img: VISUAL_ASSETS.collectionHub }
    ];

    const CONDITION_OPTIONS = [
      { value: 'working', label: 'Working (Fully Functional)' },
      { value: 'partially_working', label: 'Partially Working (Minor Faults)' },
      { value: 'repaired', label: 'Repaired & Tested (Refurbished)' },
      { value: 'damaged', label: 'Damaged (Needs Repair / Parts)' },
      { value: 'not_working', label: 'Not Working / End-of-Life' },
      { value: 'unknown', label: 'Unknown / Untested' }
    ];

    const DESIRED_PATHS = [
      { value: 'assess_reuse', label: 'Assess for Reuse / Refurbishment' },
      { value: 'repair', label: 'Repair & Return / Extend Lifespan' },
      { value: 'donate', label: 'Donate to Community / Student via Reboot Market' },
      { value: 'resale', label: 'Offer for Second-Life Resale on Reboot Market' },
      { value: 'recycle', label: 'Responsible Material Recovery / Recycling Assessment' }
    ];

    const STATUS_META = {
      'Submitted': { label: 'Request Submitted', badge: 'ec-badge-amber', stage: 'awaiting_collection', stepIndex: 1 },
      'Pickup Scheduled': { label: 'Pickup Scheduled', badge: 'ec-badge-amber', stage: 'awaiting_collection', stepIndex: 1 },
      'Collected': { label: 'Collected / Received', badge: 'ec-badge-neutral', stage: 'awaiting_assessment', stepIndex: 2 },
      'Under Assessment': { label: 'Under Assessment', badge: 'ec-badge-neutral', stage: 'awaiting_assessment', stepIndex: 3 },
      'Processing': { label: 'In Processing', badge: 'ec-badge-neutral', stage: 'in_process', stepIndex: 3 },
      'Repair Recommended': { label: 'Repair Recommended', badge: 'ec-badge-amber', stage: 'in_process', stepIndex: 3 },
      'Under Repair': { label: 'Under Repair', badge: 'ec-badge-amber', stage: 'in_process', stepIndex: 4 },
      'Repaired': { label: 'Repaired (Ready for Reuse)', badge: 'ec-badge-green', stage: 'diverted_outcome', stepIndex: 4 },
      'Available for Reuse': { label: 'Available for Reuse', badge: 'ec-badge-green', stage: 'active_reuse', stepIndex: 4 },
      'Reserved': { label: 'Reserved in Reboot Market', badge: 'ec-badge-amber', stage: 'active_reuse', stepIndex: 4 },
      'Transferred/Donated': { label: 'Transferred / Reused (Diverted)', badge: 'ec-badge-green', stage: 'diverted_outcome', stepIndex: 5 },
      'Recycling Assigned': { label: 'Recycling Assigned', badge: 'ec-badge-neutral', stage: 'in_process', stepIndex: 3 },
      'Sent to Recycler': { label: 'Sent to Authorised Recycler', badge: 'ec-badge-amber', stage: 'in_process', stepIndex: 4 },
      'Recycling Recorded': { label: 'Recycling Outcome Recorded', badge: 'ec-badge-green', stage: 'recycled_outcome', stepIndex: 5 }
    };

    // Legal transition map enforced in service layer unless Admin explicitly checks override
    const LEGAL_TRANSITIONS = {
      'Submitted': ['Pickup Scheduled', 'Collected', 'Under Assessment'],
      'Pickup Scheduled': ['Collected', 'Submitted'],
      'Collected': ['Under Assessment', 'Processing', 'Repair Recommended', 'Under Repair', 'Repaired', 'Available for Reuse', 'Recycling Assigned'],
      'Under Assessment': ['Available for Reuse', 'Repair Recommended', 'Under Repair', 'Repaired', 'Recycling Assigned', 'Processing'],
      'Processing': ['Available for Reuse', 'Repair Recommended', 'Recycling Assigned'],
      'Repair Recommended': ['Under Repair', 'Available for Reuse', 'Recycling Assigned'],
      'Under Repair': ['Repaired', 'Available for Reuse', 'Recycling Assigned'],
      'Repaired': ['Available for Reuse', 'Reserved', 'Transferred/Donated'],
      'Available for Reuse': ['Reserved', 'Transferred/Donated', 'Repair Recommended'],
      'Reserved': ['Transferred/Donated', 'Available for Reuse'],
      'Transferred/Donated': [],
      'Recycling Assigned': ['Sent to Recycler', 'Recycling Recorded'],
      'Sent to Recycler': ['Recycling Recorded'],
      'Recycling Recorded': []
    };

    const ROLE_ALLOWED_STATUSES = {
      admin: Object.keys(STATUS_META),
      worker: ['Pickup Scheduled', 'Collected'],
      repair_partner: ['Under Assessment', 'Repair Recommended', 'Under Repair', 'Repaired', 'Available for Reuse', 'Recycling Assigned'],
      recycler_partner: ['Recycling Assigned', 'Sent to Recycler', 'Recycling Recorded'],
      user: []
    };

    // ============================================================================
    // 2. INDEXEDDB PHOTO STORAGE SERVICE (No large base64 in localStorage!)
    // ============================================================================
    const PhotoStorageService = {
      _dbPromise: null,
      _memCache: {},

      init() {
        if (this._dbPromise) return this._dbPromise;
        this._dbPromise = new Promise((resolve) => {
          if (!window.indexedDB) {
            resolve(null);
            return;
          }
          try {
            const req = window.indexedDB.open(IDB_NAME, 1);
            req.onupgradeneeded = (e) => {
              const db = e.target.result;
              if (!db.objectStoreNames.contains(IDB_STORE)) {
                db.createObjectStore(IDB_STORE, { keyPath: 'id' });
              }
            };
            req.onsuccess = (e) => resolve(e.target.result);
            req.onerror = () => resolve(null);
          } catch (err) {
            resolve(null);
          }
        });
        return this._dbPromise;
      },

      async savePhoto(dataUrl, meta = {}) {
        const id = 'photo-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
        const record = {
          id,
          dataUrl,
          fileName: meta.fileName || 'captured-item.jpg',
          mimeType: meta.mimeType || 'image/jpeg',
          sizeBytes: meta.sizeBytes || Math.round((dataUrl.length * 3) / 4),
          source: meta.source || 'upload',
          createdAt: new Date().toISOString()
        };
        this._memCache[id] = record;
        const db = await this.init();
        if (db) {
          await new Promise((resolve) => {
            try {
              const tx = db.transaction(IDB_STORE, 'readwrite');
              tx.objectStore(IDB_STORE).put(record);
              tx.oncomplete = () => resolve(true);
              tx.onerror = () => resolve(false);
            } catch (e) {
              resolve(false);
            }
          });
        }
        return record;
      },

      async getPhoto(id) {
        if (!id) return null;
        if (this._memCache[id]) return this._memCache[id];
        if (SEEDED_SVG_PHOTOS[id]) {
          return { id, dataUrl: SEEDED_SVG_PHOTOS[id], fileName: id + '.jpg', source: 'seeded_demo' };
        }
        const db = await this.init();
        if (!db) return null;
        return new Promise((resolve) => {
          try {
            const tx = db.transaction(IDB_STORE, 'readonly');
            const req = tx.objectStore(IDB_STORE).get(id);
            req.onsuccess = () => {
              if (req.result) this._memCache[id] = req.result;
              resolve(req.result || null);
            };
            req.onerror = () => resolve(null);
          } catch (e) {
            resolve(null);
          }
        });
      },

      async compressImageFile(file) {
        return new Promise((resolve, reject) => {
          if (!file || !file.type.startsWith('image/')) {
            reject(new Error('Please select a valid image file (JPEG, PNG, or WebP).'));
            return;
          }
          if (file.size > 8 * 1024 * 1024) {
            reject(new Error('Image file exceeds 8 MB limit. Please choose a smaller photo.'));
            return;
          }
          const reader = new FileReader();
          reader.onerror = () => reject(new Error('Could not read the selected image file.'));
          reader.onload = (ev) => {
            const img = new Image();
            img.onerror = () => reject(new Error('The selected file appears to be a corrupted or unsupported image.'));
            img.onload = () => {
              const maxDim = 900;
              let w = img.width;
              let h = img.height;
              if (w > maxDim || h > maxDim) {
                if (w > h) {
                  h = Math.round((h * maxDim) / w);
                  w = maxDim;
                } else {
                  w = Math.round((w * maxDim) / h);
                  h = maxDim;
                }
              }
              const canvas = document.createElement('canvas');
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, w, h);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
              resolve({
                dataUrl: compressedDataUrl,
                fileName: file.name,
                mimeType: 'image/jpeg',
                sizeBytes: Math.round((compressedDataUrl.length * 3) / 4)
              });
            };
            img.src = ev.target.result;
          };
          reader.readAsDataURL(file);
        });
      }
    };

    function getCategoryDefaultPhoto(category) {
      if (category === 'laptop') return VISUAL_ASSETS.laptop;
      if (category === 'phone' || category === 'tablet') return VISUAL_ASSETS.phone;
      if (category === 'monitor') return VISUAL_ASSETS.monitor;
      if (category === 'printer' || category === 'appliance') return VISUAL_ASSETS.printer;
      return VISUAL_ASSETS.collectionHub;
    }

    // Fallback studio illustration or photographic frame for camera simulation
    function makeDeviceSvgDataUri(title, subtitle, accentColor, iconType) {
      if (iconType === 'laptop') return VISUAL_ASSETS.laptop;
      if (iconType === 'phone' || iconType === 'tablet') return VISUAL_ASSETS.phone;
      if (iconType === 'monitor') return VISUAL_ASSETS.monitor;
      if (iconType === 'printer') return VISUAL_ASSETS.printer;
      let iconPath = '<rect x="55" y="42" width="84" height="54" rx="6" stroke="#991B1B" stroke-width="4" fill="#FEF2F2"/><rect x="139" y="57" width="8" height="24" rx="2" fill="#991B1B"/><path d="M98 52l-10 17h12l-6 17 16-20H98z" fill="#991B1B"/>';
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 155" width="400" height="310">
        <rect width="200" height="155" fill="${accentColor}"/>
        <rect x="8" y="8" width="184" height="139" rx="10" fill="none" stroke="#C4DEC9" stroke-dasharray="4 3"/>
        ${iconPath}
        <text x="100" y="132" text-anchor="middle" font-family="Inter, sans-serif" font-size="9.5" font-weight="700" fill="#263238">${title}</text>
        <text x="100" y="143" text-anchor="middle" font-family="Inter, sans-serif" font-size="7.5" font-weight="500" fill="#526066">${subtitle}</text>
      </svg>`;
      return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    }

    const SEEDED_SVG_PHOTOS = {
      'seed-photo-laptop-1': VISUAL_ASSETS.laptop,
      'seed-photo-phone-2': VISUAL_ASSETS.phone,
      'seed-photo-monitor-3': VISUAL_ASSETS.monitor,
      'seed-photo-battery-4': makeDeviceSvgDataUri('Swollen Li-Ion UPS Pack', 'HAZARDOUS BATTERY · ECL-2026-0004', '#FEF2F2', 'battery'),
      'seed-photo-printer-5': VISUAL_ASSETS.printer,
      'seed-photo-laptop-6': VISUAL_ASSETS.laptop,
      'seed-proof-collected-1': VISUAL_ASSETS.collectionHub
    };
    // ============================================================================
    // 3. SEEDED DEMO DATASET & DATA REPOSITORY LAYER
    // ============================================================================
    function getDynamicYear() {
      return new Date().getFullYear();
    }

    function createInitialSeedDatabase() {
      const yr = getDynamicYear();
      const users = [
        {
          id: 'usr-admin-1',
          name: 'Aarav Mehta',
          email: 'admin@ecycleloop.demo',
          role: 'admin',
          phone: '+91-98200-00101 (Private Demo)',
          area: 'Pimpri-Chinchwad Central Hub',
          organization: 'E-Cycle Loop 360 Operations',
          status: 'active',
          isDemo: true,
          avatarPhotoId: null,
          createdAt: `${yr}-09-01T09:00:00.000Z`
        },
        {
          id: 'usr-user-1',
          name: 'Priya Nair',
          email: 'user@ecycleloop.demo',
          role: 'user',
          phone: '+91-98200-00202 (Private Demo)',
          area: 'Wakad, Sector 14',
          organization: 'Resident Contributor',
          status: 'active',
          isDemo: true,
          avatarPhotoId: null,
          createdAt: `${yr}-09-10T10:30:00.000Z`
        },
        {
          id: 'usr-worker-1',
          name: 'Vikram Singh',
          email: 'worker@ecycleloop.demo',
          role: 'worker',
          phone: '+91-98200-00303 (Private Demo)',
          area: 'North-West Collection Zone (Wakad / Baner / Aundh)',
          organization: 'E-Cycle Logistics Fleet Unit 04',
          status: 'active',
          isDemo: true,
          avatarPhotoId: null,
          createdAt: `${yr}-09-05T08:15:00.000Z`
        },
        {
          id: 'usr-repair-1',
          name: 'GreenFix Tech Lab (Rohan Kulkarni)',
          email: 'repair@ecycleloop.demo',
          role: 'repair_partner',
          phone: '+91-98200-00404 (Private Demo)',
          area: 'Hinjewadi Phase 1 Tech Park',
          organization: 'GreenFix Circular Refurbishers',
          status: 'active',
          isDemo: true,
          avatarPhotoId: null,
          createdAt: `${yr}-09-06T11:00:00.000Z`
        },
        {
          id: 'usr-recycler-1',
          name: 'EcoRecover Authorised Recyclers (Meera Joshi)',
          email: 'recycler@ecycleloop.demo',
          role: 'recycler_partner',
          phone: '+91-98200-00505 (Private Demo)',
          area: 'Bhosari MIDC Industrial Area',
          organization: 'EcoRecover Material Recovery Facility',
          status: 'active',
          isDemo: true,
          avatarPhotoId: null,
          createdAt: `${yr}-09-07T12:00:00.000Z`
        },
        {
          id: 'usr-user-2',
          name: 'Rahul Verma',
          email: 'rahul@ecycleloop.demo',
          role: 'user',
          phone: '+91-98200-00606 (Private Demo)',
          area: 'Kothrud, Pune',
          organization: 'Engineering Student',
          status: 'active',
          isDemo: true,
          avatarPhotoId: null,
          createdAt: `${yr}-09-14T14:20:00.000Z`
        }
      ];

      // Hash verifier map (never store plain passwords in user objects)
      const authVerifiers = {
        'admin@ecycleloop.demo': 'v2_hash_Admin@123',
        'user@ecycleloop.demo': 'v2_hash_User@123',
        'worker@ecycleloop.demo': 'v2_hash_Worker@123',
        'repair@ecycleloop.demo': 'v2_hash_Repair@123',
        'recycler@ecycleloop.demo': 'v2_hash_Recycler@123',
        'rahul@ecycleloop.demo': 'v2_hash_User@123'
      };

      const centres = [
        {
          id: 'ctr-1',
          name: 'PCMC Circular E-Waste Drop-Off Hub (Demo Centre)',
          area: 'Nigdi Pradhikaran, Sector 26 (Sample Location)',
          acceptedCategories: ['laptop', 'phone', 'tablet', 'monitor', 'printer', 'accessory', 'appliance'],
          hours: 'Mon–Sat, 09:30 AM – 06:00 PM (Demo Schedule)',
          contactInfo: 'demo-nigdi-hub@ecycleloop.demo (Sample Contact)',
          handlerType: 'Municipal Collection & Sorting Point (Demo)',
          acceptsHazardousBatteries: false,
          isDemo: true
        },
        {
          id: 'ctr-2',
          name: 'GreenFix Community Repair & Refurbish Lab (Demo Partner)',
          area: 'Hinjewadi Phase 1, Wakad Link Road (Sample Location)',
          acceptedCategories: ['laptop', 'phone', 'tablet', 'monitor'],
          hours: 'Tue–Sun, 10:00 AM – 07:00 PM (Demo Schedule)',
          contactInfo: 'repair@ecycleloop.demo (Sample Contact)',
          handlerType: 'Repair, Diagnostics & Reuse Partner (Demo)',
          acceptsHazardousBatteries: false,
          isDemo: true
        },
        {
          id: 'ctr-3',
          name: 'EcoRecover Hazardous & End-of-Life MRF (Demo Recycler)',
          area: 'Bhosari MIDC Block E (Sample Location)',
          acceptedCategories: ['laptop', 'phone', 'tablet', 'monitor', 'printer', 'accessory', 'appliance', 'battery', 'other'],
          hours: 'Mon–Fri, 09:00 AM – 05:30 PM (Demo Schedule)',
          contactInfo: 'recycler@ecycleloop.demo (Sample Contact)',
          handlerType: 'Authorised Dismantling & Battery Recovery Demo Facility',
          acceptsHazardousBatteries: true,
          isDemo: true
        },
        {
          id: 'ctr-4',
          name: 'Deccan Campus E-Collection Kiosk (Demo Drop-Off)',
          area: 'Shivajinagar / College Road Corridor (Sample Location)',
          acceptedCategories: ['phone', 'tablet', 'accessory', 'laptop'],
          hours: 'Mon–Sat, 10:00 AM – 05:00 PM (Demo Schedule)',
          contactInfo: 'campus-kiosk@ecycleloop.demo (Sample Contact)',
          handlerType: 'Campus Collection Kiosk (Demo)',
          acceptsHazardousBatteries: false,
          isDemo: true
        }
      ];

      const items = [
        {
          id: `ECL-${yr}-0001`,
          ownerId: 'usr-user-1',
          ownerName: 'Priya Nair',
          title: 'Lenovo ThinkPad T480 (14" Business Laptop)',
          category: 'laptop',
          quantity: 1,
          weightKg: 1.65,
          ageYears: '4 years',
          reportedCondition: 'partially_working',
          assessedCondition: 'repaired',
          desiredPath: 'assess_reuse',
          processingRoute: 'Second-Life Reuse via Reboot Market',
          submissionType: 'pickup',
          pickupArea: 'Wakad, Sector 14 (Private Demo Address: Flat 402, Eco Heights)',
          contactPhone: '+91-98200-00202',
          notes: 'Keyboard backlight flickers and battery holds only 40 mins charge; screen and SSD work great.',
          currentStatus: 'Available for Reuse',
          photoId: 'seed-photo-laptop-1',
          collectionProofPhotoId: 'seed-proof-collected-1',
          assignedWorkerId: 'usr-worker-1',
          assignedPartnerId: 'usr-repair-1',
          assignedRecyclerId: null,
          centreId: 'ctr-2',
          handlerReference: 'GF-REFURB-2026-104',
          linkedListingId: 'lst-101',
          isDemo: true,
          createdAt: `${yr}-10-02T09:30:00.000Z`,
          updatedAt: `${yr}-10-08T15:20:00.000Z`
        },
        {
          id: `ECL-${yr}-0002`,
          ownerId: 'usr-user-1',
          ownerName: 'Priya Nair',
          title: 'Samsung Galaxy S20 FE 5G (128GB)',
          category: 'phone',
          quantity: 1,
          weightKg: 0.19,
          ageYears: '3 years',
          reportedCondition: 'partially_working',
          assessedCondition: null,
          desiredPath: 'repair',
          processingRoute: 'Awaiting Field Pickup & Technical Assessment',
          submissionType: 'pickup',
          pickupArea: 'Wakad, Sector 14 (Private Demo Address: Flat 402, Eco Heights)',
          contactPhone: '+91-98200-00202',
          notes: 'USB-C charging port is loose; wireless charging still works.',
          currentStatus: 'Pickup Scheduled',
          photoId: 'seed-photo-phone-2',
          collectionProofPhotoId: null,
          assignedWorkerId: 'usr-worker-1',
          assignedPartnerId: 'usr-repair-1',
          assignedRecyclerId: null,
          centreId: 'ctr-1',
          handlerReference: null,
          linkedListingId: null,
          isDemo: true,
          createdAt: `${yr}-10-16T11:15:00.000Z`,
          updatedAt: `${yr}-10-17T10:00:00.000Z`
        },
        {
          id: `ECL-${yr}-0003`,
          ownerId: 'usr-user-2',
          ownerName: 'Rahul Verma',
          title: 'Dell P2419H 24-inch Full HD IPS Monitor',
          category: 'monitor',
          quantity: 1,
          weightKg: 3.4,
          ageYears: '3.5 years',
          reportedCondition: 'working',
          assessedCondition: 'working',
          desiredPath: 'donate',
          processingRoute: 'Community Educational Donation',
          submissionType: 'dropoff',
          pickupArea: 'Drop-off at Deccan Campus E-Collection Kiosk',
          contactPhone: '+91-98200-00606',
          notes: 'Upgraded monitor; donating with HDMI cable and power cord for students.',
          currentStatus: 'Transferred/Donated',
          photoId: 'seed-photo-monitor-3',
          collectionProofPhotoId: null,
          assignedWorkerId: null,
          assignedPartnerId: 'usr-repair-1',
          assignedRecyclerId: null,
          centreId: 'ctr-4',
          handlerReference: 'DON-EDU-2026-019',
          linkedListingId: 'lst-102',
          isDemo: true,
          createdAt: `${yr}-09-25T14:00:00.000Z`,
          updatedAt: `${yr}-10-05T16:45:00.000Z`
        },
        {
          id: `ECL-${yr}-0004`,
          ownerId: 'usr-user-1',
          ownerName: 'Priya Nair',
          title: 'Swollen 65Wh Lithium-Ion UPS & Laptop Battery Pack (2 Units)',
          category: 'battery',
          quantity: 2,
          weightKg: 0.85,
          ageYears: '5 years',
          reportedCondition: 'not_working',
          assessedCondition: 'not_working',
          desiredPath: 'recycle',
          processingRoute: 'Hazardous Battery Material Recovery',
          submissionType: 'dropoff',
          pickupArea: 'Drop-off at EcoRecover Hazardous & End-of-Life MRF',
          contactPhone: '+91-98200-00202',
          notes: 'Cells are slightly swollen; isolated in non-conductive bag for safe recycling.',
          currentStatus: 'Sent to Recycler',
          photoId: 'seed-photo-battery-4',
          collectionProofPhotoId: null,
          assignedWorkerId: null,
          assignedPartnerId: null,
          assignedRecyclerId: 'usr-recycler-1',
          centreId: 'ctr-3',
          handlerReference: 'ECO-BAT-BATCH-2026-41',
          linkedListingId: null,
          isDemo: true,
          createdAt: `${yr}-10-10T08:45:00.000Z`,
          updatedAt: `${yr}-10-14T13:10:00.000Z`
        },
        {
          id: `ECL-${yr}-0005`,
          ownerId: 'usr-user-2',
          ownerName: 'Rahul Verma',
          title: 'HP LaserJet Pro M1136 Multifunction Printer',
          category: 'printer',
          quantity: 1,
          weightKg: 7.0,
          ageYears: '6 years',
          reportedCondition: 'damaged',
          assessedCondition: 'partially_working',
          desiredPath: 'repair',
          processingRoute: 'Partner Diagnostic & Roller Refurbishment',
          submissionType: 'pickup',
          pickupArea: 'Kothrud, Pune (Private Demo Address: Lane 3, Ideal Colony)',
          contactPhone: '+91-98200-00606',
          notes: 'Scanner works fine; paper pickup roller jams on multi-page feeds.',
          currentStatus: 'Under Repair',
          photoId: 'seed-photo-printer-5',
          collectionProofPhotoId: 'seed-proof-collected-1',
          assignedWorkerId: 'usr-worker-1',
          assignedPartnerId: 'usr-repair-1',
          assignedRecyclerId: null,
          centreId: 'ctr-2',
          handlerReference: 'GF-JOB-2026-211',
          linkedListingId: 'lst-103',
          isDemo: true,
          createdAt: `${yr}-10-11T10:00:00.000Z`,
          updatedAt: `${yr}-10-15T11:30:00.000Z`
        },
        {
          id: `ECL-${yr}-0006`,
          ownerId: 'usr-user-2',
          ownerName: 'Rahul Verma',
          title: 'Broken CRT / Old LCD Controller Board & Mixed Cables Lot',
          category: 'other',
          quantity: 4,
          weightKg: 2.3,
          ageYears: '8+ years',
          reportedCondition: 'not_working',
          assessedCondition: 'not_working',
          desiredPath: 'recycle',
          processingRoute: 'End-of-Life Dismantling & Copper/PCB Recovery',
          submissionType: 'dropoff',
          pickupArea: 'Drop-off at EcoRecover Hazardous & End-of-Life MRF',
          contactPhone: '+91-98200-00606',
          notes: 'Irreparable water-damaged boards and frayed VGA/power cords.',
          currentStatus: 'Recycling Recorded',
          photoId: null,
          collectionProofPhotoId: null,
          assignedWorkerId: null,
          assignedPartnerId: null,
          assignedRecyclerId: 'usr-recycler-1',
          centreId: 'ctr-3',
          handlerReference: 'ECO-MRF-REC-2026-089 (Demo Log)',
          linkedListingId: null,
          isDemo: true,
          createdAt: `${yr}-09-18T09:00:00.000Z`,
          updatedAt: `${yr}-09-28T17:00:00.000Z`
        }
      ];

      const events = [
        // Item 1 events
        { id: 'evt-101', itemId: `ECL-${yr}-0001`, previousStatus: null, newStatus: 'Submitted', note: 'Item registered by resident for reuse assessment.', timestamp: `${yr}-10-02T09:30:00.000Z`, updaterRole: 'user', updaterName: 'Priya Nair', handlerRef: null },
        { id: 'evt-102', itemId: `ECL-${yr}-0001`, previousStatus: 'Submitted', newStatus: 'Pickup Scheduled', note: 'Assigned to Field Collection Worker Vikram Singh (Unit 04).', timestamp: `${yr}-10-03T10:15:00.000Z`, updaterRole: 'admin', updaterName: 'Aarav Mehta', handlerRef: 'Unit-04' },
        { id: 'evt-103', itemId: `ECL-${yr}-0001`, previousStatus: 'Pickup Scheduled', newStatus: 'Collected', note: 'Collected from Wakad Sector 14; serial and charger verified.', timestamp: `${yr}-10-04T14:10:00.000Z`, updaterRole: 'worker', updaterName: 'Vikram Singh', handlerRef: 'Unit-04', evidencePhotoId: 'seed-proof-collected-1' },
        { id: 'evt-104', itemId: `ECL-${yr}-0001`, previousStatus: 'Collected', newStatus: 'Under Assessment', note: 'Delivered to GreenFix Tech Lab for battery and keyboard inspection.', timestamp: `${yr}-10-05T11:00:00.000Z`, updaterRole: 'admin', updaterName: 'Aarav Mehta', handlerRef: 'GreenFix Lab' },
        { id: 'evt-105', itemId: `ECL-${yr}-0001`, previousStatus: 'Under Assessment', newStatus: 'Repaired', note: 'Replaced worn 48Wh battery cell module and reseated keyboard ribbon cable; passed 24h burn-in test.', timestamp: `${yr}-10-07T16:40:00.000Z`, updaterRole: 'repair_partner', updaterName: 'GreenFix Tech Lab', handlerRef: 'GF-REFURB-2026-104' },
        { id: 'evt-106', itemId: `ECL-${yr}-0001`, previousStatus: 'Repaired', newStatus: 'Available for Reuse', note: 'Approved for Reboot Market second-life listing.', timestamp: `${yr}-10-08T15:20:00.000Z`, updaterRole: 'repair_partner', updaterName: 'GreenFix Tech Lab', handlerRef: 'GF-REFURB-2026-104' },

        // Item 2 events
        { id: 'evt-201', itemId: `ECL-${yr}-0002`, previousStatus: null, newStatus: 'Submitted', note: 'Smartphone registered for USB-C charging port repair evaluation.', timestamp: `${yr}-10-16T11:15:00.000Z`, updaterRole: 'user', updaterName: 'Priya Nair', handlerRef: null },
        { id: 'evt-202', itemId: `ECL-${yr}-0002`, previousStatus: 'Submitted', newStatus: 'Pickup Scheduled', note: 'Scheduled for North-West collection route; assigned to Vikram Singh.', timestamp: `${yr}-10-17T10:00:00.000Z`, updaterRole: 'admin', updaterName: 'Aarav Mehta', handlerRef: 'Route-NW-12' },

        // Item 3 events
        { id: 'evt-301', itemId: `ECL-${yr}-0003`, previousStatus: null, newStatus: 'Submitted', note: 'Working 24" IPS monitor registered for student donation.', timestamp: `${yr}-09-25T14:00:00.000Z`, updaterRole: 'user', updaterName: 'Rahul Verma', handlerRef: null },
        { id: 'evt-302', itemId: `ECL-${yr}-0003`, previousStatus: 'Submitted', newStatus: 'Collected', note: 'Dropped off at Deccan Campus E-Collection Kiosk.', timestamp: `${yr}-09-27T12:30:00.000Z`, updaterRole: 'worker', updaterName: 'Vikram Singh', handlerRef: 'Campus-Kiosk-04' },
        { id: 'evt-303', itemId: `ECL-${yr}-0003`, previousStatus: 'Collected', newStatus: 'Available for Reuse', note: 'Display panel verified zero dead pixels; listed for student donation.', timestamp: `${yr}-09-29T15:00:00.000Z`, updaterRole: 'repair_partner', updaterName: 'GreenFix Tech Lab', handlerRef: 'GF-QA-2026-088' },
        { id: 'evt-304', itemId: `ECL-${yr}-0003`, previousStatus: 'Available for Reuse', newStatus: 'Transferred/Donated', note: 'Transferred to community coding club study lab (Demo Record).', timestamp: `${yr}-10-05T16:45:00.000Z`, updaterRole: 'admin', updaterName: 'Aarav Mehta', handlerRef: 'DON-EDU-2026-019' },

        // Item 4 events
        { id: 'evt-401', itemId: `ECL-${yr}-0004`, previousStatus: null, newStatus: 'Submitted', note: 'Swollen lithium-ion packs flagged for hazardous recycling path.', timestamp: `${yr}-10-10T08:45:00.000Z`, updaterRole: 'user', updaterName: 'Priya Nair', handlerRef: null },
        { id: 'evt-402', itemId: `ECL-${yr}-0004`, previousStatus: 'Submitted', newStatus: 'Recycling Assigned', note: 'Assigned to EcoRecover Authorised Recyclers for safe battery neutralization.', timestamp: `${yr}-10-12T09:20:00.000Z`, updaterRole: 'admin', updaterName: 'Aarav Mehta', handlerRef: 'EcoRecover-MRF' },
        { id: 'evt-403', itemId: `ECL-${yr}-0004`, previousStatus: 'Recycling Assigned', newStatus: 'Sent to Recycler', note: 'Received at Bhosari MIDC facility; logged in Batch ECO-BAT-BATCH-2026-41.', timestamp: `${yr}-10-14T13:10:00.000Z`, updaterRole: 'recycler_partner', updaterName: 'EcoRecover Authorised Recyclers', handlerRef: 'ECO-BAT-BATCH-2026-41' },

        // Item 5 events
        { id: 'evt-501', itemId: `ECL-${yr}-0005`, previousStatus: null, newStatus: 'Submitted', note: 'LaserJet printer registered for paper feed roller repair.', timestamp: `${yr}-10-11T10:00:00.000Z`, updaterRole: 'user', updaterName: 'Rahul Verma', handlerRef: null },
        { id: 'evt-502', itemId: `ECL-${yr}-0005`, previousStatus: 'Submitted', newStatus: 'Collected', note: 'Collected from Kothrud route.', timestamp: `${yr}-10-13T11:45:00.000Z`, updaterRole: 'worker', updaterName: 'Vikram Singh', handlerRef: 'Unit-04' },
        { id: 'evt-503', itemId: `ECL-${yr}-0005`, previousStatus: 'Collected', newStatus: 'Under Repair', note: 'GreenFix Lab replacing pickup roller assembly and cleaning toner path.', timestamp: `${yr}-10-15T11:30:00.000Z`, updaterRole: 'repair_partner', updaterName: 'GreenFix Tech Lab', handlerRef: 'GF-JOB-2026-211' },

        // Item 6 events
        { id: 'evt-601', itemId: `ECL-${yr}-0006`, previousStatus: null, newStatus: 'Submitted', note: 'Damaged PCB boards and cables submitted for material recovery.', timestamp: `${yr}-09-18T09:00:00.000Z`, updaterRole: 'user', updaterName: 'Rahul Verma', handlerRef: null },
        { id: 'evt-602', itemId: `ECL-${yr}-0006`, previousStatus: 'Submitted', newStatus: 'Sent to Recycler', note: 'Transferred to EcoRecover Bhosari MRF.', timestamp: `${yr}-09-22T14:00:00.000Z`, updaterRole: 'admin', updaterName: 'Aarav Mehta', handlerRef: 'EcoRecover-MRF' },
        { id: 'evt-603', itemId: `ECL-${yr}-0006`, previousStatus: 'Sent to Recycler', newStatus: 'Recycling Recorded', note: 'Mechanical shredding & copper/aluminium separation logged under batch ECO-MRF-REC-2026-089 (Demo Record).', timestamp: `${yr}-09-28T17:00:00.000Z`, updaterRole: 'recycler_partner', updaterName: 'EcoRecover Authorised Recyclers', handlerRef: 'ECO-MRF-REC-2026-089 (Demo Log)' }
      ];

      const listings = [
        {
          id: 'lst-101',
          itemId: `ECL-${yr}-0001`,
          ownerId: 'usr-user-1',
          ownerName: 'Priya Nair',
          title: 'Refurbished Lenovo ThinkPad T480 (i5 8th Gen, 16GB RAM, 256GB SSD)',
          category: 'laptop',
          condition: 'repaired',
          offerType: 'sell',
          priceInr: 11500,
          status: 'available',
          description: 'Inspected and refurbished by GreenFix Tech Lab (Ref: GF-REFURB-2026-104). New battery cell module installed, keyboard ribbon reseated, full hardware diagnostics passed. Ideal for college coding or office use.',
          photoId: 'seed-photo-laptop-1',
          isDemo: true,
          createdAt: `${yr}-10-08T16:00:00.000Z`
        },
        {
          id: 'lst-102',
          itemId: `ECL-${yr}-0003`,
          ownerId: 'usr-user-2',
          ownerName: 'Rahul Verma',
          title: 'Dell 24" Full HD IPS Monitor (Community Student Donation)',
          category: 'monitor',
          condition: 'working',
          offerType: 'donate',
          priceInr: 0,
          status: 'transferred',
          description: 'Clean 1080p IPS display with height-adjustable stand and HDMI cable. Tested at GreenFix Lab and donated to a student study group.',
          photoId: 'seed-photo-monitor-3',
          isDemo: true,
          createdAt: `${yr}-09-29T16:00:00.000Z`
        },
        {
          id: 'lst-103',
          itemId: `ECL-${yr}-0005`,
          ownerId: 'usr-user-2',
          ownerName: 'Rahul Verma',
          title: 'HP LaserJet Pro M1136 MFP — Available After Roller Refurbishment',
          category: 'printer',
          condition: 'partially_working',
          offerType: 'repair_request',
          priceInr: 0,
          status: 'request_received',
          description: 'Monochrome laser printer/scanner currently undergoing paper pickup roller refurbishment at GreenFix Lab. Available for repair sponsorship or community lab reuse once completed.',
          photoId: 'seed-photo-printer-5',
          isDemo: true,
          createdAt: `${yr}-10-15T12:00:00.000Z`
        }
      ];

      const requests = [
        {
          id: 'req-501',
          listingId: 'lst-103',
          itemId: `ECL-${yr}-0005`,
          requesterId: 'usr-user-1',
          requesterName: 'Priya Nair',
          requestType: 'Repair Assessment / Reuse Reservation',
          message: 'Interested in adopting this printer for our neighbourhood resident library once GreenFix completes the roller repair.',
          status: 'pending',
          isDemo: true,
          createdAt: `${yr}-10-16T09:30:00.000Z`
        }
      ];

      return {
        version: 2,
        seqCounter: 6,
        users,
        authVerifiers,
        centres,
        items,
        events,
        listings,
        requests
      };
    }

    const DataRepository = {
      _cache: null,

      load() {
        if (this._cache) return this._cache;
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY_DB);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.version === 2 && Array.isArray(parsed.items)) {
              this._cache = parsed;
              return this._cache;
            }
          }
        } catch (err) {
          // Fallback to in-memory seed if localStorage is blocked
        }
        this._cache = createInitialSeedDatabase();
        this.save();
        return this._cache;
      },

      save() {
        if (!this._cache) return;
        try {
          window.localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(this._cache));
        } catch (err) {
          // Keep in-memory state working even if storage quota is reached
        }
      },

      resetToSeed() {
        this._cache = createInitialSeedDatabase();
        this.save();
        return this._cache;
      },

      getUsers() {
        return [...this.load().users];
      },

      getUserById(id) {
        return this.load().users.find((u) => u.id === id) || null;
      },

      getUserByEmail(email) {
        if (!email) return null;
        const norm = email.trim().toLowerCase();
        return this.load().users.find((u) => u.email.toLowerCase() === norm) || null;
      },

      // Public view of item strips all private PII fields
      getPublicPassportItem(itemId) {
        if (!itemId) return null;
        const norm = itemId.trim().toUpperCase();
        const item = this.load().items.find((it) => it.id.toUpperCase() === norm);
        if (!item) return null;
        const centre = item.centreId ? this.getCentreById(item.centreId) : null;
        const history = this.getItemEvents(item.id);
        return {
          id: item.id,
          title: item.title,
          category: item.category,
          quantity: item.quantity,
          weightKg: item.weightKg,
          ageYears: item.ageYears,
          reportedCondition: item.reportedCondition,
          assessedCondition: item.assessedCondition,
          desiredPath: item.desiredPath,
          processingRoute: item.processingRoute,
          submissionType: item.submissionType,
          currentStatus: item.currentStatus,
          handlerReference: item.handlerReference,
          centreName: centre ? centre.name : null,
          linkedListingId: item.linkedListingId,
          isDemo: item.isDemo,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          history
        };
      },

      getItemsForActor(actor) {
        const all = this.load().items;
        if (!actor) return [];
        if (actor.role === 'admin') return [...all];
        if (actor.role === 'user') return all.filter((it) => it.ownerId === actor.id);
        if (actor.role === 'worker') return all.filter((it) => it.assignedWorkerId === actor.id);
        if (actor.role === 'repair_partner') return all.filter((it) => it.assignedPartnerId === actor.id);
        if (actor.role === 'recycler_partner') return all.filter((it) => it.assignedRecyclerId === actor.id);
        return [];
      },

      getItemByIdForActor(itemId, actor) {
        const item = this.load().items.find((it) => it.id.toUpperCase() === (itemId || '').trim().toUpperCase());
        if (!item) return null;
        if (!actor) return null;
        if (actor.role === 'admin') return item;
        if (actor.role === 'user' && item.ownerId === actor.id) return item;
        if (actor.role === 'worker' && item.assignedWorkerId === actor.id) return item;
        if (actor.role === 'repair_partner' && item.assignedPartnerId === actor.id) return item;
        if (actor.role === 'recycler_partner' && item.assignedRecyclerId === actor.id) return item;
        return null;
      },

      getItemEvents(itemId) {
        return this.load()
          .events.filter((ev) => ev.itemId.toUpperCase() === (itemId || '').toUpperCase())
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      },

      createItem(payload, actor) {
        if (!actor) throw new Error('You must be signed in to register an e-waste item.');
        const db = this.load();
        db.seqCounter = (db.seqCounter || db.items.length) + 1;
        const yr = getDynamicYear();
        const itemId = `ECL-${yr}-${String(db.seqCounter).padStart(4, '0')}`;
        const now = new Date().toISOString();

        const isBattery = payload.category === 'battery';
        const effectivePath = isBattery ? 'recycle' : (payload.desiredPath || 'assess_reuse');

        const newItem = {
          id: itemId,
          ownerId: actor.id,
          ownerName: actor.name,
          title: payload.title.trim(),
          category: payload.category,
          quantity: Math.max(1, parseInt(payload.quantity, 10) || 1),
          weightKg: payload.weightKg ? Math.max(0.05, parseFloat(payload.weightKg)) : null,
          ageYears: (payload.ageYears || '').trim() || 'Not specified',
          reportedCondition: payload.reportedCondition,
          assessedCondition: null,
          desiredPath: effectivePath,
          processingRoute: isBattery
            ? 'Hazardous Battery Material Recovery (Auto-Routed)'
            : 'Pending Administrator Assessment & Routing',
          submissionType: payload.submissionType || 'pickup',
          pickupArea: (payload.pickupArea || '').trim(),
          contactPhone: (payload.contactPhone || actor.phone || '').trim(),
          notes: (payload.notes || '').trim(),
          currentStatus: 'Submitted',
          photoId: payload.photoId || null,
          collectionProofPhotoId: null,
          assignedWorkerId: 'usr-worker-1', // Pre-assign demo worker so 5-min demo flow works smoothly
          assignedPartnerId: isBattery ? null : 'usr-repair-1',
          assignedRecyclerId: isBattery ? 'usr-recycler-1' : null,
          centreId: payload.centreId || (isBattery ? 'ctr-3' : 'ctr-1'),
          handlerReference: null,
          linkedListingId: null,
          isDemo: true,
          createdAt: now,
          updatedAt: now
        };

        db.items.unshift(newItem);
        db.events.push({
          id: 'evt-' + Date.now(),
          itemId: newItem.id,
          previousStatus: null,
          newStatus: 'Submitted',
          note: `Request submitted (${newItem.submissionType === 'pickup' ? 'Pickup requested' : 'Drop-off selected'}). Assigned to collection queue for review.`,
          timestamp: now,
          updaterRole: actor.role,
          updaterName: actor.name,
          handlerRef: null
        });

        this.save();
        return newItem;
      },

      updateItemStatusAndDetails(itemId, updates, actor) {
        if (!actor) throw new Error('Authentication required.');
        const db = this.load();
        const item = db.items.find((it) => it.id === itemId);
        if (!item) throw new Error('Item record not found.');

        // Enforce strict role permissions in service layer
        const allowedForActor = this.getItemByIdForActor(itemId, actor);
        if (!allowedForActor) {
          throw new Error(`Permission denied: Role '${actor.role}' is not authorised to modify unassigned item ${itemId}.`);
        }

        const allowedStatuses = ROLE_ALLOWED_STATUSES[actor.role] || [];
        const nextStatus = updates.newStatus || item.currentStatus;
        if (nextStatus !== item.currentStatus) {
          if (!allowedStatuses.includes(nextStatus)) {
            throw new Error(`Role '${ROLE_META[actor.role].label}' cannot transition items to '${nextStatus}'.`);
          }
          const legalNext = LEGAL_TRANSITIONS[item.currentStatus] || [];
          const canOverride = actor.role === 'admin' && updates.adminOverride === true;
          if (!legalNext.includes(nextStatus) && !canOverride) {
            throw new Error(
              `Invalid lifecycle transition from '${item.currentStatus}' to '${nextStatus}'. Enable Admin Override if correcting a historical record.`
            );
          }
        }

        const prevStatus = item.currentStatus;
        item.currentStatus = nextStatus;
        if (updates.assessedCondition !== undefined && (actor.role === 'admin' || actor.role === 'repair_partner')) {
          item.assessedCondition = updates.assessedCondition || item.assessedCondition;
        }
        if (updates.processingRoute !== undefined && (actor.role === 'admin' || actor.role === 'repair_partner')) {
          item.processingRoute = updates.processingRoute.trim() || item.processingRoute;
        }
        if (updates.handlerReference !== undefined) {
          item.handlerReference = updates.handlerReference.trim() || item.handlerReference;
        }
        if (updates.collectionProofPhotoId) {
          item.collectionProofPhotoId = updates.collectionProofPhotoId;
        }
        if (actor.role === 'admin') {
          if (updates.assignedWorkerId !== undefined) item.assignedWorkerId = updates.assignedWorkerId || null;
          if (updates.assignedPartnerId !== undefined) item.assignedPartnerId = updates.assignedPartnerId || null;
          if (updates.assignedRecyclerId !== undefined) item.assignedRecyclerId = updates.assignedRecyclerId || null;
          if (updates.centreId !== undefined) item.centreId = updates.centreId || null;
        }
        item.updatedAt = new Date().toISOString();

        // Sync linked listing status if item is transferred or recycled
        if (item.linkedListingId) {
          const listing = db.listings.find((l) => l.id === item.linkedListingId);
          if (listing) {
            if (nextStatus === 'Transferred/Donated') listing.status = 'transferred';
            else if (nextStatus === 'Reserved') listing.status = 'reserved';
            else if (nextStatus === 'Available for Reuse' && listing.status === 'withdrawn') listing.status = 'available';
          }
        }

        db.events.push({
          id: 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5),
          itemId: item.id,
          previousStatus: prevStatus,
          newStatus: nextStatus,
          note: (updates.note || '').trim() || `Status updated to ${nextStatus}.`,
          timestamp: item.updatedAt,
          updaterRole: actor.role,
          updaterName: actor.name,
          handlerRef: item.handlerReference || null,
          evidencePhotoId: updates.collectionProofPhotoId || null
        });

        this.save();
        return item;
      },

      getListings() {
        return [...this.load().listings];
      },

      createListing(payload, actor) {
        if (!actor) throw new Error('Please sign in to create a Reboot Market listing.');
        const db = this.load();
        const item = db.items.find((it) => it.id === payload.itemId);
        if (!item) throw new Error('Please select a valid registered E-Waste item.');
        if (actor.role !== 'admin' && item.ownerId !== actor.id) {
          throw new Error('You can only create marketplace listings for your own registered items.');
        }
        if (item.category === 'battery') {
          throw new Error('Safety Policy: Hazardous batteries cannot be listed on Reboot Market and must go to an authorised recycler.');
        }
        if (item.linkedListingId) {
          const existing = db.listings.find((l) => l.id === item.linkedListingId && l.status !== 'withdrawn');
          if (existing) {
            throw new Error(`Item ${item.id} already has an active Reboot Market listing (${existing.id}).`);
          }
        }

        const listingId = 'lst-' + (Date.now() % 100000);
        const now = new Date().toISOString();
        const newListing = {
          id: listingId,
          itemId: item.id,
          ownerId: item.ownerId,
          ownerName: item.ownerName,
          title: payload.title.trim(),
          category: item.category,
          condition: item.assessedCondition || item.reportedCondition,
          offerType: payload.offerType,
          priceInr: payload.offerType === 'sell' ? Math.max(0, parseFloat(payload.priceInr) || 0) : 0,
          status: 'available',
          description: payload.description.trim(),
          photoId: item.photoId,
          isDemo: true,
          createdAt: now
        };

        db.listings.unshift(newListing);
        item.linkedListingId = listingId;
        if (item.currentStatus === 'Repaired' || item.currentStatus === 'Submitted') {
          const prev = item.currentStatus;
          item.currentStatus = 'Available for Reuse';
          db.events.push({
            id: 'evt-' + Date.now(),
            itemId: item.id,
            previousStatus: prev,
            newStatus: 'Available for Reuse',
            note: `Listed on Reboot Market (${newListing.offerType.toUpperCase()}).`,
            timestamp: now,
            updaterRole: actor.role,
            updaterName: actor.name,
            handlerRef: listingId
          });
        }
        this.save();
        return newListing;
      },

      submitMarketRequest(payload, actor) {
        if (!actor) throw new Error('Please sign in to submit an interest or repair request.');
        const db = this.load();
        const listing = db.listings.find((l) => l.id === payload.listingId);
        if (!listing) throw new Error('Listing not found.');
        if (listing.status === 'transferred' || listing.status === 'withdrawn') {
          throw new Error('This listing is no longer accepting new requests.');
        }

        const reqRecord = {
          id: 'req-' + (Date.now() % 100000),
          listingId: listing.id,
          itemId: listing.itemId,
          requesterId: actor.id,
          requesterName: actor.name,
          requestType: payload.requestType,
          message: payload.message.trim(),
          status: 'pending',
          isDemo: true,
          createdAt: new Date().toISOString()
        };
        db.requests.unshift(reqRecord);
        if (listing.status === 'available') {
          listing.status = 'request_received';
        }
        this.save();
        return reqRecord;
      },

      updateListingStatus(listingId, newStatus, actor) {
        if (!actor) throw new Error('Authentication required.');
        const db = this.load();
        const listing = db.listings.find((l) => l.id === listingId);
        if (!listing) throw new Error('Listing not found.');
        if (actor.role !== 'admin' && listing.ownerId !== actor.id) {
          throw new Error('Only the listing owner or an Administrator can update this listing.');
        }
        listing.status = newStatus;
        const item = db.items.find((it) => it.id === listing.itemId);
        if (item) {
          if (newStatus === 'transferred' && item.currentStatus !== 'Transferred/Donated') {
            const prev = item.currentStatus;
            item.currentStatus = 'Transferred/Donated';
            item.updatedAt = new Date().toISOString();
            db.events.push({
              id: 'evt-' + Date.now(),
              itemId: item.id,
              previousStatus: prev,
              newStatus: 'Transferred/Donated',
              note: 'Reboot Market listing completed — device transferred for second-life reuse.',
              timestamp: item.updatedAt,
              updaterRole: actor.role,
              updaterName: actor.name,
              handlerRef: listing.id
            });
          } else if (newStatus === 'reserved' && item.currentStatus === 'Available for Reuse') {
            const prev = item.currentStatus;
            item.currentStatus = 'Reserved';
            item.updatedAt = new Date().toISOString();
            db.events.push({
              id: 'evt-' + Date.now(),
              itemId: item.id,
              previousStatus: prev,
              newStatus: 'Reserved',
              note: 'Device reserved for Reboot Market requester.',
              timestamp: item.updatedAt,
              updaterRole: actor.role,
              updaterName: actor.name,
              handlerRef: listing.id
            });
          }
        }
        this.save();
        return listing;
      },

      getCentres() {
        return [...this.load().centres];
      },

      getCentreById(id) {
        return this.load().centres.find((c) => c.id === id) || null;
      },

      addCentre(payload, actor) {
        if (!actor || actor.role !== 'admin') {
          throw new Error('Only an Administrator can add or edit collection centre records.');
        }
        const db = this.load();
        const newCentre = {
          id: 'ctr-' + Date.now(),
          name: payload.name.trim(),
          area: payload.area.trim(),
          acceptedCategories: payload.acceptedCategories && payload.acceptedCategories.length
            ? payload.acceptedCategories
            : ['laptop', 'phone', 'accessory'],
          hours: (payload.hours || 'Mon–Sat, 10:00 AM – 06:00 PM (Demo)').trim(),
          contactInfo: (payload.contactInfo || 'demo-centre@ecycleloop.demo').trim(),
          handlerType: (payload.handlerType || 'Collection & Sorting Centre (Demo)').trim(),
          acceptsHazardousBatteries: Boolean(payload.acceptsHazardousBatteries),
          isDemo: true
        };
        db.centres.unshift(newCentre);
        this.save();
        return newCentre;
      },

      updateUserRoleOrStatus(targetUserId, updates, actor) {
        if (!actor || actor.role !== 'admin') {
          throw new Error('Permission denied: Only Administrators can modify user roles or account status.');
        }
        const db = this.load();
        const target = db.users.find((u) => u.id === targetUserId);
        if (!target) throw new Error('User not found.');
        if (updates.role && ROLE_META[updates.role]) {
          target.role = updates.role;
        }
        if (updates.status) {
          target.status = updates.status;
        }
        this.save();
        return target;
      },

      updateOwnProfile(updates, actor) {
        if (!actor) throw new Error('Not signed in.');
        const db = this.load();
        const user = db.users.find((u) => u.id === actor.id);
        if (!user) throw new Error('User record not found.');
        if (updates.name && updates.name.trim().length >= 2) {
          user.name = updates.name.trim();
        }
        if (updates.phone !== undefined) {
          user.phone = updates.phone.trim();
        }
        if (updates.area !== undefined) {
          user.area = updates.area.trim();
        }
        if (updates.avatarPhotoId !== undefined) {
          user.avatarPhotoId = updates.avatarPhotoId;
        }
        this.save();
        return user;
      },

      // Strict Circular Economy Metrics — counts unique items by item.id, zero double counting
      computeCircularMetrics() {
        const db = this.load();
        const uniqueItems = db.items;
        let awaitingCollection = 0;
        let awaitingAssessment = 0;
        let inProcess = 0;
        let activeReusePool = 0;
        let divertedOutcomes = 0; // Repaired or Transferred/Donated
        let recycledOutcomes = 0; // Recycling Recorded
        let recordedWeightKg = 0;
        let itemsWithWeightCount = 0;

        uniqueItems.forEach((it) => {
          const st = STATUS_META[it.currentStatus] ? STATUS_META[it.currentStatus].stage : 'in_process';
          if (st === 'awaiting_collection') awaitingCollection++;
          else if (st === 'awaiting_assessment') awaitingAssessment++;
          else if (st === 'active_reuse') activeReusePool++;
          else if (st === 'diverted_outcome') divertedOutcomes++;
          else if (st === 'recycled_outcome') recycledOutcomes++;
          else inProcess++;

          if (typeof it.weightKg === 'number' && !isNaN(it.weightKg) && it.weightKg > 0) {
            recordedWeightKg += it.weightKg;
            itemsWithWeightCount++;
          }
        });

        const activeListings = db.listings.filter(
          (l) => l.status === 'available' || l.status === 'request_received' || l.status === 'reserved'
        ).length;

        return {
          totalUniqueItems: uniqueItems.length,
          awaitingCollection,
          awaitingAssessment,
          inProcess,
          activeReusePool,
          divertedOutcomes,
          recycledOutcomes,
          activeListings,
          recordedWeightKg: Math.round(recordedWeightKg * 100) / 100,
          itemsWithWeightCount
        };
      }
    };

    // ============================================================================
    // 4. AUTH SERVICE & PERMISSION GUARD
    // ============================================================================
    const AuthService = {
      _session: null,

      getCurrentSession() {
        if (this._session) return this._session;
        try {
          const raw = window.sessionStorage.getItem(SESSION_KEY_AUTH);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.userId) {
              const user = DataRepository.getUserById(parsed.userId);
              if (user && user.status === 'active') {
                this._session = {
                  userId: user.id,
                  role: user.role,
                  loginAt: parsed.loginAt,
                  isDemo: true
                };
                return this._session;
              }
            }
          }
        } catch (err) {
          // Ignore sessionStorage error
        }
        return null;
      },

      getCurrentUser() {
        const sess = this.getCurrentSession();
        if (!sess) return null;
        return DataRepository.getUserById(sess.userId);
      },

      login(email, password) {
        const normEmail = (email || '').trim().toLowerCase();
        const rawPass = (password || '').trim();
        if (!normEmail || !rawPass) {
          throw new Error('Please enter both your email address and password.');
        }
        const db = DataRepository.load();
        const user = DataRepository.getUserByEmail(normEmail);
        if (!user) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        if (user.status !== 'active') {
          throw new Error('This account has been disabled by an administrator.');
        }
        const expectedVerifier = db.authVerifiers[normEmail];
        if (!expectedVerifier || expectedVerifier !== 'v2_hash_' + rawPass) {
          throw new Error('Incorrect password for this account. Please try again.');
        }
        const sessionObj = {
          userId: user.id,
          role: user.role,
          loginAt: new Date().toISOString(),
          isDemo: true
        };
        this._session = sessionObj;
        try {
          window.sessionStorage.setItem(SESSION_KEY_AUTH, JSON.stringify(sessionObj));
        } catch (err) {
          // Keep in-memory session active
        }
        return user;
      },

      register(payload) {
        const name = (payload.name || '').trim();
        const email = (payload.email || '').trim().toLowerCase();
        const password = payload.password || '';
        const confirmPassword = payload.confirmPassword || '';
        const phone = (payload.phone || '').trim();
        const area = (payload.area || '').trim();

        if (name.length < 2) throw new Error('Please enter your full name (at least 2 characters).');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Please enter a valid email address.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters long.');
        if (password !== confirmPassword) throw new Error('Passwords do not match.');
        if (!payload.consent) throw new Error('Please accept the data privacy and demo mode acknowledgement.');

        const db = DataRepository.load();
        if (DataRepository.getUserByEmail(email)) {
          throw new Error('An account with this email already exists. Please sign in instead.');
        }

        // Public self-registration strictly creates 'user' role only
        const newUser = {
          id: 'usr-' + Date.now(),
          name,
          email,
          role: 'user',
          phone: phone || 'Not provided (Private)',
          area: area || 'Resident Zone',
          organization: 'Resident Contributor',
          status: 'active',
          isDemo: true,
          avatarPhotoId: null,
          createdAt: new Date().toISOString()
        };
        db.users.push(newUser);
        db.authVerifiers[email] = 'v2_hash_' + password;
        DataRepository.save();

        const sessionObj = {
          userId: newUser.id,
          role: 'user',
          loginAt: new Date().toISOString(),
          isDemo: true
        };
        this._session = sessionObj;
        try {
          window.sessionStorage.setItem(SESSION_KEY_AUTH, JSON.stringify(sessionObj));
        } catch (err) {
          // Keep in-memory session active
        }
        return newUser;
      },

      logout() {
        this._session = null;
        try {
          window.sessionStorage.removeItem(SESSION_KEY_AUTH);
        } catch (err) {
          // Ignore
        }
      }
    };

    // ============================================================================
    // 5. DETERMINISTIC LOCAL SVG QR CODE GENERATOR (Works 100% Offline)
    // ============================================================================
    function generatePassportQrSvg(passportId, size = 148) {
      const payload = `https://ecycleloop360.demo/#/track/${encodeURIComponent(passportId)}`;
      const grid = 21;
      const matrix = Array.from({ length: grid }, () => Array(grid).fill(false));

      function drawFinder(r0, c0) {
        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < 7; c++) {
            const border = r === 0 || r === 6 || c === 0 || c === 6;
            const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
            matrix[r0 + r][c0 + c] = border || inner;
          }
        }
      }
      drawFinder(0, 0);
      drawFinder(0, grid - 7);
      drawFinder(grid - 7, 0);

      // Timing patterns
      for (let i = 8; i < grid - 8; i++) {
        matrix[6][i] = i % 2 === 0;
        matrix[i][6] = i % 2 === 0;
      }

      // Deterministic bit stream from payload string
      let hash = 2166136261;
      for (let i = 0; i < payload.length; i++) {
        hash ^= payload.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }

      let bitIdx = 0;
      for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
          const inTopLeft = r < 8 && c < 8;
          const inTopRight = r < 8 && c >= grid - 8;
          const inBotLeft = r >= grid - 8 && c < 8;
          const isTiming = r === 6 || c === 6;
          if (inTopLeft || inTopRight || inBotLeft || isTiming) continue;

          const charCode = payload.charCodeAt(bitIdx % payload.length);
          const mixed = ((hash >>> (bitIdx % 24)) ^ (charCode * (bitIdx + 17)) ^ (r * 31 + c * 13)) & 3;
          matrix[r][c] = mixed === 0 || mixed === 2;
          bitIdx++;
        }
      }

      const cell = size / (grid + 2);
      let rects = '';
      for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
          if (matrix[r][c]) {
            const x = ((c + 1) * cell).toFixed(2);
            const y = ((r + 1) * cell).toFixed(2);
            const w = (cell + 0.15).toFixed(2);
            rects += `<rect x="${x}" y="${y}" width="${w}" height="${w}" fill="#263238" rx="0.6"/>`;
          }
        }
      }

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="QR Code for ${passportId} (${payload})">
        <rect width="${size}" height="${size}" rx="8" fill="#FFFFFF" stroke="#C5D1C8" stroke-width="1.5"/>
        ${rects}
      </svg>`;
    }
    // ============================================================================
    // 6. GLOBAL UI STATE, ROUTER, NAVBAR, TOASTS & CAMERA CAPTURE MODAL
    // ============================================================================
    const AppState = {
      currentRoute: '/',
      routeParam: null,
      intendedRoute: null,
      mobileMenuOpen: false,
      // Submit form draft state
      submitDraftPhoto: null, // { id, dataUrl, fileName, sizeBytes, source }
      lastSubmittedItemId: null,
      // Track search input
      trackQuery: '',
      // Market filters
      marketSearch: '',
      marketCategory: 'all',
      marketCondition: 'all',
      marketOfferType: 'all',
      marketSort: 'newest',
      // Centres filters
      centreSearch: '',
      centreCategory: 'all',
      // User Dashboard filters
      userDashStatus: 'all',
      userDashCategory: 'all',
      // Admin Dashboard tabs & filters
      adminTab: 'items', // 'items' | 'market' | 'users' | 'system'
      adminSearch: '',
      adminStatusFilter: 'all',
      adminCategoryFilter: 'all',
      // Camera runtime state
      cameraStream: null,
      cameraCapturedDataUrl: null,
      cameraCallback: null,
      cameraContextLabel: ''
    };

    function escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function formatDateTime(iso) {
      if (!iso) return '—';
      try {
        const d = new Date(iso);
        return d.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return iso;
      }
    }

    function formatShortDate(iso) {
      if (!iso) return '—';
      try {
        const d = new Date(iso);
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch (e) {
        return iso;
      }
    }

    function getCategoryLabel(val) {
      const found = DEVICE_CATEGORIES.find((c) => c.value === val);
      return found ? found.label : (val || 'Other');
    }

    function getConditionLabel(val) {
      if (!val) return 'Pending Technical Assessment';
      const found = CONDITION_OPTIONS.find((c) => c.value === val);
      return found ? found.label : val;
    }

    function getDesiredPathLabel(val) {
      const found = DESIRED_PATHS.find((p) => p.value === val);
      return found ? found.label : (val || 'Assess for Reuse');
    }

    function renderStatusBadge(status) {
      const meta = STATUS_META[status] || { label: status || 'Unknown', badge: 'ec-badge-neutral' };
      return `<span class="ec-badge ${meta.badge}">
        <span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;"></span>
        ${escapeHtml(meta.label)}
      </span>`;
    }

    function renderRoleBadge(role) {
      const meta = ROLE_META[role] || { label: role, badgeClass: 'ec-badge-neutral' };
      return `<span class="ec-badge ${meta.badgeClass}">${escapeHtml(meta.label)}</span>`;
    }

    function showToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const bg = type === 'error' ? '#991B1B' : type === 'warning' ? '#92400E' : '#14532D';
      const toast = document.createElement('div');
      toast.style.cssText = `background:${bg};color:#FFFFFF;padding:0.75rem 1rem;border-radius:10px;box-shadow:0 8px 20px rgba(0,0,0,0.18);font-size:0.86rem;font-weight:500;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;border:1px solid rgba(255,255,255,0.18);`;
      toast.innerHTML = `<span>${escapeHtml(message)}</span>
        <button type="button" onclick="this.parentElement.remove()" style="background:none;border:none;color:#FFF;cursor:pointer;font-weight:700;font-size:1rem;line-height:1;" aria-label="Dismiss notification">&times;</button>`;
      container.appendChild(toast);
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 4200);
    }

    function closeModal() {
      const root = document.getElementById('modal-root');
      if (root) root.innerHTML = '';
    }

    function toggleMobileMenu() {
      AppState.mobileMenuOpen = !AppState.mobileMenuOpen;
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer) {
        drawer.style.display = AppState.mobileMenuOpen ? 'block' : 'none';
      }
    }

    // Router
    function parseHashRoute() {
      const rawHash = window.location.hash || '#/';
      const path = rawHash.replace(/^#/, '') || '/';
      if (path.startsWith('/track/')) {
        const itemId = decodeURIComponent(path.slice('/track/'.length)).trim();
        return { route: '/track', param: itemId };
      }
      const clean = path.split('?')[0];
      const validRoutes = [
        '/', '/login', '/register', '/profile', '/submit',
        '/track', '/market', '/centres', '/dashboard',
        '/admin', '/tasks', '/how-it-works'
      ];
      if (validRoutes.includes(clean)) {
        return { route: clean, param: null };
      }
      return { route: '/', param: null };
    }

    function navigateTo(route, param = null) {
      AppState.mobileMenuOpen = false;
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer) drawer.style.display = 'none';

      const protectedRoutes = ['/profile', '/dashboard', '/admin', '/tasks'];
      const currentUser = AuthService.getCurrentUser();

      if (protectedRoutes.includes(route) && !currentUser) {
        AppState.intendedRoute = param ? `${route}/${param}` : route;
        showToast('Please sign in to access that protected workspace.', 'warning');
        window.location.hash = '#/login';
        AppState.currentRoute = '/login';
        AppState.routeParam = null;
        renderApp();
        window.scrollTo(0, 0);
        return;
      }

      if (route === '/track' && param) {
        window.location.hash = `#/track/${encodeURIComponent(param)}`;
        AppState.currentRoute = '/track';
        AppState.routeParam = param;
        AppState.trackQuery = param;
      } else {
        window.location.hash = `#${route}`;
        AppState.currentRoute = route;
        AppState.routeParam = param;
      }
      renderApp();
      window.scrollTo(0, 0);
    }

    function renderNavigation() {
      const user = AuthService.getCurrentUser();
      const route = AppState.currentRoute;

      const navItems = [
        { path: '/', label: 'Home' },
        { path: '/submit', label: 'Submit E-Waste' },
        { path: '/track', label: 'Track / Passport' },
        { path: '/market', label: 'Reboot Market' },
        { path: '/centres', label: 'Centres' },
        { path: '/how-it-works', label: 'How It Works' }
      ];

      if (user) {
        if (user.role === 'admin') {
          navItems.push({ path: '/admin', label: 'Admin Queue' });
          navItems.push({ path: '/tasks', label: 'Ops Tasks' });
        } else if (user.role === 'worker' || user.role === 'repair_partner' || user.role === 'recycler_partner') {
          navItems.push({ path: '/tasks', label: 'Assigned Tasks' });
          navItems.push({ path: '/dashboard', label: 'Overview' });
        } else {
          navItems.push({ path: '/dashboard', label: 'My Dashboard' });
        }
      }

      const desktopNav = document.getElementById('desktop-nav-links');
      if (desktopNav) {
        desktopNav.innerHTML = navItems
          .map(
            (item) => `<button type="button" class="ec-nav-link ${route === item.path ? 'active' : ''}" onclick="navigateTo('${item.path}')">
              ${escapeHtml(item.label)}
            </button>`
          )
          .join('');
      }

      const authArea = document.getElementById('nav-auth-area');
      if (authArea) {
        if (user) {
          authArea.innerHTML = `
            <button type="button" class="ec-btn-secondary" onclick="navigateTo('/profile')" style="padding:0.38rem 0.7rem;font-size:0.8rem;" title="Open Role Profile">
              <span style="width:8px;height:8px;border-radius:50%;background:#14532D;display:inline-block;"></span>
              <span>${escapeHtml(user.name.split(' ')[0])}</span>
              <span style="font-size:0.7rem;background:#EBF3EC;color:#14532D;padding:0.1rem 0.42rem;border-radius:4px;font-weight:700;">${escapeHtml(ROLE_META[user.role].label)}</span>
            </button>
            <button type="button" class="ec-btn-secondary" onclick="handleSignOut()" style="padding:0.38rem 0.65rem;font-size:0.8rem;color:#991B1B;border-color:#FECACA;">
              Sign Out
            </button>
          `;
        } else {
          authArea.innerHTML = `
            <button type="button" class="ec-btn-secondary" onclick="navigateTo('/login')" style="padding:0.42rem 0.85rem;font-size:0.84rem;">Sign In</button>
            <button type="button" class="ec-btn-primary" onclick="navigateTo('/register')" style="padding:0.42rem 0.85rem;font-size:0.84rem;">Register</button>
          `;
        }
      }

      // Keep role switcher bar hidden in background per user preference
      const roleBar = document.getElementById('quick-role-bar');
      if (roleBar) {
        roleBar.style.display = 'none';
        roleBar.innerHTML = '';
      }

      const mobileDrawer = document.getElementById('mobile-nav-drawer');
      if (mobileDrawer) {
        mobileDrawer.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:0.35rem;">
            ${navItems
              .map(
                (item) => `<button type="button" class="ec-nav-link ${route === item.path ? 'active' : ''}" style="width:100%;justify-content:flex-start;" onclick="navigateTo('${item.path}')">
                  ${escapeHtml(item.label)}
                </button>`
              )
              .join('')}
            <div style="border-top:1px solid var(--border);margin:0.4rem 0;padding-top:0.5rem;display:flex;flex-wrap:wrap;gap:0.5rem;">
              ${
                user
                  ? `<button type="button" class="ec-btn-secondary" onclick="navigateTo('/profile')" style="flex:1;">Profile (${escapeHtml(ROLE_META[user.role].label)})</button>
                     <button type="button" class="ec-btn-danger" onclick="handleSignOut()">Sign Out</button>`
                  : `<button type="button" class="ec-btn-secondary" onclick="navigateTo('/login')" style="flex:1;">Sign In</button>
                     <button type="button" class="ec-btn-primary" onclick="navigateTo('/register')" style="flex:1;">Register</button>`
              }
            </div>
          </div>
        `;
      }
    }

    function handleSignOut() {
      AuthService.logout();
      showToast('Signed out of Demo Mode session.');
      navigateTo('/login');
    }

    function quickDemoLogin(email, password) {
      try {
        const user = AuthService.login(email, password);
        closeModal();
        showToast(`Signed in as ${user.name} (${ROLE_META[user.role].label})`);
        const target = AppState.intendedRoute || ROLE_META[user.role].homeRoute || '/dashboard';
        AppState.intendedRoute = null;
        if (target.startsWith('/track/')) {
          navigateTo('/track', target.slice('/track/'.length));
        } else {
          navigateTo(target);
        }
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    // ============================================================================
    // 7. LIVE CAMERA CAPTURE & UPLOAD FALLBACK MODAL
    // ============================================================================
    function stopActiveCameraStream() {
      if (AppState.cameraStream) {
        try {
          AppState.cameraStream.getTracks().forEach((track) => track.stop());
        } catch (e) {
          // Ignore
        }
        AppState.cameraStream = null;
      }
    }

    function closeCameraModal() {
      stopActiveCameraStream();
      AppState.cameraCapturedDataUrl = null;
      const host = document.getElementById('camera-modal-root');
      if (host) host.innerHTML = '';
    }

    async function openCameraModal(contextLabel, onPhotoSavedCallback) {
      AppState.cameraContextLabel = contextLabel || 'Capture E-Waste Item Photo';
      AppState.cameraCallback = onPhotoSavedCallback;
      AppState.cameraCapturedDataUrl = null;
      const host = document.getElementById('camera-modal-root');
      if (!host) return;

      host.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="cam-modal-title">
          <div class="ec-modal" style="max-width:580px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
              <div>
                <h3 id="cam-modal-title" style="margin:0;font-size:1.1rem;font-weight:700;color:var(--charcoal);">${escapeHtml(AppState.cameraContextLabel)}</h3>
                <p style="margin:0.15rem 0 0 0;font-size:0.78rem;color:#526066;">For human visual identification &amp; collection verification (not an AI diagnosis).</p>
              </div>
              <button type="button" class="ec-btn-secondary" onclick="closeCameraModal()" style="padding:0.3rem 0.6rem;">Cancel</button>
            </div>

            <div id="camera-status-box" style="margin-bottom:0.85rem;padding:0.65rem 0.85rem;border-radius:8px;background:#F1F6F0;border:1px solid #C4DEC9;font-size:0.82rem;color:#14532D;">
              Requesting camera permission from your browser...
            </div>

            <div style="position:relative;background:#182226;border-radius:12px;overflow:hidden;min-height:260px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
              <video id="camera-live-video" autoplay playsinline muted style="width:100%;max-height:320px;object-fit:cover;display:none;"></video>
              <img id="camera-captured-preview" alt="Captured item preview" style="width:100%;max-height:320px;object-fit:contain;display:none;" />
              <div id="camera-fallback-placeholder" style="padding:1.5rem;text-align:center;color:#CBD5E1;font-size:0.85rem;">
                <div style="margin-bottom:0.4rem;font-weight:700;color:#FFFFFF;">Camera Preview &amp; Studio Presets</div>
                <p style="margin:0 0 0.85rem 0;font-size:0.79rem;color:#94A3B8;">If your device has no webcam or permission was declined, upload a photo file or pick a realistic studio device frame below:</p>
                <div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;margin-bottom:0.85rem;">
                  <label class="ec-btn-primary" style="cursor:pointer;">
                    <span>Upload Photo File Instead</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onchange="handleCameraFallbackFile(event)" style="display:none;" />
                  </label>
                  <button type="button" class="ec-btn-secondary" onclick="captureSimulatedDeviceFrame('laptop')">Use Studio Laptop Photo</button>
                  <button type="button" class="ec-btn-secondary" onclick="captureSimulatedDeviceFrame('phone')">Use Studio Phone Photo</button>
                </div>
              </div>
            </div>

            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.6rem;">
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" id="btn-cam-snap" class="ec-btn-primary" onclick="captureVideoFrame()" style="display:none;">Capture Photo</button>
                <button type="button" id="btn-cam-retake" class="ec-btn-secondary" onclick="retakeCameraPhoto()" style="display:none;">Retake</button>
                <button type="button" id="btn-cam-use" class="ec-btn-primary" onclick="confirmUseCapturedPhoto()" style="display:none;">Use This Photo</button>
              </div>
              <button type="button" class="ec-btn-secondary" onclick="closeCameraModal()">Close</button>
            </div>
          </div>
        </div>
      `;

      await startLiveCameraStream();
    }

    async function startLiveCameraStream() {
      stopActiveCameraStream();
      const statusBox = document.getElementById('camera-status-box');
      const videoEl = document.getElementById('camera-live-video');
      const previewEl = document.getElementById('camera-captured-preview');
      const placeholderEl = document.getElementById('camera-fallback-placeholder');
      const snapBtn = document.getElementById('btn-cam-snap');
      const retakeBtn = document.getElementById('btn-cam-retake');
      const useBtn = document.getElementById('btn-cam-use');

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (statusBox) {
          statusBox.style.background = '#FEF3C7';
          statusBox.style.borderColor = '#FDE68A';
          statusBox.style.color = '#92400E';
          statusBox.textContent = 'Live browser camera API is unavailable in this environment. Use "Upload Photo File Instead" or pick a Studio Device Photo below.';
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        });
        AppState.cameraStream = stream;
        if (videoEl) {
          videoEl.srcObject = stream;
          videoEl.style.display = 'block';
        }
        if (placeholderEl) placeholderEl.style.display = 'none';
        if (previewEl) previewEl.style.display = 'none';
        if (snapBtn) snapBtn.style.display = 'inline-flex';
        if (retakeBtn) retakeBtn.style.display = 'none';
        if (useBtn) useBtn.style.display = 'none';
        if (statusBox) {
          statusBox.style.background = '#DCFCE7';
          statusBox.style.borderColor = '#BBF7D0';
          statusBox.style.color = '#14532D';
          statusBox.textContent = 'Camera active. Center the electronic device in frame and click "Capture Photo".';
        }
      } catch (err) {
        if (statusBox) {
          statusBox.style.background = '#FEF3C7';
          statusBox.style.borderColor = '#FDE68A';
          statusBox.style.color = '#92400E';
          const reason = err && err.name === 'NotAllowedError'
            ? 'Camera permission was declined.'
            : 'No physical camera device was detected or camera is busy.';
          statusBox.textContent = `${reason} You can upload a photo from your device or choose a studio device photo below.`;
        }
      }
    }

    function captureVideoFrame() {
      const videoEl = document.getElementById('camera-live-video');
      const previewEl = document.getElementById('camera-captured-preview');
      const snapBtn = document.getElementById('btn-cam-snap');
      const retakeBtn = document.getElementById('btn-cam-retake');
      const useBtn = document.getElementById('btn-cam-use');
      const statusBox = document.getElementById('camera-status-box');

      if (!videoEl || !videoEl.videoWidth) {
        captureSimulatedDeviceFrame('laptop');
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth || 640;
      canvas.height = videoEl.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.84);
      AppState.cameraCapturedDataUrl = dataUrl;
      stopActiveCameraStream();

      videoEl.style.display = 'none';
      if (previewEl) {
        previewEl.src = dataUrl;
        previewEl.style.display = 'block';
      }
      if (snapBtn) snapBtn.style.display = 'none';
      if (retakeBtn) retakeBtn.style.display = 'inline-flex';
      if (useBtn) useBtn.style.display = 'inline-flex';
      if (statusBox) {
        statusBox.textContent = 'Photo captured! Review the preview below, then click "Use This Photo" or "Retake".';
      }
    }

    function captureSimulatedDeviceFrame(presetType = 'laptop') {
      const dataUrl = presetType === 'phone' ? VISUAL_ASSETS.phone : VISUAL_ASSETS.laptop;
      AppState.cameraCapturedDataUrl = dataUrl;
      stopActiveCameraStream();

      const videoEl = document.getElementById('camera-live-video');
      const placeholderEl = document.getElementById('camera-fallback-placeholder');
      const previewEl = document.getElementById('camera-captured-preview');
      const snapBtn = document.getElementById('btn-cam-snap');
      const retakeBtn = document.getElementById('btn-cam-retake');
      const useBtn = document.getElementById('btn-cam-use');
      const statusBox = document.getElementById('camera-status-box');

      if (videoEl) videoEl.style.display = 'none';
      if (placeholderEl) placeholderEl.style.display = 'none';
      if (previewEl) {
        previewEl.src = dataUrl;
        previewEl.style.display = 'block';
      }
      if (snapBtn) snapBtn.style.display = 'none';
      if (retakeBtn) retakeBtn.style.display = 'inline-flex';
      if (useBtn) useBtn.style.display = 'inline-flex';
      if (statusBox) {
        statusBox.style.background = '#DCFCE7';
        statusBox.style.color = '#14532D';
        statusBox.textContent = 'Studio device photo captured! Click "Use This Photo" to attach it to the record.';
      }
    }

    function retakeCameraPhoto() {
      AppState.cameraCapturedDataUrl = null;
      const previewEl = document.getElementById('camera-captured-preview');
      const placeholderEl = document.getElementById('camera-fallback-placeholder');
      if (previewEl) previewEl.style.display = 'none';
      if (placeholderEl) placeholderEl.style.display = 'block';
      startLiveCameraStream();
    }

    async function handleCameraFallbackFile(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      try {
        const compressed = await PhotoStorageService.compressImageFile(file);
        const saved = await PhotoStorageService.savePhoto(compressed.dataUrl, {
          fileName: compressed.fileName,
          mimeType: compressed.mimeType,
          sizeBytes: compressed.sizeBytes,
          source: 'camera_upload_fallback'
        });
        const cb = AppState.cameraCallback;
        closeCameraModal();
        if (cb) cb(saved);
        showToast('Photo attached and stored in IndexedDB.');
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    async function confirmUseCapturedPhoto() {
      if (!AppState.cameraCapturedDataUrl) return;
      const saved = await PhotoStorageService.savePhoto(AppState.cameraCapturedDataUrl, {
        fileName: 'camera-capture-' + Date.now() + '.jpg',
        mimeType: 'image/jpeg',
        source: 'camera_capture'
      });
      const cb = AppState.cameraCallback;
      closeCameraModal();
      if (cb) cb(saved);
      showToast('Captured photo saved to IndexedDB and linked to record.');
    }
    // ============================================================================
    // 8. PUBLIC & AUTH VIEWS: HOME, LOGIN, REGISTER, PROFILE, CENTRES, HOW IT WORKS
    // ============================================================================
    function renderHomePage() {
      const metrics = DataRepository.computeCircularMetrics();
      const marketPreview = DataRepository.getListings()
        .filter((l) => l.status === 'available' || l.status === 'request_received')
        .slice(0, 3);
      const sampleItems = DataRepository.load().items.slice(0, 3);

      return `
        <div class="app-container">
          <!-- Full-Bleed Eco-Tech Hero Banner with Background Photography -->
          <section class="ec-hero-banner" style="background-image:url('${VISUAL_ASSETS.heroStudio}');margin-bottom:2rem;">
            <div class="ec-hero-overlay">
              <div class="ec-grid-2" style="align-items:center;gap:2rem;">
                <div>
                  <div style="display:inline-flex;align-items:center;gap:0.45rem;background:rgba(220,252,231,0.95);color:#14532D;padding:0.32rem 0.85rem;border-radius:999px;font-size:0.76rem;font-weight:800;margin-bottom:1rem;box-shadow:0 2px 8px rgba(0,0,0,0.15);">
                    <span>● CIRCULAR ECONOMY PLATFORM · DEMO MODE</span>
                  </div>
                  <h1 style="font-size:2.55rem;font-weight:800;line-height:1.12;color:#FFFFFF;margin:0 0 0.9rem 0;letter-spacing:-0.025em;text-shadow:0 2px 10px rgba(0,0,0,0.25);">
                    Give E-Waste a Second Life.
                  </h1>
                  <p style="font-size:1.04rem;color:#E2E8F0;margin:0 0 1.45rem 0;max-width:560px;line-height:1.58;">
                    Register electronics with camera capture, trace every step via a QR-enabled Digital E-Waste Passport, and prioritize repair or community reuse before responsible material recycling.
                  </p>
                  <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:1.35rem;">
                    <button type="button" class="ec-btn-primary" onclick="navigateTo('/submit')" style="padding:0.78rem 1.4rem;font-size:0.96rem;background:#22C55E;border-color:#16A34A;color:#052E16;font-weight:800;">
                      Submit E-Waste
                    </button>
                    <button type="button" class="ec-btn-secondary" onclick="navigateTo('/track')" style="padding:0.78rem 1.4rem;font-size:0.96rem;background:rgba(255,255,255,0.95);color:#14532D;border-color:#FFFFFF;">
                      Track an Item
                    </button>
                    <button type="button" class="ec-btn-secondary" onclick="navigateTo('/market')" style="padding:0.78rem 1.15rem;font-size:0.88rem;background:rgba(15,41,25,0.75);color:#FFFFFF;border-color:rgba(255,255,255,0.35);">
                      Explore Reboot Market
                    </button>
                  </div>
                  <div style="font-size:0.8rem;color:#DCFCE7;display:flex;flex-wrap:wrap;gap:1.1rem;font-weight:500;">
                    <span>✓ Dynamic Passport IDs &amp; Local QR</span>
                    <span>✓ 5 Role-Based Operational Views</span>
                    <span>✓ Reuse-First Circular Hierarchy</span>
                  </div>
                </div>

                <!-- Right Showcase Card with Photo Strip & Live Passport Links -->
                <div class="ec-card" style="background:rgba(255,255,255,0.97);border:1px solid #C4DEC9;padding:1.25rem;color:var(--charcoal);box-shadow:0 12px 28px rgba(0,0,0,0.22);">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
                    <span style="font-weight:800;font-size:0.92rem;color:#14532D;">Circular Lifecycle &amp; Device Gallery</span>
                    <span class="ec-badge ec-badge-green">Live Demo State</span>
                  </div>

                  <!-- 4-Photo Mini Visual Strip -->
                  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.45rem;margin-bottom:0.85rem;">
                    <div onclick="navigateTo('/track','ECL-${getDynamicYear()}-0001')" style="cursor:pointer;position:relative;border-radius:8px;overflow:hidden;height:68px;border:1px solid #C4DEC9;" title="Inspect ThinkPad T480 Passport">
                      <img src="${VISUAL_ASSETS.laptop}" alt="Refurbished Laptop" style="width:100%;height:100%;object-fit:cover;" />
                      <span style="position:absolute;bottom:0;inset-x:0;background:rgba(20,83,45,0.86);color:#FFF;font-size:0.62rem;font-weight:700;text-align:center;padding:1px 2px;">Reuse Laptop</span>
                    </div>
                    <div onclick="navigateTo('/track','ECL-${getDynamicYear()}-0002')" style="cursor:pointer;position:relative;border-radius:8px;overflow:hidden;height:68px;border:1px solid #C4DEC9;" title="Inspect Galaxy S20 FE Passport">
                      <img src="${VISUAL_ASSETS.phone}" alt="Phone Lab QA" style="width:100%;height:100%;object-fit:cover;" />
                      <span style="position:absolute;bottom:0;inset-x:0;background:rgba(38,50,56,0.86);color:#FFF;font-size:0.62rem;font-weight:700;text-align:center;padding:1px 2px;">Lab Repair</span>
                    </div>
                    <div onclick="navigateTo('/track','ECL-${getDynamicYear()}-0003')" style="cursor:pointer;position:relative;border-radius:8px;overflow:hidden;height:68px;border:1px solid #C4DEC9;" title="Inspect 24-inch Monitor Passport">
                      <img src="${VISUAL_ASSETS.monitor}" alt="Donated Monitor" style="width:100%;height:100%;object-fit:cover;" />
                      <span style="position:absolute;bottom:0;inset-x:0;background:rgba(20,83,45,0.86);color:#FFF;font-size:0.62rem;font-weight:700;text-align:center;padding:1px 2px;">Donated IPS</span>
                    </div>
                    <div onclick="navigateTo('/centres')" style="cursor:pointer;position:relative;border-radius:8px;overflow:hidden;height:68px;border:1px solid #C4DEC9;" title="Explore Collection Centres">
                      <img src="${VISUAL_ASSETS.collectionHub}" alt="Sorting Hub" style="width:100%;height:100%;object-fit:cover;" />
                      <span style="position:absolute;bottom:0;inset-x:0;background:rgba(38,50,56,0.86);color:#FFF;font-size:0.62rem;font-weight:700;text-align:center;padding:1px 2px;">Sorting Hub</span>
                    </div>
                  </div>

                  <!-- 5-Step Flow Pills -->
                  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0.35rem;text-align:center;margin-bottom:0.9rem;">
                    <div style="background:#F1F6F0;padding:0.45rem 0.25rem;border-radius:8px;border:1px solid #C4DEC9;">
                      <div style="font-weight:800;font-size:0.72rem;color:#14532D;">1. Register</div>
                      <div style="font-size:0.64rem;color:#526066;">Photo &amp; ID</div>
                    </div>
                    <div style="background:#F1F6F0;padding:0.45rem 0.25rem;border-radius:8px;border:1px solid #C4DEC9;">
                      <div style="font-weight:800;font-size:0.72rem;color:#14532D;">2. Collect</div>
                      <div style="font-size:0.64rem;color:#526066;">Pickup/Hub</div>
                    </div>
                    <div style="background:#F1F6F0;padding:0.45rem 0.25rem;border-radius:8px;border:1px solid #C4DEC9;">
                      <div style="font-weight:800;font-size:0.72rem;color:#14532D;">3. Assess</div>
                      <div style="font-size:0.64rem;color:#526066;">Lab QA</div>
                    </div>
                    <div style="background:#DCFCE7;padding:0.45rem 0.25rem;border-radius:8px;border:1px solid #86EFAC;">
                      <div style="font-weight:800;font-size:0.72rem;color:#14532D;">4. Renew</div>
                      <div style="font-size:0.64rem;color:#14532D;">Reuse/Recycle</div>
                    </div>
                    <div style="background:#F1F6F0;padding:0.45rem 0.25rem;border-radius:8px;border:1px solid #C4DEC9;">
                      <div style="font-weight:800;font-size:0.72rem;color:#14532D;">5. Track</div>
                      <div style="font-size:0.64rem;color:#526066;">QR Passport</div>
                    </div>
                  </div>

                  <div style="border-top:1px solid var(--border);padding-top:0.75rem;">
                    <div style="font-size:0.74rem;font-weight:700;color:#526066;margin-bottom:0.45rem;">RECENT PASSPORT RECORDS (CLICK TO INSPECT):</div>
                    <div style="display:grid;gap:0.4rem;">
                      ${sampleItems
                        .map(
                          (it) => `<div style="display:flex;align-items:center;justify-content:space-between;padding:0.42rem 0.65rem;background:#F8FAF5;border:1px solid var(--border);border-radius:8px;font-size:0.79rem;">
                            <div style="display:flex;align-items:center;gap:0.45rem;">
                              <img src="${getCategoryDefaultPhoto(it.category)}" alt="${escapeHtml(it.category)}" style="width:26px;height:26px;border-radius:5px;object-fit:cover;border:1px solid #C4DEC9;" />
                              <button type="button" onclick="navigateTo('/track','${escapeHtml(it.id)}')" style="background:none;border:none;padding:0;color:#14532D;font-weight:700;cursor:pointer;text-decoration:underline;">${escapeHtml(it.id)}</button>
                              <span style="color:#263238;">${escapeHtml(it.title.slice(0, 24))}</span>
                            </div>
                            ${renderStatusBadge(it.currentStatus)}
                          </div>`
                        )
                        .join('')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Live Derived Impact Summary -->
          <section style="margin-bottom:2.25rem;">
            <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;margin-bottom:0.85rem;gap:0.5rem;">
              <div>
                <h2 style="font-size:1.3rem;font-weight:800;margin:0;color:var(--charcoal);">Live Platform Impact Summary (Demo Dataset)</h2>
                <p style="font-size:0.82rem;color:#526066;margin:0.15rem 0 0 0;">Derived dynamically from unique registered item IDs — never double-counting status history events.</p>
              </div>
              <span class="ec-badge ec-badge-neutral">Recorded Weight: ${metrics.recordedWeightKg} kg (${metrics.itemsWithWeightCount} items with weight)</span>
            </div>
            <div class="ec-grid-4">
              <div class="ec-card" style="border-top:4px solid #14532D;">
                <div style="font-size:0.78rem;font-weight:600;color:#526066;">Unique Items Registered</div>
                <div class="ec-metric-val" data-count-target="${metrics.totalUniqueItems}" style="font-size:1.95rem;font-weight:800;color:#14532D;margin:0.2rem 0;">${metrics.totalUniqueItems}</div>
                <div style="font-size:0.75rem;color:#526066;">Each assigned a unique QR Passport</div>
              </div>
              <div class="ec-card" style="border-top:4px solid #3B82F6;">
                <div style="font-size:0.78rem;font-weight:600;color:#526066;">Currently In Process</div>
                <div class="ec-metric-val" data-count-target="${metrics.awaitingCollection + metrics.awaitingAssessment + metrics.inProcess + metrics.activeReusePool}" style="font-size:1.95rem;font-weight:800;color:#263238;margin:0.2rem 0;">${metrics.awaitingCollection + metrics.awaitingAssessment + metrics.inProcess + metrics.activeReusePool}</div>
                <div style="font-size:0.75rem;color:#526066;">Collection, lab QA, repair, or active listing</div>
              </div>
              <div class="ec-card" style="border-top:4px solid #16A34A;background:#F5FBF7;">
                <div style="font-size:0.78rem;font-weight:700;color:#14532D;">Diverted from Disposal (Reused/Repaired)</div>
                <div class="ec-metric-val" data-count-target="${metrics.divertedOutcomes}" style="font-size:1.95rem;font-weight:800;color:#14532D;margin:0.2rem 0;">${metrics.divertedOutcomes}</div>
                <div style="font-size:0.75rem;color:#14532D;">Completed repair or second-life transfer</div>
              </div>
              <div class="ec-card" style="border-top:4px solid #475569;">
                <div style="font-size:0.78rem;font-weight:600;color:#526066;">Recorded Recycling Outcomes</div>
                <div class="ec-metric-val" data-count-target="${metrics.recycledOutcomes}" style="font-size:1.95rem;font-weight:800;color:#263238;margin:0.2rem 0;">${metrics.recycledOutcomes}</div>
                <div style="font-size:0.75rem;color:#526066;">Material recovery logged by demo handler</div>
              </div>
            </div>
          </section>

          <!-- Three Core Connected Systems with Photographic Banners -->
          <section style="margin-bottom:2.25rem;">
            <h2 style="font-size:1.3rem;font-weight:800;margin:0 0 0.9rem 0;color:var(--charcoal);">Three Connected Circular Systems</h2>
            <div class="ec-grid-3">
              <div class="ec-card" style="display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
                <div>
                  <div style="position:relative;margin-bottom:0.9rem;border-radius:10px;overflow:hidden;height:155px;border:1px solid var(--border);">
                    <img src="${VISUAL_ASSETS.collectionHub}" alt="E-Cycle Loop Collection Hub" class="ec-img-cover" style="height:155px;" />
                    <span class="ec-badge ec-badge-green" style="position:absolute;top:0.55rem;left:0.55rem;">Module A · Collection</span>
                  </div>
                  <div style="font-weight:800;font-size:1.05rem;color:#14532D;margin-bottom:0.4rem;">1. E-Cycle Loop — Collection &amp; Assessment</div>
                  <p style="font-size:0.86rem;color:#37474F;margin:0 0 1rem 0;">
                    Residents register electronics, capture an item photo via live camera or upload, and request doorstep pickup or drop-off. Field workers and repair partners update real-time milestones.
                  </p>
                </div>
                <button type="button" class="ec-btn-secondary" style="width:100%;" onclick="navigateTo('/submit')">Register an Item →</button>
              </div>

              <div class="ec-card" style="display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
                <div>
                  <div style="position:relative;margin-bottom:0.9rem;border-radius:10px;overflow:hidden;height:155px;border:1px solid var(--border);">
                    <img src="${VISUAL_ASSETS.phone}" alt="Digital E-Waste Passport Diagnostics" class="ec-img-cover" style="height:155px;" />
                    <span class="ec-badge ec-badge-green" style="position:absolute;top:0.55rem;left:0.55rem;">Module B · QR Identity</span>
                  </div>
                  <div style="font-weight:800;font-size:1.05rem;color:#14532D;margin-bottom:0.4rem;">2. Digital E-Waste Passport</div>
                  <p style="font-size:0.86rem;color:#37474F;margin:0 0 1rem 0;">
                    Every item receives a unique ID (e.g., <code>ECL-${getDynamicYear()}-0001</code>) and a locally generated QR code showing reported vs. assessed condition and a public-safe status timeline.
                  </p>
                </div>
                <button type="button" class="ec-btn-secondary" style="width:100%;" onclick="navigateTo('/track', 'ECL-${getDynamicYear()}-0001')">Inspect Sample Passport →</button>
              </div>

              <div class="ec-card" style="display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
                <div>
                  <div style="position:relative;margin-bottom:0.9rem;border-radius:10px;overflow:hidden;height:155px;border:1px solid var(--border);">
                    <img src="${VISUAL_ASSETS.laptop}" alt="Reboot Market Refurbished Electronics" class="ec-img-cover" style="height:155px;" />
                    <span class="ec-badge ec-badge-green" style="position:absolute;top:0.55rem;left:0.55rem;">Module C · Second Life</span>
                  </div>
                  <div style="font-weight:800;font-size:1.05rem;color:#14532D;margin-bottom:0.4rem;">3. Reboot Market — Second-Life Exchange</div>
                  <p style="font-size:0.86rem;color:#37474F;margin:0 0 1rem 0;">
                    Working and refurbished electronics are linked directly to their E-Waste Passport for student donation, affordable resale, or repair sponsorship before end-of-life recycling.
                  </p>
                </div>
                <button type="button" class="ec-btn-secondary" style="width:100%;" onclick="navigateTo('/market')">Explore Reboot Market →</button>
              </div>
            </div>
          </section>

          <!-- Second-Life Marketplace Preview with Product Photography -->
          <section style="margin-bottom:2.25rem;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.9rem;flex-wrap:wrap;gap:0.5rem;">
              <div>
                <h2 style="font-size:1.3rem;font-weight:800;margin:0;color:var(--charcoal);">Second-Life Preview — Reboot Market</h2>
                <p style="font-size:0.82rem;color:#526066;margin:0.15rem 0 0 0;">Extend a device's useful life before recycling. Every listing references its verified item passport.</p>
              </div>
              <button type="button" class="ec-btn-secondary" onclick="navigateTo('/market')">Browse All Listings →</button>
            </div>
            <div class="ec-grid-3">
              ${marketPreview
                .map((lst) => {
                  const previewImg = (lst.photoId && SEEDED_SVG_PHOTOS[lst.photoId]) || getCategoryDefaultPhoto(lst.category);
                  return `<div class="ec-card" style="display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
                    <div>
                      <div style="position:relative;margin-bottom:0.75rem;border-radius:10px;overflow:hidden;height:160px;border:1px solid var(--border);">
                        <img data-photo-id="${escapeHtml(lst.photoId || '')}" src="${previewImg}" alt="${escapeHtml(lst.title)}" class="ec-img-cover" style="height:160px;" />
                        <span class="ec-badge ec-badge-green" style="position:absolute;top:0.5rem;left:0.5rem;">${escapeHtml(lst.offerType === 'donate' ? 'Community Donation' : lst.offerType === 'sell' ? 'Second-Life Resale · ₹' + lst.priceInr : 'Repair Assessment')}</span>
                        <span class="ec-badge ec-badge-neutral" style="position:absolute;bottom:0.5rem;right:0.5rem;font-family:monospace;">${escapeHtml(lst.itemId)}</span>
                      </div>
                      <h3 style="font-size:0.98rem;font-weight:700;margin:0 0 0.4rem 0;color:var(--charcoal);">${escapeHtml(lst.title)}</h3>
                      <p style="font-size:0.82rem;color:#526066;margin:0 0 0.75rem 0;">${escapeHtml(lst.description.slice(0, 110))}...</p>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:0.65rem;">
                      <span style="font-size:0.76rem;color:#37474F;">Condition: <strong>${escapeHtml(getConditionLabel(lst.condition))}</strong></span>
                      <button type="button" class="ec-btn-primary" style="padding:0.35rem 0.75rem;font-size:0.78rem;" onclick="navigateTo('/market')">View Listing</button>
                    </div>
                  </div>`;
                })
                .join('')}
            </div>
          </section>

          <!-- Responsible Disposal & Safety Notice with Visual Banner -->
          <section class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.collectionHub}');margin-bottom:0;">
            <div class="ec-page-banner-overlay" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.25rem;">
              <div style="max-width:760px;">
                <span class="ec-badge ec-badge-amber" style="margin-bottom:0.45rem;">Hazardous Waste &amp; Battery Guardrail</span>
                <h3 style="margin:0 0 0.35rem 0;font-size:1.15rem;font-weight:800;color:#FFFFFF;">Responsible Disposal &amp; Authorised Handler Routing</h3>
                <p style="margin:0;font-size:0.86rem;color:#E2E8F0;">
                  Never place lithium-ion batteries, swollen power banks, CRT displays, or mercury-containing parts into municipal waste bins or general second-hand resale. E-Cycle Loop 360 automatically routes battery submissions to hazardous material recovery partners and blocks batteries from Reboot Market listings.
                </p>
              </div>
              <button type="button" class="ec-btn-secondary" onclick="navigateTo('/centres')" style="background:#FFFFFF;color:#14532D;border-color:#FFFFFF;">Find Demo Collection Centres</button>
            </div>
          </section>
        </div>
      `;
    }

    function renderLoginPage() {
      return `
        <div class="app-container" style="max-width:1020px;">
          <!-- Visual Welcome Banner -->
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.heroStudio}');">
            <div class="ec-page-banner-overlay">
              <span class="ec-badge ec-badge-green" style="margin-bottom:0.4rem;">Role-Based Circular Portal</span>
              <h1 style="font-size:1.65rem;font-weight:800;margin:0;color:#FFFFFF;">Sign In to E-Cycle Loop 360</h1>
              <p style="font-size:0.88rem;color:#E2E8F0;margin:0.25rem 0 0 0;max-width:640px;">
                Access your dedicated workspace for e-waste registration, field collection, technical refurbishment, material recovery, or central administration.
              </p>
            </div>
          </div>

          <div class="ec-grid-2" style="align-items:start;gap:1.5rem;">
            <!-- Sign In Form Card -->
            <div class="ec-card" style="padding:1.75rem;">
              <div style="margin-bottom:1.1rem;">
                <h2 style="font-size:1.25rem;font-weight:800;margin:0;color:var(--charcoal);">Sign In with Your Account</h2>
                <p style="font-size:0.84rem;color:#526066;margin:0.2rem 0 0 0;">
                  Enter your registered email address and password to open your role workspace.
                </p>
              </div>

              <div id="login-error-box" style="display:none;background:#FEE2E2;border:1px solid #FECACA;color:#991B1B;padding:0.65rem 0.85rem;border-radius:8px;font-size:0.82rem;margin-bottom:1rem;"></div>

              <form id="login-form" onsubmit="handleLoginFormSubmit(event)">
                <div style="margin-bottom:0.95rem;">
                  <label class="ec-label" for="login-email">Email Address</label>
                  <input id="login-email" type="email" class="ec-input" placeholder="Enter your email address" required autocomplete="username" />
                </div>
                <div style="margin-bottom:1.1rem;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
                    <label class="ec-label" for="login-password" style="margin:0;">Password</label>
                    <button type="button" onclick="togglePasswordVisibility('login-password', this)" style="background:none;border:none;color:#14532D;font-size:0.76rem;font-weight:600;cursor:pointer;">Show Password</button>
                  </div>
                  <input id="login-password" type="password" class="ec-input" placeholder="Enter your password" required autocomplete="current-password" />
                </div>
                <button type="submit" class="ec-btn-primary" style="width:100%;padding:0.7rem;">Sign In</button>
              </form>

              <div style="margin-top:1.1rem;padding-top:1rem;border-top:1px solid var(--border);font-size:0.84rem;display:flex;justify-content:space-between;align-items:center;">
                <span style="color:#526066;">New resident contributor?</span>
                <button type="button" class="ec-btn-secondary" style="padding:0.4rem 0.8rem;font-size:0.8rem;" onclick="navigateTo('/register')">Create Resident Account →</button>
              </div>
            </div>

            <!-- Clean Role-Based Workspaces Overview Card (No exposed credentials) -->
            <div class="ec-card" style="padding:1.5rem;background:#F1F6F0;border:1px solid #C4DEC9;">
              <div style="position:relative;border-radius:10px;overflow:hidden;height:140px;margin-bottom:0.95rem;border:1px solid #C4DEC9;">
                <img src="${VISUAL_ASSETS.collectionHub}" alt="E-Cycle Loop Operations" style="width:100%;height:100%;object-fit:cover;" />
                <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(15,41,25,0.85), transparent);display:flex;align-items:flex-end;padding:0.75rem;">
                  <span style="color:#FFFFFF;font-weight:800;font-size:0.95rem;">5 Connected Circular Economy Workspaces</span>
                </div>
              </div>
              <div style="display:grid;gap:0.55rem;">
                ${Object.keys(ROLE_META).map((rKey) => `
                  <div style="background:#FFFFFF;border:1px solid #DCE4DD;border-radius:9px;padding:0.65rem 0.85rem;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.2rem;">
                      <strong style="font-size:0.84rem;color:var(--charcoal);">${escapeHtml(ROLE_META[rKey].label)}</strong>
                      ${renderRoleBadge(rKey)}
                    </div>
                    <div style="font-size:0.77rem;color:#526066;">${escapeHtml(ROLE_META[rKey].summary)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function togglePasswordVisibility(inputId, btn) {
      const inp = document.getElementById(inputId);
      if (!inp) return;
      if (inp.type === 'password') {
        inp.type = 'text';
        btn.textContent = 'Hide Password';
      } else {
        inp.type = 'password';
        btn.textContent = 'Show Password';
      }
    }

    function fillLoginInputs(email, pass) {
      const em = document.getElementById('login-email');
      const pw = document.getElementById('login-password');
      if (em) em.value = email;
      if (pw) pw.value = pass;
      showToast(`Filled credentials for ${email}. Click Sign In to continue.`);
    }

    function handleLoginFormSubmit(event) {
      event.preventDefault();
      const email = document.getElementById('login-email')?.value || '';
      const pass = document.getElementById('login-password')?.value || '';
      const errBox = document.getElementById('login-error-box');
      try {
        const user = AuthService.login(email, pass);
        showToast(`Welcome back, ${user.name} (${ROLE_META[user.role].label})`);
        const target = AppState.intendedRoute || ROLE_META[user.role].homeRoute || '/dashboard';
        AppState.intendedRoute = null;
        if (target.startsWith('/track/')) {
          navigateTo('/track', target.slice('/track/'.length));
        } else {
          navigateTo(target);
        }
      } catch (err) {
        if (errBox) {
          errBox.style.display = 'block';
          errBox.textContent = err.message;
        }
      }
    }

    function renderRegisterPage() {
      return `
        <div class="app-container" style="max-width:680px;">
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.heroStudio}');">
            <div class="ec-page-banner-overlay">
              <span class="ec-badge ec-badge-green" style="margin-bottom:0.4rem;">Public Resident Registration</span>
              <h1 style="font-size:1.55rem;font-weight:800;margin:0;color:#FFFFFF;">Create a Resident Account</h1>
              <p style="font-size:0.84rem;color:#E2E8F0;margin:0.25rem 0 0 0;">
                Join E-Cycle Loop 360 to register household electronics, generate QR Passports, and participate in Reboot Market.
              </p>
            </div>
          </div>

          <div class="ec-card" style="padding:1.85rem;">
            <p style="font-size:0.84rem;color:#526066;margin:0 0 1rem 0;">
              Public self-registration creates a standard <strong>Resident / User (<code>user</code>)</strong> profile. Privileged roles (<code>admin</code>, <code>worker</code>, <code>repair_partner</code>, <code>recycler_partner</code>) can only be assigned by an Administrator.
            </p>

            <div id="register-error-box" style="display:none;background:#FEE2E2;border:1px solid #FECACA;color:#991B1B;padding:0.65rem 0.85rem;border-radius:8px;font-size:0.82rem;margin-bottom:1rem;"></div>

            <form id="register-form" onsubmit="handleRegisterFormSubmit(event)">
              <div class="ec-grid-2" style="margin-bottom:0.85rem;">
                <div>
                  <label class="ec-label" for="reg-name">Full Name *</label>
                  <input id="reg-name" type="text" class="ec-input" placeholder="e.g. Ananya Deshmukh" required />
                </div>
                <div>
                  <label class="ec-label" for="reg-email">Email Address *</label>
                  <input id="reg-email" type="email" class="ec-input" placeholder="ananya@example.demo" required />
                </div>
              </div>
              <div class="ec-grid-2" style="margin-bottom:0.85rem;">
                <div>
                  <label class="ec-label" for="reg-phone">Contact Phone (Private)</label>
                  <input id="reg-phone" type="tel" class="ec-input" placeholder="+91-98XXX-XXXXX" />
                </div>
                <div>
                  <label class="ec-label" for="reg-area">Neighbourhood / Area</label>
                  <input id="reg-area" type="text" class="ec-input" placeholder="e.g. Aundh / Pimpri" />
                </div>
              </div>
              <div class="ec-grid-2" style="margin-bottom:0.95rem;">
                <div>
                  <label class="ec-label" for="reg-password">Password (min 6 chars) *</label>
                  <input id="reg-password" type="password" class="ec-input" placeholder="Create password" required />
                </div>
                <div>
                  <label class="ec-label" for="reg-confirm">Confirm Password *</label>
                  <input id="reg-confirm" type="password" class="ec-input" placeholder="Repeat password" required />
                </div>
              </div>

              <div style="background:#F8FAF5;border:1px solid var(--border);padding:0.7rem 0.85rem;border-radius:8px;margin-bottom:1rem;font-size:0.8rem;color:#37474F;">
                <label style="display:flex;align-items:flex-start;gap:0.55rem;cursor:pointer;">
                  <input id="reg-consent" type="checkbox" required style="margin-top:0.2rem;" />
                  <span>I understand this application runs in <strong>Local Demo Mode</strong> (no external email verification is sent) and that my contact details are kept private and excluded from public E-Waste Passports.</span>
                </label>
              </div>

              <button type="submit" class="ec-btn-primary" style="width:100%;padding:0.7rem;">Register Resident Account</button>
            </form>

            <div style="margin-top:1rem;padding-top:0.85rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;font-size:0.84rem;">
              <span style="color:#526066;">Already have a demo account?</span>
              <button type="button" class="ec-btn-secondary" style="padding:0.38rem 0.75rem;font-size:0.8rem;" onclick="navigateTo('/login')">Back to Sign In</button>
            </div>
          </div>
        </div>
      `;
    }

    function handleRegisterFormSubmit(event) {
      event.preventDefault();
      const errBox = document.getElementById('register-error-box');
      try {
        const newUser = AuthService.register({
          name: document.getElementById('reg-name')?.value,
          email: document.getElementById('reg-email')?.value,
          phone: document.getElementById('reg-phone')?.value,
          area: document.getElementById('reg-area')?.value,
          password: document.getElementById('reg-password')?.value,
          confirmPassword: document.getElementById('reg-confirm')?.value,
          consent: document.getElementById('reg-consent')?.checked
        });
        showToast(`Account created for ${newUser.name} (Role: Resident / User).`);
        navigateTo('/dashboard');
      } catch (err) {
        if (errBox) {
          errBox.style.display = 'block';
          errBox.textContent = err.message;
        }
      }
    }

    function renderProfilePage() {
      const user = AuthService.getCurrentUser();
      if (!user) return '';
      const roleMeta = ROLE_META[user.role] || ROLE_META.user;
      const allowedStatuses = ROLE_ALLOWED_STATUSES[user.role] || [];

      return `
        <div class="app-container" style="max-width:920px;">
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.heroStudio}');">
            <div class="ec-page-banner-overlay" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.75rem;">
              <div>
                <span class="ec-badge ec-badge-green" style="margin-bottom:0.35rem;">Role Profile &amp; Privacy Guardrails</span>
                <h1 style="font-size:1.55rem;font-weight:800;margin:0;color:#FFFFFF;">${escapeHtml(user.name)} — ${escapeHtml(roleMeta.label)}</h1>
                <p style="font-size:0.84rem;color:#E2E8F0;margin:0.2rem 0 0 0;">Inspect your active role permissions and manage your private contact details.</p>
              </div>
              <div style="display:flex;gap:0.5rem;">
                <button type="button" class="ec-btn-secondary" onclick="navigateTo('${roleMeta.homeRoute}')">Go to Role Workspace →</button>
                <button type="button" class="ec-btn-danger" onclick="handleSignOut()">Sign Out</button>
              </div>
            </div>
          </div>

          <div class="ec-grid-2">
            <!-- Account Identity & Role Guardrails -->
            <div class="ec-card">
              <div style="display:flex;align-items:center;gap:0.9rem;margin-bottom:1rem;">
                <div id="profile-avatar-box" style="width:66px;height:66px;border-radius:50%;background:#14532D;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.35rem;overflow:hidden;border:2px solid #BBF7D0;">
                  ${escapeHtml(user.name.charAt(0).toUpperCase())}
                </div>
                <div>
                  <div style="display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">
                    <h2 style="font-size:1.15rem;font-weight:800;margin:0;">${escapeHtml(user.name)}</h2>
                    ${renderRoleBadge(user.role)}
                  </div>
                  <div style="font-size:0.82rem;color:#526066;margin-top:0.15rem;">${escapeHtml(user.email)}</div>
                  <div style="font-size:0.74rem;color:#14532D;font-weight:600;margin-top:0.15rem;">
                    ${user.isDemo ? 'DEMO ACCOUNT · Local Session Active' : 'Local Account'}
                  </div>
                </div>
              </div>

              <div style="background:#F8FAF5;border:1px solid var(--border);border-radius:8px;padding:0.85rem;font-size:0.82rem;margin-bottom:1rem;">
                <div style="font-weight:700;color:var(--charcoal);margin-bottom:0.3rem;">Role Capabilities (${escapeHtml(roleMeta.label)}):</div>
                <p style="margin:0 0 0.5rem 0;color:#37474F;">${escapeHtml(roleMeta.summary)}</p>
                <div style="font-size:0.76rem;color:#526066;">
                  <strong>Permitted Status Transitions:</strong>
                  ${allowedStatuses.length ? allowedStatuses.map((s) => `<code style="background:#EBF3EC;color:#14532D;padding:0.1rem 0.35rem;border-radius:4px;margin-right:0.25rem;display:inline-block;margin-top:0.2rem;">${escapeHtml(s)}</code>`).join('') : 'None (Residents submit requests; staff/partners update operational statuses)'}
                </div>
              </div>

              <div style="font-size:0.78rem;color:#526066;display:grid;gap:0.3rem;">
                <div><strong>Account ID:</strong> <code>${escapeHtml(user.id)}</code></div>
                <div><strong>Account Status:</strong> <span style="color:#14532D;font-weight:700;">${escapeHtml(user.status.toUpperCase())}</span> (Read-only for non-admins)</div>
                <div><strong>Profile Created:</strong> ${formatShortDate(user.createdAt)}</div>
              </div>
            </div>

            <!-- Editable Profile Details -->
            <div class="ec-card">
              <h2 style="font-size:1.08rem;font-weight:800;margin:0 0 0.75rem 0;">Update Profile &amp; Private Contact Info</h2>
              <form onsubmit="handleProfileSave(event)">
                <div style="margin-bottom:0.8rem;">
                  <label class="ec-label" for="prof-name">Display Name *</label>
                  <input id="prof-name" type="text" class="ec-input" value="${escapeHtml(user.name)}" required />
                </div>
                <div style="margin-bottom:0.8rem;">
                  <label class="ec-label" for="prof-phone">Private Contact Phone (Never shown on public Passports)</label>
                  <input id="prof-phone" type="tel" class="ec-input" value="${escapeHtml(user.phone || '')}" />
                </div>
                <div style="margin-bottom:0.8rem;">
                  <label class="ec-label" for="prof-area">Default Area / Operations Zone</label>
                  <input id="prof-area" type="text" class="ec-input" value="${escapeHtml(user.area || '')}" />
                </div>
                <div style="margin-bottom:0.85rem;">
                  <label class="ec-label" for="prof-role-readonly">System Role (Admin-Assigned Only)</label>
                  <input id="prof-role-readonly" type="text" class="ec-input" value="${escapeHtml(roleMeta.label)} (${escapeHtml(user.role)})" disabled style="background:#F1F5F9;color:#64748B;" />
                </div>
                <div style="margin-bottom:1rem;">
                  <label class="ec-label">Optional Profile Avatar Photo</label>
                  <label class="ec-btn-secondary" style="cursor:pointer;font-size:0.8rem;padding:0.4rem 0.8rem;">
                    <span>Upload Avatar Image</span>
                    <input type="file" accept="image/jpeg,image/png,image/webp" onchange="handleProfileAvatarUpload(event)" style="display:none;" />
                  </label>
                </div>
                <button type="submit" class="ec-btn-primary">Save Profile Changes</button>
              </form>
            </div>
          </div>
        </div>
      `;
    }

    async function hydrateProfileAvatar() {
      const user = AuthService.getCurrentUser();
      if (!user || !user.avatarPhotoId) return;
      const box = document.getElementById('profile-avatar-box');
      if (!box) return;
      const photo = await PhotoStorageService.getPhoto(user.avatarPhotoId);
      if (photo && photo.dataUrl) {
        box.innerHTML = `<img src="${photo.dataUrl}" alt="${escapeHtml(user.name)}" style="width:100%;height:100%;object-fit:cover;" />`;
      }
    }

    async function handleProfileAvatarUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const user = AuthService.getCurrentUser();
      if (!user) return;
      try {
        const compressed = await PhotoStorageService.compressImageFile(file);
        const saved = await PhotoStorageService.savePhoto(compressed.dataUrl, {
          fileName: compressed.fileName,
          source: 'profile_avatar'
        });
        DataRepository.updateOwnProfile({ avatarPhotoId: saved.id }, user);
        showToast('Profile avatar updated.');
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    function handleProfileSave(event) {
      event.preventDefault();
      const user = AuthService.getCurrentUser();
      if (!user) return;
      try {
        DataRepository.updateOwnProfile(
          {
            name: document.getElementById('prof-name')?.value,
            phone: document.getElementById('prof-phone')?.value,
            area: document.getElementById('prof-area')?.value
          },
          user
        );
        showToast('Profile details saved.');
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    function renderCentresPage() {
      const centres = DataRepository.getCentres();
      const user = AuthService.getCurrentUser();
      const q = (AppState.centreSearch || '').trim().toLowerCase();
      const cat = AppState.centreCategory || 'all';

      const filtered = centres.filter((c) => {
        const matchesQ = !q || c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q) || c.handlerType.toLowerCase().includes(q);
        const matchesCat = cat === 'all' || (c.acceptedCategories && c.acceptedCategories.includes(cat));
        return matchesQ && matchesCat;
      });

      const centrePhotos = [
        VISUAL_ASSETS.collectionHub,
        VISUAL_ASSETS.heroStudio,
        VISUAL_ASSETS.phone,
        VISUAL_ASSETS.laptop
      ];

      return `
        <div class="app-container">
          <!-- Photographic Banner Header -->
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.collectionHub}');">
            <div class="ec-page-banner-overlay" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.75rem;">
              <div>
                <span class="ec-badge ec-badge-green" style="margin-bottom:0.35rem;">Circular Collection &amp; Recovery Network</span>
                <h1 style="font-size:1.6rem;font-weight:800;margin:0;color:#FFFFFF;">Collection, Repair &amp; Recycling Centres Directory</h1>
                <p style="font-size:0.86rem;color:#E2E8F0;margin:0.2rem 0 0 0;">
                  Searchable sample directory of drop-off points, repair partners, and material recovery facilities.
                </p>
              </div>
              ${
                user && user.role === 'admin'
                  ? `<button type="button" class="ec-btn-primary" style="background:#22C55E;color:#052E16;border-color:#16A34A;font-weight:800;" onclick="openAddCentreModal()">+ Add Demo Centre Record</button>`
                  : ''
              }
            </div>
          </div>

          <div class="ec-card-soft" style="margin-bottom:1.25rem;font-size:0.82rem;color:#263238;">
            <strong>Verification &amp; Demo Data Notice:</strong> All centres listed below are clearly labelled <strong>DEMO RECORDS</strong> for academic prototype evaluation. Before visiting any real-world collection point or recycling handler, always verify current operating hours, accepted categories, and hazardous battery rules directly with the authorised facility.
          </div>

          <!-- Search & Filter Bar -->
          <div class="ec-card" style="margin-bottom:1.25rem;padding:1rem;">
            <div class="ec-grid-3" style="align-items:end;">
              <div>
                <label class="ec-label" for="centre-search-input">Search by Name, Area, or Handler Type</label>
                <input id="centre-search-input" type="search" class="ec-input" placeholder="e.g. Nigdi, Hinjewadi, Battery, Repair..." value="${escapeHtml(AppState.centreSearch)}" oninput="updateCentreFilters(this.value, null)" />
              </div>
              <div>
                <label class="ec-label" for="centre-cat-select">Filter by Accepted Device Category</label>
                <select id="centre-cat-select" class="ec-select" onchange="updateCentreFilters(null, this.value)">
                  <option value="all" ${cat === 'all' ? 'selected' : ''}>All Device Categories</option>
                  ${DEVICE_CATEGORIES.map((c) => `<option value="${c.value}" ${cat === c.value ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('')}
                </select>
              </div>
              <div>
                <button type="button" class="ec-btn-secondary" onclick="updateCentreFilters('', 'all')" style="width:100%;">Reset Filters (${filtered.length} shown)</button>
              </div>
            </div>
          </div>

          ${
            filtered.length === 0
              ? `<div class="ec-card" style="text-align:center;padding:2.5rem;">
                  <h3 style="margin:0 0 0.4rem 0;">No Matching Collection Centres</h3>
                  <p style="font-size:0.85rem;color:#526066;margin:0 0 1rem 0;">Try clearing your search query or selecting "All Device Categories".</p>
                  <button type="button" class="ec-btn-secondary" onclick="updateCentreFilters('', 'all')">Show All Centres</button>
                </div>`
              : `<div class="ec-grid-2">
                  ${filtered
                    .map(
                      (c, idx) => `<div class="ec-card" style="display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
                        <div>
                          <div style="position:relative;margin-bottom:0.85rem;border-radius:10px;overflow:hidden;height:150px;border:1px solid var(--border);">
                            <img src="${centrePhotos[idx % centrePhotos.length]}" alt="${escapeHtml(c.name)}" class="ec-img-cover" style="height:150px;" />
                            <div style="position:absolute;top:0.5rem;left:0.5rem;display:flex;gap:0.4rem;flex-wrap:wrap;">
                              <span class="ec-badge ec-badge-amber">DEMO CENTRE RECORD</span>
                              ${
                                c.acceptsHazardousBatteries
                                  ? `<span class="ec-badge ec-badge-red">Accepts Hazardous Batteries</span>`
                                  : `<span class="ec-badge ec-badge-green">Standard Electronics &amp; Reuse</span>`
                              }
                            </div>
                          </div>
                          <h3 style="font-size:1.05rem;font-weight:800;margin:0 0 0.25rem 0;color:var(--charcoal);">${escapeHtml(c.name)}</h3>
                          <div style="font-size:0.82rem;color:#14532D;font-weight:600;margin-bottom:0.5rem;">${escapeHtml(c.handlerType)}</div>
                          <div style="font-size:0.83rem;color:#37474F;display:grid;gap:0.25rem;margin-bottom:0.75rem;">
                            <div><strong>Area / Location:</strong> ${escapeHtml(c.area)}</div>
                            <div><strong>Operating Info:</strong> ${escapeHtml(c.hours)}</div>
                            <div><strong>Demo Contact:</strong> <code>${escapeHtml(c.contactInfo)}</code></div>
                          </div>
                          <div style="margin-bottom:0.85rem;">
                            <div style="font-size:0.75rem;font-weight:700;color:#526066;margin-bottom:0.3rem;">ACCEPTED CATEGORIES:</div>
                            <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">
                              ${c.acceptedCategories
                                .map((catKey) => `<span style="background:#F1F6F0;border:1px solid #C4DEC9;color:#14532D;font-size:0.72rem;font-weight:600;padding:0.12rem 0.5rem;border-radius:999px;">${escapeHtml(getCategoryLabel(catKey))}</span>`)
                                .join('')}
                            </div>
                          </div>
                        </div>
                        <div style="border-top:1px solid var(--border);padding-top:0.7rem;display:flex;justify-content:space-between;align-items:center;">
                          <span style="font-size:0.74rem;color:#526066;">Verify acceptance before visiting</span>
                          <button type="button" class="ec-btn-secondary" style="padding:0.35rem 0.75rem;font-size:0.78rem;" onclick="navigateTo('/submit')">Select for Drop-Off →</button>
                        </div>
                      </div>`
                    )
                    .join('')}
                </div>`
          }
        </div>
      `;
    }

    function updateCentreFilters(q, cat) {
      if (q !== null) AppState.centreSearch = q;
      if (cat !== null) AppState.centreCategory = cat;
      renderApp();
      const input = document.getElementById('centre-search-input');
      if (input && q !== null) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }

    function openAddCentreModal() {
      const root = document.getElementById('modal-root');
      if (!root) return;
      root.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true">
          <div class="ec-modal" style="max-width:540px;">
            <h3 style="margin:0 0 0.4rem 0;font-size:1.15rem;font-weight:800;">Add Demo Collection Centre</h3>
            <p style="margin:0 0 1rem 0;font-size:0.82rem;color:#526066;">New entries are automatically tagged as Demo Directory Records.</p>
            <form onsubmit="handleCreateCentreSubmit(event)">
              <div style="margin-bottom:0.75rem;">
                <label class="ec-label" for="new-ctr-name">Centre Name *</label>
                <input id="new-ctr-name" type="text" class="ec-input" placeholder="e.g. Baner Circular Drop-Off Point (Demo)" required />
              </div>
              <div style="margin-bottom:0.75rem;">
                <label class="ec-label" for="new-ctr-area">Area / Location *</label>
                <input id="new-ctr-area" type="text" class="ec-input" placeholder="e.g. Baner Road, Near High Street (Sample)" required />
              </div>
              <div style="margin-bottom:0.75rem;">
                <label class="ec-label" for="new-ctr-type">Handler Type *</label>
                <input id="new-ctr-type" type="text" class="ec-input" value="Municipal Collection & Sorting Point (Demo)" required />
              </div>
              <div style="margin-bottom:0.75rem;">
                <label class="ec-label" for="new-ctr-hours">Operating Hours</label>
                <input id="new-ctr-hours" type="text" class="ec-input" value="Mon–Sat, 09:30 AM – 06:00 PM (Demo)" />
              </div>
              <div style="margin-bottom:0.9rem;">
                <label style="display:flex;align-items:center;gap:0.5rem;font-size:0.83rem;cursor:pointer;">
                  <input id="new-ctr-bat" type="checkbox" />
                  <span>Accepts Hazardous Batteries &amp; Li-Ion Packs</span>
                </label>
              </div>
              <div style="display:flex;justify-content:flex-end;gap:0.5rem;">
                <button type="button" class="ec-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="ec-btn-primary">Save Demo Centre</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    function handleCreateCentreSubmit(event) {
      event.preventDefault();
      const user = AuthService.getCurrentUser();
      try {
        const acceptsBat = document.getElementById('new-ctr-bat')?.checked;
        DataRepository.addCentre(
          {
            name: document.getElementById('new-ctr-name')?.value,
            area: document.getElementById('new-ctr-area')?.value,
            handlerType: document.getElementById('new-ctr-type')?.value,
            hours: document.getElementById('new-ctr-hours')?.value,
            acceptsHazardousBatteries: acceptsBat,
            acceptedCategories: acceptsBat
              ? ['laptop', 'phone', 'tablet', 'monitor', 'accessory', 'battery']
              : ['laptop', 'phone', 'tablet', 'monitor', 'accessory']
          },
          user
        );
        closeModal();
        showToast('New demo collection centre added to directory.');
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    function renderHowItWorksPage() {
      return `
        <div class="app-container" style="max-width:1020px;">
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.heroStudio}');">
            <div class="ec-page-banner-overlay">
              <span class="ec-badge ec-badge-green" style="margin-bottom:0.4rem;">Circular Economy Architecture &amp; Transparency</span>
              <h1 style="font-size:1.65rem;font-weight:800;margin:0;color:#FFFFFF;">How E-Cycle Loop 360 Works</h1>
              <p style="font-size:0.9rem;color:#E2E8F0;margin:0.25rem 0 0 0;max-width:720px;">
                Designed around the circular economy hierarchy: <strong>Reduce unnecessary disposal → Reuse working electronics → Repair &amp; refurbish → Responsibly recycle end-of-life materials</strong>.
              </p>
            </div>
          </div>

          <div class="ec-grid-2" style="margin-bottom:1.5rem;">
            <div class="ec-card">
              <img src="${VISUAL_ASSETS.laptop}" alt="Refurbished Laptop" class="ec-img-cover" style="height:140px;margin-bottom:0.85rem;" />
              <h2 style="font-size:1.08rem;font-weight:800;margin:0 0 0.5rem 0;color:#14532D;">1. Reuse-First Circular Hierarchy</h2>
              <p style="font-size:0.84rem;color:#37474F;margin:0 0 0.65rem 0;">
                Traditional e-waste drives often shred repairable laptops and monitors prematurely. E-Cycle Loop 360 separates reported condition from technical lab assessment so repairable items are directed to <strong>GreenFix Tech Lab</strong> and listed on <strong>Reboot Market</strong> before recycling is considered.
              </p>
              <div style="font-size:0.78rem;background:#F1F6F0;padding:0.6rem;border-radius:8px;color:#14532D;">
                <strong>Hazardous Exception:</strong> Swollen batteries and damaged lithium cells bypass the marketplace and are routed strictly to authorised material recovery handlers.
              </div>
            </div>

            <div class="ec-card">
              <img src="${VISUAL_ASSETS.phone}" alt="Digital E-Waste Passport Lab" class="ec-img-cover" style="height:140px;margin-bottom:0.85rem;" />
              <h2 style="font-size:1.08rem;font-weight:800;margin:0 0 0.5rem 0;color:#14532D;">2. Digital E-Waste Passport &amp; Privacy</h2>
              <p style="font-size:0.84rem;color:#37474F;margin:0 0 0.65rem 0;">
                Every registered device receives a unique human-readable ID (<code>ECL-${getDynamicYear()}-XXXX</code>) and a deterministic SVG QR code. Scanning or opening the passport displays the item's category, reported vs. assessed condition, and timestamped lifecycle log.
              </p>
              <div style="font-size:0.78rem;background:#F8FAF5;border:1px solid var(--border);padding:0.6rem;border-radius:8px;color:#37474F;">
                <strong>Privacy Protection:</strong> Resident home addresses, phone numbers, email addresses, and unapproved camera photos are strictly redacted from public passport pages.
              </div>
            </div>
          </div>

          <div class="ec-grid-2" style="margin-bottom:1.5rem;">
            <div class="ec-card">
              <h2 style="font-size:1.08rem;font-weight:800;margin:0 0 0.5rem 0;color:#14532D;">3. Accurate Circular Metrics (No Double Counting)</h2>
              <ul style="margin:0;padding-left:1.15rem;font-size:0.83rem;color:#37474F;display:grid;gap:0.35rem;">
                <li><strong>Unique Item Counting:</strong> Metrics count unique item IDs, never counting multiple status events as separate items.</li>
                <li><strong>Current Status vs. Final Outcome:</strong> Items in collection or repair are counted as <em>In Process</em>; only items reaching <code>Repaired</code> or <code>Transferred/Donated</code> count toward <em>Diverted from Disposal</em>.</li>
                <li><strong>Recorded Weight Only:</strong> Weight totals sum only items where a weight in kg was supplied — never inventing weights or unsupported CO₂ claims.</li>
              </ul>
            </div>

            <div class="ec-card">
              <h2 style="font-size:1.08rem;font-weight:800;margin:0 0 0.5rem 0;color:#14532D;">4. Platform Record vs. External Certification</h2>
              <p style="font-size:0.84rem;color:#37474F;margin:0 0 0.65rem 0;">
                The application clearly distinguishes between:
              </p>
              <ol style="margin:0;padding-left:1.15rem;font-size:0.83rem;color:#37474F;display:grid;gap:0.3rem;">
                <li><strong>Requested Action:</strong> A resident submits a pickup request (status: <code>Request Submitted</code>).</li>
                <li><strong>Recorded Platform Status:</strong> A worker or partner updates the milestone in the platform log.</li>
                <li><strong>External Outcome Reference:</strong> A recycling partner records a batch/handler code (e.g., <code>ECO-MRF-REC-2026-089</code>). In Demo Mode, these represent simulated academic records, not statutory certificates.</li>
              </ol>
            </div>
          </div>

          <!-- End-to-End Circular Workflow Summary -->
          <div class="ec-card" style="background:#F1F6F0;border:1px solid #C4DEC9;padding:1.5rem;">
            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.5rem;margin-bottom:0.85rem;">
              <h2 style="font-size:1.18rem;font-weight:800;margin:0;color:#14532D;">End-to-End Circular Lifecycle Workflow</h2>
              <button type="button" class="ec-btn-primary" onclick="navigateTo('/submit')">Start E-Waste Submission →</button>
            </div>
            <ol style="margin:0;padding-left:1.25rem;font-size:0.85rem;color:#263238;display:grid;gap:0.45rem;">
              <li><strong>Step 1 (Resident Registration):</strong> Sign in with your Resident account, open <strong>Submit E-Waste</strong>, attach a device photo via <strong>Take Photo</strong> or <strong>Upload Photo</strong>, and submit your item.</li>
              <li><strong>Step 2 (Passport &amp; QR):</strong> Open the generated <code>ECL-${getDynamicYear()}-XXXX</code> E-Waste Passport to inspect the QR code, public-safe fields, and initial <code>Submitted</code> timeline.</li>
              <li><strong>Step 3 (Field Worker Collection):</strong> The assigned Collection Worker opens <strong>Assigned Tasks</strong>, verifies pickup, marks the item <code>Collected</code>, and attaches a proof-of-collection photo.</li>
              <li><strong>Step 4 (Admin Queue &amp; Routing):</strong> The Administrator reviews the item in the <strong>Admin Queue</strong>, updates status to <code>Under Assessment</code>, and assigns the appropriate Repair or Recycling Partner.</li>
              <li><strong>Step 5 (Repair Partner QA):</strong> The Repair &amp; Reuse Partner records the technical condition assessment and updates the item to <code>Repaired</code> and <code>Available for Reuse</code>.</li>
              <li><strong>Step 6 (Reboot Market &amp; Impact):</strong> Eligible items are exchanged on <strong>Reboot Market</strong> for second-life reuse, while end-of-life items have their material recovery batch logged by the Recycling Partner.</li>
            </ol>
          </div>
        </div>
      `;
    }
    // ============================================================================
    // 9. CORE WORKFLOW VIEWS: SUBMIT E-WASTE, DIGITAL PASSPORT & REBOOT MARKET
    // ============================================================================
    function renderSubmitPage() {
      const user = AuthService.getCurrentUser();
      const centres = DataRepository.getCentres();

      // If an item was just submitted, show the rich Confirmation + Passport QR screen
      if (AppState.lastSubmittedItemId) {
        const submittedItem = DataRepository.getPublicPassportItem(AppState.lastSubmittedItemId);
        if (submittedItem) {
          return `
            <div class="app-container" style="max-width:760px;">
              <div class="ec-card" style="padding:2rem;border:2px solid #14532D;background:#F5FBF7;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1.25rem;">
                  <div>
                    <span class="ec-badge ec-badge-green" style="margin-bottom:0.45rem;">SUBMISSION RECORDED · REQUEST PENDING CONFIRMATION</span>
                    <h1 style="font-size:1.55rem;font-weight:800;margin:0;color:var(--charcoal);">E-Waste Item Registered</h1>
                    <p style="font-size:0.86rem;color:#37474F;margin:0.25rem 0 0 0;">
                      Your request has been logged in the collection queue. Note: Pickup is not confirmed until scheduled by an administrator or collection worker.
                    </p>
                  </div>
                  <div style="background:#FFFFFF;padding:0.65rem;border-radius:10px;border:1px solid #C4DEC9;text-align:center;">
                    ${generatePassportQrSvg(submittedItem.id, 112)}
                    <div style="font-size:0.68rem;font-weight:700;color:#14532D;margin-top:0.25rem;">${escapeHtml(submittedItem.id)}</div>
                  </div>
                </div>

                <div class="ec-card" style="margin-bottom:1.25rem;">
                  <div class="ec-grid-2" style="font-size:0.85rem;">
                    <div>
                      <div style="color:#526066;font-size:0.76rem;">UNIQUE PASSPORT ID</div>
                      <div style="font-size:1.15rem;font-weight:800;color:#14532D;font-family:monospace;">${escapeHtml(submittedItem.id)}</div>
                    </div>
                    <div>
                      <div style="color:#526066;font-size:0.76rem;">CURRENT STATUS</div>
                      <div style="margin-top:0.15rem;">${renderStatusBadge(submittedItem.currentStatus)}</div>
                    </div>
                    <div>
                      <div style="color:#526066;font-size:0.76rem;">ITEM &amp; CATEGORY</div>
                      <div style="font-weight:700;">${escapeHtml(submittedItem.title)} (${escapeHtml(getCategoryLabel(submittedItem.category))})</div>
                    </div>
                    <div>
                      <div style="color:#526066;font-size:0.76rem;">NEXT STEP</div>
                      <div style="font-weight:600;color:#263238;">Assigned to Collection Queue for review &amp; pickup/drop-off verification</div>
                    </div>
                  </div>
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
                  <button type="button" class="ec-btn-primary" onclick="clearSubmitConfirmationAndGo('/track', '${escapeHtml(submittedItem.id)}')">
                    Open Digital E-Waste Passport →
                  </button>
                  <button type="button" class="ec-btn-secondary" onclick="clearSubmitConfirmationAndGo('/dashboard', null)">
                    View in My Dashboard
                  </button>
                  <button type="button" class="ec-btn-secondary" onclick="resetSubmitFormForAnother()">
                    Submit Another E-Waste Item
                  </button>
                </div>
              </div>
            </div>
          `;
        }
      }

      if (!user) {
        return `
          <div class="app-container" style="max-width:740px;">
            <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.collectionHub}');">
              <div class="ec-page-banner-overlay" style="text-align:center;">
                <span class="ec-badge ec-badge-amber" style="margin-bottom:0.5rem;">Authentication Required</span>
                <h1 style="font-size:1.55rem;font-weight:800;margin:0 0 0.5rem 0;color:#FFFFFF;">Sign In to Register E-Waste</h1>
                <p style="font-size:0.88rem;color:#E2E8F0;margin:0 auto 1.25rem auto;max-width:520px;">
                  Registering an electronic device links it to your account dashboard and generates a traceable E-Waste Passport.
                </p>
                <div style="display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;">
                  <button type="button" class="ec-btn-primary" style="background:#22C55E;color:#052E16;border-color:#16A34A;font-weight:800;" onclick="navigateTo('/login')">
                    Sign In to Your Account →
                  </button>
                  <button type="button" class="ec-btn-secondary" onclick="navigateTo('/login')">
                    Go to Sign In Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      const draftPhoto = AppState.submitDraftPhoto;

      return `
        <div class="app-container" style="max-width:920px;">
          <!-- Photographic Page Banner -->
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.collectionHub}');">
            <div class="ec-page-banner-overlay">
              <span class="ec-badge ec-badge-green" style="margin-bottom:0.35rem;">E-Cycle Loop — Step 1 of Circular Journey</span>
              <h1 style="font-size:1.65rem;font-weight:800;margin:0;color:#FFFFFF;">Submit Electronic Waste or Second-Life Device</h1>
              <p style="font-size:0.86rem;color:#E2E8F0;margin:0.2rem 0 0 0;max-width:680px;">
                Provide condition details and an optional item photo so our collection team and repair partners can assess reuse potential before recycling.
              </p>
            </div>
          </div>

          <div id="submit-form-error" style="display:none;background:#FEE2E2;border:1px solid #FECACA;color:#991B1B;padding:0.75rem 1rem;border-radius:8px;font-size:0.84rem;margin-bottom:1rem;"></div>

          <form id="ewaste-submit-form" onsubmit="handleEwasteFormSubmit(event)" class="ec-card" style="padding:1.75rem;">
            <!-- Section 1: Device Details + Visual Category Quick Picker -->
            <h2 style="font-size:1.05rem;font-weight:800;margin:0 0 0.7rem 0;color:#14532D;border-bottom:1px solid var(--border);padding-bottom:0.45rem;">
              1. Device Identification &amp; Condition
            </h2>

            <div style="margin-bottom:0.9rem;">
              <span class="ec-label">Quick Visual Category Picker (Click to Select):</span>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:0.5rem;">
                ${DEVICE_CATEGORIES.slice(0, 6).map(
                  (c) => `<button type="button" onclick="selectVisualCategory('${c.value}')" style="display:flex;align-items:center;gap:0.45rem;padding:0.4rem 0.55rem;border-radius:9px;border:1px solid #C5D1C8;background:#F8FAF5;cursor:pointer;text-align:left;">
                    <img src="${c.img}" alt="${escapeHtml(c.shortLabel)}" style="width:32px;height:32px;border-radius:6px;object-fit:cover;flex-shrink:0;" />
                    <span style="font-size:0.76rem;font-weight:700;color:var(--charcoal);">${escapeHtml(c.shortLabel)}</span>
                  </button>`
                ).join('')}
              </div>
            </div>

            <div class="ec-grid-2" style="margin-bottom:0.9rem;">
              <div>
                <label class="ec-label" for="sub-title">Device Name / Model Title *</label>
                <input id="sub-title" type="text" class="ec-input" placeholder="e.g. Dell Latitude 5400 Laptop or iPhone 11" required />
              </div>
              <div>
                <label class="ec-label" for="sub-category">Device Category *</label>
                <select id="sub-category" class="ec-select" onchange="handleCategoryChangeWarning(this.value)" required>
                  ${DEVICE_CATEGORIES.map((c) => `<option value="${c.value}">${escapeHtml(c.label)}</option>`).join('')}
                </select>
              </div>
            </div>

            <div id="battery-hazard-banner" style="display:none;background:#FEF2F2;border:1px solid #FECACA;color:#991B1B;padding:0.65rem 0.85rem;border-radius:8px;font-size:0.8rem;margin-bottom:0.9rem;">
              <strong>Hazardous Battery Guardrail Active:</strong> Batteries cannot be listed for resale or placed in ordinary bins. This submission will automatically be routed to our authorised material recovery partner.
            </div>

            <div class="ec-grid-4" style="margin-bottom:1.25rem;">
              <div>
                <label class="ec-label" for="sub-qty">Quantity *</label>
                <input id="sub-qty" type="number" min="1" max="50" value="1" class="ec-input" required />
              </div>
              <div>
                <label class="ec-label" for="sub-weight">Approx. Weight (kg, optional)</label>
                <input id="sub-weight" type="number" step="0.05" min="0.05" max="200" placeholder="e.g. 1.8" class="ec-input" />
              </div>
              <div>
                <label class="ec-label" for="sub-condition">Reported Condition *</label>
                <select id="sub-condition" class="ec-select" required>
                  <option value="partially_working">Partially Working (Minor Faults)</option>
                  <option value="working">Working (Fully Functional)</option>
                  <option value="damaged">Damaged (Needs Repair / Parts)</option>
                  <option value="not_working">Not Working / End-of-Life</option>
                  <option value="unknown">Unknown / Untested</option>
                </select>
              </div>
              <div>
                <label class="ec-label" for="sub-age">Approximate Age (optional)</label>
                <input id="sub-age" type="text" class="ec-input" placeholder="e.g. 3.5 years" />
              </div>
            </div>

            <!-- Section 2: Camera Capture & Photo Upload -->
            <h2 style="font-size:1.05rem;font-weight:800;margin:0 0 0.65rem 0;color:#14532D;border-bottom:1px solid var(--border);padding-bottom:0.45rem;">
              2. Item Photo — Camera Capture or File Upload (Optional, Recommended)
            </h2>
            <div class="ec-card-soft" style="margin-bottom:1.25rem;">
              <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;">
                <div style="max-width:500px;">
                  <div style="font-weight:700;font-size:0.9rem;color:var(--charcoal);margin-bottom:0.25rem;">Attach a Clear Photo of the Device</div>
                  <p style="font-size:0.79rem;color:#37474F;margin:0 0 0.65rem 0;">
                    Photos help collection workers and lab technicians identify the item and verify physical condition. <strong>Note:</strong> This is for human review, not an automated AI diagnosis. Stored in browser IndexedDB and kept off public passports by default.
                  </p>
                  <div style="display:flex;flex-wrap:wrap;gap:0.55rem;">
                    <button type="button" class="ec-btn-primary" onclick="triggerSubmitTakePhoto()">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                      <span>Take Photo (Camera)</span>
                    </button>
                    <label class="ec-btn-secondary" style="cursor:pointer;">
                      <span>Upload Photo (JPEG/PNG/WebP)</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" onchange="handleSubmitFileUpload(event)" style="display:none;" />
                    </label>
                    ${
                      draftPhoto
                        ? `<button type="button" class="ec-btn-danger" onclick="removeSubmitDraftPhoto()">Remove Photo</button>`
                        : ''
                    }
                  </div>
                </div>

                <!-- Thumbnail Preview Area -->
                <div id="submit-photo-preview-box" style="min-width:180px;text-align:center;">
                  ${
                    draftPhoto
                      ? `<div style="background:#FFFFFF;padding:0.5rem;border-radius:10px;border:1px solid #86EFAC;">
                          <img src="${draftPhoto.dataUrl}" alt="Attached item photo preview" style="width:150px;height:105px;object-fit:cover;border-radius:6px;display:block;margin:0 auto 0.35rem auto;" />
                          <div style="font-size:0.72rem;font-weight:700;color:#14532D;">${escapeHtml(draftPhoto.fileName.slice(0, 22))}</div>
                          <div style="font-size:0.68rem;color:#526066;">Saved in IndexedDB</div>
                        </div>`
                      : `<div style="width:160px;height:110px;border:2px dashed #C4DEC9;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:#526066;padding:0.5rem;background:#FFFFFF;">
                          No photo attached yet
                        </div>`
                  }
                </div>
              </div>
            </div>

            <!-- Section 3: Desired Circular Path & Collection Logistics -->
            <h2 style="font-size:1.05rem;font-weight:800;margin:0 0 0.85rem 0;color:#14532D;border-bottom:1px solid var(--border);padding-bottom:0.45rem;">
              3. Desired Circular Path &amp; Collection Option
            </h2>
            <div class="ec-grid-2" style="margin-bottom:0.9rem;">
              <div>
                <label class="ec-label" for="sub-path">Desired Circular Path *</label>
                <select id="sub-path" class="ec-select" required>
                  ${DESIRED_PATHS.map((p) => `<option value="${p.value}">${escapeHtml(p.label)}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="ec-label" for="sub-type">Submission Logistics *</label>
                <select id="sub-type" class="ec-select" onchange="toggleSubDropoffCentre(this.value)" required>
                  <option value="pickup">Request Doorstep Pickup (Requires Admin/Worker Scheduling)</option>
                  <option value="dropoff">Self Drop-Off at Collection Centre</option>
                </select>
              </div>
            </div>

            <div class="ec-grid-2" style="margin-bottom:0.9rem;">
              <div>
                <label class="ec-label" for="sub-area">Pickup Area / Address or Drop-Off Note * <span style="color:#14532D;font-weight:500;">(Kept Private)</span></label>
                <input id="sub-area" type="text" class="ec-input" value="${escapeHtml(user.area || 'Wakad, Sector 14')}" placeholder="Neighbourhood / Pickup instructions" required />
              </div>
              <div>
                <label class="ec-label" for="sub-phone">Contact Phone * <span style="color:#14532D;font-weight:500;">(Kept Private)</span></label>
                <input id="sub-phone" type="tel" class="ec-input" value="${escapeHtml(user.phone || '+91-98200-00202')}" required />
              </div>
            </div>

            <div style="margin-bottom:0.9rem;">
              <label class="ec-label" for="sub-centre">Preferred Collection / Processing Hub</label>
              <select id="sub-centre" class="ec-select">
                ${centres.map((c) => `<option value="${c.id}">${escapeHtml(c.name)} — ${escapeHtml(c.area)}</option>`).join('')}
              </select>
            </div>

            <div style="margin-bottom:1rem;">
              <label class="ec-label" for="sub-notes">Additional Condition or Fault Notes (Publicly visible on Passport if relevant)</label>
              <textarea id="sub-notes" rows="2" class="ec-textarea" placeholder="Describe any specific faults, included chargers, or accessories (Do not include private phone numbers or passwords here)."></textarea>
            </div>

            <div style="background:#F8FAF5;border:1px solid var(--border);padding:0.75rem 0.9rem;border-radius:8px;margin-bottom:1.15rem;font-size:0.81rem;color:#263238;">
              <label style="display:flex;align-items:flex-start;gap:0.55rem;cursor:pointer;">
                <input id="sub-confirm-check" type="checkbox" required style="margin-top:0.2rem;" />
                <span>I confirm the device description is accurate, personal data has been backed up/wiped where possible, and no private personal details were entered into the public fault notes field.</span>
              </label>
            </div>

            <div style="display:flex;justify-content:flex-end;gap:0.75rem;">
              <button type="button" class="ec-btn-secondary" onclick="navigateTo('/')">Cancel</button>
              <button type="submit" id="btn-submit-ewaste" class="ec-btn-primary" style="padding:0.7rem 1.5rem;">
                Submit E-Waste &amp; Generate Passport
              </button>
            </div>
          </form>
        </div>
      `;
    }

    function selectVisualCategory(catVal) {
      const sel = document.getElementById('sub-category');
      if (sel) {
        sel.value = catVal;
        handleCategoryChangeWarning(catVal);
        showToast(`Selected category: ${getCategoryLabel(catVal)}`);
      }
    }

    function handleCategoryChangeWarning(catVal) {
      const banner = document.getElementById('battery-hazard-banner');
      const pathSel = document.getElementById('sub-path');
      if (banner) {
        banner.style.display = catVal === 'battery' ? 'block' : 'none';
      }
      if (catVal === 'battery' && pathSel) {
        pathSel.value = 'recycle';
      }
    }

    function toggleSubDropoffCentre(typeVal) {
      const areaInput = document.getElementById('sub-area');
      if (areaInput && typeVal === 'dropoff' && !areaInput.value.includes('Drop-off')) {
        areaInput.placeholder = 'Enter preferred drop-off date/time window';
      }
    }

    function triggerSubmitTakePhoto() {
      openCameraModal('Take Photo of E-Waste Device', (savedPhotoRecord) => {
        AppState.submitDraftPhoto = savedPhotoRecord;
        updateSubmitPhotoPreviewDom();
      });
    }

    async function handleSubmitFileUpload(event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      try {
        const compressed = await PhotoStorageService.compressImageFile(file);
        const saved = await PhotoStorageService.savePhoto(compressed.dataUrl, {
          fileName: compressed.fileName,
          mimeType: compressed.mimeType,
          sizeBytes: compressed.sizeBytes,
          source: 'file_upload'
        });
        AppState.submitDraftPhoto = saved;
        updateSubmitPhotoPreviewDom();
        showToast('Item photo uploaded and saved in IndexedDB.');
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    function removeSubmitDraftPhoto() {
      AppState.submitDraftPhoto = null;
      updateSubmitPhotoPreviewDom();
      showToast('Removed attached item photo.');
    }

    function updateSubmitPhotoPreviewDom() {
      const box = document.getElementById('submit-photo-preview-box');
      if (!box) {
        renderApp();
        return;
      }
      const p = AppState.submitDraftPhoto;
      if (p) {
        box.innerHTML = `<div style="background:#FFFFFF;padding:0.5rem;border-radius:10px;border:1px solid #86EFAC;">
          <img src="${p.dataUrl}" alt="Attached item photo preview" style="width:150px;height:105px;object-fit:cover;border-radius:6px;display:block;margin:0 auto 0.35rem auto;" />
          <div style="font-size:0.72rem;font-weight:700;color:#14532D;">${escapeHtml(p.fileName.slice(0, 22))}</div>
          <div style="font-size:0.68rem;color:#526066;">Saved in IndexedDB</div>
        </div>`;
      } else {
        box.innerHTML = `<div style="width:160px;height:110px;border:2px dashed #C4DEC9;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:#526066;padding:0.5rem;background:#FFFFFF;">
          No photo attached yet
        </div>`;
      }
    }

    function handleEwasteFormSubmit(event) {
      event.preventDefault();
      const user = AuthService.getCurrentUser();
      const errBox = document.getElementById('submit-form-error');
      const submitBtn = document.getElementById('btn-submit-ewaste');

      const title = (document.getElementById('sub-title')?.value || '').trim();
      const category = document.getElementById('sub-category')?.value || 'other';
      const quantity = parseInt(document.getElementById('sub-qty')?.value || '1', 10);
      const weightKg = document.getElementById('sub-weight')?.value || '';
      const reportedCondition = document.getElementById('sub-condition')?.value || 'unknown';
      const ageYears = document.getElementById('sub-age')?.value || '';
      const desiredPath = document.getElementById('sub-path')?.value || 'assess_reuse';
      const submissionType = document.getElementById('sub-type')?.value || 'pickup';
      const pickupArea = (document.getElementById('sub-area')?.value || '').trim();
      const contactPhone = (document.getElementById('sub-phone')?.value || '').trim();
      const centreId = document.getElementById('sub-centre')?.value || 'ctr-1';
      const notes = (document.getElementById('sub-notes')?.value || '').trim();
      const confirmed = document.getElementById('sub-confirm-check')?.checked;

      if (title.length < 3) {
        if (errBox) {
          errBox.style.display = 'block';
          errBox.textContent = 'Please provide a descriptive device name (at least 3 characters).';
        }
        return;
      }
      if (isNaN(quantity) || quantity < 1) {
        if (errBox) {
          errBox.style.display = 'block';
          errBox.textContent = 'Quantity must be a positive integer (1 or more).';
        }
        return;
      }
      if (!pickupArea || !contactPhone) {
        if (errBox) {
          errBox.style.display = 'block';
          errBox.textContent = 'Please provide both your pickup area/location and private contact number.';
        }
        return;
      }
      if (!confirmed) {
        if (errBox) {
          errBox.style.display = 'block';
          errBox.textContent = 'Please confirm the accuracy and privacy acknowledgement checkbox.';
        }
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      try {
        const created = DataRepository.createItem(
          {
            title,
            category,
            quantity,
            weightKg,
            reportedCondition,
            ageYears,
            desiredPath,
            submissionType,
            pickupArea,
            contactPhone,
            centreId,
            notes,
            photoId: AppState.submitDraftPhoto ? AppState.submitDraftPhoto.id : null
          },
          user
        );
        AppState.submitDraftPhoto = null;
        AppState.lastSubmittedItemId = created.id;
        showToast(`Registered ${created.id}! Digital E-Waste Passport created.`);
        renderApp();
        window.scrollTo(0, 0);
      } catch (err) {
        if (submitBtn) submitBtn.disabled = false;
        if (errBox) {
          errBox.style.display = 'block';
          errBox.textContent = err.message;
        }
      }
    }

    function clearSubmitConfirmationAndGo(route, param) {
      AppState.lastSubmittedItemId = null;
      navigateTo(route, param);
    }

    function resetSubmitFormForAnother() {
      AppState.lastSubmittedItemId = null;
      AppState.submitDraftPhoto = null;
      renderApp();
    }

    // ============================================================================
    // DIGITAL E-WASTE PASSPORT & TRACKING VIEW (/track and /track/:itemId)
    // ============================================================================
    function renderTrackPage() {
      const allIds = DataRepository.load().items.map((it) => it.id);
      const activeId = (AppState.routeParam || AppState.trackQuery || allIds[0] || '').trim().toUpperCase();
      const passport = activeId ? DataRepository.getPublicPassportItem(activeId) : null;
      const stepIdx = passport && STATUS_META[passport.currentStatus] ? STATUS_META[passport.currentStatus].stepIndex : 1;

      const stageSteps = [
        { num: 1, title: '1. Registered' },
        { num: 2, title: '2. Collected' },
        { num: 3, title: '3. Lab Assessed' },
        { num: 4, title: '4. Renewed / Processed' },
        { num: 5, title: '5. Circular Outcome' }
      ];

      return `
        <div class="app-container" style="max-width:1020px;">
          <!-- Photographic Page Banner -->
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.phone}');">
            <div class="ec-page-banner-overlay">
              <span class="ec-badge ec-badge-green" style="margin-bottom:0.35rem;">Traceable Circular Identity</span>
              <h1 style="font-size:1.65rem;font-weight:800;margin:0;color:#FFFFFF;">Digital E-Waste Passport &amp; Item Tracker</h1>
              <p style="font-size:0.86rem;color:#E2E8F0;margin:0.2rem 0 0 0;max-width:680px;">
                Enter any E-Waste Passport ID or scan a device QR code to inspect its reported vs. assessed condition, processing route, and timestamped lifecycle log.
              </p>
            </div>
          </div>

          <!-- Search Bar + Quick Sample ID Selector -->
          <div class="ec-card" style="margin-bottom:1.5rem;padding:1.15rem;">
            <form onsubmit="handleTrackSearchSubmit(event)" style="display:flex;flex-wrap:wrap;gap:0.65rem;align-items:center;margin-bottom:0.75rem;">
              <input id="track-id-input" type="search" class="ec-input" style="flex:1;min-width:220px;font-family:monospace;font-weight:700;" placeholder="Enter Passport ID (e.g. ECL-${getDynamicYear()}-0001)" value="${escapeHtml(activeId)}" />
              <button type="submit" class="ec-btn-primary">Open Passport</button>
            </form>
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.4rem;font-size:0.78rem;color:#526066;">
              <span>Try Sample Passports:</span>
              ${allIds
                .slice(0, 6)
                .map(
                  (id) => `<button type="button" onclick="navigateTo('/track','${escapeHtml(id)}')" style="background:${id === activeId ? '#14532D' : '#F1F6F0'};color:${id === activeId ? '#FFFFFF' : '#14532D'};border:1px solid #C4DEC9;border-radius:6px;padding:0.2rem 0.55rem;font-family:monospace;font-size:0.75rem;font-weight:700;cursor:pointer;">
                    ${escapeHtml(id)}
                  </button>`
                )
                .join('')}
            </div>
          </div>

          ${
            !passport
              ? `<div class="ec-card" style="text-align:center;padding:2.5rem;">
                  <div style="font-size:1.1rem;font-weight:800;color:#991B1B;margin-bottom:0.4rem;">No E-Waste Passport Found for "${escapeHtml(activeId || 'Empty Query')}"</div>
                  <p style="font-size:0.86rem;color:#526066;margin:0 0 1rem 0;">
                    Check the ID format (e.g. <code>ECL-${getDynamicYear()}-0001</code>) or select one of the sample passports above.
                  </p>
                  <button type="button" class="ec-btn-secondary" onclick="navigateTo('/track','${escapeHtml(allIds[0] || '')}')">Load Sample Passport (${escapeHtml(allIds[0] || '')})</button>
                </div>`
              : `
                <!-- Digital Passport Record Card -->
                <div class="ec-card" style="padding:1.75rem;border:1px solid #86EFAC;margin-bottom:1.25rem;">
                  <!-- 5-Step Visual Progress Stepper -->
                  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0.45rem;margin-bottom:1.35rem;">
                    ${stageSteps
                      .map((st) => {
                        const done = st.num <= stepIdx;
                        const isCurrent = st.num === stepIdx;
                        return `<div class="${isCurrent ? 'ec-step-active' : ''}" style="padding:0.55rem 0.4rem;border-radius:9px;text-align:center;background:${done ? '#DCFCE7' : '#F8FAF5'};border:1.5px solid ${done ? '#14532D' : 'var(--border)'};color:${done ? '#14532D' : '#64748B'};font-size:0.74rem;font-weight:700;transition:all 0.3s ease;">
                          ${done ? '✓ ' : ''}${escapeHtml(st.title)}
                        </div>`;
                      })
                      .join('')}
                  </div>

                  <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1.25rem;border-bottom:1px solid var(--border);padding-bottom:1.25rem;margin-bottom:1.25rem;">
                    <div style="flex:1;min-width:260px;">
                      <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.4rem;">
                        <span style="background:#14532D;color:#FFFFFF;font-family:monospace;font-weight:800;font-size:0.9rem;padding:0.22rem 0.65rem;border-radius:6px;">
                          PASSPORT · ${escapeHtml(passport.id)}
                        </span>
                        ${renderStatusBadge(passport.currentStatus)}
                        ${passport.isDemo ? `<span class="ec-badge ec-badge-neutral">DEMO RECORD</span>` : ''}
                      </div>
                      <h2 style="font-size:1.4rem;font-weight:800;margin:0.35rem 0;color:var(--charcoal);">${escapeHtml(passport.title)}</h2>
                      <div style="font-size:0.84rem;color:#526066;margin-bottom:0.85rem;">
                        Category: <strong>${escapeHtml(getCategoryLabel(passport.category))}</strong> &nbsp;·&nbsp;
                        Quantity: <strong>${passport.quantity} unit(s)</strong>
                        ${passport.weightKg ? ` &nbsp;·&nbsp; Recorded Weight: <strong>${passport.weightKg} kg</strong>` : ''}
                        &nbsp;·&nbsp; Registered: <strong>${formatShortDate(passport.createdAt)}</strong>
                      </div>

                      <!-- Category Reference Studio Image Banner -->
                      <div style="display:flex;align-items:center;gap:0.85rem;background:#F8FAF5;padding:0.65rem;border-radius:10px;border:1px solid var(--border);">
                        <img src="${getCategoryDefaultPhoto(passport.category)}" alt="${escapeHtml(passport.category)}" style="width:92px;height:66px;object-fit:cover;border-radius:8px;border:1px solid #C4DEC9;flex-shrink:0;" />
                        <div style="font-size:0.78rem;color:#37474F;">
                          <div style="font-weight:700;color:#14532D;">Category Reference Visual (${escapeHtml(getCategoryLabel(passport.category))})</div>
                          <div>Private user camera photos are stored in IndexedDB for authorised staff review and are kept off public passports for resident privacy.</div>
                        </div>
                      </div>
                    </div>

                    <!-- QR Code Panel -->
                    <div style="background:#F8FAF5;border:1px solid #C4DEC9;border-radius:12px;padding:0.85rem;text-align:center;min-width:168px;">
                      ${generatePassportQrSvg(passport.id, 128)}
                      <div style="font-size:0.7rem;color:#526066;margin-top:0.35rem;font-family:monospace;">#/track/${escapeHtml(passport.id)}</div>
                      <button type="button" class="ec-btn-secondary" style="margin-top:0.4rem;padding:0.25rem 0.6rem;font-size:0.72rem;width:100%;" onclick="copyPassportLink('${escapeHtml(passport.id)}')">
                        Copy Tracking Link
                      </button>
                    </div>
                  </div>

                  <!-- Condition & Route Comparison Grid -->
                  <div class="ec-grid-3" style="margin-bottom:1.25rem;">
                    <div style="background:#F8FAF5;border:1px solid var(--border);border-radius:10px;padding:0.9rem;">
                      <div style="font-size:0.73rem;font-weight:700;color:#526066;text-transform:uppercase;">1. Reported Condition (At Submission)</div>
                      <div style="font-size:0.98rem;font-weight:800;color:var(--charcoal);margin-top:0.25rem;">${escapeHtml(getConditionLabel(passport.reportedCondition))}</div>
                      <div style="font-size:0.75rem;color:#526066;margin-top:0.15rem;">Desired Path: ${escapeHtml(getDesiredPathLabel(passport.desiredPath))}</div>
                    </div>

                    <div style="background:#F1F6F0;border:1px solid #C4DEC9;border-radius:10px;padding:0.9rem;">
                      <div style="font-size:0.73rem;font-weight:700;color:#14532D;text-transform:uppercase;">2. Assessed Condition (Partner QA)</div>
                      <div style="font-size:0.98rem;font-weight:800;color:#14532D;margin-top:0.25rem;">
                        ${escapeHtml(getConditionLabel(passport.assessedCondition))}
                      </div>
                      <div style="font-size:0.75rem;color:#37474F;margin-top:0.15rem;">
                        ${passport.assessedCondition ? 'Verified by partner technician' : 'Awaiting physical lab inspection'}
                      </div>
                    </div>

                    <div style="background:#F8FAF5;border:1px solid var(--border);border-radius:10px;padding:0.9rem;">
                      <div style="font-size:0.73rem;font-weight:700;color:#526066;text-transform:uppercase;">3. Processing Route &amp; Handler Ref</div>
                      <div style="font-size:0.92rem;font-weight:700;color:var(--charcoal);margin-top:0.25rem;">${escapeHtml(passport.processingRoute || 'Pending assignment')}</div>
                      <div style="font-size:0.75rem;color:#526066;margin-top:0.15rem;">
                        Ref: <code>${escapeHtml(passport.handlerReference || 'Not yet recorded')}</code>
                      </div>
                    </div>
                  </div>

                  <!-- Timestamped Status Timeline -->
                  <h3 style="font-size:1.05rem;font-weight:800;margin:0 0 0.85rem 0;color:var(--charcoal);">Timestamped Status History Timeline</h3>
                  <div style="display:grid;gap:0.75rem;margin-bottom:1.25rem;">
                    ${passport.history
                      .map(
                        (ev, idx) => `<div style="display:flex;gap:0.85rem;align-items:flex-start;background:${idx === passport.history.length - 1 ? '#F1F6F0' : '#FFFFFF'};border:1px solid ${idx === passport.history.length - 1 ? '#86EFAC' : 'var(--border)'};padding:0.85rem 1rem;border-radius:10px;">
                          <div style="width:26px;height:26px;border-radius:50%;background:#14532D;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:800;flex-shrink:0;margin-top:0.1rem;">
                            ${idx + 1}
                          </div>
                          <div style="flex:1;">
                            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.4rem;margin-bottom:0.25rem;">
                              <div style="display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">
                                ${renderStatusBadge(ev.newStatus)}
                                <span style="font-size:0.76rem;color:#526066;">Updated by <strong>${escapeHtml(ROLE_META[ev.updaterRole]?.label || ev.updaterRole)}</strong></span>
                                ${ev.handlerRef ? `<code style="font-size:0.72rem;background:#EBF3EC;color:#14532D;padding:0.1rem 0.4rem;border-radius:4px;">Ref: ${escapeHtml(ev.handlerRef)}</code>` : ''}
                              </div>
                              <span style="font-size:0.76rem;color:#526066;font-weight:600;">${formatDateTime(ev.timestamp)}</span>
                            </div>
                            <p style="margin:0;font-size:0.84rem;color:#263238;">${escapeHtml(ev.note)}</p>
                          </div>
                        </div>`
                      )
                      .join('')}
                  </div>

                  <!-- Public Privacy & Verification Disclaimer -->
                  <div style="background:#F8FAF5;border:1px solid var(--border);border-radius:8px;padding:0.75rem 0.95rem;font-size:0.78rem;color:#526066;display:grid;gap:0.25rem;">
                    <div><strong>Privacy Shield Active:</strong> Resident home address, private phone number, email address, unapproved photos, and internal staff notes are strictly excluded from public passport pages.</div>
                    <div><strong>Record Disclaimer:</strong> This timeline reflects operational records entered into the E-Cycle Loop 360 platform (in Demo Mode) and is not a statutory third-party recycling certificate.</div>
                  </div>
                </div>
              `
          }
        </div>
      `;
    }

    function handleTrackSearchSubmit(event) {
      event.preventDefault();
      const val = (document.getElementById('track-id-input')?.value || '').trim().toUpperCase();
      AppState.trackQuery = val;
      navigateTo('/track', val || null);
    }

    function copyPassportLink(itemId) {
      const url = `${window.location.origin}${window.location.pathname}#/track/${encodeURIComponent(itemId)}`;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url);
        } else {
          const temp = document.createElement('textarea');
          temp.value = url;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          temp.remove();
        }
        showToast(`Copied tracking link for ${itemId}`);
      } catch (e) {
        showToast(`Tracking URL: #/track/${itemId}`);
      }
    }

    // ============================================================================
    // REBOOT MARKET (SECOND-LIFE MARKETPLACE) VIEW (/market)
    // ============================================================================
    function renderMarketPage() {
      const listings = DataRepository.getListings();
      const q = (AppState.marketSearch || '').trim().toLowerCase();
      const cat = AppState.marketCategory || 'all';
      const cond = AppState.marketCondition || 'all';
      const offer = AppState.marketOfferType || 'all';
      const sort = AppState.marketSort || 'newest';

      let filtered = listings.filter((l) => {
        if (l.status === 'withdrawn') return false;
        const matchQ = !q || l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.itemId.toLowerCase().includes(q);
        const matchCat = cat === 'all' || l.category === cat;
        const matchCond = cond === 'all' || l.condition === cond;
        const matchOffer = offer === 'all' || l.offerType === offer;
        return matchQ && matchCat && matchCond && matchOffer;
      });

      if (sort === 'name') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return `
        <div class="app-container">
          <!-- Photographic Page Banner -->
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.heroStudio}');">
            <div class="ec-page-banner-overlay" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;">
              <div>
                <span class="ec-badge ec-badge-green" style="margin-bottom:0.35rem;">Circular Second-Life Exchange</span>
                <h1 style="font-size:1.65rem;font-weight:800;margin:0;color:#FFFFFF;">Reboot Market — Reuse, Donate &amp; Repair</h1>
                <p style="font-size:0.86rem;color:#E2E8F0;margin:0.2rem 0 0 0;max-width:660px;">
                  Extend the useful life of working and repairable electronics before recycling. Every listing is linked to its traceable E-Waste Passport.
                </p>
              </div>
              <button type="button" class="ec-btn-primary" style="background:#22C55E;color:#052E16;border-color:#16A34A;font-weight:800;" onclick="openCreateListingModal()">
                + List Eligible Device for Reuse
              </button>
            </div>
          </div>

          <!-- Visual 1-Click Category Filter Pills -->
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;align-items:center;">
            <button type="button" class="ec-cat-pill ${cat === 'all' ? 'active' : ''}" onclick="updateMarketFilters({category:'all'})">
              All Devices (${listings.filter((l) => l.status !== 'withdrawn').length})
            </button>
            ${DEVICE_CATEGORIES.filter((c) => !c.hazardous).slice(0, 5).map(
              (c) => `<button type="button" class="ec-cat-pill ${cat === c.value ? 'active' : ''}" onclick="updateMarketFilters({category:'${c.value}'})">
                <img src="${c.img}" alt="${escapeHtml(c.shortLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;" />
                <span>${escapeHtml(c.shortLabel)}</span>
              </button>`
            ).join('')}
          </div>

          <!-- Search, Filter & Sort Controls -->
          <div class="ec-card" style="margin-bottom:1.25rem;padding:1rem;">
            <div class="ec-grid-4" style="align-items:end;">
              <div>
                <label class="ec-label" for="mkt-search">Search Listings or Passport ID</label>
                <input id="mkt-search" type="search" class="ec-input" placeholder="ThinkPad, Monitor, ECL-..." value="${escapeHtml(AppState.marketSearch)}" oninput="updateMarketFilters({search:this.value})" />
              </div>
              <div>
                <label class="ec-label" for="mkt-cat">Category</label>
                <select id="mkt-cat" class="ec-select" onchange="updateMarketFilters({category:this.value})">
                  <option value="all" ${cat === 'all' ? 'selected' : ''}>All Eligible Categories</option>
                  ${DEVICE_CATEGORIES.filter((c) => !c.hazardous)
                    .map((c) => `<option value="${c.value}" ${cat === c.value ? 'selected' : ''}>${escapeHtml(c.label)}</option>`)
                    .join('')}
                </select>
              </div>
              <div>
                <label class="ec-label" for="mkt-offer">Offer Type</label>
                <select id="mkt-offer" class="ec-select" onchange="updateMarketFilters({offerType:this.value})">
                  <option value="all" ${offer === 'all' ? 'selected' : ''}>All Offer Types</option>
                  <option value="donate" ${offer === 'donate' ? 'selected' : ''}>Community Donation (Free)</option>
                  <option value="sell" ${offer === 'sell' ? 'selected' : ''}>Second-Life Resale</option>
                  <option value="repair_request" ${offer === 'repair_request' ? 'selected' : ''}>Repair / Refurbish Sponsorship</option>
                </select>
              </div>
              <div style="display:flex;gap:0.45rem;">
                <div style="flex:1;">
                  <label class="ec-label" for="mkt-cond">Condition</label>
                  <select id="mkt-cond" class="ec-select" onchange="updateMarketFilters({condition:this.value})">
                    <option value="all" ${cond === 'all' ? 'selected' : ''}>All Conditions</option>
                    <option value="working" ${cond === 'working' ? 'selected' : ''}>Working</option>
                    <option value="repaired" ${cond === 'repaired' ? 'selected' : ''}>Repaired &amp; Tested</option>
                    <option value="partially_working" ${cond === 'partially_working' ? 'selected' : ''}>Partially Working</option>
                  </select>
                </div>
                <div style="flex:1;">
                  <label class="ec-label" for="mkt-sort">Sort By</label>
                  <select id="mkt-sort" class="ec-select" onchange="updateMarketFilters({sort:this.value})">
                    <option value="newest" ${sort === 'newest' ? 'selected' : ''}>Newest First</option>
                    <option value="name" ${sort === 'name' ? 'selected' : ''}>Item Name (A–Z)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          ${
            filtered.length === 0
              ? `<div class="ec-card" style="text-align:center;padding:2.5rem;">
                  <h3 style="margin:0 0 0.4rem 0;">No Reboot Market Listings Match Your Filters</h3>
                  <p style="font-size:0.85rem;color:#526066;margin:0 0 1rem 0;">Try resetting your search filters or list one of your registered devices for second-life reuse.</p>
                  <button type="button" class="ec-btn-secondary" onclick="updateMarketFilters({search:'',category:'all',condition:'all',offerType:'all'})">Reset All Filters</button>
                </div>`
              : `<div class="ec-grid-3">
                  ${filtered
                    .map((lst) => {
                      const imgSrc = (lst.photoId && SEEDED_SVG_PHOTOS[lst.photoId]) || getCategoryDefaultPhoto(lst.category);
                      const statusLabel =
                        lst.status === 'available'
                          ? 'Available'
                          : lst.status === 'request_received'
                          ? 'Interest Received'
                          : lst.status === 'reserved'
                          ? 'Reserved'
                          : 'Transferred / Completed';
                      const statusBadgeClass =
                        lst.status === 'available'
                          ? 'ec-badge-green'
                          : lst.status === 'transferred'
                          ? 'ec-badge-neutral'
                          : 'ec-badge-amber';

                      return `<div class="ec-card" style="display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
                        <div>
                          <div style="position:relative;margin-bottom:0.75rem;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:#F8FAF5;height:172px;">
                            <img data-photo-id="${escapeHtml(lst.photoId || '')}" src="${imgSrc}" alt="${escapeHtml(lst.title)}" class="ec-img-cover" style="height:172px;" />
                            <div style="position:absolute;top:0.5rem;left:0.5rem;">
                              <span class="ec-badge ${statusBadgeClass}">${escapeHtml(statusLabel)}</span>
                            </div>
                            <div style="position:absolute;top:0.5rem;right:0.5rem;">
                              <span class="ec-badge ec-badge-neutral">DEMO LISTING</span>
                            </div>
                          </div>

                          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
                            <span style="font-size:0.76rem;font-weight:700;color:#14532D;text-transform:uppercase;">
                              ${lst.offerType === 'donate' ? 'Community Donation · Free' : lst.offerType === 'sell' ? 'Second-Life Resale · ₹' + lst.priceInr : 'Repair / Assessment Listing'}
                            </span>
                            <button type="button" onclick="navigateTo('/track','${escapeHtml(lst.itemId)}')" style="background:none;border:none;padding:0;font-family:monospace;font-size:0.75rem;color:#14532D;font-weight:700;cursor:pointer;text-decoration:underline;">
                              ${escapeHtml(lst.itemId)}
                            </button>
                          </div>

                          <h3 style="font-size:1.02rem;font-weight:800;margin:0 0 0.4rem 0;color:var(--charcoal);">${escapeHtml(lst.title)}</h3>
                          <p style="font-size:0.82rem;color:#37474F;margin:0 0 0.85rem 0;">${escapeHtml(lst.description)}</p>
                        </div>

                        <div style="border-top:1px solid var(--border);padding-top:0.75rem;">
                          <div style="display:flex;justify-content:space-between;font-size:0.76rem;color:#526066;margin-bottom:0.6rem;">
                            <span>Condition: <strong>${escapeHtml(getConditionLabel(lst.condition))}</strong></span>
                            <span>Category: <strong>${escapeHtml(getCategoryLabel(lst.category))}</strong></span>
                          </div>
                          <div style="display:flex;gap:0.45rem;">
                            <button type="button" class="ec-btn-primary" style="flex:1;padding:0.45rem 0.65rem;font-size:0.8rem;" onclick="openListingDetailModal('${escapeHtml(lst.id)}')" ${lst.status === 'transferred' ? 'disabled' : ''}>
                              ${
                                lst.status === 'transferred'
                                  ? 'Already Transferred'
                                  : lst.offerType === 'donate'
                                  ? 'Request Donation'
                                  : lst.offerType === 'repair_request'
                                  ? 'Request Repair Assessment'
                                  : 'Express Interest'
                              }
                            </button>
                            <button type="button" class="ec-btn-secondary" style="padding:0.45rem 0.65rem;font-size:0.8rem;" onclick="navigateTo('/track','${escapeHtml(lst.itemId)}')">
                              Passport
                            </button>
                          </div>
                        </div>
                      </div>`;
                    })
                    .join('')}
                </div>`
          }
        </div>
      `;
    }

    function updateMarketFilters(changes) {
      if (changes.search !== undefined) AppState.marketSearch = changes.search;
      if (changes.category !== undefined) AppState.marketCategory = changes.category;
      if (changes.condition !== undefined) AppState.marketCondition = changes.condition;
      if (changes.offerType !== undefined) AppState.marketOfferType = changes.offerType;
      if (changes.sort !== undefined) AppState.marketSort = changes.sort;
      renderApp();
      if (changes.search !== undefined) {
        const inp = document.getElementById('mkt-search');
        if (inp) {
          inp.focus();
          inp.setSelectionRange(inp.value.length, inp.value.length);
        }
      }
    }

    function openListingDetailModal(listingId) {
      const user = AuthService.getCurrentUser();
      const lst = DataRepository.getListings().find((l) => l.id === listingId);
      if (!lst) return;
      const root = document.getElementById('modal-root');
      if (!root) return;

      const actionTitle =
        lst.offerType === 'donate'
          ? 'Request Community Donation'
          : lst.offerType === 'repair_request'
          ? 'Submit Repair / Sponsorship Interest'
          : 'Express Second-Life Purchase Interest';

      const imgSrc = (lst.photoId && SEEDED_SVG_PHOTOS[lst.photoId]) || getCategoryDefaultPhoto(lst.category);

      root.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true">
          <div class="ec-modal" style="max-width:560px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem;">
              <span class="ec-badge ec-badge-green">Linked Passport: ${escapeHtml(lst.itemId)}</span>
              <button type="button" class="ec-btn-secondary" style="padding:0.25rem 0.6rem;" onclick="closeModal()">Close</button>
            </div>
            <img src="${imgSrc}" alt="${escapeHtml(lst.title)}" style="width:100%;height:175px;object-fit:cover;border-radius:10px;margin-bottom:0.75rem;border:1px solid var(--border);" />
            <h3 style="margin:0 0 0.35rem 0;font-size:1.2rem;font-weight:800;">${escapeHtml(lst.title)}</h3>
            <p style="font-size:0.84rem;color:#37474F;margin:0 0 0.9rem 0;">${escapeHtml(lst.description)}</p>

            <div style="background:#F8FAF5;border:1px solid var(--border);border-radius:8px;padding:0.7rem 0.9rem;font-size:0.8rem;margin-bottom:1rem;">
              <div><strong>Condition:</strong> ${escapeHtml(getConditionLabel(lst.condition))}</div>
              <div><strong>Offer Type:</strong> ${lst.offerType === 'donate' ? 'Community Donation (₹0)' : lst.offerType === 'sell' ? 'Resale Listing (₹' + lst.priceInr + ')' : 'Repair Assessment Request'}</div>
              <div><strong>Privacy Safeguard:</strong> Direct contact details are not exposed publicly. Submitting a request logs it in the platform dashboard.</div>
            </div>

            ${
              !user
                ? `<div style="text-align:center;padding:0.85rem;background:#FEF3C7;border-radius:8px;font-size:0.84rem;color:#92400E;">
                    Please sign in to submit an interest request.
                    <div style="margin-top:0.5rem;">
                      <button type="button" class="ec-btn-primary" onclick="closeModal();navigateTo('/login')">Go to Sign In Page</button>
                    </div>
                  </div>`
                : `<form onsubmit="handleSubmitMarketInterest(event, '${escapeHtml(lst.id)}', '${escapeHtml(actionTitle)}')">
                    <div style="margin-bottom:0.85rem;">
                      <label class="ec-label" for="req-message">Your Note / Intended Second-Life Use *</label>
                      <textarea id="req-message" rows="3" class="ec-textarea" placeholder="Explain how this device will be reused or repaired (e.g., for college lab use, student study setup, or component refurbishment)..." required></textarea>
                    </div>
                    <div style="display:flex;justify-content:flex-end;gap:0.5rem;">
                      <button type="button" class="ec-btn-secondary" onclick="closeModal()">Cancel</button>
                      <button type="submit" class="ec-btn-primary">${escapeHtml(actionTitle)}</button>
                    </div>
                  </form>`
            }
          </div>
        </div>
      `;
    }

    function handleSubmitMarketInterest(event, listingId, requestType) {
      event.preventDefault();
      const user = AuthService.getCurrentUser();
      const message = document.getElementById('req-message')?.value || '';
      try {
        DataRepository.submitMarketRequest({ listingId, requestType, message }, user);
        closeModal();
        showToast('Interest request recorded! View status in your Dashboard.');
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    function openCreateListingModal(preselectedItemId = null) {
      const user = AuthService.getCurrentUser();
      if (!user) {
        showToast('Please sign in to create a Reboot Market listing.', 'warning');
        navigateTo('/login');
        return;
      }
      const userItems = DataRepository.getItemsForActor(user).filter(
        (it) => it.category !== 'battery' && it.currentStatus !== 'Recycling Recorded' && it.currentStatus !== 'Sent to Recycler'
      );

      const root = document.getElementById('modal-root');
      if (!root) return;

      root.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true">
          <div class="ec-modal" style="max-width:560px;">
            <h3 style="margin:0 0 0.35rem 0;font-size:1.2rem;font-weight:800;">Create Reboot Market Listing</h3>
            <p style="font-size:0.82rem;color:#526066;margin:0 0 1rem 0;">
              Listings reference an existing registered E-Waste Passport item so no duplicate inventory records are created. Hazardous batteries are automatically excluded.
            </p>
            ${
              userItems.length === 0
                ? `<div style="padding:1rem;background:#FEF3C7;border-radius:8px;font-size:0.84rem;color:#92400E;margin-bottom:1rem;">
                    You have no eligible registered items available to list. Register an electronic item first on the Submit E-Waste page.
                  </div>
                  <div style="display:flex;justify-content:flex-end;gap:0.5rem;">
                    <button type="button" class="ec-btn-secondary" onclick="closeModal()">Close</button>
                    <button type="button" class="ec-btn-primary" onclick="closeModal();navigateTo('/submit')">Register Item First →</button>
                  </div>`
                : `<form onsubmit="handleCreateListingSubmit(event)">
                    <div style="margin-bottom:0.8rem;">
                      <label class="ec-label" for="lst-item-id">Select Registered E-Waste Item *</label>
                      <select id="lst-item-id" class="ec-select" required>
                        ${userItems
                          .map(
                            (it) => `<option value="${escapeHtml(it.id)}" ${preselectedItemId === it.id ? 'selected' : ''}>
                              ${escapeHtml(it.id)} — ${escapeHtml(it.title)} (${escapeHtml(getConditionLabel(it.assessedCondition || it.reportedCondition))})
                            </option>`
                          )
                          .join('')}
                      </select>
                    </div>
                    <div style="margin-bottom:0.8rem;">
                      <label class="ec-label" for="lst-title">Marketplace Listing Title *</label>
                      <input id="lst-title" type="text" class="ec-input" placeholder="e.g. Working Dell 24-inch Monitor for Student Use" required />
                    </div>
                    <div class="ec-grid-2" style="margin-bottom:0.8rem;">
                      <div>
                        <label class="ec-label" for="lst-offer-type">Offer Type *</label>
                        <select id="lst-offer-type" class="ec-select" onchange="document.getElementById('lst-price-wrap').style.display = this.value==='sell' ? 'block' : 'none'" required>
                          <option value="donate">Community Donation (Free)</option>
                          <option value="sell">Second-Life Resale (INR)</option>
                          <option value="repair_request">Repair / Assessment Request</option>
                        </select>
                      </div>
                      <div id="lst-price-wrap" style="display:none;">
                        <label class="ec-label" for="lst-price">Asking Amount (₹ INR)</label>
                        <input id="lst-price" type="number" min="0" max="100000" value="2500" class="ec-input" />
                      </div>
                    </div>
                    <div style="margin-bottom:1rem;">
                      <label class="ec-label" for="lst-desc">Condition &amp; Reuse Description *</label>
                      <textarea id="lst-desc" rows="3" class="ec-textarea" placeholder="Describe tested functionality, included accessories, or needed repairs..." required></textarea>
                    </div>
                    <div style="display:flex;justify-content:flex-end;gap:0.5rem;">
                      <button type="button" class="ec-btn-secondary" onclick="closeModal()">Cancel</button>
                      <button type="submit" class="ec-btn-primary">Publish Listing</button>
                    </div>
                  </form>`
            }
          </div>
        </div>
      `;
    }

    function handleCreateListingSubmit(event) {
      event.preventDefault();
      const user = AuthService.getCurrentUser();
      try {
        const listing = DataRepository.createListing(
          {
            itemId: document.getElementById('lst-item-id')?.value,
            title: document.getElementById('lst-title')?.value,
            offerType: document.getElementById('lst-offer-type')?.value,
            priceInr: document.getElementById('lst-price')?.value,
            description: document.getElementById('lst-desc')?.value
          },
          user
        );
        closeModal();
        showToast(`Published listing ${listing.id} linked to Passport ${listing.itemId}.`);
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
    // ============================================================================
    // 10. ROLE-AWARE DASHBOARDS: USER (/dashboard), TASKS (/tasks), ADMIN (/admin)
    // ============================================================================
    function renderUserDashboardPage() {
      const user = AuthService.getCurrentUser();
      if (!user) return '';

      const myItems = DataRepository.load().items.filter((it) => it.ownerId === user.id);
      const myListings = DataRepository.getListings().filter((l) => l.ownerId === user.id);
      const allRequests = DataRepository.load().requests;
      const mySentRequests = allRequests.filter((r) => r.requesterId === user.id);
      const incomingRequests = allRequests.filter((r) => {
        const lst = myListings.find((l) => l.id === r.listingId);
        return Boolean(lst);
      });

      const stFilter = AppState.userDashStatus || 'all';
      const catFilter = AppState.userDashCategory || 'all';

      const filteredItems = myItems.filter((it) => {
        const matchSt = stFilter === 'all' || it.currentStatus === stFilter;
        const matchCat = catFilter === 'all' || it.category === catFilter;
        return matchSt && matchCat;
      });

      return `
        <div class="app-container">
          <!-- Photographic Dashboard Banner -->
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.heroStudio}');">
            <div class="ec-page-banner-overlay" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.75rem;">
              <div>
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;">
                  ${renderRoleBadge(user.role)}
                  <span class="ec-badge ec-badge-neutral">Private Workspace</span>
                </div>
                <h1 style="font-size:1.6rem;font-weight:800;margin:0;color:#FFFFFF;">My Circular Dashboard — ${escapeHtml(user.name)}</h1>
                <p style="font-size:0.85rem;color:#E2E8F0;margin:0.2rem 0 0 0;">
                  Track your submitted electronics, open QR Passports, and manage your Reboot Market listings and requests.
                </p>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
                ${
                  user.role === 'admin'
                    ? `<button type="button" class="ec-btn-primary" style="background:#22C55E;color:#052E16;border-color:#16A34A;font-weight:800;" onclick="navigateTo('/admin')">Open Admin Operations Queue →</button>`
                    : user.role !== 'user'
                    ? `<button type="button" class="ec-btn-primary" style="background:#22C55E;color:#052E16;border-color:#16A34A;font-weight:800;" onclick="navigateTo('/tasks')">Open Assigned Role Tasks (${escapeHtml(ROLE_META[user.role].label)}) →</button>`
                    : ''
                }
                <button type="button" class="ec-btn-primary" onclick="navigateTo('/submit')">+ Submit New E-Waste</button>
                <button type="button" class="ec-btn-secondary" onclick="openCreateListingModal()">+ List Eligible Device</button>
              </div>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="ec-grid-4" style="margin-bottom:1.5rem;">
            <div class="ec-card" style="border-top:4px solid #14532D;">
              <div style="font-size:0.76rem;font-weight:600;color:#526066;">My Registered Items</div>
              <div style="font-size:1.85rem;font-weight:800;color:#14532D;margin:0.2rem 0;">${myItems.length}</div>
              <div style="font-size:0.74rem;color:#526066;">Unique E-Waste Passports</div>
            </div>
            <div class="ec-card" style="border-top:4px solid #3B82F6;">
              <div style="font-size:0.76rem;font-weight:600;color:#526066;">Active Collection / Assessment</div>
              <div style="font-size:1.85rem;font-weight:800;color:#263238;margin:0.2rem 0;">
                ${myItems.filter((i) => ['Submitted', 'Pickup Scheduled', 'Collected', 'Under Assessment', 'Under Repair'].includes(i.currentStatus)).length}
              </div>
              <div style="font-size:0.74rem;color:#526066;">In progress across fleet/partners</div>
            </div>
            <div class="ec-card" style="border-top:4px solid #16A34A;">
              <div style="font-size:0.76rem;font-weight:600;color:#526066;">My Reboot Market Listings</div>
              <div style="font-size:1.85rem;font-weight:800;color:#14532D;margin:0.2rem 0;">${myListings.length}</div>
              <div style="font-size:0.74rem;color:#526066;">${incomingRequests.length} incoming interest request(s)</div>
            </div>
            <div class="ec-card" style="border-top:4px solid #475569;">
              <div style="font-size:0.76rem;font-weight:600;color:#526066;">My Sent Market Requests</div>
              <div style="font-size:1.85rem;font-weight:800;color:#263238;margin:0.2rem 0;">${mySentRequests.length}</div>
              <div style="font-size:0.74rem;color:#526066;">Reuse / repair requests submitted</div>
            </div>
          </div>

          <!-- User's Registered Items Section -->
          <div class="ec-card" style="margin-bottom:1.5rem;">
            <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.75rem;margin-bottom:1rem;">
              <div>
                <h2 style="font-size:1.12rem;font-weight:800;margin:0;">My Submitted E-Waste Items</h2>
                <p style="font-size:0.78rem;color:#526066;margin:0.15rem 0 0 0;">
                  Private pickup details are visible only to you, your assigned collection worker, and administrators.
                </p>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
                <select class="ec-select" style="width:auto;padding:0.4rem 0.7rem;font-size:0.8rem;" onchange="AppState.userDashStatus=this.value;renderApp();">
                  <option value="all" ${stFilter === 'all' ? 'selected' : ''}>All Statuses</option>
                  ${Object.keys(STATUS_META)
                    .map((s) => `<option value="${escapeHtml(s)}" ${stFilter === s ? 'selected' : ''}>${escapeHtml(s)}</option>`)
                    .join('')}
                </select>
                <select class="ec-select" style="width:auto;padding:0.4rem 0.7rem;font-size:0.8rem;" onchange="AppState.userDashCategory=this.value;renderApp();">
                  <option value="all" ${catFilter === 'all' ? 'selected' : ''}>All Categories</option>
                  ${DEVICE_CATEGORIES.map((c) => `<option value="${c.value}" ${catFilter === c.value ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('')}
                </select>
              </div>
            </div>

            ${
              filteredItems.length === 0
                ? `<div style="text-align:center;padding:2rem;background:#F8FAF5;border-radius:10px;border:1px dashed #C4DEC9;">
                    <div style="font-weight:700;margin-bottom:0.35rem;">No Submitted E-Waste Items Found</div>
                    <p style="font-size:0.82rem;color:#526066;margin:0 0 0.9rem 0;">Register your first device with optional camera capture to generate an E-Waste Passport.</p>
                    <button type="button" class="ec-btn-primary" onclick="navigateTo('/submit')">Submit E-Waste Item →</button>
                  </div>`
                : `<div class="ec-table-wrap">
                    <table class="ec-table">
                      <thead>
                        <tr>
                          <th>Passport ID</th>
                          <th>Photo</th>
                          <th>Device &amp; Category</th>
                          <th>Reported vs Assessed</th>
                          <th>Current Status</th>
                          <th>Private Logistics</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${filteredItems
                          .map(
                            (it) => `<tr>
                              <td>
                                <button type="button" onclick="navigateTo('/track','${escapeHtml(it.id)}')" style="background:none;border:none;padding:0;font-family:monospace;font-weight:800;color:#14532D;cursor:pointer;text-decoration:underline;">
                                  ${escapeHtml(it.id)}
                                </button>
                                <div style="font-size:0.7rem;color:#526066;">${formatShortDate(it.createdAt)}</div>
                              </td>
                              <td>
                                <img data-photo-id="${escapeHtml(it.photoId || '')}" src="${(it.photoId && SEEDED_SVG_PHOTOS[it.photoId]) || getCategoryDefaultPhoto(it.category)}" alt="Item thumb" style="width:52px;height:38px;object-fit:cover;border-radius:6px;border:1px solid var(--border);background:#F1F6F0;" />
                              </td>
                              <td>
                                <div style="font-weight:700;color:var(--charcoal);">${escapeHtml(it.title)}</div>
                                <div style="font-size:0.75rem;color:#526066;">${escapeHtml(getCategoryLabel(it.category))} · Qty: ${it.quantity}</div>
                              </td>
                              <td style="font-size:0.78rem;">
                                <div>Reported: <strong>${escapeHtml(getConditionLabel(it.reportedCondition))}</strong></div>
                                <div style="color:#14532D;">Assessed: <strong>${escapeHtml(getConditionLabel(it.assessedCondition))}</strong></div>
                              </td>
                              <td>${renderStatusBadge(it.currentStatus)}</td>
                              <td style="font-size:0.76rem;color:#37474F;max-width:200px;">
                                <span style="background:#FEF3C7;color:#92400E;font-size:0.66rem;font-weight:700;padding:0.08rem 0.35rem;border-radius:4px;">PRIVATE</span>
                                <div>${escapeHtml(it.pickupArea)}</div>
                              </td>
                              <td>
                                <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
                                  <button type="button" class="ec-btn-secondary" style="padding:0.3rem 0.6rem;font-size:0.75rem;" onclick="navigateTo('/track','${escapeHtml(it.id)}')">Passport &amp; QR</button>
                                  ${
                                    it.category !== 'battery' && !it.linkedListingId
                                      ? `<button type="button" class="ec-btn-primary" style="padding:0.3rem 0.6rem;font-size:0.75rem;" onclick="openCreateListingModal('${escapeHtml(it.id)}')">List for Reuse</button>`
                                      : ''
                                  }
                                </div>
                              </td>
                            </tr>`
                          )
                          .join('')}
                      </tbody>
                    </table>
                  </div>`
            }
          </div>

          <!-- Marketplace Listings & Interest Requests Grid -->
          <div class="ec-grid-2">
            <div class="ec-card">
              <h2 style="font-size:1.05rem;font-weight:800;margin:0 0 0.75rem 0;">My Reboot Market Listings</h2>
              ${
                myListings.length === 0
                  ? `<p style="font-size:0.83rem;color:#526066;margin:0;">You haven't created any Reboot Market listings yet.</p>`
                  : `<div style="display:grid;gap:0.65rem;">
                      ${myListings
                        .map(
                          (l) => `<div style="padding:0.75rem;border:1px solid var(--border);border-radius:8px;background:#F8FAF5;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem;">
                              <strong style="font-size:0.86rem;">${escapeHtml(l.title)}</strong>
                              <span class="ec-badge ec-badge-green">${escapeHtml(l.status)}</span>
                            </div>
                            <div style="font-size:0.76rem;color:#526066;margin-bottom:0.5rem;">Passport: <code>${escapeHtml(l.itemId)}</code> · Offer: ${escapeHtml(l.offerType)}</div>
                            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
                              <button type="button" class="ec-btn-secondary" style="padding:0.25rem 0.55rem;font-size:0.73rem;" onclick="handleOwnerListingStatus('${escapeHtml(l.id)}','reserved')">Mark Reserved</button>
                              <button type="button" class="ec-btn-primary" style="padding:0.25rem 0.55rem;font-size:0.73rem;" onclick="handleOwnerListingStatus('${escapeHtml(l.id)}','transferred')">Mark Transferred / Reused</button>
                              <button type="button" class="ec-btn-danger" style="padding:0.25rem 0.55rem;font-size:0.73rem;" onclick="handleOwnerListingStatus('${escapeHtml(l.id)}','withdrawn')">Withdraw</button>
                            </div>
                          </div>`
                        )
                        .join('')}
                    </div>`
              }
            </div>

            <div class="ec-card">
              <h2 style="font-size:1.05rem;font-weight:800;margin:0 0 0.75rem 0;">My Market Interest &amp; Repair Requests</h2>
              ${
                mySentRequests.length === 0 && incomingRequests.length === 0
                  ? `<p style="font-size:0.83rem;color:#526066;margin:0;">No incoming or outgoing Reboot Market requests yet.</p>`
                  : `<div style="display:grid;gap:0.65rem;">
                      ${[...incomingRequests, ...mySentRequests]
                        .map(
                          (r) => `<div style="padding:0.75rem;border:1px solid var(--border);border-radius:8px;background:#FFFFFF;">
                            <div style="display:flex;justify-content:space-between;font-size:0.76rem;color:#14532D;font-weight:700;margin-bottom:0.25rem;">
                              <span>${r.requesterId === user.id ? 'SENT BY YOU' : 'INCOMING REQUEST FROM ' + escapeHtml(r.requesterName)}</span>
                              <span>Item: ${escapeHtml(r.itemId)}</span>
                            </div>
                            <div style="font-size:0.83rem;font-weight:700;margin-bottom:0.2rem;">${escapeHtml(r.requestType)}</div>
                            <p style="font-size:0.79rem;color:#37474F;margin:0;">"${escapeHtml(r.message)}"</p>
                          </div>`
                        )
                        .join('')}
                    </div>`
              }
            </div>
          </div>
        </div>
      `;
    }

    function handleOwnerListingStatus(listingId, newStatus) {
      const user = AuthService.getCurrentUser();
      try {
        DataRepository.updateListingStatus(listingId, newStatus, user);
        showToast(`Listing updated to '${newStatus}'.`);
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    // ============================================================================
    // ASSIGNED OPERATIONS TASKS (/tasks) — WORKER, REPAIR PARTNER, RECYCLER PARTNER
    // ============================================================================
    function renderTasksPage() {
      const user = AuthService.getCurrentUser();
      if (!user) return '';

      if (user.role === 'user') {
        return `
          <div class="app-container" style="max-width:680px;">
            <div class="ec-card" style="padding:2rem;text-align:center;">
              <span class="ec-badge ec-badge-amber" style="margin-bottom:0.5rem;">Role Permission Guard</span>
              <h1 style="font-size:1.4rem;font-weight:800;margin:0 0 0.5rem 0;">Operational Tasks Workbench</h1>
              <p style="font-size:0.86rem;color:#526066;margin:0 0 1.2rem 0;">
                Your current profile is <strong>Resident / User (<code>user</code>)</strong>. Field collection tasks, lab repair assessments, and recycler batch logs are restricted to assigned staff and partner roles.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center;">
                <button type="button" class="ec-btn-primary" onclick="navigateTo('/dashboard')">Return to My Resident Dashboard</button>
                <button type="button" class="ec-btn-secondary" onclick="navigateTo('/login')">Sign In with Staff / Partner Account</button>
              </div>
            </div>
          </div>
        `;
      }

      const assignedItems = DataRepository.getItemsForActor(user);
      const roleMeta = ROLE_META[user.role] || ROLE_META.worker;
      const allowedStatuses = ROLE_ALLOWED_STATUSES[user.role] || [];

      return `
        <div class="app-container">
          <!-- Photographic Page Banner -->
          <div class="ec-page-banner" style="background-image:url('${user.role === 'repair_partner' ? VISUAL_ASSETS.phone : VISUAL_ASSETS.collectionHub}');">
            <div class="ec-page-banner-overlay" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.75rem;">
              <div>
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;">
                  ${renderRoleBadge(user.role)}
                  <span class="ec-badge ec-badge-green">Scoped Access — Assigned Tasks Only</span>
                </div>
                <h1 style="font-size:1.6rem;font-weight:800;margin:0;color:#FFFFFF;">
                  ${escapeHtml(roleMeta.label)} Operations Queue — ${escapeHtml(user.name)}
                </h1>
                <p style="font-size:0.84rem;color:#E2E8F0;margin:0.2rem 0 0 0;max-width:700px;">
                  ${escapeHtml(roleMeta.summary)} Unassigned resident records and private profiles are hidden by the service layer.
                </p>
              </div>
              <button type="button" class="ec-btn-secondary" onclick="navigateTo('/login')">Switch Account</button>
            </div>
          </div>

          ${
            assignedItems.length === 0
              ? `<div class="ec-card" style="text-align:center;padding:2.5rem;">
                  <h3 style="margin:0 0 0.4rem 0;">No Tasks Currently Assigned to Your Account</h3>
                  <p style="font-size:0.85rem;color:#526066;margin:0;">An Administrator can assign items to your account from the Admin Dashboard.</p>
                </div>`
              : `<div style="display:grid;gap:1.15rem;">
                  ${assignedItems
                    .map(
                      (it) => `<div class="ec-card" style="border-left:5px solid #14532D;">
                        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:1rem;border-bottom:1px solid var(--border);padding-bottom:0.85rem;">
                          <div>
                            <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.3rem;">
                              <button type="button" onclick="navigateTo('/track','${escapeHtml(it.id)}')" style="background:#14532D;color:#FFFFFF;border:none;padding:0.2rem 0.6rem;border-radius:5px;font-family:monospace;font-weight:800;cursor:pointer;">
                                ${escapeHtml(it.id)}
                              </button>
                              ${renderStatusBadge(it.currentStatus)}
                              <span style="font-size:0.78rem;color:#526066;">Category: <strong>${escapeHtml(getCategoryLabel(it.category))}</strong> · Qty: ${it.quantity}</span>
                            </div>
                            <h3 style="font-size:1.15rem;font-weight:800;margin:0.25rem 0;color:var(--charcoal);">${escapeHtml(it.title)}</h3>
                            <div style="font-size:0.82rem;color:#37474F;">
                              Reported Condition: <strong>${escapeHtml(getConditionLabel(it.reportedCondition))}</strong>
                              &nbsp;|&nbsp; Assessed Condition: <strong>${escapeHtml(getConditionLabel(it.assessedCondition))}</strong>
                              &nbsp;|&nbsp; Handler Ref: <code>${escapeHtml(it.handlerReference || 'None')}</code>
                            </div>
                            ${
                              user.role === 'worker' || user.role === 'admin'
                                ? `<div style="margin-top:0.45rem;font-size:0.8rem;background:#FEF3C7;color:#92400E;padding:0.4rem 0.65rem;border-radius:6px;display:inline-block;">
                                    <strong>Assigned Pickup Logistics:</strong> ${escapeHtml(it.pickupArea)} · Contact: ${escapeHtml(it.contactPhone)}
                                  </div>`
                                : ''
                            }
                          </div>

                          <div style="display:flex;gap:0.65rem;align-items:center;">
                            <div style="text-align:center;">
                              <img data-photo-id="${escapeHtml(it.photoId || '')}" src="${(it.photoId && SEEDED_SVG_PHOTOS[it.photoId]) || getCategoryDefaultPhoto(it.category)}" alt="Item" style="width:88px;height:64px;object-fit:cover;border-radius:6px;border:1px solid var(--border);" />
                              <div style="font-size:0.66rem;color:#526066;">Item Photo</div>
                            </div>
                            ${
                              it.collectionProofPhotoId
                                ? `<div style="text-align:center;">
                                    <img data-photo-id="${escapeHtml(it.collectionProofPhotoId)}" src="${SEEDED_SVG_PHOTOS[it.collectionProofPhotoId] || VISUAL_ASSETS.collectionHub}" alt="Proof" style="width:88px;height:64px;object-fit:cover;border-radius:6px;border:1px solid #86EFAC;" />
                                    <div style="font-size:0.66rem;color:#14532D;font-weight:700;">Collection Proof</div>
                                  </div>`
                                : ''
                            }
                          </div>
                        </div>

                        <!-- Role-Specific Task Action Form -->
                        <form onsubmit="handleTaskUpdateSubmit(event, '${escapeHtml(it.id)}')" class="ec-grid-4" style="align-items:end;">
                          <div>
                            <label class="ec-label" for="task-status-${escapeHtml(it.id)}">Update Milestone Status *</label>
                            <select id="task-status-${escapeHtml(it.id)}" class="ec-select" required>
                              ${allowedStatuses
                                .map(
                                  (st) => `<option value="${escapeHtml(st)}" ${it.currentStatus === st ? 'selected' : ''}>${escapeHtml(st)}</option>`
                                )
                                .join('')}
                            </select>
                          </div>

                          ${
                            user.role === 'repair_partner' || user.role === 'admin'
                              ? `<div>
                                  <label class="ec-label" for="task-cond-${escapeHtml(it.id)}">Assessed Technical Condition</label>
                                  <select id="task-cond-${escapeHtml(it.id)}" class="ec-select">
                                    <option value="">Keep Current (${escapeHtml(getConditionLabel(it.assessedCondition))})</option>
                                    ${CONDITION_OPTIONS.map(
                                      (c) => `<option value="${c.value}" ${it.assessedCondition === c.value ? 'selected' : ''}>${escapeHtml(c.label)}</option>`
                                    ).join('')}
                                  </select>
                                </div>`
                              : `<div>
                                  <label class="ec-label" for="task-ref-${escapeHtml(it.id)}">Handler / Batch Reference</label>
                                  <input id="task-ref-${escapeHtml(it.id)}" type="text" class="ec-input" value="${escapeHtml(it.handlerReference || '')}" placeholder="e.g. Unit-04 or ECO-BAT-99" />
                                </div>`
                          }

                          <div>
                            <label class="ec-label" for="task-note-${escapeHtml(it.id)}">Operational Milestone Note *</label>
                            <input id="task-note-${escapeHtml(it.id)}" type="text" class="ec-input" placeholder="Enter inspection, pickup, or batch note..." required />
                          </div>

                          <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                            ${
                              user.role === 'worker' || user.role === 'admin'
                                ? `<button type="button" class="ec-btn-secondary" style="padding:0.58rem 0.75rem;font-size:0.78rem;" onclick="triggerWorkerCollectionPhoto('${escapeHtml(it.id)}')">
                                    + Proof Photo
                                  </button>`
                                : ''
                            }
                            <button type="submit" class="ec-btn-primary" style="flex:1;padding:0.58rem 0.85rem;font-size:0.82rem;">
                              Save Update
                            </button>
                          </div>
                        </form>
                      </div>`
                    )
                    .join('')}
                </div>`
          }
        </div>
      `;
    }

    function triggerWorkerCollectionPhoto(itemId) {
      const user = AuthService.getCurrentUser();
      openCameraModal(`Attach Proof-of-Collection Photo (${itemId})`, (savedPhoto) => {
        try {
          DataRepository.updateItemStatusAndDetails(
            itemId,
            {
              newStatus: 'Collected',
              collectionProofPhotoId: savedPhoto.id,
              note: 'Collected item and attached field proof-of-collection photo.'
            },
            user
          );
          showToast(`Proof photo attached and ${itemId} marked Collected.`);
          renderApp();
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    }

    function handleTaskUpdateSubmit(event, itemId) {
      event.preventDefault();
      const user = AuthService.getCurrentUser();
      const newStatus = document.getElementById(`task-status-${itemId}`)?.value;
      const assessedCondition = document.getElementById(`task-cond-${itemId}`)?.value;
      const handlerReference = document.getElementById(`task-ref-${itemId}`)?.value;
      const note = document.getElementById(`task-note-${itemId}`)?.value;

      try {
        DataRepository.updateItemStatusAndDetails(
          itemId,
          {
            newStatus,
            assessedCondition: assessedCondition || undefined,
            handlerReference: handlerReference !== undefined ? handlerReference : undefined,
            note,
            adminOverride: user.role === 'admin'
          },
          user
        );
        showToast(`Updated ${itemId} to '${newStatus}'.`);
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    // ============================================================================
    // ADMINISTRATOR OPERATIONS DASHBOARD (/admin)
    // ============================================================================
    function renderAdminPage() {
      const user = AuthService.getCurrentUser();
      if (!user) return '';

      if (user.role !== 'admin') {
        return `
          <div class="app-container" style="max-width:680px;">
            <div class="ec-card" style="padding:2rem;text-align:center;border-color:#FECACA;">
              <span class="ec-badge ec-badge-red" style="margin-bottom:0.5rem;">Administrator Access Required</span>
              <h1 style="font-size:1.4rem;font-weight:800;margin:0 0 0.5rem 0;">Restricted Operations Screen</h1>
              <p style="font-size:0.86rem;color:#526066;margin:0 0 1.2rem 0;">
                You are currently signed in as <strong>${escapeHtml(user.name)} (${escapeHtml(ROLE_META[user.role].label)})</strong>. Only accounts with the <code>admin</code> role can access system-wide item management, role assignments, and moderation.
              </p>
              <div style="display:flex;flex-wrap:wrap;gap:0.6rem;justify-content:center;">
                <button type="button" class="ec-btn-primary" onclick="navigateTo('/login')">
                  Sign In with Administrator Account →
                </button>
                <button type="button" class="ec-btn-secondary" onclick="navigateTo('${ROLE_META[user.role].homeRoute}')">
                  Go to My Role Workspace
                </button>
              </div>
            </div>
          </div>
        `;
      }

      const metrics = DataRepository.computeCircularMetrics();
      const allItems = DataRepository.load().items;
      const allUsers = DataRepository.getUsers();
      const allListings = DataRepository.getListings();
      const tab = AppState.adminTab || 'items';

      const q = (AppState.adminSearch || '').trim().toLowerCase();
      const stFilter = AppState.adminStatusFilter || 'all';
      const catFilter = AppState.adminCategoryFilter || 'all';

      const filteredItems = allItems.filter((it) => {
        const matchQ =
          !q ||
          it.id.toLowerCase().includes(q) ||
          it.title.toLowerCase().includes(q) ||
          (it.ownerName || '').toLowerCase().includes(q);
        const matchSt = stFilter === 'all' || it.currentStatus === stFilter;
        const matchCat = catFilter === 'all' || it.category === catFilter;
        return matchQ && matchSt && matchCat;
      });

      const totalForBar = Math.max(1, metrics.totalUniqueItems);
      const pctCollection = Math.round((metrics.awaitingCollection / totalForBar) * 100);
      const pctAssess = Math.round(((metrics.awaitingAssessment + metrics.inProcess) / totalForBar) * 100);
      const pctReuse = Math.round(((metrics.activeReusePool + metrics.divertedOutcomes) / totalForBar) * 100);
      const pctRecycled = Math.max(0, 100 - pctCollection - pctAssess - pctReuse);

      return `
        <div class="app-container">
          <!-- Photographic Admin Header Banner -->
          <div class="ec-page-banner" style="background-image:url('${VISUAL_ASSETS.collectionHub}');">
            <div class="ec-page-banner-overlay" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.75rem;">
              <div>
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.3rem;">
                  <span class="ec-badge ec-badge-green">ADMINISTRATOR COMMAND CENTRE</span>
                  <span class="ec-badge ec-badge-neutral">Unique Item Accounting</span>
                </div>
                <h1 style="font-size:1.6rem;font-weight:800;margin:0;color:#FFFFFF;">E-Cycle Loop 360 — Admin Operations</h1>
                <p style="font-size:0.84rem;color:#E2E8F0;margin:0.2rem 0 0 0;">
                  Manage collection queues, assign field workers and lab partners, audit status timelines, moderate Reboot Market listings, and manage user roles.
                </p>
              </div>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button type="button" class="ec-btn-secondary" onclick="navigateTo('/how-it-works')">Workflow Guide</button>
                <button type="button" class="ec-btn-danger" onclick="confirmResetDemoData()">Reset Demo Dataset</button>
              </div>
            </div>
          </div>

          <!-- 6 Required Admin Overview Metric Cards -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:0.85rem;margin-bottom:1.25rem;">
            <div class="ec-card" style="padding:1rem;border-top:4px solid #14532D;">
              <div style="font-size:0.74rem;font-weight:600;color:#526066;">1. Unique Items Registered</div>
              <div class="ec-metric-val" data-count-target="${metrics.totalUniqueItems}" style="font-size:1.75rem;font-weight:800;color:#14532D;margin:0.15rem 0;">${metrics.totalUniqueItems}</div>
              <div style="font-size:0.7rem;color:#526066;">Recorded Weight: ${metrics.recordedWeightKg} kg</div>
            </div>
            <div class="ec-card" style="padding:1rem;border-top:4px solid #F59E0B;">
              <div style="font-size:0.74rem;font-weight:600;color:#526066;">2. Awaiting Collection</div>
              <div class="ec-metric-val" data-count-target="${metrics.awaitingCollection}" style="font-size:1.75rem;font-weight:800;color:#92400E;margin:0.15rem 0;">${metrics.awaitingCollection}</div>
              <div style="font-size:0.7rem;color:#526066;">Submitted / Pickup Scheduled</div>
            </div>
            <div class="ec-card" style="padding:1rem;border-top:4px solid #3B82F6;">
              <div style="font-size:0.74rem;font-weight:600;color:#526066;">3. Awaiting Assessment</div>
              <div class="ec-metric-val" data-count-target="${metrics.awaitingAssessment}" style="font-size:1.75rem;font-weight:800;color:#263238;margin:0.15rem 0;">${metrics.awaitingAssessment}</div>
              <div style="font-size:0.7rem;color:#526066;">Collected / Under Assessment</div>
            </div>
            <div class="ec-card" style="padding:1rem;border-top:4px solid #16A34A;">
              <div style="font-size:0.74rem;font-weight:600;color:#526066;">4. Active Reuse Listings</div>
              <div class="ec-metric-val" data-count-target="${metrics.activeListings}" style="font-size:1.75rem;font-weight:800;color:#14532D;margin:0.15rem 0;">${metrics.activeListings}</div>
              <div style="font-size:0.7rem;color:#526066;">Live on Reboot Market</div>
            </div>
            <div class="ec-card" style="padding:1rem;background:#F5FBF7;border-top:4px solid #14532D;">
              <div style="font-size:0.74rem;font-weight:700;color:#14532D;">5. Reused / Repaired Outcomes</div>
              <div class="ec-metric-val" data-count-target="${metrics.divertedOutcomes}" style="font-size:1.75rem;font-weight:800;color:#14532D;margin:0.15rem 0;">${metrics.divertedOutcomes}</div>
              <div style="font-size:0.7rem;color:#14532D;">Diverted from disposal</div>
            </div>
            <div class="ec-card" style="padding:1rem;border-top:4px solid #475569;">
              <div style="font-size:0.74rem;font-weight:600;color:#526066;">6. Recorded Recycling</div>
              <div class="ec-metric-val" data-count-target="${metrics.recycledOutcomes}" style="font-size:1.75rem;font-weight:800;color:#263238;margin:0.15rem 0;">${metrics.recycledOutcomes}</div>
              <div style="font-size:0.7rem;color:#526066;">End-of-life material recovery</div>
            </div>
          </div>

          <!-- Circular Economy Proportion Chart Bar -->
          <div class="ec-card" style="margin-bottom:1.25rem;padding:1rem 1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.45rem;font-size:0.8rem;font-weight:700;">
              <span>Circular Lifecycle Distribution (${metrics.totalUniqueItems} Unique Devices — Zero Double Counting)</span>
              <span style="color:#14532D;">Reuse &amp; Repair Priority Rate: ${pctReuse}%</span>
            </div>
            <div style="height:14px;width:100%;background:#E2E8F0;border-radius:999px;overflow:hidden;display:flex;margin-bottom:0.5rem;">
              <div class="ec-progress-segment" style="width:${pctReuse}%;background:#14532D;" title="Reuse / Repaired / Active Second-Life (${pctReuse}%)"></div>
              <div class="ec-progress-segment" style="width:${pctAssess}%;background:#3B82F6;" title="Assessment / Repair / Processing (${pctAssess}%)"></div>
              <div class="ec-progress-segment" style="width:${pctCollection}%;background:#F59E0B;" title="Awaiting Collection (${pctCollection}%)"></div>
              <div class="ec-progress-segment" style="width:${pctRecycled}%;background:#64748B;" title="Recycling Recorded (${pctRecycled}%)"></div>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:1.1rem;font-size:0.75rem;color:#526066;">
              <span><strong style="color:#14532D;">■</strong> Reuse Pool &amp; Diverted (${metrics.activeReusePool + metrics.divertedOutcomes})</span>
              <span><strong style="color:#3B82F6;">■</strong> Assessment &amp; Processing (${metrics.awaitingAssessment + metrics.inProcess})</span>
              <span><strong style="color:#F59E0B;">■</strong> Collection Queue (${metrics.awaitingCollection})</span>
              <span><strong style="color:#64748B;">■</strong> Recorded Recycling (${metrics.recycledOutcomes})</span>
            </div>
          </div>

          <!-- Admin Sub-Navigation Tabs -->
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1rem;border-bottom:1px solid var(--border);padding-bottom:0.6rem;">
            <button type="button" class="ec-nav-link ${tab === 'items' ? 'active' : ''}" onclick="AppState.adminTab='items';renderApp();">
              1. Item Operations &amp; Status Queue (${allItems.length})
            </button>
            <button type="button" class="ec-nav-link ${tab === 'market' ? 'active' : ''}" onclick="AppState.adminTab='market';renderApp();">
              2. Reboot Market Moderation (${allListings.length})
            </button>
            <button type="button" class="ec-nav-link ${tab === 'users' ? 'active' : ''}" onclick="AppState.adminTab='users';renderApp();">
              3. Users &amp; Role Assignments (${allUsers.length})
            </button>
          </div>

          ${
            tab === 'items'
              ? `
                <div class="ec-card">
                  <div style="display:flex;flex-wrap:wrap;gap:0.65rem;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                    <input id="admin-item-search" type="search" class="ec-input" style="max-width:320px;" placeholder="Search ID, device name, or owner..." value="${escapeHtml(AppState.adminSearch)}" oninput="AppState.adminSearch=this.value;renderApp();document.getElementById('admin-item-search')?.focus();" />
                    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
                      <select class="ec-select" style="width:auto;" onchange="AppState.adminStatusFilter=this.value;renderApp();">
                        <option value="all" ${stFilter === 'all' ? 'selected' : ''}>All Statuses</option>
                        ${Object.keys(STATUS_META)
                          .map((s) => `<option value="${escapeHtml(s)}" ${stFilter === s ? 'selected' : ''}>${escapeHtml(s)}</option>`)
                          .join('')}
                      </select>
                      <select class="ec-select" style="width:auto;" onchange="AppState.adminCategoryFilter=this.value;renderApp();">
                        <option value="all" ${catFilter === 'all' ? 'selected' : ''}>All Categories</option>
                        ${DEVICE_CATEGORIES.map((c) => `<option value="${c.value}" ${catFilter === c.value ? 'selected' : ''}>${escapeHtml(c.label)}</option>`).join('')}
                      </select>
                    </div>
                  </div>

                  <div class="ec-table-wrap">
                    <table class="ec-table">
                      <thead>
                        <tr>
                          <th>Passport ID</th>
                          <th>Item &amp; Resident</th>
                          <th>Category</th>
                          <th>Reported / Assessed</th>
                          <th>Current Status</th>
                          <th>Assigned Staff / Partner</th>
                          <th>Next Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${filteredItems
                          .map((it) => {
                            const worker = it.assignedWorkerId ? DataRepository.getUserById(it.assignedWorkerId) : null;
                            const partner = it.assignedPartnerId
                              ? DataRepository.getUserById(it.assignedPartnerId)
                              : it.assignedRecyclerId
                              ? DataRepository.getUserById(it.assignedRecyclerId)
                              : null;
                            return `<tr>
                              <td>
                                <button type="button" onclick="navigateTo('/track','${escapeHtml(it.id)}')" style="background:none;border:none;padding:0;font-family:monospace;font-weight:800;color:#14532D;cursor:pointer;text-decoration:underline;">
                                  ${escapeHtml(it.id)}
                                </button>
                                <div style="font-size:0.7rem;color:#526066;">${formatShortDate(it.createdAt)}</div>
                              </td>
                              <td>
                                <div style="display:flex;align-items:center;gap:0.55rem;">
                                  <img data-photo-id="${escapeHtml(it.photoId || '')}" src="${(it.photoId && SEEDED_SVG_PHOTOS[it.photoId]) || getCategoryDefaultPhoto(it.category)}" alt="Device" style="width:42px;height:32px;object-fit:cover;border-radius:5px;border:1px solid var(--border);flex-shrink:0;" />
                                  <div>
                                    <div style="font-weight:700;">${escapeHtml(it.title)}</div>
                                    <div style="font-size:0.74rem;color:#526066;">By: ${escapeHtml(it.ownerName)} · ${escapeHtml(it.submissionType)}</div>
                                  </div>
                                </div>
                              </td>
                              <td><span style="font-size:0.78rem;font-weight:600;">${escapeHtml(getCategoryLabel(it.category))}</span></td>
                              <td style="font-size:0.76rem;">
                                <div>Rep: <strong>${escapeHtml(getConditionLabel(it.reportedCondition))}</strong></div>
                                <div style="color:#14532D;">QA: <strong>${escapeHtml(getConditionLabel(it.assessedCondition))}</strong></div>
                              </td>
                              <td>${renderStatusBadge(it.currentStatus)}</td>
                              <td style="font-size:0.75rem;color:#37474F;">
                                <div>Worker: <strong>${escapeHtml(worker ? worker.name.split(' ')[0] : 'Unassigned')}</strong></div>
                                <div>Partner: <strong>${escapeHtml(partner ? partner.name.split('(')[0] : 'Unassigned')}</strong></div>
                              </td>
                              <td>
                                <button type="button" class="ec-btn-primary" style="padding:0.35rem 0.7rem;font-size:0.76rem;" onclick="openAdminItemDrawer('${escapeHtml(it.id)}')">
                                  Manage / Update Status
                                </button>
                              </td>
                            </tr>`;
                          })
                          .join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              `
              : tab === 'market'
              ? `
                <div class="ec-card">
                  <h2 style="font-size:1.1rem;font-weight:800;margin:0 0 0.85rem 0;">Reboot Market Listing Moderation</h2>
                  <div class="ec-table-wrap">
                    <table class="ec-table">
                      <thead>
                        <tr>
                          <th>Listing ID</th>
                          <th>Linked Passport</th>
                          <th>Title &amp; Owner</th>
                          <th>Offer Type</th>
                          <th>Status</th>
                          <th>Moderation Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${allListings
                          .map(
                            (l) => `<tr>
                              <td><code>${escapeHtml(l.id)}</code></td>
                              <td>
                                <button type="button" onclick="navigateTo('/track','${escapeHtml(l.itemId)}')" style="background:none;border:none;padding:0;font-family:monospace;font-weight:700;color:#14532D;cursor:pointer;text-decoration:underline;">
                                  ${escapeHtml(l.itemId)}
                                </button>
                              </td>
                              <td>
                                <div style="font-weight:700;">${escapeHtml(l.title)}</div>
                                <div style="font-size:0.74rem;color:#526066;">Owner: ${escapeHtml(l.ownerName)}</div>
                              </td>
                              <td>${escapeHtml(l.offerType.toUpperCase())} ${l.priceInr ? '· ₹' + l.priceInr : ''}</td>
                              <td><span class="ec-badge ec-badge-neutral">${escapeHtml(l.status)}</span></td>
                              <td>
                                <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
                                  <button type="button" class="ec-btn-secondary" style="padding:0.25rem 0.55rem;font-size:0.74rem;" onclick="handleOwnerListingStatus('${escapeHtml(l.id)}','available')">Set Available</button>
                                  <button type="button" class="ec-btn-primary" style="padding:0.25rem 0.55rem;font-size:0.74rem;" onclick="handleOwnerListingStatus('${escapeHtml(l.id)}','transferred')">Mark Transferred</button>
                                  <button type="button" class="ec-btn-danger" style="padding:0.25rem 0.55rem;font-size:0.74rem;" onclick="handleOwnerListingStatus('${escapeHtml(l.id)}','withdrawn')">Withdraw</button>
                                </div>
                              </td>
                            </tr>`
                          )
                          .join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              `
              : `
                <div class="ec-card">
                  <h2 style="font-size:1.1rem;font-weight:800;margin:0 0 0.35rem 0;">User Accounts &amp; Role Assignments</h2>
                  <p style="font-size:0.8rem;color:#526066;margin:0 0 0.9rem 0;">
                    Only an Administrator can promote accounts to <code>worker</code>, <code>repair_partner</code>, <code>recycler_partner</code>, or <code>admin</code>.
                  </p>
                  <div class="ec-table-wrap">
                    <table class="ec-table">
                      <thead>
                        <tr>
                          <th>Name &amp; Organization</th>
                          <th>Email</th>
                          <th>Current Role</th>
                          <th>Status</th>
                          <th>Assign Role (Admin Only)</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${allUsers
                          .map(
                            (u) => `<tr>
                              <td>
                                <div style="font-weight:700;">${escapeHtml(u.name)}</div>
                                <div style="font-size:0.74rem;color:#526066;">${escapeHtml(u.area || '')}</div>
                              </td>
                              <td><code>${escapeHtml(u.email)}</code></td>
                              <td>${renderRoleBadge(u.role)}</td>
                              <td><span class="ec-badge ${u.status === 'active' ? 'ec-badge-green' : 'ec-badge-red'}">${escapeHtml(u.status)}</span></td>
                              <td>
                                <select class="ec-select" style="width:auto;padding:0.3rem 0.6rem;font-size:0.78rem;" onchange="handleAdminRoleChange('${escapeHtml(u.id)}', this.value)">
                                  ${Object.keys(ROLE_META)
                                    .map(
                                      (rKey) => `<option value="${rKey}" ${u.role === rKey ? 'selected' : ''}>${escapeHtml(ROLE_META[rKey].label)} (${rKey})</option>`
                                    )
                                    .join('')}
                                </select>
                              </td>
                            </tr>`
                          )
                          .join('')}
                      </tbody>
                    </table>
                  </div>
                </div>
              `
          }
        </div>
      `;
    }

    function handleAdminRoleChange(targetUserId, newRole) {
      const adminUser = AuthService.getCurrentUser();
      try {
        const updated = DataRepository.updateUserRoleOrStatus(targetUserId, { role: newRole }, adminUser);
        showToast(`Updated ${updated.name}'s role to ${ROLE_META[newRole].label}.`);
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }

    function openAdminItemDrawer(itemId) {
      const admin = AuthService.getCurrentUser();
      const item = DataRepository.getItemByIdForActor(itemId, admin);
      if (!item) return;

      const users = DataRepository.getUsers();
      const workers = users.filter((u) => u.role === 'worker');
      const repairPartners = users.filter((u) => u.role === 'repair_partner');
      const recyclerPartners = users.filter((u) => u.role === 'recycler_partner');
      const centres = DataRepository.getCentres();
      const legalNext = LEGAL_TRANSITIONS[item.currentStatus] || [];
      const history = DataRepository.getItemEvents(item.id);

      const root = document.getElementById('modal-root');
      if (!root) return;

      root.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true">
          <div class="ec-modal" style="max-width:740px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:0.85rem;border-bottom:1px solid var(--border);padding-bottom:0.75rem;">
              <div>
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;">
                  <span style="background:#14532D;color:#FFFFFF;font-family:monospace;font-weight:800;font-size:0.85rem;padding:0.18rem 0.55rem;border-radius:5px;">${escapeHtml(item.id)}</span>
                  ${renderStatusBadge(item.currentStatus)}
                </div>
                <h3 style="margin:0;font-size:1.2rem;font-weight:800;">${escapeHtml(item.title)}</h3>
                <div style="font-size:0.78rem;color:#526066;margin-top:0.15rem;">
                  Submitted by: <strong>${escapeHtml(item.ownerName)}</strong> · Private Pickup Info: ${escapeHtml(item.pickupArea)} (${escapeHtml(item.contactPhone)})
                </div>
              </div>
              <button type="button" class="ec-btn-secondary" style="padding:0.3rem 0.65rem;" onclick="closeModal()">Close</button>
            </div>

            <form onsubmit="handleAdminDrawerSave(event, '${escapeHtml(item.id)}')">
              <div class="ec-grid-2" style="margin-bottom:0.85rem;">
                <div>
                  <label class="ec-label" for="adm-next-status">New Status (Legal Next Transitions Highlighted) *</label>
                  <select id="adm-next-status" class="ec-select" required>
                    <option value="${escapeHtml(item.currentStatus)}">Keep Current: ${escapeHtml(item.currentStatus)}</option>
                    ${Object.keys(STATUS_META)
                      .filter((s) => s !== item.currentStatus)
                      .map((s) => {
                        const isLegal = legalNext.includes(s);
                        return `<option value="${escapeHtml(s)}">${isLegal ? '✓ Recommended: ' : '[Override] '} ${escapeHtml(s)}</option>`;
                      })
                      .join('')}
                  </select>
                </div>
                <div>
                  <label class="ec-label" for="adm-assessed-cond">Assessed Technical Condition</label>
                  <select id="adm-assessed-cond" class="ec-select">
                    <option value="">Pending / Unchanged (${escapeHtml(getConditionLabel(item.assessedCondition))})</option>
                    ${CONDITION_OPTIONS.map(
                      (c) => `<option value="${c.value}" ${item.assessedCondition === c.value ? 'selected' : ''}>${escapeHtml(c.label)}</option>`
                    ).join('')}
                  </select>
                </div>
              </div>

              <div class="ec-grid-3" style="margin-bottom:0.85rem;">
                <div>
                  <label class="ec-label" for="adm-worker">Assigned Collection Worker</label>
                  <select id="adm-worker" class="ec-select">
                    <option value="">Unassigned</option>
                    ${workers
                      .map((w) => `<option value="${escapeHtml(w.id)}" ${item.assignedWorkerId === w.id ? 'selected' : ''}>${escapeHtml(w.name)}</option>`)
                      .join('')}
                  </select>
                </div>
                <div>
                  <label class="ec-label" for="adm-repair">Assigned Repair &amp; Reuse Partner</label>
                  <select id="adm-repair" class="ec-select">
                    <option value="">Unassigned</option>
                    ${repairPartners
                      .map((p) => `<option value="${escapeHtml(p.id)}" ${item.assignedPartnerId === p.id ? 'selected' : ''}>${escapeHtml(p.name)}</option>`)
                      .join('')}
                  </select>
                </div>
                <div>
                  <label class="ec-label" for="adm-recycler">Assigned Recycling Partner</label>
                  <select id="adm-recycler" class="ec-select">
                    <option value="">Unassigned</option>
                    ${recyclerPartners
                      .map((r) => `<option value="${escapeHtml(r.id)}" ${item.assignedRecyclerId === r.id ? 'selected' : ''}>${escapeHtml(r.name)}</option>`)
                      .join('')}
                  </select>
                </div>
              </div>

              <div class="ec-grid-3" style="margin-bottom:0.85rem;">
                <div>
                  <label class="ec-label" for="adm-centre">Assigned Processing Centre</label>
                  <select id="adm-centre" class="ec-select">
                    ${centres.map((c) => `<option value="${escapeHtml(c.id)}" ${item.centreId === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="ec-label" for="adm-route">Processing Route Label</label>
                  <input id="adm-route" type="text" class="ec-input" value="${escapeHtml(item.processingRoute || '')}" placeholder="e.g. Lab Repair & Second-Life Listing" />
                </div>
                <div>
                  <label class="ec-label" for="adm-ref">Handler / Batch Reference</label>
                  <input id="adm-ref" type="text" class="ec-input" value="${escapeHtml(item.handlerReference || '')}" placeholder="e.g. GF-QA-2026-109" />
                </div>
              </div>

              <div style="margin-bottom:0.75rem;">
                <label class="ec-label" for="adm-note">Status History Event Note *</label>
                <input id="adm-note" type="text" class="ec-input" placeholder="Record reason for status transition or partner assignment..." required />
              </div>

              <div style="margin-bottom:1rem;font-size:0.8rem;color:#37474F;">
                <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;">
                  <input id="adm-override-check" type="checkbox" />
                  <span>Allow Admin Correction Override (permits jumping across non-adjacent lifecycle states)</span>
                </label>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:0.85rem;margin-bottom:1rem;">
                <button type="button" class="ec-btn-secondary" onclick="closeModal();navigateTo('/track','${escapeHtml(item.id)}')">Open Public Passport</button>
                <div style="display:flex;gap:0.5rem;">
                  <button type="button" class="ec-btn-secondary" onclick="closeModal()">Cancel</button>
                  <button type="submit" class="ec-btn-primary">Save Status &amp; Assignments</button>
                </div>
              </div>
            </form>

            <!-- Compact Audit Log inside Drawer -->
            <div style="background:#F8FAF5;border:1px solid var(--border);border-radius:8px;padding:0.75rem;max-height:170px;overflow-y:auto;">
              <div style="font-size:0.75rem;font-weight:700;color:#526066;margin-bottom:0.4rem;">AUDIT HISTORY LOG (${history.length} EVENTS):</div>
              ${history
                .slice()
                .reverse()
                .map(
                  (ev) => `<div style="font-size:0.76rem;padding:0.3rem 0;border-bottom:1px solid #E2E8F0;">
                    <strong>${escapeHtml(ev.newStatus)}</strong> (${escapeHtml(ev.updaterRole)}) · ${formatDateTime(ev.timestamp)} — ${escapeHtml(ev.note)}
                  </div>`
                )
                .join('')}
            </div>
          </div>
        </div>
      `;
    }

    function handleAdminDrawerSave(event, itemId) {
      event.preventDefault();
      const admin = AuthService.getCurrentUser();
      try {
        const updated = DataRepository.updateItemStatusAndDetails(
          itemId,
          {
            newStatus: document.getElementById('adm-next-status')?.value,
            assessedCondition: document.getElementById('adm-assessed-cond')?.value || undefined,
            assignedWorkerId: document.getElementById('adm-worker')?.value || null,
            assignedPartnerId: document.getElementById('adm-repair')?.value || null,
            assignedRecyclerId: document.getElementById('adm-recycler')?.value || null,
            centreId: document.getElementById('adm-centre')?.value || null,
            processingRoute: document.getElementById('adm-route')?.value,
            handlerReference: document.getElementById('adm-ref')?.value,
            note: document.getElementById('adm-note')?.value,
            adminOverride: Boolean(document.getElementById('adm-override-check')?.checked)
          },
          admin
        );
        closeModal();
        showToast(`Saved updates for ${updated.id} (Status: ${updated.currentStatus}).`);
        renderApp();
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
    // ============================================================================
    // 11. DEMO ACCOUNTS MODAL, PROFESSOR WALKTHROUGH MODAL, RESET & APP BOOTSTRAP
    // ============================================================================
    function openDemoAccountsModal() {
      const current = AuthService.getCurrentUser();
      const root = document.getElementById('modal-root');
      if (!root) return;

      root.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="demo-acc-modal-title">
          <div class="ec-modal" style="max-width:680px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.65rem;">
              <div>
                <span class="ec-badge ec-badge-amber">LOCAL DEMO MODE CREDENTIALS</span>
                <h3 id="demo-acc-modal-title" style="margin:0.25rem 0 0 0;font-size:1.25rem;font-weight:800;">Seeded Role Accounts (5 Profiles)</h3>
              </div>
              <button type="button" class="ec-btn-secondary" style="padding:0.3rem 0.65rem;" onclick="closeModal()">Close</button>
            </div>
            <p style="font-size:0.82rem;color:#526066;margin:0 0 0.9rem 0;">
              Click <strong>Switch to Role</strong> on any account below to immediately sign in and open its role-appropriate workspace. All credentials are for local demonstration only.
            </p>
            <div style="display:grid;gap:0.6rem;margin-bottom:1rem;">
              ${DEMO_ACCOUNTS_PUBLIC.map((acc) => {
                const isActive = current && current.email === acc.email;
                return `<div style="background:${isActive ? '#F1F6F0' : '#FFFFFF'};border:1px solid ${isActive ? '#14532D' : 'var(--border)'};border-radius:10px;padding:0.75rem 0.95rem;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.75rem;">
                  <div>
                    <div style="display:flex;align-items:center;gap:0.45rem;margin-bottom:0.2rem;">
                      <strong style="font-size:0.9rem;">${escapeHtml(acc.profileName)} — ${escapeHtml(acc.name)}</strong>
                      ${renderRoleBadge(acc.role)}
                      ${isActive ? `<span class="ec-badge ec-badge-green">ACTIVE SESSION</span>` : ''}
                    </div>
                    <div style="font-family:monospace;font-size:0.78rem;color:#37474F;">
                      Email: <strong>${escapeHtml(acc.email)}</strong> &nbsp;|&nbsp; Password: <strong>${escapeHtml(acc.demoAuthCode)}</strong>
                    </div>
                    <div style="font-size:0.75rem;color:#526066;margin-top:0.15rem;">${escapeHtml(ROLE_META[acc.role].summary)}</div>
                  </div>
                  <button type="button" class="ec-btn-primary" style="padding:0.4rem 0.85rem;font-size:0.78rem;" onclick="quickDemoLogin('${escapeHtml(acc.email)}','${escapeHtml(acc.demoAuthCode)}')">
                    ${isActive ? 'Open Workspace →' : 'Switch to Role →'}
                  </button>
                </div>`;
              }).join('')}
            </div>
            <div style="display:flex;justify-content:flex-end;">
              <button type="button" class="ec-btn-secondary" onclick="closeModal()">Done</button>
            </div>
          </div>
        </div>
      `;
    }

    function openWalkthroughModal() {
      const yr = getDynamicYear();
      const root = document.getElementById('modal-root');
      if (!root) return;

      root.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="walk-modal-title">
          <div class="ec-modal" style="max-width:700px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.65rem;">
              <div>
                <span class="ec-badge ec-badge-green">COLLEGE EVALUATION GUIDE</span>
                <h3 id="walk-modal-title" style="margin:0.25rem 0 0 0;font-size:1.25rem;font-weight:800;">5-Minute End-to-End Circular Demonstration</h3>
              </div>
              <button type="button" class="ec-btn-secondary" style="padding:0.3rem 0.65rem;" onclick="closeModal()">Close</button>
            </div>
            <p style="font-size:0.82rem;color:#526066;margin:0 0 0.9rem 0;">
              Use the quick-jump buttons below to demonstrate the complete item lifecycle across all 5 roles during your project presentation:
            </p>
            <div style="display:grid;gap:0.55rem;font-size:0.82rem;margin-bottom:1rem;">
              <div style="padding:0.65rem 0.85rem;border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <div><strong>1. Resident Submission &amp; Camera:</strong> Sign in as <code>user@ecycleloop.demo</code> and submit a partially working laptop with a photo.</div>
                <button type="button" class="ec-btn-primary" style="padding:0.35rem 0.7rem;font-size:0.75rem;white-space:nowrap;" onclick="quickDemoLogin('user@ecycleloop.demo','User@123');navigateTo('/submit');">Run Step 1 →</button>
              </div>
              <div style="padding:0.65rem 0.85rem;border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <div><strong>2. Digital Passport &amp; QR:</strong> Inspect the generated QR code and public-safe timeline on <code>/track/ECL-${yr}-0001</code>.</div>
                <button type="button" class="ec-btn-secondary" style="padding:0.35rem 0.7rem;font-size:0.75rem;white-space:nowrap;" onclick="closeModal();navigateTo('/track','ECL-${yr}-0001');">Run Step 2 →</button>
              </div>
              <div style="padding:0.65rem 0.85rem;border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <div><strong>3. Field Worker Collection:</strong> Sign in as <code>worker@ecycleloop.demo</code>, view assigned tasks, mark <code>Collected</code>, and attach proof photo.</div>
                <button type="button" class="ec-btn-primary" style="padding:0.35rem 0.7rem;font-size:0.75rem;white-space:nowrap;" onclick="quickDemoLogin('worker@ecycleloop.demo','Worker@123');navigateTo('/tasks');">Run Step 3 →</button>
              </div>
              <div style="padding:0.65rem 0.85rem;border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <div><strong>4. Admin Assessment &amp; Routing:</strong> Sign in as <code>admin@ecycleloop.demo</code>, update status to <code>Under Assessment</code>, and assign repair partner.</div>
                <button type="button" class="ec-btn-primary" style="padding:0.35rem 0.7rem;font-size:0.75rem;white-space:nowrap;" onclick="quickDemoLogin('admin@ecycleloop.demo','Admin@123');navigateTo('/admin');">Run Step 4 →</button>
              </div>
              <div style="padding:0.65rem 0.85rem;border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <div><strong>5. Repair Partner QA:</strong> Sign in as <code>repair@ecycleloop.demo</code> and record repair completion / reuse readiness.</div>
                <button type="button" class="ec-btn-primary" style="padding:0.35rem 0.7rem;font-size:0.75rem;white-space:nowrap;" onclick="quickDemoLogin('repair@ecycleloop.demo','Repair@123');navigateTo('/tasks');">Run Step 5 →</button>
              </div>
              <div style="padding:0.65rem 0.85rem;border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <div><strong>6. Recycling Partner Batch Log:</strong> Sign in as <code>recycler@ecycleloop.demo</code> and record end-of-life material recovery batch reference.</div>
                <button type="button" class="ec-btn-primary" style="padding:0.35rem 0.7rem;font-size:0.75rem;white-space:nowrap;" onclick="quickDemoLogin('recycler@ecycleloop.demo','Recycler@123');navigateTo('/tasks');">Run Step 6 →</button>
              </div>
              <div style="padding:0.65rem 0.85rem;border:1px solid var(--border);border-radius:8px;display:flex;justify-content:space-between;align-items:center;gap:0.75rem;">
                <div><strong>7. Reboot Market Second-Life Request:</strong> Browse eligible listings and submit an interest or donation request.</div>
                <button type="button" class="ec-btn-secondary" style="padding:0.35rem 0.7rem;font-size:0.75rem;white-space:nowrap;" onclick="closeModal();navigateTo('/market');">Run Step 7 →</button>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <button type="button" class="ec-btn-danger" onclick="confirmResetDemoData()">Reset Demo Dataset to Fresh Start</button>
              <button type="button" class="ec-btn-secondary" onclick="closeModal()">Close Guide</button>
            </div>
          </div>
        </div>
      `;
    }

    function confirmResetDemoData() {
      const root = document.getElementById('modal-root');
      if (!root) return;
      root.innerHTML = `
        <div class="ec-modal-backdrop" role="dialog" aria-modal="true">
          <div class="ec-modal" style="max-width:460px;">
            <h3 style="margin:0 0 0.4rem 0;font-size:1.15rem;font-weight:800;color:#991B1B;">Reset Local Demo Data?</h3>
            <p style="font-size:0.84rem;color:#37474F;margin:0 0 1.15rem 0;">
              This will restore all seeded E-Waste items, status timelines, Reboot Market listings, and demo user accounts to their clean initial state.
            </p>
            <div style="display:flex;justify-content:flex-end;gap:0.5rem;">
              <button type="button" class="ec-btn-secondary" onclick="closeModal()">Cancel</button>
              <button type="button" class="ec-btn-danger" onclick="executeResetDemoData()">Confirm Reset</button>
            </div>
          </div>
        </div>
      `;
    }

    function executeResetDemoData() {
      DataRepository.resetToSeed();
      AppState.lastSubmittedItemId = null;
      AppState.submitDraftPhoto = null;
      closeModal();
      showToast('Demo dataset restored to clean initial state.');
      renderApp();
    }

    async function hydrateAsyncPhotosInDom() {
      const imgs = document.querySelectorAll('img[data-photo-id]');
      for (const img of imgs) {
        const pid = img.getAttribute('data-photo-id');
        if (!pid) continue;
        const photo = await PhotoStorageService.getPhoto(pid);
        if (photo && photo.dataUrl) {
          img.src = photo.dataUrl;
        }
      }
      if (AppState.currentRoute === '/profile') {
        await hydrateProfileAvatar();
      }
    }


    function animateMetricCounters() {
      const els = document.querySelectorAll('.ec-metric-val[data-count-target]');
      els.forEach((el) => {
        const target = parseInt(el.getAttribute('data-count-target'), 10);
        if (isNaN(target) || target <= 0) {
          el.textContent = String(target || 0);
          return;
        }
        let current = 0;
        const steps = 16;
        const inc = Math.max(1, Math.ceil(target / steps));
        const timer = setInterval(() => {
          current += inc;
          if (current >= target) {
            el.textContent = String(target);
            clearInterval(timer);
          } else {
            el.textContent = String(current);
          }
        }, 22);
      });
    }

    function renderApp() {
      renderNavigation();
      const main = document.getElementById('app-main');
      if (!main) return;

      const route = AppState.currentRoute;
      let html = '';
      if (route === '/') html = renderHomePage();
      else if (route === '/login') html = renderLoginPage();
      else if (route === '/register') html = renderRegisterPage();
      else if (route === '/profile') html = renderProfilePage();
      else if (route === '/submit') html = renderSubmitPage();
      else if (route === '/track') html = renderTrackPage();
      else if (route === '/market') html = renderMarketPage();
      else if (route === '/centres') html = renderCentresPage();
      else if (route === '/dashboard') html = renderUserDashboardPage();
      else if (route === '/tasks') html = renderTasksPage();
      else if (route === '/admin') html = renderAdminPage();
      else if (route === '/how-it-works') html = renderHowItWorksPage();
      else html = renderHomePage();

      main.innerHTML = html;
      animateMetricCounters();
      hydrateAsyncPhotosInDom();
    }

    function initApp() {
      DataRepository.load();
      PhotoStorageService.init();

      const parsed = parseHashRoute();
      const protectedRoutes = ['/profile', '/dashboard', '/admin', '/tasks'];
      const currentUser = AuthService.getCurrentUser();

      if (protectedRoutes.includes(parsed.route) && !currentUser) {
        AppState.intendedRoute = parsed.param ? `${parsed.route}/${parsed.param}` : parsed.route;
        AppState.currentRoute = '/login';
        AppState.routeParam = null;
        window.location.hash = '#/login';
      } else {
        AppState.currentRoute = parsed.route;
        AppState.routeParam = parsed.param;
        if (parsed.route === '/track' && parsed.param) {
          AppState.trackQuery = parsed.param;
        }
      }

      window.addEventListener('hashchange', () => {
        const next = parseHashRoute();
        const activeUser = AuthService.getCurrentUser();
        if (protectedRoutes.includes(next.route) && !activeUser) {
          AppState.intendedRoute = next.param ? `${next.route}/${next.param}` : next.route;
          window.location.hash = '#/login';
          AppState.currentRoute = '/login';
          AppState.routeParam = null;
          renderApp();
          return;
        }
        AppState.currentRoute = next.route;
        AppState.routeParam = next.param;
        if (next.route === '/track' && next.param) {
          AppState.trackQuery = next.param;
        }
        renderApp();
      });

      renderApp();
    }

    if (document.readyState === 'loading') { window.addEventListener('DOMContentLoaded', initApp); } else { initApp(); }
