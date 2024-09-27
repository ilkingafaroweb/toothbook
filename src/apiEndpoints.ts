const API_BASE_URL = import.meta.env.VITE_TOOBOOK_CORE_API_URL;

const apiEndpoints = {
  faq: {
    get: `${API_BASE_URL}/Information/Faq/Get`,
  },
  referrals: {
    data: `${API_BASE_URL}/ReferralManagement/getuserreferrals`,
    link: `${API_BASE_URL}/ReferralManagement/getuserreferrallink`,
  },
  login: {
    post: `${API_BASE_URL}/Identity/Account/Login`
  },
  profile: {
    get: `${API_BASE_URL}/Identity/Account/GetUserProfile`
  }
};

export default apiEndpoints;