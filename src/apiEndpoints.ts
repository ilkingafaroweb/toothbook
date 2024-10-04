const API_BASE_URL = import.meta.env.VITE_TOOBOOK_CORE_API_URL;

const apiEndpoints = {
  faq: {
    get: `${API_BASE_URL}/Information/Faq/Get`,
  },

  referrals: {
    data: `${API_BASE_URL}/ReferralManagement/getuserreferrals`,
    link: `${API_BASE_URL}/ReferralManagement/getuserreferrallink`,
    email: `${API_BASE_URL}/ReferralManagement/senduserreferrallink`
  },

  login: {
    post: `${API_BASE_URL}/Identity/Account/Login`
  },

  forgotPassword: {
    checkEmail: `${API_BASE_URL}/Identity/Account/checkusercanresetpassword`,
    postOTP: `${API_BASE_URL}/Identity/Account/validateresetpasswordtoken`,
    resetPassword: `${API_BASE_URL}/Identity/Account/resetpassword`
  },

  register: {
    post: `${API_BASE_URL}/Identity/Account/register`,
    otpCheck: `${API_BASE_URL}/Identity/Account/validateaccountverifytoken`
  },

  profile: {
    get: `${API_BASE_URL}/Identity/Account/GetUserProfile`,
    patch: `${API_BASE_URL}/Identity/Account/PatchUserProfile`
  },

  contact: {
    post: `${API_BASE_URL}/Information/Contact/submit`
  },

  partners: {
    post: `${API_BASE_URL}/Information/Partners/submit`
  },

  bookings: {
    get: `${API_BASE_URL}/BookingsHistory/getbookings`,
    accept: `${API_BASE_URL}/BookingOverview/approveoffer`,
    decline: `${API_BASE_URL}/BookingOverview/cancelbooking`
  },

  steps: {
    giftcard: `${API_BASE_URL}/Interactive/Steps/getgiftcards`,
    services: `${API_BASE_URL}/Interactive/Steps/getservices`,
    otherServices: `${API_BASE_URL}/Interactive/Steps/getotherservices`,
    getMainInsurances: `${API_BASE_URL}/Interactive/Steps/getinsurancecompanies`,
    getOtherInsurances: `${API_BASE_URL}/Interactive/Steps/getotherinsurancecompanies`,
    postStepsData: `${API_BASE_URL}/Interactive/Steps/logsteps`,
  },

  clinics : {
    list:`${API_BASE_URL}/Clinic/getclinics`,
  }
};

export default apiEndpoints;