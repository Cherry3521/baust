import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ServiceItem, 
  ServiceRequest, 
  RequestStatus, 
  Notice, 
  Vacancy, 
  JobApplication, 
  StaffMember,
  DeliveryMethod,
  UrgencyLevel
} from '../types/admindesk';
import { initialServiceCatalog } from '../data/serviceCatalog';
import { initialServiceRequests } from '../data/serviceRequests';
import { initialNotices } from '../data/notices';
import { initialVacancies, initialJobApplications, initialStaffMembers } from '../data/vacancies';
import { useNotificationStore } from './useNotificationStore';

interface AdminDeskContextType {
  serviceRequests: ServiceRequest[];
  serviceCatalog: ServiceItem[];
  notices: Notice[];
  vacancies: Vacancy[];
  jobApplications: JobApplication[];
  staffMembers: StaffMember[];
  
  // Alumni Request Actions
  submitServiceRequest: (data: {
    alumniId: string;
    alumniName: string;
    alumniEmail: string;
    alumniPhone: string;
    alumniBaustId: string;
    alumniDept: string;
    alumniBatch: string;
    alumniPassingYear: string;
    alumniCgpa: number;
    serviceIds: string[];
    copies: number;
    purpose: 'Higher Study' | 'Job' | 'Visa' | 'Personal' | 'Other';
    urgency: UrgencyLevel;
    deliveryMethod: DeliveryMethod;
    pickupDate?: string;
    courierAddress?: {
      recipientName: string;
      phone: string;
      division: string;
      district: string;
      address: string;
    };
    paymentMethod: 'bKash' | 'Nagad' | 'Bank Deposit' | 'Card';
    transactionId: string;
    totalFee: number;
    uploadedDocuments: { name: string; size: string; type: string; url: string }[];
    recipientName?: string;
    recipientOrg?: string;
    recipientEmail?: string;
  }) => string; // returns tracking ID
  
  cancelServiceRequest: (id: string) => void;
  rateServiceRequest: (id: string, rating: number, comment?: string) => void;
  sendMessageOnRequest: (id: string, text: string, senderRole: 'alumni' | 'admin', senderName: string) => void;
  reUploadDocumentOnRequest: (id: string, doc: { name: string; size: string; type: string; url: string }) => void;
  
  // Admin Workflow Actions
  verifyPayment: (id: string) => void;
  approveRequest: (id: string, staffName: string) => void;
  rejectRequest: (id: string, reason: string, customMessage: string, staffName: string) => void;
  requestActionRequired: (id: string, message: string, staffName: string) => void;
  startProcessingRequest: (id: string, staffName: string) => void;
  markReadyForDelivery: (id: string, staffName: string, digitalCode?: string) => void;
  markDelivered: (id: string, courierName?: string, courierTrackingNo?: string, staffName?: string) => void;
  assignStaffToRequest: (id: string, staffName: string, staffRole: string) => void;
  
  // Catalog Management (Admin CRUD)
  addServiceItem: (item: Omit<ServiceItem, 'id'>) => void;
  updateServiceItem: (id: string, updates: Partial<ServiceItem>) => void;
  deleteServiceItem: (id: string) => void;
  toggleServiceItemStatus: (id: string) => void;
  
  // Notices Management (Admin CRUD & RSVP)
  addNotice: (notice: Omit<Notice, 'id' | 'readCount' | 'rsvpCount'>) => void;
  updateNotice: (id: string, updates: Partial<Notice>) => void;
  deleteNotice: (id: string) => void;
  toggleNoticePin: (id: string) => void;
  rsvpNoticeEvent: (noticeId: string, userId: string) => void;
  
  // Vacancies Management & Job Applications
  addVacancy: (vacancy: Omit<Vacancy, 'id' | 'applicantsCount'>) => void;
  updateVacancy: (id: string, updates: Partial<Vacancy>) => void;
  closeVacancy: (id: string) => void;
  deleteVacancy: (id: string) => void;
  submitJobApplication: (data: {
    vacancyId: string;
    alumniId: string;
    alumniName: string;
    alumniDept: string;
    alumniBatch: string;
    alumniCgpa: number;
    alumniExperienceYears: number;
    coverNote: string;
    cvFileName: string;
  }) => void;
  updateApplicationStatus: (
    applicationId: string,
    status: 'Shortlisted' | 'Interview' | 'Selected' | 'Not Selected',
    interviewDetails?: { date: string; time: string; venue: string },
    adminNotes?: string
  ) => void;
  
  // Helpers
  getRequestById: (id: string) => ServiceRequest | undefined;
}

const AdminDeskContext = createContext<AdminDeskContextType | undefined>(undefined);

export const AdminDeskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addNotification } = useNotificationStore();

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem('bcb_service_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialServiceRequests;
  });

  const [serviceCatalog, setServiceCatalog] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('bcb_service_catalog');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialServiceCatalog;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('bcb_notices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialNotices;
  });

  const [vacancies, setVacancies] = useState<Vacancy[]>(() => {
    const saved = localStorage.getItem('bcb_vacancies');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialVacancies;
  });

  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('bcb_job_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialJobApplications;
  });

  const [staffMembers] = useState<StaffMember[]>(initialStaffMembers);

  useEffect(() => {
    localStorage.setItem('bcb_service_requests', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  useEffect(() => {
    localStorage.setItem('bcb_service_catalog', JSON.stringify(serviceCatalog));
  }, [serviceCatalog]);

  useEffect(() => {
    localStorage.setItem('bcb_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('bcb_vacancies', JSON.stringify(vacancies));
  }, [vacancies]);

  useEffect(() => {
    localStorage.setItem('bcb_job_applications', JSON.stringify(jobApplications));
  }, [jobApplications]);

  const submitServiceRequest = (data: any): string => {
    // Generate unique Tracking ID e.g. BCB-2026-000126
    const trackingId = `BCB-2026-000${126 + serviceRequests.length}`;
    
    // Resolve service names
    const serviceNames = data.serviceIds.map((id: string) => {
      const s = serviceCatalog.find(cat => cat.id === id);
      return s ? s.name : 'University Document';
    });

    const newReq: ServiceRequest = {
      id: trackingId,
      alumniId: data.alumniId,
      alumniName: data.alumniName,
      alumniEmail: data.alumniEmail,
      alumniPhone: data.alumniPhone,
      alumniBaustId: data.alumniBaustId,
      alumniDept: data.alumniDept,
      alumniBatch: data.alumniBatch,
      alumniPassingYear: data.alumniPassingYear,
      alumniCgpa: data.alumniCgpa,
      serviceIds: data.serviceIds,
      serviceNames,
      copies: data.copies,
      purpose: data.purpose,
      urgency: data.urgency,
      uploadedDocuments: data.uploadedDocuments || [],
      deliveryMethod: data.deliveryMethod,
      pickupDate: data.pickupDate,
      courierAddress: data.courierAddress,
      totalFee: data.totalFee,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId,
      paymentStatus: 'Verified', // mock verified for demonstration
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      recipientName: data.recipientName,
      recipientOrg: data.recipientOrg,
      recipientEmail: data.recipientEmail,
      timeline: [
        {
          status: 'Submitted',
          timestamp: new Date().toLocaleString(),
          actor: data.alumniName,
          note: `Request generated with Tracking ID: ${trackingId}`
        },
        {
          status: 'Payment Verified',
          timestamp: new Date().toLocaleString(),
          actor: 'Payment Gateway',
          note: `${data.paymentMethod} Trx: ${data.transactionId} verified (BDT ${data.totalFee}).`
        }
      ],
      messages: []
    };

    setServiceRequests(prev => [newReq, ...prev]);

    // Push notification to Admin & Alumni
    addNotification({
      userId: 'adm-001',
      title: 'New Service Request Submitted',
      message: `${data.alumniName} submitted request ${trackingId} for ${serviceNames.join(', ')}.`,
      category: 'admin_desk',
      link: '/admin/admin-desk'
    });

    addNotification({
      userId: data.alumniId,
      title: 'Request Submitted Successfully',
      message: `Your request (${trackingId}) has been received. Track status on the Admin Desk.`,
      category: 'admin_desk',
      link: `/alumni/admin-desk/requests/${trackingId}`
    });

    return trackingId;
  };

  const cancelServiceRequest = (id: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id && req.status === 'Submitted') {
        return {
          ...req,
          status: 'Cancelled',
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Cancelled',
              timestamp: new Date().toLocaleString(),
              actor: req.alumniName,
              note: 'Cancelled by applicant.'
            }
          ]
        };
      }
      return req;
    }));
  };

  const rateServiceRequest = (id: string, rating: number, comment?: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          rating,
          reviewComment: comment,
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    }));
  };

  const sendMessageOnRequest = (id: string, text: string, senderRole: 'alumni' | 'admin', senderName: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          senderId: senderRole === 'alumni' ? req.alumniId : 'admin-001',
          senderName,
          senderRole,
          text,
          timestamp: new Date().toLocaleString()
        };

        // Notify other party
        if (senderRole === 'admin') {
          addNotification({
            userId: req.alumniId,
            title: `Admin Message on ${req.id}`,
            message: text.slice(0, 90) + (text.length > 90 ? '...' : ''),
            category: 'admin_desk',
            link: `/alumni/admin-desk/requests/${req.id}`
          });
        }

        return {
          ...req,
          messages: [...req.messages, newMsg],
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    }));
  };

  const reUploadDocumentOnRequest = (id: string, doc: { name: string; size: string; type: string; url: string }) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'Under Review',
          uploadedDocuments: [...req.uploadedDocuments, doc],
          actionRequiredMessage: undefined,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Under Review',
              timestamp: new Date().toLocaleString(),
              actor: req.alumniName,
              note: `Uploaded missing file: ${doc.name}. Status returned to Under Review.`
            }
          ]
        };
      }
      return req;
    }));

    addNotification({
      userId: 'adm-001',
      title: 'Applicant Re-uploaded Document',
      message: `Missing document uploaded for request ${id}.`,
      category: 'admin_desk',
      link: '/admin/admin-desk'
    });
  };

  // Admin Actions
  const verifyPayment = (id: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          paymentStatus: 'Verified',
          status: 'Payment Verified',
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Payment Verified',
              timestamp: new Date().toLocaleString(),
              actor: 'Finance Accounts Officer',
              note: 'Payment transaction confirmed.'
            }
          ]
        };
      }
      return req;
    }));
  };

  const approveRequest = (id: string, staffName: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        addNotification({
          userId: req.alumniId,
          title: `Request Approved (${req.id})`,
          message: `Your request has been approved by ${staffName} and is moving to processing.`,
          category: 'admin_desk',
          link: `/alumni/admin-desk/requests/${req.id}`
        });

        return {
          ...req,
          status: 'Approved',
          assignedStaff: staffName,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Approved',
              timestamp: new Date().toLocaleString(),
              actor: staffName,
              note: 'Clearance verified and approved.'
            }
          ]
        };
      }
      return req;
    }));
  };

  const rejectRequest = (id: string, reason: string, customMessage: string, staffName: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        addNotification({
          userId: req.alumniId,
          title: `Request Rejected (${req.id})`,
          message: `Reason: ${reason}. Please check the request thread to re-apply.`,
          category: 'admin_desk',
          link: `/alumni/admin-desk/requests/${req.id}`
        });

        const newMsg = {
          id: `msg-${Date.now()}`,
          senderId: 'admin-reject',
          senderName: staffName,
          senderRole: 'admin' as const,
          text: `Request Rejected. Reason: ${reason}. Notes: ${customMessage}. You may use the "Re-apply" button to submit a corrected request.`,
          timestamp: new Date().toLocaleString()
        };

        return {
          ...req,
          status: 'Rejected',
          rejectionReason: reason,
          rejectionMessage: customMessage,
          messages: [...req.messages, newMsg],
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Rejected',
              timestamp: new Date().toLocaleString(),
              actor: staffName,
              note: `Rejected: ${reason} - ${customMessage}`
            }
          ]
        };
      }
      return req;
    }));
  };

  const requestActionRequired = (id: string, message: string, staffName: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        addNotification({
          userId: req.alumniId,
          title: `Action Required on Request ${req.id}`,
          message: message.slice(0, 90),
          category: 'admin_desk',
          link: `/alumni/admin-desk/requests/${req.id}`
        });

        const newMsg = {
          id: `msg-${Date.now()}`,
          senderId: 'admin-action',
          senderName: staffName,
          senderRole: 'admin' as const,
          text: `Action Required: ${message}. Please upload the requested file using the upload prompt above.`,
          timestamp: new Date().toLocaleString(),
          isActionRequiredPrompt: true
        };

        return {
          ...req,
          status: 'Action Required',
          actionRequiredMessage: message,
          messages: [...req.messages, newMsg],
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Action Required',
              timestamp: new Date().toLocaleString(),
              actor: staffName,
              note: message
            }
          ]
        };
      }
      return req;
    }));
  };

  const startProcessingRequest = (id: string, staffName: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'Processing',
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Processing',
              timestamp: new Date().toLocaleString(),
              actor: staffName,
              note: 'Printing, embossing seal, and verification underway.'
            }
          ]
        };
      }
      return req;
    }));
  };

  const markReadyForDelivery = (id: string, staffName: string, digitalCode?: string) => {
    const code = digitalCode || `BAUST-DIGI-${Date.now().toString().slice(-6)}`;
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        addNotification({
          userId: req.alumniId,
          title: `Document Ready! (${req.id})`,
          message: req.deliveryMethod === 'Campus Pickup'
            ? 'Your document is ready for pickup from the Registrar office.'
            : 'Your official document is ready and digital copy is available to download.',
          category: 'admin_desk',
          link: `/alumni/admin-desk/requests/${req.id}`
        });

        return {
          ...req,
          status: 'Ready',
          digitalDeliverableUrl: '#',
          digitalDocumentCode: code,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Ready',
              timestamp: new Date().toLocaleString(),
              actor: staffName,
              note: `Prepared and sealed. Digital Verification Code: ${code}`
            }
          ]
        };
      }
      return req;
    }));
  };

  const markDelivered = (id: string, courierName?: string, courierTrackingNo?: string, staffName = 'Dispatch Officer') => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        addNotification({
          userId: req.alumniId,
          title: `Document Delivered (${req.id})`,
          message: courierTrackingNo 
            ? `Dispatched via ${courierName || 'Courier'} (Tracking: ${courierTrackingNo}).`
            : 'Your document delivery/collection has been completed.',
          category: 'admin_desk',
          link: `/alumni/admin-desk/requests/${req.id}`
        });

        return {
          ...req,
          status: 'Delivered',
          courierName: courierName || req.courierName,
          courierTrackingNo: courierTrackingNo || req.courierTrackingNo,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...req.timeline,
            {
              status: 'Delivered',
              timestamp: new Date().toLocaleString(),
              actor: staffName,
              note: courierTrackingNo
                ? `Dispatched via ${courierName} with tracking #${courierTrackingNo}`
                : 'Handed over / completed.'
            }
          ]
        };
      }
      return req;
    }));
  };

  const assignStaffToRequest = (id: string, staffName: string, staffRole: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          assignedStaff: staffName,
          assignedStaffRole: staffRole,
          updatedAt: new Date().toISOString()
        };
      }
      return req;
    }));
  };

  // Catalog CRUD
  const addServiceItem = (item: Omit<ServiceItem, 'id'>) => {
    const newItem: ServiceItem = {
      ...item,
      id: `srv-${Date.now().toString().slice(-4)}`
    };
    setServiceCatalog(prev => [newItem, ...prev]);
  };

  const updateServiceItem = (id: string, updates: Partial<ServiceItem>) => {
    setServiceCatalog(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteServiceItem = (id: string) => {
    setServiceCatalog(prev => prev.filter(s => s.id !== id));
  };

  const toggleServiceItemStatus = (id: string) => {
    setServiceCatalog(prev => prev.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  // Notices CRUD
  const addNotice = (notice: Omit<Notice, 'id' | 'readCount' | 'rsvpCount'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `not-${Date.now().toString().slice(-4)}`,
      readCount: 0,
      rsvpCount: 0
    };
    setNotices(prev => [newNotice, ...prev]);

    // Push notification to all
    addNotification({
      userId: 'all',
      title: `Notice: ${notice.title}`,
      message: notice.body.slice(0, 90) + '...',
      category: 'system',
      link: '/alumni/admin-desk'
    });
  };

  const updateNotice = (id: string, updates: Partial<Notice>) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const toggleNoticePin = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const rsvpNoticeEvent = (noticeId: string, userId: string) => {
    setNotices(prev => prev.map(n => {
      if (n.id === noticeId) {
        const users = n.rsvpUsers || [];
        const hasRsvped = users.includes(userId);
        const updatedUsers = hasRsvped ? users.filter(u => u !== userId) : [...users, userId];
        return {
          ...n,
          rsvpUsers: updatedUsers,
          rsvpCount: (n.rsvpCount || 0) + (hasRsvped ? -1 : 1)
        };
      }
      return n;
    }));
  };

  // Vacancies
  const addVacancy = (vacancy: Omit<Vacancy, 'id' | 'applicantsCount'>) => {
    const newVac: Vacancy = {
      ...vacancy,
      id: `vac-${Date.now().toString().slice(-4)}`,
      applicantsCount: 0
    };
    setVacancies(prev => [newVac, ...prev]);
  };

  const updateVacancy = (id: string, updates: Partial<Vacancy>) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const closeVacancy = (id: string) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, status: 'Closed' } : v));
  };

  const deleteVacancy = (id: string) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
  };

  const submitJobApplication = (data: any) => {
    const vacancy = vacancies.find(v => v.id === data.vacancyId);
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      vacancyId: data.vacancyId,
      vacancyTitle: vacancy ? vacancy.title : 'University Post',
      alumniId: data.alumniId,
      alumniName: data.alumniName,
      alumniDept: data.alumniDept,
      alumniBatch: data.alumniBatch,
      alumniCgpa: data.alumniCgpa,
      alumniExperienceYears: data.alumniExperienceYears,
      coverNote: data.coverNote,
      cvFileName: data.cvFileName,
      submittedAt: new Date().toISOString(),
      status: 'Applied'
    };

    setJobApplications(prev => [newApp, ...prev]);
    if (vacancy) {
      setVacancies(prev => prev.map(v => v.id === data.vacancyId ? { ...v, applicantsCount: v.applicantsCount + 1 } : v));
    }

    addNotification({
      userId: 'adm-001',
      title: 'New Job Application Received',
      message: `${data.alumniName} applied for ${vacancy?.title}.`,
      category: 'admin_desk',
      link: '/admin/admin-desk'
    });

    addNotification({
      userId: data.alumniId,
      title: 'Application Submitted',
      message: `Your application for "${vacancy?.title}" has been successfully recorded.`,
      category: 'admin_desk',
      link: '/alumni/admin-desk'
    });
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: 'Shortlisted' | 'Interview' | 'Selected' | 'Not Selected',
    interviewDetails?: { date: string; time: string; venue: string },
    adminNotes?: string
  ) => {
    setJobApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        addNotification({
          userId: app.alumniId,
          title: `Application Update: ${status}`,
          message: status === 'Interview'
            ? `You are invited to an interview on ${interviewDetails?.date} at ${interviewDetails?.time}.`
            : `Your application for "${app.vacancyTitle}" has been updated to "${status}".`,
          category: 'admin_desk',
          link: '/alumni/admin-desk'
        });

        return {
          ...app,
          status,
          interviewDate: interviewDetails?.date,
          interviewTime: interviewDetails?.time,
          interviewVenue: interviewDetails?.venue,
          adminNotes: adminNotes || app.adminNotes
        };
      }
      return app;
    }));
  };

  const getRequestById = (id: string) => {
    return serviceRequests.find(r => r.id.toLowerCase() === id.toLowerCase());
  };

  return (
    <AdminDeskContext.Provider
      value={{
        serviceRequests,
        serviceCatalog,
        notices,
        vacancies,
        jobApplications,
        staffMembers,
        submitServiceRequest,
        cancelServiceRequest,
        rateServiceRequest,
        sendMessageOnRequest,
        reUploadDocumentOnRequest,
        verifyPayment,
        approveRequest,
        rejectRequest,
        requestActionRequired,
        startProcessingRequest,
        markReadyForDelivery,
        markDelivered,
        assignStaffToRequest,
        addServiceItem,
        updateServiceItem,
        deleteServiceItem,
        toggleServiceItemStatus,
        addNotice,
        updateNotice,
        deleteNotice,
        toggleNoticePin,
        rsvpNoticeEvent,
        addVacancy,
        updateVacancy,
        closeVacancy,
        deleteVacancy,
        submitJobApplication,
        updateApplicationStatus,
        getRequestById
      }}
    >
      {children}
    </AdminDeskContext.Provider>
  );
};

export const useAdminDeskStore = () => {
  const context = useContext(AdminDeskContext);
  if (!context) {
    throw new Error('useAdminDeskStore must be used within an AdminDeskProvider');
  }
  return context;
};
