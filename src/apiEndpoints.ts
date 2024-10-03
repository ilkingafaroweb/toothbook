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
  // forgotPassword: {
  //   email:
  // },
  profile: {
    get: `${API_BASE_URL}/Identity/Account/GetUserProfile`,
    patch: `${API_BASE_URL}/Identity/Account/PatchUserProfile`
  },
  contact: {
    post: `${API_BASE_URL}/Information/Contact/submit`
  },
  partners: {
    post: `${API_BASE_URL}/Information/Partners/submit`
  }
};

export default apiEndpoints;