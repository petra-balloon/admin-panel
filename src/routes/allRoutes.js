// website pages
import CancelTicketPage from "../pages/website-pages/cancel-ticket"
import TicketPage from "../pages/website-pages/tickets"
import PricingPlan from "../pages/website-pages/pricing-plan"
import TeamMember from "../pages/website-pages/team-members"
import SubAdmins from "../pages/website-pages/sub-admins"
import PrintTicket from "../pages/website-pages/print-ticket"
import PromoCode from "pages/website-pages/promo-code"
import PromoReports from "pages/website-pages/promo-reports"
import ReservationReport from "pages/website-pages/reservation-report"
import Reports from "pages/website-pages/reports"
import BoardingPassPage from "pages/website-pages/boarding-pass"
import BoardingForm from "pages/website-pages/boarding-form"
import BoardingTestPage from "pages/website-pages/boarding-test-page"
import BoardingTestPage2 from "pages/website-pages/boarding-test-page2"
import SubAdminReports from "pages/website-pages/sub-admin-reports"
import SocialMedia from "pages/website-pages/social-media"
import OrderConfirm from "pages/website-pages/orderConfirm"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Icons
import IconDripicons from "../pages/Icons/IconDripicons"
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import TypiconsIcon from "../pages/Icons/IconTypicons"
import IconIon from "../pages/Icons/IconIon"
import ThemifyIcon from "../pages/Icons/IconThemify"
import IconFontawesome from "../pages/Icons/IconFontawesome"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormMask from "../pages/Forms/FormMask"
import FormRepeater from "../pages/Forms/FormRepeater"
import FormUpload from "../pages/Forms/FormUpload"
import FormWizard from "../pages/Forms/FormWizard"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRating from "../pages/Ui/UiRating"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"
import UiUtilities from "pages/Ui/UiUtilities"
import UiOffcanvas from "pages/Ui/UiOffcanvas"
import BlogDetails from "pages/Blog/BlogDetails"

const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  //website-page
  { path: "/cancel-ticket", component: <CancelTicketPage /> },
  { path: "/print-ticket", component: <PrintTicket /> },

  { path: "/tickets", component: <TicketPage /> },
  { path: "/pricingplan", component: <PricingPlan /> },
  { path: "/teammember", component: <TeamMember /> },
  { path: "/subadmins", component: <SubAdmins /> },
  { path: "/promo-code", component: <PromoCode /> },
  { path: "/promo-reports", component: <PromoReports /> },
  { path: "/reservation-reports", component: <ReservationReport /> },
  { path: "/reports", component: <Reports /> },
  { path: "/boarding-pass", component: <BoardingPassPage /> },
  { path: "/boarding-form", component: <BoardingForm /> },
  { path: "/boarding-test-page", component: <BoardingTestPage /> },
  { path: "/boarding-test-page2", component: <BoardingTestPage2 /> },
  { path: "/report-subadmin", component: <SubAdminReports /> },
  { path: "/social-media", component: <SocialMedia/> },
  { path: "/order-confirm", component: <OrderConfirm/> },
  
  
  

  /* { path: "/contact", component: <ContactUs /> }, */
  { path: "/blog-details", component: <BlogDetails /> },

  //profile
  { path: "/profile", component: <UserProfile /> },

  // Icons
  { path: "/icons-dripicons", component: <IconDripicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icons-ion", component: <IconIon /> },
  { path: "/icons-themify", component: <ThemifyIcon /> },
  { path: "/icons-typicons", component: <TypiconsIcon /> },

  // Tables
  { path: "/tables-basic", component: <BasicTables /> },
  { path: "/tables-datatable", component: <DatatableTables /> },
  { path: "/tables-responsive", component: <ResponsiveTables /> },
  { path: "/tables-editable", component: <EditableTables /> },

  // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-mask", component: <FormMask /> },
  { path: "/form-repeater", component: <FormRepeater /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/form-xeditable", component: <FormXeditable /> },

  // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-colors", component: <UiColors /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-utilities", component: <UiUtilities /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },

  //Utility

  // this route should be at the end of all other routes
  { path: "/", component: <Dashboard /> },
]
const subAdminRoutes = [
  { path: "/pricingplan", component: <PricingPlan /> },
  { path: "/tickets", component: <TicketPage /> },
  { path: "/cancel-ticket", component: <CancelTicketPage /> },
  { path: "/print-ticket", component: <PrintTicket /> },
  { path: "/promo-code", component: <PromoCode /> },
  { path: "/promo-reports", component: <promoReports /> },
  { path: "/boarding-pass", component: <BoardingPassPage /> },
  { path: "/boarding-form", component: <BoardingForm /> },
  { path: "/boarding-test-page", component: <BoardingTestPage /> },
  { path: "/reservation-reports", component: <ReservationReport /> },
  { path: "/order-confirm", component: <OrderConfirm/> },
]

const authRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  // Authentication Inner
  { path: "/pages-login", component: <Login1 /> },
  { path: "/pages-register", component: <Register1 /> },
  { path: "/page-recoverpw", component: <Recoverpw /> },
]

export { userRoutes, authRoutes, subAdminRoutes }
